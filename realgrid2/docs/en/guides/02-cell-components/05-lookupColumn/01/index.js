/*eslint-disable*/

var fields = [
  {
      "fieldName": "UserId"
  },
  {
      "fieldName": "UserName"    
  },
  {
      "fieldName": "Age"
  },
  {
      "fieldName": "Gender"
  },
  {
      "fieldName": "MobilePhone"
  },
  {
      "fieldName": "Email"
  },
  {
      "fieldName": "AgeLabel"
  }
];

var columns = [
  {
      "name": "UserId",
      "fieldName": "UserId",
      "width": "90",
      "header": {
          "text": "User ID"
      }
  },
  {
      "name": "UserName",
      "fieldName": "UserName",
      "width": "170",
      "lookupDisplay": true,
      "values": [
          "VINET",
          "HANAR",
          "SUPRD",
          "VICTE",
          "RATTC",
          "WARTH"
      ],
      "labels": [
          "Vins et alcools Chevalier",
          "Hanari Carnes",
          "Suprêmes délices",
          "Victuailles en stock",
          "Rattlesnake Canyon Grocery",
          "Wartian Herkku"
      ],
      "header": {
          "text": "Values/Labels",
          "styleName": "orange-column"
      }
  },
  {
      "name": "Age",
      "fieldName": "Age",
      "width": "130",
      "lookupDisplay": true,
      "labelField": "AgeLabel",
      "header": {
          "text": "Label Field"
      }
  },
  {
      "name": "Gender",
      "fieldName": "Gender",
      "width": "100",
      "sortable": false,
      "lookupDisplay": true,
      "values": [
        "Male",
        "Female"
      ],
      "labels": [
        "<남자>",
        "<여자>"
      ],
      "editor": {
          "type": "dropdown",
          "dropDownCount": 2,
          "domainOnly": true
      },
      "header": {
          "text": "Gender",
      }
  },
  {
      "name": "MobilePhone",
      "fieldName": "MobilePhone",
      "width": "200",
      "header": {
          "text": "Mobile Phone"
      }
  },
  {
      "name": "Email",
      "fieldName": "Email",
      "type": "data",
      "width": "200",
      "header": {
          "text": "Email"
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
    dataProvider = new RealGrid.LocalDataProvider();
    gridView = new RealGrid.GridView(container);
    gridView.setDataSource(dataProvider);
  
    dataProvider.setFields(fields);
    gridView.setColumns(columns);
  
    gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    gridView.header.height = 40;
    gridView.displayOptions.rowHeight = 36;
    gridView.footer.height = 40;
    gridView.stateBar.width = 16;
    gridView.editOptions.insertable = true;
    gridView.editOptions.appendable = true;
  
    setProvider("demo_json1.json");
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
