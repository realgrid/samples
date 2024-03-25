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
  "name":"Country",
  "fieldName":"Country",
  "type":"data",
  "width":"100",
  "header":{
    "text":"Country"
  }
},{
  "name":"CompanyName",
  "fieldName":"CompanyName",
  "type":"data",
  "width":"120",
  "header":{
    "text":"CompanyName",
  }
},{
  "name":"OrderID",
  "fieldName":"OrderID",
  "type":"data",
  "width":"80",
  "header":{
    "text":"Order ID"
  }
},{
  "name":"CustomerID",
  "fieldName":"CustomerID",
  "type":"data",
  "width":"90",
  "header":{
    "text":"Customer ID"
  }
},{
  "name":"EmployeeID",
  "fieldName":"EmployeeID",
  "type":"data",
  "width":"90",
  "header":{
    "text":"Employee ID"
  }
},{
  "name":"OrderDate",
  "fieldName":"OrderDate",
  "type":"data",
  "width":"130",
  "header":{
    "text":"Order Date"
  }
},{
  "name":"Phone",
  "fieldName":"Phone",
  "type":"data",
  "width":"100",
  "header":{
    "text":"Phone"
  }
},{
  "name":"ProductName",
  "fieldName":"ProductName",
  "type":"data",
  "width":"200",
  "header":{
    "text":"Product Name"
  }
},{
  "name":"QuantityPerUnit",
  "fieldName":"QuantityPerUnit",
  "type":"data",
  "width":"100",
  "header":{
    "text":"Quantity / Unit"
  },
  "numberFormat":"#,##0"
},{
  "name":"Quantity",
  "fieldName":"Quantity",
  "type":"data",
  "width":"100",
  "header":{
    "text":"Quantity"
  },
  "numberFormat":"#,##0"
},{
  "name":"UnitPrice",
  "fieldName":"UnitPrice",
  "type":"data",
  "width":"100",
  "header":{
    "text":"Unit Price"
  },
  "numberFormat":"#,##0"
}]

var layout_Org = [
  {
    name: "companyGroup",
    direction: "vertical",
    header: false,
    items: [
        {
            
            items: [
                {
                    column: "Country",
                    cellSpan: 3,
                    width: 50
                },
                50,50,
                {
                    column: "CompanyName",
                    cellSpan: 3,
                    width: 50
                },
                50,50,
            ],
            header: false
        },
        {
            items: [
                {
                    column: "CustomerID",
                    cellSpan: 2,
                    width: 50
                },
                50,
                {
                    column: "OrderDate", 
                    cellSpan: 2,
                    width: 50
                },
                50,
                {
                    column: "OrderID", 
                    cellSpan: 2,
                    width: 50
                },
                50,
            ],
            header: false
        }
    ]
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
    }
  }
}

var dataProvider, gridContainer, grid, layout;

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

  layout = getMultiLevelColumns([["Country", "CompanyName"], ["CustomerID", "OrderDate", "OrderID"]]);
  gridView.setColumnLayout(layout);

  setProvider("editor_demoData.json");


}

function start() {
  createGrid("realgrid");
}

function fitStyle() {
  gridView.displayOptions.fitStyle = "even";
}

function linearizeColumns() {
  gridView.linearizeColumns();
}

function setColumnlayout() {
  gridView.setColumnLayout(layout);
}

function getMultiLevelColumns (colNames) {
  "use strict";

  function leastCommonMultiple(arr) {
      var result = lcm(arr[0], arr[1]);

      for (var i = 2; i < arr.length; i++) {
          result = lcm(result, arr[i]);
      }

      return result;
  };

  function gcd(a, b) {
      while (b != 0) {
          var temp = a % b;
          a = b;
          b = temp;
      }

      return a;
  };

  function lcm(a, b) {
      return a * b / gcd(a, b);
  };

  //var arrLen = colNames.map(x => x.length); //각 배열의 길이
  var arrLen = colNames.map(function (x) { return x.length }); //각 배열의 길이
  var lcmValue = leastCommonMultiple(arrLen); //최소공배수 

  var parentGrpColObj = {}
  parentGrpColObj.direction = "vertical";
  parentGrpColObj.items = [];
  parentGrpColObj.header = { visible: false };

  for (var i = 0; i < colNames.length; i++) {
      var grpColObj = {};
      grpColObj.direction = "horizontal";
      grpColObj.items = [];
      grpColObj.header = {visible: false};

      for (var j = 0; j < colNames[i].length ; j++) {
          var cellSpan = lcmValue / colNames[i].length;;
          var column = {};

          column.column = colNames[i][j];
          column.cellSpan = cellSpan;
          column.width = 50;

          grpColObj.items.push(column);
          for (var k = 0; k < cellSpan - 1; k++) {
              grpColObj.items.push(50);
          }
      }
      parentGrpColObj.items.push(grpColObj);
  }
  
  return [parentGrpColObj];
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
