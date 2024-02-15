/*eslint-disable*/

var fields = [
    {
        "fieldName": "OrderDate",
        "dataType": "datetime"
    },
    {
        "fieldName": "dateTime1"
    },
    {
        "fieldName": "dateTime2"
    },
    {
        "fieldName": "dateTime3"
    }
];

var columns = [
    {
        "name": "dateTime1",
        "fieldName": "dateTime1",
        "width": "110",
        "header": {
            "text": "yyyyMM"
        },
        "editor": {
            "type": "btdate",
            "btOptions": {
                "startView": 1,
                "minViewMode": 1,
                "todayBtn": "linked",
                "language": "ko",
                "todayHighlight": true
            },
            "datetimeFormat": "yyyyMM",
            "textReadOnly": true,
            "mask": {
                "editMask": "999999"
            }
        }
    },
    {
        "name": "dateTime2",
        "fieldName": "dateTime2",
        "width": "110",
        "header": {
            "text": "yyyy-MM"
        },
        "editor": {
            "type": "btdate",
            "btOptions": {
                "startView": 1,
                "minViewMode": 1,
                "todayBtn": "linked",
                "language": "ko",
                "todayHighlight": true
            },
            "textReadOnly": true,
            "datetimeFormat": "yyyy-MM",
            "mask": {
                "editMask": "9999-99",
                "includedFormat": true
            }
        }
    },
    {
        "name": "dateTime3",
        "fieldName": "dateTime3",
        "width": "160",
        "header": {
            "text": "yyyyMM -> yyyy-MM"
        },
        "textFormat": "([0-9]{4})([0-9]{2})$;$1-$2",
        "editor": {
            "type": "btdate",
            "btOptions": {
                "startView": 1,
                "minViewMode": 1,
                "todayBtn": "linked",
                "language": "ko",
                "todayHighlight": true
            },
            "datetimeFormat": "yyyyMM",
            "textReadOnly": true,
            "mask": {
                "editMask": "9999-99"
            }
        }
    },
    {
        "name": "OrderDate",
        "fieldName": "OrderDate",
        "type": "data",
        "width": "130",
        "header": {
            "text": "Order Date"
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

var dataProvider, gridContainer, grid;

function createGrid(container) {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  var CustomerNames = ["ALFKI", "ANATR", "ANTON", "AROUT", "BERGS", "BLAUS", "BLONP", "BOLID", "BONAP", "BOTTM", "BSBEV", "CACTU", "CENTC", "CHOPS", "COMMI", "CONSH", "DRACD", "DUMON", "EASTC", "ERNSH", "FAMIA", "FISSA", "FOLIG", "FOLKO", "FRANK", "FRANR", "FRANS", "FURIB", "GALED", "GODOS", "GOURL", "GREAL", "GROSR", "HANAR", "HILAA", "HUNGC", "HUNGO", "ISLAT", "KOENE", "LACOR", "LAMAI", "LAUGB", "LAZYK", "LEHMS", "LETSS", "LILAS", "LINOD", "LONEP", "MAGAA", "MAISD", "MEREP", "MORGK", "NORTS", "OCEAN", "OLDWO", "OTTIK", "PARIS", "PERIC", "PICCO", "PRINI", "QUEDE", "QUEEN", "QUICK", "RANCH", "RATTC", "REGGC", "RICAR", "RICSU", "ROMEY", "SANTG", "SAVEA", "SEVES", "SIMOB", "SPECD", "SPLIR", "SUPRD", "THEBI", "THECR", "TOMSP", "TORTU", "TRADH", "TRAIH", "VAFFE", "VICTE", "VINET", "WANDK", "WARTH", "WELLI", "WHITC", "WILMK", "WOLZA"];

  gridView.onEditSearch = function (grid, index, text) {
      console.log("onEditSearch:" + index.itemIndex + "," + index.column + ", " + text);
      var items = CustomerNames.filter(function (str) {
          return str.indexOf(text) == 0;
      });
      console.log(items);
      grid.fillEditSearchItems(index.column, text, items);
  };

  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.displayOptions.rowHeight = 36;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  //setProvider("editor_demoData.json");
  var data = [["2019-01-01","201901","2019-01","201901"],
    ["2019-01-01","201901","2019-01","201901"],
    ["2019-01-01","201901","2019-01","201901"],
    ["2019-01-01","201901","2019-01","201901"],
    ["2019-01-01","201901","2019-01","201901"],
    ["2019-01-01","201901","2019-01","201901"]
    ];
  dataProvider.setRows(data);
  gridView.refresh();
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
};

function btnTextCase() {
  var textCase;
  var rbTextCase = document.getElementsByName("rbTextCase");
  for(var i = 0; i < rbTextCase.length; i ++){
    if(document.getElementsByName("rbTextCase")[i].checked){
      textCase = document.getElementsByName("rbTextCase")[i].value;
    }
  }

  gridView.setColumnProperty("OrderID", "editor", {"textCase": textCase});
}