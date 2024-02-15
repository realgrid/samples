/*eslint-disable*/

var fields = [
  {
      "fieldName": "OrderID",
      "dataType": "text"
  },
  {
      "fieldName": "CustomerID"
  },
  {
      "fieldName": "EmployeeID"
  },
  {
      "fieldName": "OrderDate",
      "dataType": "datetime",
      "datetimeFormat":"yyyy-MM-dd"
  },
  {
      "fieldName": "CompanyName"
  },
  {
      "fieldName": "Country"
  },
  {
      "fieldName": "CountryKor"
  },
  {
      "fieldName": "Phone"
  },
  {
      "fieldName": "ProductName"
  },
  {
      "fieldName": "QuantityPerUnit"
  },
  {
      "fieldName": "Quantity",
      "dataType": "number"
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
      "editor": {
          "type": "line",
          "maxLength": 5
      },
      "width": "90",
      "header": {
          "text": "Text editor",
          "styleName": "orange-column"
      }
  },
  {
      "name": "CompanyName",
      "fieldName": "CompanyName",
      "width": "200",
      "editor": {
          "type": "multiline",
          "textCase": "upper"
      },
      "header": {
          "text": "Multiline Edit"
      }
  },
  {
      "name": "Quantity",
      "fieldName": "Quantity",
      "width": "100",
      "sortable": false,
      "editor": {
          "type": "number",
          "textAlignment": "far",
          "editFormat": "#,##0.##",
          "multipleChar": "+"
      },
      "header": {
          "text": "Number Edit",
      }
  },
  {
      "name": "CustomerID",
      "fieldName": "CustomerID",
      "width": "150",
      "sortable": false,
      "lookupDisplay": true,
      "values": [
          "VINET",
          "HANAR",
          "SUPRD",
          "VICTE",
          "THREE",
          "SEVEN"
      ],
      "labels": [
          "<VINET>",
          "<HANAR>",
          "<SUPRD>",
          "<VICTE>",
          "<THREE>",
          "<SEVEN>"
      ],
      "editor": {
          "type": "dropdown",
          "dropDownCount": 4
      },
      "header": {
          "text": "DropDown Edit"
      }
  },
  {
      "name": "CustomerID2",
      "fieldName": "CustomerID",
      "width": "150",
      "sortable": false,
      "editor": {
          "type": "dropdown",
          "dropDownCount": 4,
          "domainOnly": true,
          "textReadOnly": true,
          "values": [
              "VINET",
              "HANAR",
              "SUPRD",
              "VICTE",
              "THREE",
              "SEVEN"
          ],
          "labels": [
              "<VINET>",
              "<HANAR>",
              "<SUPRD>",
              "<VICTE>",
              "<THREE>",
              "<SEVEN>"
          ]
      },
      "header": {
          "text": "Domain Only"
      }
  },
  {
      "name": "CustomerID3",
      "fieldName": "CustomerID",
      "width": "150",
      "sortable": false,
      "editor": {
          "type": "search",
          "searchLength": 1,
          "searchDelay": 1000,
          "useCtrlEnterKey": true,
          "useEnterKey": true
      },
      "header": {
          "text": "Search Editor "
      }
  },
  {
      "name": "CountryKor",
      "fieldName": "Country",
      "width": "150",
      "sortable": false,
      "lookupDisplay": true,
      "values": [
          "Austria",
          "Belgium",
          "Brazil",
          "Finland",
          "France",
          "Germany",
          "Ireland",
          "Italy",
          "Mexico",
          "Spain",
          "Sweden",
          "Switzerland",
          "UK",
          "USA",
          "Venezuela"
      ],
      "labels": [
          "오스트리아",
          "벨기에",
          "브라질",
          "핀란드",
          "프랑스",
          "독일",
          "아일랜드",
          "이탈리아",
          "멕시코",
          "스페인",
          "스웨덴",
          "스위스",
          "영국",
          "미국",
          "베네수엘라"
      ],
      "editor": {
          "type": "dropDown",
          "dropDownCount": 5,
          "partialMatch": true
      },
      "header": {
          "text": "partialMatch",
          "styleName": "orange-column"
      }
  },
  {
      "name": "OrderDate",
      "fieldName": "OrderDate",
      "width": "180",
      "sortable": false,
      "editor": {
          "type": "date",
          "datetimeFormat": "yyyy.MM.dd"
      },
      "header": {
          "text": "Date Edit"
      }
  },
  {
      "name": "Country",
      "fieldName": "Country",
      "width": "100",
      "header": {
          "text": "Country"
      }
  },
  {
      "name": "Phone",
      "fieldName": "Phone",
      "width": "100",
      "header": {
          "text": "Phone"
      }
  },
  {
      "name": "ProductName",
      "fieldName": "ProductName",
      "width": "200",
      "header": {
          "text": "Product Name"
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

function btnTextCase() {
  var textCase;
  var rbTextCase = document.getElementsByName("rbTextCase");
  for(var i = 0; i < rbTextCase.length; i ++){
    if(document.getElementsByName("rbTextCase")[i].checked){
      textCase = document.getElementsByName("rbTextCase")[i].value
    }
  }

  gridView.setColumnProperty("OrderID", "editor", {"textCase": textCase});
}