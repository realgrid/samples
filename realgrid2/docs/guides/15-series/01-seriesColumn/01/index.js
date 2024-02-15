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
    "name": "colSeries",
    "type": "series",
    "fieldNames": "2000,2001,2002,2003,2004",
    "width": 170,
    "header": {
        "text": "Series(2000~2004)",
        "styleName": "orange-column"
    },
  },
  {
    "name": "colSeries1",
    "type": "series",
    "fieldNames": "2005..2010",
    "renderer": {
        "valueSeparator": " | "
    },
    "width": 170,
    "header": {
        "text": "Series(2005~2010)",
        "styleName": "orange-column"
    },
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

var dataProvider, gridContainer, grid;

function createGrid(container) {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.displayOptions.rowHeight = 50;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;



  setProvider("series_data.json");
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