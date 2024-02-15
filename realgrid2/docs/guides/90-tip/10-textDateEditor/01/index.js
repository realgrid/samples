/*eslint-disable*/

var fields = [
    {
        "fieldName": "dateTime1",
        "dataType": "text"
    },
    {
        "fieldName": "dateTime2",
        "dataType": "text"
    }
];

var columns = [
    {
        "name": "dateTime1",
        "fieldName": "dateTime1",
        "width": "130",
        "header": {
            "text": "yyyy-MM-dd의 데이터"
        },
        "editor": {
            "type": "date",
            "datetimeFormat": "yyyy-MM-dd",
            "textReadOnly": true,
            "mask": {
                "editMask": "9999-99-99",
                "includedFormat": true
            }
        }
    },
    {
        "name": "dateTime2",
        "fieldName": "dateTime2",
        "width": "130",
        "header": {
            "text": "yyyyMMdd의 데이터"
        },
        "editor": {
            "type": "date",
            "datetimeFormat": "yyyyMMdd",
            "textReadOnly": true,
            "mask": {
                "editMask": "9999-99-99"
            }
        },
        "textFormat": "([0-9]{4})([0-9]{2})([0-9]{2})$;$1-$2-$3",
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
  var data = [
    ["2019-01-01","20190101","2019-01-01","201901"],
    ["2019-01-01","20190101","2019-01-01","201901"],
    ["2019-01-01","20190101","2019-01-01","201901"],
    ["2019-01-01","20190101","2019-01-01","201901"],
    ["2019-01-01","20190101","2019-01-01","201901"],
    ["2019-01-01","20190101","2019-01-01","201901"]
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

function getJsonRow() {
  gridView.setFocus();
  gridView.commit(true);
  alert(JSON.stringify(dataProvider.getJsonRow(gridView.getCurrent().dataRow)));
}