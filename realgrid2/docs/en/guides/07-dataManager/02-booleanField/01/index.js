/*eslint-disable*/

var fields = [
  {
      "fieldName": "Values"
  },
  {
      "fieldName": "Boolean1",
      "dataType": "boolean",
      "booleanFormat": "False,N,0:True,Y,1:0"
  },
  {
      "fieldName": "Boolean2",
      "dataType": "boolean",
      "booleanFormat": "True,N,0:False,Y,1:1"
  },
  {
      "fieldName": "Boolean3",
      "dataType": "boolean",
      "booleanFormat": "False,0:True,1:0"
  },
  {
      "fieldName": "Boolean4",
      "dataType": "boolean",
      "booleanFormat": "True,Y,1:False,N,0:0"
  },
  {
      "fieldName": "Boolean5",
      "dataType": "boolean",
      "booleanFormat": "False,N,1:True,Y,0:1"
  }
];

var columns = [
  {
      "name": "Values",
      "fieldName": "Values",
      "width": "200",
      "ignoreDefaultDynamicStyles": true,
      "header": {
          "text": "Values"
      }
  },
  {
      "name": "Boolean1",
      "fieldName": "Boolean1",
      "width": "120",
      "header": {
          "text": "Boolean 1"
      },
      "editor": {
          "booleanFormat": "거짓,f,false:참,t,true:0",
          "emptyValue": false
      },
      "booleanFormat": "거짓:참"
  },
  {
      "name": "Boolean2",
      "fieldName": "Boolean2",
      "width": "100",
      "header": {
          "text": "Boolean 2"
      },
      "editor": {
          "booleanFormat": "Falsity,False,f,false:Truth,True,t,true:1"
      },
      "booleanFormat": "Falsity:Truth:False"
  },
  {
      "name": "Boolean3",
      "fieldName": "Boolean3",
      "width": "120",
      "header": {
          "text": "Boolenan 3"
      },
      "editor": {
          "booleanFormat": "0,f,false:1,t,true:0"
      },
      "booleanFormat": "0:1"
  },
  {
      "name": "Boolean4",
      "fieldName": "Boolean4",
      "width": "120",
      "header": {
          "text": "Boolean 4"
      },
      "editor": {
          "booleanFormat": "No,f,false:Yes,t,true:0"
      },
      "booleanFormat": "No:Yes"
  },
  {
      "name": "Boolean5",
      "fieldName": "Boolean5",
      "width": "100",
      "header": {
          "text": "Boolean 5"
      },
      "editor": {
          "booleanFormat": "Male,f,false:Female,t,true:0"
      },
      "booleanFormat": "Male:Female"
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
var datas = [{"Values":"False, False, False, False, False, False","Boolean1":false,"Boolean2":true,"Boolean3":false,"Boolean4":true,"Boolean5":false},{"Values":"True, True, True, True, True, True","Boolean1":true,"Boolean2":false,"Boolean3":true,"Boolean4":false,"Boolean5":true},{"Values":"N, N, N, N, N, N","Boolean1":false,"Boolean2":false,"Boolean3":true,"Boolean4":true,"Boolean5":false},{"Values":"Y, Y, Y, Y, Y, Y","Boolean1":true,"Boolean2":true,"Boolean3":true,"Boolean4":false,"Boolean5":true},{"Values":"false, false, false, false, false, false","Boolean1":false,"Boolean2":true,"Boolean3":false,"Boolean4":true,"Boolean5":true},{"Values":"true, true, true, true, true, true","Boolean1":true,"Boolean2":true,"Boolean3":true,"Boolean4":false,"Boolean5":true},{"Values":"n, N, n, n, n, n","Boolean1":false,"Boolean2":false,"Boolean3":true,"Boolean4":true,"Boolean5":true},{"Values":"y, Y, y, y, y, y","Boolean1":true,"Boolean2":true,"Boolean3":true,"Boolean4":false,"Boolean5":true},{"Values":"1, 1, 1, 1, 0, 1","Boolean1":true,"Boolean2":true,"Boolean3":true,"Boolean4":false,"Boolean5":false},{"Values":"'', 'false', false, 'f', 0","Boolean1":false,"Boolean2":true,"Boolean3":false,"Boolean4":true,"Boolean5":false}]
  

function createGrid(container) {
  RealGrid.setLocale('en');
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
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  dataProvider.setRows(datas);
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
