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
    amText: "AM",
    pmText: "PM"
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
    amText: "AM",
    pmText: "PM"
  },
  {
    fieldName: "EndDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "AM",
    pmText: "PM"
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
      text: "Name"
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
      text: "Gender"
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
      text: "Age"
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
      text: "Phone"
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
      text: "Product Code"
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
      text: "Country"
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
      text: "Order Date"
    }
  },
  {
    name: "CardNumber",
    fieldName: "CardNumber",
    width: "140",
    header: {
      text: "Card No."
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
      text: "Monetary"
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
      text: "Start Date"
    }
  },
  {
    name: "EndDate",
    fieldName: "EndDate",
    width: "100",
    header: {
      text: "End Date"
    }
  },
  {
    name: "ToMonth",
    fieldName: "ToMonth",
    width: "40",
    header: {
      text: "Pay Cnt."
    }
  },
  {
    name: "Month",
    fieldName: "Month",
    width: "40",
    header: {
      text: "Residuum"
    }
  },
  {
    name: "InterestRate",
    fieldName: "InterestRate",
    width: "40",
    numberFormat: "0.00",
    header: {
      text: "Interest Rate"
    }
  },
  {
    name: "SaveCost",
    fieldName: "SaveCost",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "Payment"
    }
  },
  {
    name: "SaveMaturity",
    fieldName: "SaveMaturity",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "Save Maturity"
    }
  },
  {
    name: "CurrentSave",
    fieldName: "CurrentSave",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "Currency Save"
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

  gridView.displayOptions.emptyMessage = "There is no data to display.";
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