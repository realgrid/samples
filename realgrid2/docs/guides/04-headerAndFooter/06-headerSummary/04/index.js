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
  "name": "Country",
  "fieldName": "Country",
  "width": "100",
  "header": {
    "text": "Country"
  },
  "summaries": [{
    "text": "합계 ==>  ",
  }, {
    "text": "평균 ==>  ",
  }],
  "summaryUserSpans": [{ colspan: 3 }, { colspan: 3}]
}, {
  "name": "CompanyName",
  "fieldName": "CompanyName",
  "width": "120",
  "header": {
    "text": "Company Name",
  }
}, {
  "name": "QuantityPerUnit",
  "fieldName": "QuantityPerUnit",
  "width": "100",
  "header": {
      "text": "Quantity / Unit",
      "styleName": "orange-column"
  }
}, {
  "name": "Quantity",
  "fieldName": "Quantity",
  "width": "100",
  "header": {
      "text": "Quantity",
      "styleName": "orange-column"
  },
  "summaries": [{
    "expression": "sum",
    "numberFormat": "#,##0.00"
  }, {
    "expression": "avg",
    "numberFormat": "#,##0.00"
  }]
}, {
  "name": "OrderID",
  "fieldName": "OrderID",
  "width": "80",
  "header": {
    "text": "Order ID"
  }
}, {
  "name": "CustomerID",
  "fieldName": "CustomerID",
  "width": "90",
  "header": {
    "text": "Customer ID"
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
  "name": "UnitPrice",
  "fieldName": "UnitPrice",
  "width": "100",
  "header": {
      "text": "Unit Price"
  }
}];

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
 
  gridView.setHeaderSummaries({
    visible:true,
    items:[
      {height: 40},
      {height: 40}
    ]
  });

  var layout1 = [
    {
      column: "Country",
      summaryUserSpans: [{ colspan: 3 }, { colspan: 3}]
    },
    "CompanyName",
    "QuantityPerUnit", 
    "Quantity",
    "OrderID",
    "CustomerID",
    "EmployeeID",
    "OrderDate",
    "Phone",
    "ProductName"
  ];
  
  gridView.setColumnLayout(layout1);

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
