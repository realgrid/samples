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
          "maxLength": 5
      },
      "width": "90",
      "textInputCase": "upper",
      "header": {
          "text": "Text editor"
      }
  },
  {
      "name": "Quantity1",
      "fieldName": "Quantity",
      "width": "100",
      "sortable": false,
      "editButtonVisibility": "always",
      "editor":{
        "type": "number", //숫자 편집기 설정
        "showStepButton": true, //숫자 편집 버튼 표시 여부
        "direction": "vertical", //버튼 표시 방향 설정, "horizontal" 설정 시 가로방향
        "editFormat": "#,##0.##",
        "step": 1, // 버튼 클릭 시 값 증감 단위
        //"min": 20, //최소값
        //"max": 999, //최대값
        "delay": 100 //버튼을 누르고 있을 때 값 적용 간격
      },
      "numberFormat": "#,##0.##",
      "header": {
          "text": "always",
          "styleName": "orange-column"
      }
  },
  {
      "name": "Quantity2",
      "fieldName": "Quantity",
      "width": "100",
      "sortable": false,
      "editButtonVisibility": "default",
      "editor":{
        "type": "number", //숫자 편집기 설정
        "showStepButton": true, //숫자 편집 버튼 표시 여부
        "direction": "vertical", //버튼 표시 방향 설정, "horizontal" 설정 시 가로방향
        "editFormat": "#,##0.##",
        "step": 1, // 버튼 클릭 시 값 증감 단위
        //"min": 20, //최소값
        //"max": 999, //최대값
        "delay": 100 //버튼을 누르고 있을 때 값 적용 간격
      },
      "numberFormat": "#,##0.##",
      "header": {
          "text": "default",
          "styleName": "orange-column"
      }
  },
  {
      "name": "Quantity3",
      "fieldName": "Quantity",
      "width": "100",
      "sortable": false,
      "editButtonVisibility": "hidden",
      "editor":{
        "type": "number", //숫자 편집기 설정
        "showStepButton": true, //숫자 편집 버튼 표시 여부
        "direction": "vertical", //버튼 표시 방향 설정, "horizontal" 설정 시 가로방향
        "editFormat": "#,##0.##",
        "step": 1, // 버튼 클릭 시 값 증감 단위
        //"min": 20, //최소값
        //"max": 999, //최대값
        "delay": 100 //버튼을 누르고 있을 때 값 적용 간격
      },
      "numberFormat": "#,##0.##",
      "header": {
          "text": "hidden",
          "styleName": "orange-column"
      }
  },
  {
      "name": "Quantity4",
      "fieldName": "Quantity",
      "width": "100",
      "sortable": false,
      "editButtonVisibility": "rowfocused",
      "editor":{
        "type": "number", //숫자 편집기 설정
        "showStepButton": true, //숫자 편집 버튼 표시 여부
        "direction": "vertical", //버튼 표시 방향 설정, "horizontal" 설정 시 가로방향
        "editFormat": "#,##0.##",
        "step": 1, // 버튼 클릭 시 값 증감 단위
        //"min": 20, //최소값
        //"max": 999, //최대값
        "delay": 100 //버튼을 누르고 있을 때 값 적용 간격
      },
      "numberFormat": "#,##0.##",
      "header": {
          "text": "rowfocused",
          "styleName": "orange-column"
      }
  },
  {
      "name": "Quantity5",
      "fieldName": "Quantity",
      "width": "100",
      "sortable": false,
      "editButtonVisibility": "visible",
      "editor":{
        "type": "number", //숫자 편집기 설정
        "showStepButton": true, //숫자 편집 버튼 표시 여부
        "direction": "vertical", //버튼 표시 방향 설정, "horizontal" 설정 시 가로방향
        "editFormat": "#,##0.##",
        "step": 1, // 버튼 클릭 시 값 증감 단위
        //"min": 20, //최소값
        //"max": 999, //최대값
        "delay": 100 //버튼을 누르고 있을 때 값 적용 간격
      },
      "numberFormat": "#,##0.##",
      "header": {
          "text": "visible",
          "styleName": "orange-column"
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
          "text": "partialMatch"
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
  gridView.stateBar.visible = false;
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
