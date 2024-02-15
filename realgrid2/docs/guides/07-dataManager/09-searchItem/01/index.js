/*eslint-disable*/

var fields = [
  {
      "fieldName": "국산/수입"
  },
  {
      "fieldName": "국가"
  },
  {
      "fieldName": "브랜드번호"
  },
  {
      "fieldName": "브랜드명"
  },
  {
      "fieldName": "모델번호"
  },
  {
      "fieldName": "모델명"
  },
  {
      "fieldName": "색상번호"
  },
  {
      "fieldName": "색상"
  },
  {
      "fieldName": "판매날짜",
      "dataType": "datetime",
      "datetimeFormat": "yyyy-MM-dd"
  },
  {
      "fieldName": "판매수량",
      "dataType": "number"
  },
  {
      "fieldName": "차량가격",
      "dataType": "number"
  },
  {
      "fieldName": "차종"
  },
  {
      "fieldName": "연료"
  },
  {
      "fieldName": "사진파일명"
  }
]

var columns = [
  {
      "fieldName": "국산/수입",
      "name": "국산/수입",
      "width": 60
  },
  {
      "fieldName": "국가",
      "name": "국가",
      "width": 50
  },
  {
      "fieldName": "브랜드번호",
      "name": "브랜드번호",
      "header": "브랜드\n번호",
      "width": 50
  },
  {
      "fieldName": "브랜드명",
      "name": "브랜드명",
      "width": 80
  },
  {
      "fieldName": "모델번호",
      "name": "모델번호",
      "header": {
          "text": "모델\n번호"
      },
      "width": 50
  },
  {
      "fieldName": "모델명",
      "name": "모델명",
      "width": 140
  },
  {
      "fieldName": "색상번호",
      "name": "색상번호",
      "header": {
          "text": "색상\n번호"
      },
      "width": 50,
      "editable": false
  },
  {
      "fieldName": "색상",
      "name": "색상",
      "width": 100,
      "editable": false
  },
  {
      "fieldName": "판매날짜",
      "name": "판매날짜",
      "width": 90
  },
  {
      "fieldName": "판매수량",
      "name": "판매수량",
      "header": {
          "text": "판매수량"
      },
      "width": 80,
      "footer": {
          "expression": "sum",
          "groupExpression": "sum"
      }
  },
  {
      "fieldName": "차량가격",
      "name": "판매가격",
      "header": {
          "text": "판매가격",
          "subtext": "(만원)",
      },
      "width": 80,
      "footer": {
          "expression": "sum",
          "groupExpression": "sum"
      }
  },
  {
      "fieldName": "차종",
      "name": "차종",
      "width": 60
  },
  {
      "fieldName": "연료",
      "name": "연료",
      "width": 60
  }
]

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

var dataProvider, gridContainer, gridView;

function createGrid(container) {
  dataProvider = new RealGrid.LocalDataProvider();
  dataProvider.setFields(fields);

  gridView = new RealGrid.GridView(container);
  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.header.height = 40;
  gridView.displayOptions.rowHeight = 36;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;

  gridView.setDataSource(dataProvider);
  gridView.setColumns(columns);
  setProvider("searchDemoData.json");

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
};


function gridSearch(){
  var value = document.getElementById('txtSearch').value;
  var fields = dataProvider.getOrgFieldNames();
  var startIndex = gridView.getCurrent().itemIndex;
  var startFieldIndex = fields.indexOf(gridView.getCurrent().fieldName) + 1;
  var wrap = document.querySelector('input[name="wrap"]:checked').value;
  var caseSensitive = document.querySelector('input[name="case"]:checked').value;
  var partialMatch = document.querySelector('input[name="partial"]:checked').value
  
  var options = {
    fields : fields,
    value : value,
    startIndex : startIndex,
    startFieldIndex : startFieldIndex,
    wrap : wrap,
    caseSensitive : caseSensitive,
    partialMatch : partialMatch
  };

  var index = gridView.searchCell(options);
  gridView.setCurrent(index);
}