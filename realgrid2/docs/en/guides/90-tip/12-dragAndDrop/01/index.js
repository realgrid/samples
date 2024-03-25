/*eslint-disable*/

var fields = [
  {
    fieldName: "KorName",
    dataType: "text"
  },
  {
    fieldName: "Gender",
    dataType: "text"
  },
  {
    fieldName: "Age",
    dataType: "number"
  },
  {
    fieldName: "Phone",
    dataType: "text"
  },
  {
    fieldName: "ProductId",
    dataType: "text"
  },
  {
    fieldName: "KorCountry",
    dataType: "text"
  },
  {
    fieldName: "OrderDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후"
  },
  {
    fieldName: "CardNumber",
    dataType: "text"
  },
  {
    fieldName: "Monetary",
    dataType: "text"
  },
  {
    fieldName: "StartDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후"
  },
  {
    fieldName: "EndDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후"
  },
  {
    fieldName: "ToMonth",
    dataType: "number"
  },
  {
    fieldName: "Month",
    dataType: "number"
  },
  {
    fieldName: "Year",
    dataType: "number"
  },
  {
    fieldName: "InterestRate",
    dataType: "number"
  },
  {
    fieldName: "SaveCost",
    dataType: "number"
  },
  {
    fieldName: "SaveMaturity",
    dataType: "number"
  },
  {
    fieldName: "CurrentSave",
    dataType: "number"
  },
  {
    fieldName: "FileDownload",
    dataType: "text"
  },
  {
    fieldName: "Files",
    dataType: "object"
  },
];

var columns = [
  {
    name: "KorName",
    fieldName: "KorName",
    width: "60",
    header: {
      text: "이름"
    }
  },
  {
    name: "Gender",
    fieldName: "Gender",
    width: "40",
    header: {
      text: "성별"
    }
  },
  {
    name: "Age",
    fieldName: "Age",
    width: "40",
    header: {
      text: "나이"
    },
    styleName: "right-column"
  },
  {
    name: "Phone",
    fieldName: "Phone",
    width: "100",
    header: {
      text: "전화번호"
    }
  },
  {
    name: "ProductId",
    fieldName: "ProductId",
    width: "120",
    header: {
      text: "제품번호"
    }
  },
  {
    name: "KorCountry",
    fieldName: "KorCountry",
    width: "100",
    header: {
      text: "투자국가"
    }
  },
  {
    name: "OrderDate",
    fieldName: "OrderDate",
    width: "100",
    header: {
      text: "주문일자"
    }
  },
  {
    name: "CardNumber",
    fieldName: "CardNumber",
    width: "140",
    header: {
      text: "카드번호"
    }
  },
  {
    name: "Monetary",
    fieldName: "Monetary",
    width: "40",
    header: {
      text: "통화"
    }
  },
  {
    name: "FileDownload",
    fieldName: "FileDownload",
    width: "160",
    header: {
      text: "첨부파일다운로드"
    },
    editable: false,
    styleName: "left-column",
    renderer:{
      type:"html",
      callback: function(grid, cell, w, h) {
        //console.log(cell);
        var str = "";
        var dataRow = cell.index.dataRow;
        var fileValue = grid.getValue(dataRow, "Files")
        
        if (fileValue) {
          //서버에 등록되기 전에 그리드에 담겨 있는 파일들
          for (var i=0; i < fileValue.length ; i++) {
            var fileName = "'" + fileValue[i].fileName + "'" ;
            var aTag = " <a download='" + fileValue[i].fileName + "' href='data:application/octet-stream;base64," + fileValue[i].base64Data + "'>" + fileValue[i].fileName + "</a><br>"; 
            str = str + '<a href="javascript:void(0);" class="btn" onclick="fileDelete(this)" datarow=' + dataRow + ' filename=' + fileName + '>X</a>' + aTag;
          }
        } else {
          //이미 서버에 등록되어 있는 파일들의 링크 처리
        }

       return str;
      }
    }
  }
];



var httpRequest;

function setProvider(filename) {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = loadData;
  httpRequest.open("GET", "/public/data/en/" + filename);
  httpRequest.send();
}

function loadData() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var data = JSON.parse(httpRequest.responseText);
      dataProvider.setRows(data);
      gridView.refresh();
    }
  }
}

var dataProvider, gridContainer, gridView;

function createGrid(container) {
  RealGrid.setLocale('en');
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);
  gridView.setDataSource(dataProvider);

  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.header.height = 40;
  gridView.displayOptions.minRowHeight = 35;
  gridView.displayOptions.rowHeight = -1;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;
  gridView.displayOptions.fitStyle = 'evenFill'
  
  setProvider("simple_data.json");
}

function start() {
  createGrid("realgrid");
}

// $.document.ready(start);
window.onload = start;
// domloaded를 대신 써도 됩니다.

window.onunload = function() {
  dataProvider.clearRows();

  gridView.destroy();
  dataProvider.destroy();

  gridView = null;
  dataProvider = null;
}

var outputs = [];

function fileTobase64(index, cellIndex) {
    if (files.length > index) {
        var file = files[index];
        var reader = new FileReader();

        reader.onload = function(){
          var text = reader.result;
          var file = files[index];
          
          var outs = {};
          //필요한 속성들 개별 추가
          outs['fileName'] = file.name;
          outs['dataURL'] = text;
          outs['base64Data'] = text.substr(text.indexOf(",")+1);

          outputs.push(outs);
          
          if (files.length > (index+1)) {
            fileTobase64(index+1, cellIndex);
          } else {
            dataProvider.setValue(cellIndex.dataRow, "Files", outputs)
          }

        };
        reader.readAsDataURL(file);
    }
}


function dragOverHandler(ev) {
  ev.preventDefault();
}

function dropHandler(ev) {
  ev.preventDefault();

  var cellIndex = gridView.mouseToIndex(ev.clientX-ev.offsetX, ev.clientY-ev.offsetY);
  console.log(cellIndex);

  if (cellIndex.dataRow == -1) {
    alert("정확한 위치에 파일을 drop 하세요");
    return false;
  }

  if (ev.dataTransfer.items) {
    outputs = [];
    files = [];
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        files.push(ev.dataTransfer.items[i].getAsFile());
    }

    fileTobase64(0, cellIndex);  
  } 
}

function fileDelete(el){
  //신규 등록된 파일들 그리드에서 삭제
  var dataRow = parseInt(el.getAttribute("datarow"));
  var fileName = el.getAttribute("filename");

  var filesData = dataProvider.getValue(dataRow, "Files");
  filesData = filesData.filter(function( obj ) {
    return obj.fileName !== fileName;
  });

  dataProvider.setValue(dataRow, "Files", filesData);
}