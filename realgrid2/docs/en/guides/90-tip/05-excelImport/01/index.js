/*eslint-disable*/

var fields = [
  {
    fieldName: "이름",
    dataType: "text"
  },
  {
    fieldName: "성별",
    dataType: "text"
  },
  {
    fieldName: "나이",
    dataType: "number"
  },
  {
    fieldName: "전화번호",
    dataType: "text"
  },
  {
    fieldName: "제품번호",
    dataType: "text"
  },
  {
    fieldName: "투자국가",
    dataType: "text"
  },
  {
    fieldName: "주문일자",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후"
  },
  {
    fieldName: "카드번호",
    dataType: "text"
  },
  {
    fieldName: "통화",
    dataType: "text"
  }
];

var columns = [
  {
    name: "이름",
    fieldName: "이름",
    width: "60",
    header: {
      text: "이름"
    }
  },
  {
    name: "성별",
    fieldName: "성별",
    width: "40",
    header: {
      text: "성별"
    }
  },
  {
    name: "나이",
    fieldName: "나이",
    width: "40",
    header: {
      text: "나이"
    },
    styleName: "right-column"
  },
  {
    name: "전화번호",
    fieldName: "전화번호",
    width: "100",
    header: {
      text: "전화번호"
    }
  },
  {
    name: "제품번호",
    fieldName: "제품번호",
    width: "120",
    header: {
      text: "제품번호"
    }
  },
  {
    name: "투자국가",
    fieldName: "투자국가",
    width: "100",
    header: {
      text: "투자국가"
    }
  },
  {
    name: "주문일자",
    fieldName: "주문일자",
    width: "100",
    header: {
      text: "주문일자"
    }
  },
  {
    name: "카드번호",
    fieldName: "카드번호",
    width: "140",
    header: {
      text: "카드번호"
    }
  },
  {
    name: "통화",
    fieldName: "통화",
    width: "40",
    header: {
      text: "통화"
    }
  }
];

var httpRequest;

function setProvider(filename) {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = loadData;
  httpRequest.open("GET", "/public/data/" + filename);
  httpRequest.send();
}

function loadData() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var data = JSON.parse(httpRequest.responseText);
      dataProvider.setRows(data);
      gridView.refresh();
      gridView.setFocus();
    }
  }
}

var dataProvider, gridContainer, grid;

function createGrid(container) {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.displayOptions.rowHeight = 36;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  setProvider("simple_data_han.json");
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
          workbook = XLSX.read(btoa(arr), { type: "base64",cellText:true,cellDates:true });

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
          dataProvider.fillJsonData(output, { rows: sheetNames[0] })
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