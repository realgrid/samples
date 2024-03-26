/*eslint-disable*/

var fields = [{
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
  "fieldName": "OrderDate",
  "dataType": "datetime",
  "datetimeFormat": "yyyy-MM-dd",
  "amText": "오전",
  "pmText": "오후"
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
  "fieldName": "Quantity",
  "dataType": "number"
},
{
  "fieldName": "UnitPrice",
  "dataType": "number"
}];

var columns = [{
  "name": "OrderID",
  "fieldName": "OrderID",
  "width": "80",
  "header": {
    "text": "Order ID"
  },
  "headerSummary": {
    "expression": "count"
  }
}, {
  "name": "Country",
  "fieldName": "Country",
  "width": "100",
  "header": {
    "text": "Country"
  }
}, {
  "name": "CustomerID",
  "fieldName": "CustomerID",
  "width": "90",
  "header": {
      "text": "Customer ID"
  }
}, {
  "name": "CompanyName",
  "fieldName": "CompanyName",
  "width": "150",
  "header": {
      "text": "Company Name"
  },
  "headerSummary": {
    "text": "갯수: "
  }
}, {
  "name": "EmployeeID",
  "fieldName": "EmployeeID",
  "width": "90",
  "header": {
      "text": "Employee ID"
  },
}, {
  "name": "OrderDate",
  "fieldName": "OrderDate",
  "width": "130",
  "header": {
      "text": "Order Date"
  }
}, {
  "name": "Phone",
  "fieldName": "Phone",
  "width": "90",
  "renderer": {
      "type": "button"
  },
  "header": {
      "text": "Phone"
  }
}, {
  "name": "ProductName",
  "fieldName": "ProductName",
  "width": "200",
  "header": {
      "text": "Product Name"
  }
}, {
  "name": "QuantityPerUnit",
  "fieldName": "QuantityPerUnit",
  "width": "100",
  "header": {
      "text": "Quantity / Unit"
  },  
  "headerSummary": {
    "text": "합계: "
  }
}, {
  "name": "Quantity",
  "fieldName": "Quantity",
  "width": "100",
  "header": {
      "text": "Quantity"
  },
  "headerSummary": {
    "expression": "sum",
    "numberFormat": "#,##0"
  },
  "footer": {
      "expression": "sum",
      "numberFormat": "#,##0"
  }
}, {
  "name": "UnitPrice",
  "fieldName": "UnitPrice",
  "width": "100",
  "header": {
      "text": "Unit Price"
  },
  "footer": {
      "expression": "avg",
      "numberFormat": "#,##0.00"
  }
}];

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

var dataProvider, gridContainer, grid;

function createGrid(container) {
  RealGrid.setLocale('en');
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);
  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  gridView.displayOptions.emptyMessage = "There is no data to display.";
  gridView.displayOptions.rowHeight = 36;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;

  gridView.headerSummary.height = 40

  setProvider("cellmerge_demoData.json");
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

function btnMergeRule() {
  gridView.columnByName("OrderID").mergeRule = {criteria: "value"};
  gridView.columnByName("Country").mergeRule = {criteria: "value"};
  gridView.columnByName("CustomerID").mergeRule = {criteria: "value"};
}

function btnPrevMergeRule() {
  gridView.columnByName("OrderID").mergeRule = {criteria: "value"};
  gridView.columnByName("Country").mergeRule = {criteria: "prevvalues + value"};
  gridView.columnByName("CustomerID").mergeRule = {criteria: "prevvalues + value"};
}