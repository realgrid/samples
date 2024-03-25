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
  httpRequest.open("GET", "/public/data/en/" + filename);
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
  pivot.setDisplayOptions({columnHeight:40,rowHeight:40,columnWidth:60,blankFillValue:null,virtualRendering:true, showFocus:true});
  pivot.setHeaderOptions({formType:"grid"});
  setProvider("pivotCarData.json");

  pivot.onCurrentChanged = function (grid, index) {

    var attrs = Object.keys(index.columns);
    var level = attrs.filter(function (item) { return item == "__sum" || item == "valueField" ? false : true; }).length;

    if(level == 0){
      level = 1
    } 

    var columnLabels = pivot.getColumnLabels();
    var columnList = getLevelLabels(columnLabels, 1, level)

    var vals = []
    var len = Object.keys(pivot.getRowValues("판매량", index.rows).descendants).length;
    for (var i = 0; i < len; i++){
        if(Object.keys(pivot.getRowValues("판매량", index.rows).descendants)[i].split(":::").length == level){
            var key = Object.keys(pivot.getRowValues("판매량", index.rows).descendants)[i];
            vals.push(pivot.getRowValues("판매량", index.rows).descendants[key])
        }
    }

    setHighChart(dataProvider, vals, index, columnList);
  }

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

function getLevelLabels(columnChilds, level, targetLevel) {
    var list = [];
    for (var i = 0, len = columnChilds.length; i < len; i++) {
        if(level == targetLevel){
            list.push(columnChilds[i].label)
        } else if(level < targetLevel && columnChilds[i].hasOwnProperty("childs")) {
            var levelLabels = getLevelLabels(columnChilds[i].childs, level + 1, targetLevel)
            list.push.apply(list, levelLabels);
        }
    }
    return list;
}

function setHighChart(provider, vals, index, columnList) {
  var subtitle;

  if(Object.keys(index.rows)[0] == "__sum"){
      subtitle = "전체 요약"
  } else if(index.rows.모델){
      subtitle = index.rows.모델
  } else {
      subtitle = index.rows.제조사
  } 

  var categories = provider.getFieldValues("판매날짜");
  var diVal = provider.getFieldValues("판매량");
  $.each(diVal, function (k, v) {
      if (v == undefined)
          diVal[k] = null;
  });

  $('#container').highcharts({
      title: {
          text: '차량 판매 실적',
          x: -20
      },
      subtitle: {
          text: subtitle,
          x: -20
      },
      xAxis: {
          categories: columnList,
          crosshair: true
      },
      yAxis: [{
          title: {
              text: '단위(대)'
          },
          labels: {
              format: '{value}'
          }
      }],
      tooltip: {
          shared: true // 한 로우에 여러 컬럼의 값을 표시
      },
      legend: {
          enabled : false
      },
      series: [{
          name: "판매량",
          data: vals,
          tooltip: {
              valueSuffix: "대"
          }
      }],
      chart: {
          type: 'column',
          events: {
          }
      }
  });
}