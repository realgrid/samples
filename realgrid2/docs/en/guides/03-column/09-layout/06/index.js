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
  "type": "data",
  "width": "100",
  "styles": {
      "textAlignment": "center"
  },
  "header": {
      "text": "Country"
  }
}, {
  "name": "CompanyName",
  "fieldName": "CompanyName",
  "type": "data",
  "width": "120",
  "styleName": "blue-column",
  "styles": {
      "textAlignment": "near"
  },
  "header": {
      "text": "Company Name"
  }
}, {
  "name": "UnitPrice2",
  "fieldName": "UnitPrice",
  "type": "data",
  "width": "100",
  "renderer": {
      "type": "bar",
      "origin": "left",
      "barWidth": "80%"
  },
  "header": {
      "text": "UnitPrice2"
  },
  "footer": {
      "expression": "sum",
      "styles": {
          "textAlignment": "far",
          "numberFormat": "#,000"
      }
  }
}, {
  "name": "OrderID",
  "fieldName": "OrderID",
  "type": "data",
  "width": "80",
  "styles": {
      "textAlignment": "center"
  },
  "header": {
      "text": "Order ID"
  },
  "footer": {
      "expression": "max",
      "groupExpression": "max"
  }
}, {
  "name": "CustomerID",
  "fieldName": "CustomerID",
  "type": "data",
  "width": "90",
  "styles": {
      "textAlignment": "center"
  },
  "header": {
      "text": "Customer ID"
  }
}, {
  "name": "EmployeeID",
  "fieldName": "EmployeeID",
  "type": "data",
  "width": "90",
  "styles": {
      "textAlignment": "center"
  },
  "header": {
      "text": "Employee ID"
  },
  "footer": {
      "expression": "min",
      "groupExpression": "min"
  }
}, {
  "name": "OrderDate",
  "fieldName": "OrderDate",
  "type": "data",
  "width": "130",
  "styles": {
      "textAlignment": "center"
  },
  "header": {
      "text": "Order Date"
  }
}, {
  "name": "Phone",
  "fieldName": "Phone",
  "type": "data",
  "width": "90",
  "renderer": {
      "type": "button"
  },
  "header": {
      "text": "Button"
  }
}, {
  "name": "Phone2",
  "fieldName": "Phone",
  "type": "data",
  "width": "90",
  "styles": {
      "textAlignment": "near"
  },
  "header": {
      "text": "Phone2"
  }
}, {
  "name": "ProductName",
  "fieldName": "ProductName",
  "type": "data",
  "width": "200",
  "styles": {
      "textAlignment": "near"
  },
  "header": {
      "text": "Product Name"
  }
}, {
  "name": "QuantityPerUnit",
  "fieldName": "QuantityPerUnit",
  "type": "data",
  "width": "100",
  "styles": {
      "textAlignment": "near"
  },
  "header": {
      "text": "Quantity / Unit"
  }
}, {
  "name": "Quantity",
  "fieldName": "Quantity",
  "type": "data",
  "width": "100",
  "styles": {
      "textAlignment": "far"
  },
  "header": {
      "text": "Quantity"
  },
  "footer": {
      "expression": "sum",
      "styles": {
          "textAlignment": "far",
          "numberFormat": "#,000"
      }
  }
}, {
  "name": "UnitPrice",
  "fieldName": "UnitPrice",
  "type": "data",
  "width": "100",
  "styles": {
      "textAlignment": "far"
  },
  "header": {
      "text": "Unit Price"
  },
  "footer": {
      "expression": "avg",
      "groupExpression": "max",
      "styles": {
          "textAlignment": "far",
          "numberFormat": "0.00",
          "prefix": "AVG = "
      }
  }
}, {
  "name": "Country2",
  "fieldName": "Country",
  "type": "data",
  "width": "100",
  "styles": {
      "textAlignment": "center"
  },
  "header": {
      "text": "Country2"
  }
}];

var layout6 = [{
  name: "Group1",
  direction: "horizontal",
  width: 200,
  items: [{
      name: "Group2",
      direction: "vertical",
      items: [{
          column: "OrderID",
          width: 100
      }]
  }, {
      name: "Group3",
      direction: "vertical",
      items: [{
          column: "CustomerID",
          width: 100
      }]
  }]
}, {
  name: "Group4",
  direction: "horizontal",
  width: 200,
  items: [{
      name: "Group2",
      direction: "vertical",
      header: {visible: false},
      items: [{
          column: "Country",
          width: 100
      }]
  }, {
      name: "Group3",
      direction: "vertical",
      header: {visible: false},
      items: [{
          column: "OrderDate",
          width: 100
      }]
  }]
},
"EmployeeID",
"Phone"
]

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
  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.header.height = 40;
  gridView.displayOptions.rowHeight = 36;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;

  gridView.header.height = -1;

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  setProvider("editor_demoData.json");

  gridView.setColumnLayout(layout6);

  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;


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
