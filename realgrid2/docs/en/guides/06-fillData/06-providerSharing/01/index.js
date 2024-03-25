/*eslint-disable*/

var fields = [
  {
      "fieldName": "continent",
      "dataType": "text"
  },
  {
      "fieldName": "country",
      "dataType": "text"
  },
  {
      "fieldName": "2000",
      "dataType": "number"
  },
  {
      "fieldName": "2001",
      "dataType": "number"
  },
  {
      "fieldName": "2002",
      "dataType": "number"
  },
  {
      "fieldName": "2003",
      "dataType": "number"
  },
  {
      "fieldName": "2004",
      "dataType": "number"
  },
  {
      "fieldName": "2005",
      "dataType": "number"
  },
  {
      "fieldName": "2006",
      "dataType": "number"
  },
  {
      "fieldName": "2007",
      "dataType": "number"
  },
  {
      "fieldName": "2008",
      "dataType": "number"
  },
  {
      "fieldName": "2009",
      "dataType": "number"
  },
  {
      "fieldName": "2010",
      "dataType": "number"
  }
]

var columns = [
  {
      "name": "continent",
      "fieldName": "continent",
      "width": 80,
      "header": {
          "text": "Continent"
      }
  },
  {
      "name": "country",
      "fieldName": "country",
      "width": 80,
      "header": {
          "text": "Country"
      }
  },
  {
    "name": "colSeries1",
    "type": "series",
    "fieldNames": "2000..2010",
    "renderer": {
      "type": "sparkline"
    },
    "width": 170,
    "header": {
        "text": "Spark Line",
        "styleName": "orange-column"
    },
  },
  {
    "name": "colSeries2",
    "type": "series",
    "fieldNames": "2000..2010",
    "renderer": {
      "type": "sparkcolumn"
    },
    "width": 170,
    "header": {
        "text": "Spark Column",
        "styleName": "orange-column"
    },
  },
  {
    "name": "colSeries3",
    "type": "series",
    "fieldNames": "2000..2010",
    "renderer": {
      "type": "sparkwinloss",
      "baseValue": 10,
      "belowHeight": 0.4
    },
    "width": 170,
    "header": {
        "text": "Spark Winloss",
        "styleName": "orange-column"
    }
  }
];

var columns2 = [
  {
      "name": "continent",
      "fieldName": "continent",
      "width": 80,
      "header": {
          "text": "Continent"
      }
  },
  {
      "name": "country",
      "fieldName": "country",
      "width": 80,
      "header": {
          "text": "Country"
      }
  },
  {
      "fieldName": "2000",
      "width": 50,
      "header": {
          "text": "2000"
      }
  },
  {
      "fieldName": "2001",
      "width": 50,

      "header": {
          "text": "2001"
      }
  },
  {
      "fieldName": "2002",
      "width": 50,
      "header": {
          "text": "2002"
      }
  },
  {
      "fieldName": "2003",
      "width": 50,
      "header": {
          "text": "2003"
      }
  },
  {
      "fieldName": "2004",
      "width": 50,
      "header": {
          "text": "2004"
      }
  },
  {
      "fieldName": "2005",
      "width": 50,
      "header": {
          "text": "2005"
      }
  },
  {
      "fieldName": "2006",
      "width": 50,
      "header": {
          "text": "2006"
      }
  },
  {
      "fieldName": "2007",
      "width": 50,
      "header": {
          "text": "2007"
      }
  },
  {
      "fieldName": "2008",
      "width": 50,
      "header": {
          "text": "2008"
      }
  },
  {
      "fieldName": "2009",
      "width": 50,
      "header": {
          "text": "2009"
      }
  },
  {
      "fieldName": "2010",
      "width": 50,
      "header": {
          "text": "2010"
      }
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

var dataProvider, gridContainer, gridView;
var dataProvider2, gridView2;

function createGrid(container) {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container[0]);
  gridView2 = new RealGrid.GridView(container[1]);

  gridView.setDataSource(dataProvider);
  gridView2.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);
  gridView2.setColumns(columns2);

  setProvider("series_data.json");

  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.displayOptions.rowHeight = 36;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  gridView2.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView2.displayOptions.rowHeight = 36;
  gridView2.header.height = 40;
  gridView2.footer.height = 40;
  gridView2.stateBar.width = 16;
  gridView2.editOptions.insertable = true;
  gridView2.editOptions.appendable = true;


  gridView.onTopIndexChanged = function(grid, topIndex) {
    gridView2.setTopItem(topIndex)
  }

  gridView2.onTopIndexChanged = function(grid, topIndex) {
    gridView.setTopItem(topIndex);
  }

  gridView.onCurrentChanged = function(grid, index) {
    var newIndex = {};
    var column = (index.column === "continent" || index.column === "country") ? index.column : undefined;
    if (index.itemIndex >= 0) {
        newIndex.itemIndex = index.itemIndex;
    }
    column && (newIndex.column = column);
    gridView2.setCurrent(newIndex);
  }

  gridView2.onCurrentChanged = function(grid, index) {
    var newIndex = {};
    var column = (index.column === "continent" || index.column === "country") ? index.column : undefined;
    if (index.itemIndex >= 0) {
        newIndex.itemIndex = index.itemIndex;
    }
    column && (newIndex.column = column);
    gridView.setCurrent(newIndex);
  }

  gridView.onSortingChanged = gridView2.onSortingChanged = function(grid) {
    // 이벤트 무한루프 방지.
    var preEvent = gridView.onSortingChanged;
    gridView.onSortingChanged = gridView2.onSortingChanged = null;

    var sortInfos = grid.getSortedFields();
    var fields = [];
    var dirs = [];
    if (sortInfos) {
        for (var i = 0; i < sortInfos.length; i++) {
            fields.push(sortInfos[i].orgFieldName);
            dirs.push(sortInfos[i].direction)
        }
    }
    grid === gridView ? gridView2.orderBy(fields, dirs) : gridView.orderBy(fields, dirs);

    // 이벤트 원복.
    gridView.onSortingChanged = gridView2.onSortingChanged = preEvent;
  }

}

function start() {
  createGrid(["realgrid","realgrid2"]);
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

function setValues(){
  dataProvider.setValue(0,"2000", 1);
  dataProvider.setValue(0,"2001", 3);
  dataProvider.setValue(0,"2002", 5);
  dataProvider.setValue(0,"2003", 7);
  dataProvider.setValue(0,"2004", 9);
  dataProvider.setValue(0,"2005", 10);
  dataProvider.setValue(0,"2006", 12);
  dataProvider.setValue(0,"2007", 15);
  dataProvider.setValue(0,"2008", 17);
  dataProvider.setValue(0,"2009", 19);
  dataProvider.setValue(0,"2010", 20);
}
