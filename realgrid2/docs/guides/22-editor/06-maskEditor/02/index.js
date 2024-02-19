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
  "fieldName": "Time",
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
  "name": "Time",
  "fieldName": "Time",
  "width": "150",
  "header": {
    "text": "Time",
    "styleName": "orange-column"
  }, 
  "editor": {
    "mask": {
      "definitions": {
          "b": "[0-2]",
          "c": "[0-9]",
          "d": "[0-5]",
          "e": "[0-9]"
      },
      "editMask": "bc:de",
      "includedFormat": true,                
      "overWrite": true, 
      "allowEmpty": true
    }
  },
  "textFormat": "([0-9]{2})([0-9]{2});$1:$2"
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
  httpRequest.open("GET", "/public/data/" + filename);
  httpRequest.send();
}

function loadData() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var data = JSON.parse(httpRequest.responseText);
      dataProvider.fillJsonData(data,{count: 10});

      gridView.setValue(0, "Time", "00:32");
      gridView.setValue(1, "Time", "11:11");
      gridView.setValue(2, "Time", "12:42");
      gridView.setValue(3, "Time", "06:12");
      gridView.setValue(4, "Time", "02:14");
      gridView.setValue(5, "Time", "00:42");
      gridView.setValue(6, "Time", "10:12");
      gridView.setValue(7, "Time", "18:16");
      gridView.setValue(8, "Time", "03:17");
      gridView.setValue(9, "Time", "23:48");

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

  gridView.onGetEditValue = function (grid, index, editResult) {
    if(index.fieldName == "Time"){
        var time = editResult.value.substr(0,2);
        if(Number(time) >= 24){
            editResult.value = ""
        }
    }
  }
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