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
        "type": "data",
        "width": "180",
        "sortable": false,
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
            "text": "Values/Labels"
        },
        "styleName": "orange-column"
    },
    {
        "name": "Age",
        "fieldName": "Age",
        "type": "data",
        "width": "130",
        "lookupDisplay": true,
        "labelField": "AgeLabel",
        "header": {
            "text": "Label Field"
        },
        "styleName": "orange-column"
    },
    {
        "name": "Gender",
        "fieldName": "Gender",
        "type": "data",
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
        "header": {
            "text": "Gender",
        },
        "styleName": "orange-column"
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
  
  var dataProvider, gridContainer, gridView;
  
  function createGrid(container) {
    dataProvider = new RealGrid.LocalDataProvider();
    gridView = new RealGrid.GridView(container);
    gridView.setDataSource(dataProvider);
  
    dataProvider.setFields(fields);
    gridView.setColumns(columns);
  
    gridView.displayOptions.emptyMessage = "There is no data to display.";
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
  
  function btnGetValue() {
    var focusIndex = gridView.getCurrent().itemIndex;
    var focusField = gridView.getCurrent().fieldName;
    alert(gridView.getValue(focusIndex, focusField))
  }