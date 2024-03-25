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
  }
}, {
  "name": "CompanyName",
  "fieldName": "CompanyName",
  "width": "120",
  "header": {
      "text": "Company Name"
  }
}, {
  "name": "OrderID",
  "fieldName": "OrderID",
  "width": "150",
  "header": {
    "text": "Card Number",
    "styleName": "orange-column"
  }, 
  "editor": {
    "mask": {
      "editMask": "0000-0000-0000-0000"
    }
  },
  "textFormat": "([0-9]{4})([0-9]{4})([0-9]{4})([0-9]{4});$1-$2-$3-$4"
/*   "displayCallback": function(grid, index, value) {
    var tmp = '';
    tmp += value.substr(0, 4);
    tmp += '-';
    tmp += value.substr(4, 4);
    tmp += '-';
    tmp += value.substr(8,4);
    tmp += '-';
    tmp += value.substr(12,4);

    return tmp;
  } */
}, {
  "name": "OrderDate",
  "fieldName": "OrderDate",
  "width": "130",
  "header": {
      "text": "Order Date",
      "styleName": "orange-column"
  },
  "editor": {
    "type":"date", 
    "mask": {
        "editMask":"9999-99-99", //표시되는 형식
        "placeHolder":"yyyy-MM-dd", //편집기에 표시될 형식
        "includedFormat":true //편집기에 표시된 내용이 그대로 셀값으로 전달
    }
  }, 
  "datetimeFormat":"yyyy-MM-dd"
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
  }
}, {
  "name": "Quantity",
  "fieldName": "Quantity",
  "width": "100",
  "header": {
      "text": "Quantity"
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
      dataProvider.fillJsonData(data,{count: 10});

      gridView.setValue(0, "OrderID", "4017956479311942");
      gridView.setValue(1, "OrderID", "3537454864902429");
      gridView.setValue(2, "OrderID", "3574848246092110");
      gridView.setValue(3, "OrderID", "3571523163079340");
      gridView.setValue(4, "OrderID", "3746227853102431");
      gridView.setValue(5, "OrderID", "5602245880215027");
      gridView.setValue(6, "OrderID", "6709735293733863");
      gridView.setValue(7, "OrderID", "3573722642979827");
      gridView.setValue(8, "OrderID", "6759123799705660");
      gridView.setValue(9, "OrderID", "2016571419050795");

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