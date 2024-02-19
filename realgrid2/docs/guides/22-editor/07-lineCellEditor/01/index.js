/*eslint-disable*/

var fields = [
  {
    "fieldName": "OrderID",
    "dataType": "text"
  },
  {
    "fieldName": "CustomerID",
    "dataType": "text"
  },
  {
    "fieldName": "EmployeeID",
    "dataType": "text"
  },
  {
      "fieldName": "Quantity",
      "dataType": "number"
  },
  {
      "fieldName": "OrderDate",
      "dataType": "datetime"
  },
  {
      "fieldName": "CompanyName",
      "dataType": "text"
  },
  {
      "fieldName": "Country",
      "dataType": "text"
  },
  {
      "fieldName": "Phone",
      "dataType": "text"
  },
  {
      "fieldName": "ProductName",
      "dataType": "text"
  },
  {
      "fieldName": "QuantityPerUnit",
      "dataType": "text"
  },
  {
      "fieldName": "UnitPrice",
      "dataType": "number"
  }
];

var columns = [
  {
      "name": "OrderID",
      "fieldName": "OrderID",
      "width": "150",
      "header": {
          "text": "alphabet만 입력가능",
      },
      "editor": {
          "type": "line",
          "inputCharacters": "A-Za-z"
      }
  },
  {
      "name": "CustomerID",
      "fieldName": "CustomerID",
      "width": "150",
      "header": {
          "text": "alphabet은 입력불가",
      },
      "editor": {
          "type": "line",
          "ignoreCharacters": "A-Za-z"
      }
  },
  {
    "name": "Quantity",
    "fieldName": "Quantity",
    "width": "150",
    "header": {
        "text": "alphabet은 입력불가",
    },
    "editor": {
       "type": "number",
       //integerOnly: true,
       "inputCharacters": "0-9"
    }
  },
  {
      "name": "EmployeeID",
      "fieldName": "EmployeeID",
      "header": {
          "text": "한글만 입력가능",
      },
      "editor": {
          "type": "line",
          "inputCharacters": "ㄱ-힣"
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
      var datas = [
        ["VINET","10248","한글입력", 1],
        ["VINET","10248","한글입력"],
        ["VINET","10248","한글입력"],
        ["VINET","10248","한글입력"],
        ["VINET","10248","한글입력"],
        ["VINET","10248","한글입력"],
        ["VINET","10248","한글입력"],
        ["VINET","10248","한글입력"],
        ["VINET","10248","한글입력"],
        ["VINET","10248","한글입력"]
      ]
      dataProvider.setRows(datas);

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

  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.displayOptions.rowHeight = 36;
  gridView.stateBar.visible = false;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;

  setProvider("editor_demoData.json");
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

function btnShowHeaderSummary() {
  gridView.headerSummaries.visible = true;
}

function btnHideHeaderSummary() {
  gridView.headerSummaries.visible = false;
}