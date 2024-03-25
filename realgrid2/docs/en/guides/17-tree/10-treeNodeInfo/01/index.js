/*eslint-disable*/

var fields = [
  {
      "fieldName": "icon",
      "dataType": "number"
  },
  {
      "fieldName": "col0",
      "dataType": "text"
  },
  {
      "fieldName": "col1",
      "dataType": "number"
  },
  {
      "fieldName": "col2",
      "dataType": "number"
  },
  {
      "fieldName": "col3",
      "dataType": "number"
  },
  {
      "fieldName": "col4",
      "dataType": "number"
  },
  {
      "fieldName": "col5",
      "dataType": "number"
  },
  {
      "fieldName": "col6",
      "dataType": "number"
  },
  {
      "fieldName": "col7",
      "dataType": "number"
  }
]

var columns = [
  {
      "name": "col0",
      "fieldName": "col0",
      "type": "data",
      "width": "150",
      "header": {
          "text": "구분"
      }
  },
  {
      "name": "col1",
      "fieldName": "col1",
      "type": "data",
      "width": "80",
      "numberFormat": "#,##0",
      "header": {
          "text": "농림어업"
      }
  },
  {
      "name": "col2",
      "fieldName": "col2",
      "type": "data",
      "width": "75",
      "numberFormat": "#,##0",
      "header": {
          "text": "광업"
      }
  },
  {
      "name": "col3",
      "fieldName": "col3",
      "type": "data",
      "width": "75",
      "numberFormat": "#,##0",
      "header": {
          "text": "제조업"
      }
  },
  {
      "name": "col4",
      "fieldName": "col4",
      "type": "data",
      "width": "80",
      "numberFormat": "#,##0",
      "header": {
          "text": "건설업"
      }
  },
  {
      "name": "col5",
      "fieldName": "col5",
      "type": "data",
      "width": "130",
      "numberFormat": "#,##0",
      "header": {
          "text": "도소매, 소비자용품"
      }
  },
  {
      "name": "col6",
      "fieldName": "col6",
      "type": "data",
      "width": "90",
      "numberFormat": "#,##0",
      "header": {
          "text": "음식숙박업"
      }
  },
  {
      "name": "col7",
      "fieldName": "col7",
      "type": "data",
      "width": "120",
      "numberFormat": "#,##0",
      "header": {
          "text": "운수,창고 통신업"
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
      treeProvider.setObjectRows(data, "rows", "", "icon");
      treeView.setFocus();
    }
  }
}

var treeProvider, treeView;

function createGrid(container) {
  treeProvider = new RealGrid.LocalTreeDataProvider();
  treeView = new RealGrid.TreeView(container);

  treeView.setDataSource(treeProvider);
  treeProvider.setFields(fields);
  treeView.setColumns(columns);

  treeView.displayOptions.emptyMessage = "There is no data to display.";
  treeView.displayOptions.rowHeight = 36;
  treeView.header.height = 40;
  treeView.footer.height = 40;
  treeView.stateBar.width = 16;

  treeView.rowIndicator.displayValue = "row";
  treeView.rowIndicator.zeroBase = true;

  treeView.treeOptions.iconImagesRoot = "../../../../../public/images/flags/";
  treeView.treeOptions.iconImages = [
                "male.png",
                "female.png",
                "grd_tree_close.png",
                "grd_tree_open.png",
                "br.png",
                "de.png",
                "es.png",
                "fr.png",
                "gb.png",
                "gr.png",
                "hu.png",
                "is.png",
                "kr.png",
                "mx.png",
                "pt.png",
                "us.png",
                "ve.png",
                "br.png",
                "de.png",
                "es.png",
                "fr.png",
                "gr.png"
        
  ];

  setProvider("treedata.json");
}

function start() {
  createGrid("realgrid");
}

function getAncestors() {
    const dataRow = treeView.getCurrent().dataRow;
    const ancestors = treeProvider.getAncestors(dataRow);
    alert(ancestors);
}

function getParent() {
    const dataRow = treeView.getCurrent().dataRow;
    const parent = treeProvider.getParent(dataRow);
    alert(parent);
}

function getChildren() {
    const dataRow = treeView.getCurrent().dataRow;
    const children = treeProvider.getChildren(dataRow);
    alert(children);
}

function getDescendants() {
    const dataRow = treeView.getCurrent().dataRow;
    const descendants = treeProvider.getDescendants(dataRow);
    alert(descendants);
}


// $.document.ready(start);
window.onload = start;
// domloaded를 대신 써도 됩니다.

window.onunload = function() {
  treeProvider.clearRows();

  treeView.destroy();
  treeProvider.destroy();

  treeView = null;
  treeProvider = null;
}