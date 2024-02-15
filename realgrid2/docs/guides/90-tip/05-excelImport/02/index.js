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
  }
];

var columns = [
  {
    name: "KorName",
    fieldName: "KorName",
    width: "60",
    header: {
      text: "이름"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "Gender",
    fieldName: "Gender",
    width: "40",
    header: {
      text: "성별"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "Age",
    fieldName: "Age",
    width: "40",
    header: {
      text: "나이"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "Phone",
    fieldName: "Phone",
    width: "100",
    header: {
      text: "전화번호"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "ProductId",
    fieldName: "ProductId",
    width: "120",
    header: {
      text: "제품번호"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "KorCountry",
    fieldName: "KorCountry",
    width: "100",
    header: {
      text: "투자국가"
    },
    renderer: {
      type: "text"
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
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "Monetary",
    fieldName: "Monetary",
    width: "40",
    header: {
      text: "통화"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "StartDate",
    fieldName: "StartDate",
    width: "100",
    header: {
      text: "최초납입일"
    }
  },
  {
    name: "EndDate",
    fieldName: "EndDate",
    width: "100",
    header: {
      text: "종료일"
    }
  },
  {
    name: "ToMonth",
    fieldName: "ToMonth",
    width: "40",
    header: {
      text: "납입 횟수"
    }
  },
  {
    name: "Month",
    fieldName: "Month",
    width: "40",
    header: {
      text: "남은 횟수"
    }
  },
  {
    name: "InterestRate",
    fieldName: "InterestRate",
    width: "40",
    numberFormat: "0.00",
    header: {
      text: "이율"
    }
  },
  {
    name: "SaveCost",
    fieldName: "SaveCost",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "납입금"
    }
  },
  {
    name: "SaveMaturity",
    fieldName: "SaveMaturity",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "만기금액"
    }
  },
  {
    name: "CurrentSave",
    fieldName: "CurrentSave",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "현재잔액"
    }
  }
];
var httpRequest;

function setProvider(filename) {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = loadData;
  httpRequest.open("GET", "https://cdn.wooritech.com/realgrid/data/" + filename);
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
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);
  gridView.setDataSource(dataProvider);

  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.header.height = 40;
  gridView.displayOptions.rowHeight = 36;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  setProvider("simple_data.json");
}

function start() {
  $("#xlf").bind("change", handleXlsFile);
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


function excelExport() {
  gridView.exportGrid({
    type: "excel",
    target: "local",
    fileName: "gridExportSample.xlsx",
    footer: "hidden", 
    done: function () {  //내보내기 완료 후 실행되는 함수
        alert("done excel export")
    }
  });
}

function gridClear() {
  dataProvider.clearRows();
}

///////////////////////////////////////////////////////////////////////////////
function fixdata(data) {
  var o = "", l = 0, w = 10240;
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}

function handleXlsFile(e) {
  var files = e.target.files;
  var i, f;
  for (i = 0, f = files[i]; i != files.length; ++i) {
      var reader = new FileReader();
      var name = f.name;
      reader.onload = function (e) {
          var data = e.target.result;

          //var workbook = XLSX.read(data, { type: 'binary' });
          var arr = fixdata(data);
          workbook = XLSX.read(btoa(arr), { type: "base64", cellText: true, cellDates: true });

          process_wb(workbook);
          /* DO SOMETHING WITH workbook HERE */
      };
      //reader.readAsBinaryString(f);
      reader.readAsArrayBuffer(f);

  }
}

function process_wb(wb) {
  var output = "";
  output = to_json(wb);
  var sheetNames = Object.keys(output);
  if (sheetNames.length > 0) {
      var colsObj = output[sheetNames][0];

      if (colsObj) {
          var data = output[sheetNames];

          var mappedData = data.map(item => {
            return {
              KorName: item.이름,
              Gender: item.성별,
              Age: item.나이,
              Phone: item.전화번호,
              ProductId: item.제품번호,
              KorCountry: item.투자국가,
              OrderDate: item.주문일자,
              CardNumber: item.카드번호,
              Monetary: item.통화,
              StartDate: item.최초납입일,
              EndDate: item.종료일,
              ToMonth: item['납입 횟수'],
              Month: item['남은 횟수'],
              InterestRate: item.이율,
              SaveCost: item.납입금,
              SaveMaturity: item.만기금액
            };
          });


          //map 함수를 사용하지 않고 javascript for문으로 설정
          /*
          var mappedData = [];

          for(var i = 0; i < data.length; i++){
            mappedData.push({
              KorName: data[i].이름,
              Gender: data[i].성별,
              Age: data[i].나이,
              Phone: data[i].전화번호,
              ProductId: data[i].제품번호,
              KorCountry: data[i].투자국가,
              OrderDate: data[i].주문일자,
              CardNumber: data[i].카드번호,
              Monetary: data[i].통화,
              StartDate: data[i].최초납입일,
              EndDate: data[i].종료일,
              ToMonth: data[i]['납입 횟수'],
              Month: data[i]['남은 횟수'],
              InterestRate: data[i].이율,
              SaveCost: data[i].납입금,
              SaveMaturity: data[i].만기금액
            })
          }
          */

          dataProvider.fillJsonData(mappedData, {  })
      }
  }
}

function to_json(workbook) {
  var result = {};
  workbook.SheetNames.forEach(function (sheetName) {
    var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName], {rawNumbers: true});

      if (roa.length > 0) {
          result[sheetName] = roa;
      }
  });
  return result;
}