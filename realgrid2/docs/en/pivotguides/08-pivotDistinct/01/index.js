/*eslint-disable*/

var fields = [{
  "fieldName": "모델"
}, {
  "fieldName": "판매날짜",
  "dataType": "datetime",
  "datetimeFormat": "yyyy-MM"
}, {
  "fieldName": "판매량",
  "dataType": "number"
}, {
  "fieldName": "전월대비"
}, {
  "fieldName": "제조사"
}];


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
    }
  }
}

var pivot;
var dataProvider;
var id = "realpivot";

function createGrid(container) {
  $("body").css("font-weight","1");
  
  dataProvider = new RealGrid.LocalDataProvider();
  pivot = new RealPivot(container);
  pivot.setDataProvider(dataProvider);
  dataProvider.setFields(fields);
  pivot.setSummaryOptions({
    columnVisible:false,
    rowVisible: false,
    columnGroupVisible: false,
    rowGroupVisible: false
  });

  pivot.setDisplayOptions({
    columnHeight:40,
    rowHeight:40,
    columnWidth:60,
    blankFillValue:null,
    virtualRendering:true
  });
  
  setProvider("pivotCarData.json");

  pivot.setFieldMapping([{
      "name": "제조사",
      "sourceField": "제조사",
      "fieldHeader": "제조사",
      "valueEnable": true
  }, {
      "name": "모델",
      "sourceField": "모델",
      "fieldHeader": "모델",
      "valueEnable": true
  }, {
      "name": "판매량",
      "sourceField": "판매량",
      "fieldHeader": "판매량",
      "valueEnable": true
  }, {
      "name": "전월대비",
      "sourceField": "전월대비",
      "fieldHeader": "전월대비",
      "summaryFormat": "${value} 합",
      "valueEnable": true
  }, {
      "name": "판매년",
      "fieldHeader": "판매년",
      "sourceField": "판매날짜",
      "dateType": "year",
      "displayFormat": "${value}년",
      "valueEnable": true
  }, {
      "name": "판매분기",
      "fieldHeader": "판매분기",
      "sourceField": "판매날짜",
      "dateType": "quarter",
      "displayFormat": "${value}사분기",
      "summaryFormat": "요약",
      "valueEnable": true
  }, {
      "name": "판매월",
      "fieldHeader": "판매월",
      "sourceField": "판매날짜",
      "dateType": "month",
      "displayFormat": "${value}월",
      "valueEnable": true
  }]);

  pivot.setPivotFields({
    "columns": ["판매년", "판매분기", "판매월"],
      "rows": ["제조사", "모델"],
      "values": [{
          "name": "판매량",
          "expression": "sum"
      }, {
          "name": "전월대비",
          "expression": "distinct"
      }]
  });

  pivot.drawView();
}

function start() {
  createGrid("realpivot");
}

// $.document.ready(start);
window.onload = start;
// domloaded를 대신 써도 됩니다.

window.onunload = function() {
  dataProvider.clearRows();

  dataProvider.destroy();

  dataProvider = null;
}