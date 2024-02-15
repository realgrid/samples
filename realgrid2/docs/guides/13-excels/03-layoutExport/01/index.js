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
  "header": {
      "text": "Country"
  }
}, {
  "name": "CompanyName",
  "fieldName": "CompanyName",
  "type": "data",
  "width": "120",
  "styleName": "blue-column",
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
      "expression": "sum"
  }
}, {
  "name": "OrderID",
  "fieldName": "OrderID",
  "type": "data",
  "width": "80",
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
  "header": {
      "text": "Customer ID"
  }
}, {
  "name": "EmployeeID",
  "fieldName": "EmployeeID",
  "type": "data",
  "width": "90",
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
  "header": {
      "text": "Phone2"
  }
}, {
  "name": "ProductName",
  "fieldName": "ProductName",
  "type": "data",
  "width": "200",
  "header": {
      "text": "Product Name"
  }
}, {
  "name": "QuantityPerUnit",
  "fieldName": "QuantityPerUnit",
  "type": "data",
  "width": "100",
  "header": {
      "text": "Quantity / Unit"
  }
}, {
  "name": "Quantity",
  "fieldName": "Quantity",
  "type": "data",
  "width": "100",
  "header": {
      "text": "Quantity"
  },
  "footer": {
      "expression": "sum"
  }
}, {
  "name": "UnitPrice",
  "fieldName": "UnitPrice",
  "type": "data",
  "width": "100",
  "header": {
      "text": "Unit Price"
  },
  "footer": {
      "expression": "avg",
      "groupExpression": "max"
  }
}, {
  "name": "Country2",
  "fieldName": "Country",
  "type": "data",
  "width": "100",
  "header": {
      "text": "Country2"
  }
}];

var layout1, layout2, layout3, layout4

layout1 = [
          {
              name: "companyGroup",
              direction: "horizontal",
              //hideChildHeaders: true,
              items: [
                  "Country",
                  "CompanyName"
              ],
              header: {
                  text: "Company",
              }
          }, 
          "OrderID",
          "CustomerID",
          "EmployeeID",
          "OrderDate",
          "Phone"
      ]

  layout2 = [
    "OrderID",
    {
        column: "CustomerID",
        width: 200
    },
    {
        name: "companyGroup",
        direction: "horizontal",
        //hideChildHeaders: true,
        items: [
            "Country",
            "CompanyName"
        ],
        header: {
            text: "Company"
        }
    }, 
    {
        column: "EmployeeID"
    },
    "OrderDate",
    "Phone"
]
layout3 = [
  "OrderID",
  "CustomerID",
  {
      name: "companyGroup",
      direction: "vertical",
      width: 250,
      items: [
          "Country",
          "CompanyName"
      ],
      header: {
          text: "Company"
      }
  }, 
  "EmployeeID",
  "OrderDate",
  "Phone"
];
/*
layout4 = [
  "OrderID",
  "CustomerID",
  {
      name: "companyGroup",
      direction: "vertical",
      width: 250,
      items: [
          {
              name: "countryGroup",
              direction: "horizontal",
              items: [
                  {
                      column: "Country",
                      width: 100
                  },
                  {
                      column: "Phone",
                      width: 100
                  }
              ],
              header: {
                  text: "Country Group"
              }
          },
          "CompanyName"
      ],
      header: {
          text: "Company Group"
      }
  }, 
  "EmployeeID",
  "OrderDate",
  "Phone2"
];
*/

var datas = [{"Field1":"Cell(0, 0)","Field2":"Cell(0, 1)","Field3":"Cell(0, 2)","Field4":"Cell(0, 3)","Field5":"Cell(0, 4)"},{"Field1":"Cell(1, 0)","Field2":"Cell(1, 1)","Field3":"Cell(1, 2)","Field4":"Cell(1, 3)","Field5":"Cell(1, 4)"},{"Field1":"Cell(2, 0)","Field2":"Cell(2, 1)","Field3":"Cell(2, 2)","Field4":"Cell(2, 3)","Field5":"Cell(2, 4)"},{"Field1":"Cell(3, 0)","Field2":"Cell(3, 1)","Field3":"Cell(3, 2)","Field4":"Cell(3, 3)","Field5":"Cell(3, 4)"},{"Field1":"Cell(4, 0)","Field2":"Cell(4, 1)","Field3":"Cell(4, 2)","Field4":"Cell(4, 3)","Field5":"Cell(4, 4)"},{"Field1":"Cell(5, 0)","Field2":"Cell(5, 1)","Field3":"Cell(5, 2)","Field4":"Cell(5, 3)","Field5":"Cell(5, 4)"},{"Field1":"Cell(6, 0)","Field2":"Cell(6, 1)","Field3":"Cell(6, 2)","Field4":"Cell(6, 3)","Field5":"Cell(6, 4)"},{"Field1":"Cell(7, 0)","Field2":"Cell(7, 1)","Field3":"Cell(7, 2)","Field4":"Cell(7, 3)","Field5":"Cell(7, 4)"},{"Field1":"Cell(8, 0)","Field2":"Cell(8, 1)","Field3":"Cell(8, 2)","Field4":"Cell(8, 3)","Field5":"Cell(8, 4)"},{"Field1":"Cell(9, 0)","Field2":"Cell(9, 1)","Field3":"Cell(9, 2)","Field4":"Cell(9, 3)","Field5":"Cell(9, 4)"}]

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


function btnSetColumnLayout1(){
  gridView.setColumnLayout(layout1);
}

function btnSetColumnLayout2(){
  gridView.setColumnLayout(layout2);
}

function btnSetColumnLayout3(){
  gridView.setColumnLayout(layout3);
}

function btnSetColumnLayout4(){
  gridView.setColumnLayout(layout4);
}

function excelExport() {
  var excelType = Boolean(document.querySelector('input[name="excelType"]:checked').value);
  var showProgress = document.getElementById("chkShowProgress").checked;
  var indicator = document.querySelector('input[name="indicator"]:checked').value;
  var header = document.querySelector('input[name="header"]:checked').value;
  var footer = document.querySelector('input[name="footer"]:checked').value;

  gridView.exportGrid({
      type: "excel",
      target: "local",
      fileName: "gridExportSample.xlsx", 
      showProgress: showProgress,
      progressMessage: "엑셀 Export중입니다.",
      indicator: indicator,
      header: header,
      footer: footer,
      compatibility: excelType,
      done: function () {  //내보내기 완료 후 실행되는 함수
          alert("done excel export")
      }
  });
}