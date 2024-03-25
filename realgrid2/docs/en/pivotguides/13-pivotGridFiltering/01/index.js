/*eslint-disable*/

var fields = [{
  fieldName:"국산/수입"
},{
  fieldName:"국가"
},{
  fieldName:"브랜드번호"
},{
  fieldName:"브랜드명"
},{
  fieldName:"모델번호"
},{
  fieldName:"모델명"
},{
  fieldName:"색상번호"
},{
  fieldName:"색상"
},{
  fieldName:"판매날짜",
  dataType:"datetime",
  datetimeFormat:"yyyy-MM-dd"
},{
  fieldName:"판매수량",
  dataType:"number"
},{
  fieldName:"차량가격",
  dataType:"number"
},{
  fieldName:"차종"
},{
  fieldName:"연료"
}];

var columns = [{
  name: "국산/수입",
  fieldName: "국산/수입",
  width: 100,
  header: {
      text: "국산/수입"
  }
},{
  name: "국가",
  fieldName: "국가",
  width: 70,
  header: {
      text: "국가",
      styleName: "orange-column"
  }
},{
  name: "브랜드번호",
  fieldName: "브랜드번호",
  width: 70,
  header: {
      text: "브랜드번호"
  },
  styles: {
      numberFormat:"#,##0",
      textAlignment:"far"
  }
},{
  name: "브랜드명",
  fieldName: "브랜드명",
  width: 100,
  header: {
      text: "브랜드명",
      styleName: "orange-column"
  }
},{
  name: "차종",
  fieldName: "차종",
  width: 100,
  header: {
      text: "차종",
      styleName: "orange-column"
  }
},{
  name: "모델번호",
  fieldName: "모델번호",
  width: 70,
  header: {
      text: "모델번호"
  },
  styles: {
      numberFormat:"#,##0",
      textAlignment:"far"
  }
},{
  name: "모델명",
  fieldName: "모델명",
  width: 150,
  header: {
      text: "모델명"
  }
},{
  name: "색상번호",
  fieldName: "색상번호",
  width: 70,
  header: {
      text: "색상번호"
  },
  styles: {
      numberFormat:"#,##0",
      textAlignment:"far"
  }
},{
  name: "색상",
  fieldName: "색상",
  width: 100,
  header: {
      text: "색상"
  }
},{
  name: "판매날짜",
  fieldName: "판매날짜",
  width: 100,
  header: {
      text: "판매날짜"
  }
},{
  name: "판매수량",
  fieldName: "판매수량",
  width: 70,
  header: {
      text: "판매수량"
  },
  styles: {
      numberFormat:"#,##0",
      textAlignment:"far"
  }
},{
  name: "차량가격",
  fieldName: "차량가격",
  width: 100,
  header: {
      text: "차량가격"
  },
  styles: {
      numberFormat:"#,##0",
      textAlignment:"far"
  }
},{
  name: "연료",
  fieldName: "연료",
  width: 100,
  header: {
      text: "연료"
  }
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
      gridView.refresh();
    }
  }
}

var pivot;
var dataProvider, gridView;
var id = "realpivot";

function createGrid(gridContainer, pivotContainer) {
  $("body").css("font-weight","1");

  dataProvider = new RealGrid.LocalDataProvider();
  dataProvider.setFields(fields);

  gridView = new RealGrid.GridView(gridContainer);
  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.header.height = 40;
  gridView.displayOptions.rowHeight = 36;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;

  gridView.setDataSource(dataProvider);
  gridView.setColumns(columns);
  gridView.setEditOptions({editable:false})
  gridView.setFilteringOptions({handleVisibility:"hidden"});
  setProvider("pivotDataSet.json");

  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;
  
  pivot = new RealPivot(pivotContainer);
  pivot.setDataProvider(dataProvider);

  pivot.onDblClick = function (pivot, type, index) {
    var colNames = gridView.getColumnNames()

    for(var j = 0; j < colNames.length; j++){
        gridView.clearColumnFilters(colNames[j])
    }

    //rowLabel 값 필터링
    for(var i = 0; i < Object.keys(index.rows).length; i++){
        if(Object.keys(index.rows)[i] !== "__sum"){
            var filters = [{
                name: Object.keys(index.rows)[i],
                criteria: "value = '" + index.rows[Object.keys(index.rows)[i]] + "'",
                active:true
            }];

            gridView.setColumnFilters(Object.keys(index.rows)[i], filters);
        }else{
        }
    }
  }
 
  pivot.setFieldMapping([{
    "name": "국가",
    "sourceField": "국가",
    "valueEnable": false
},{
    "name": "브랜드명",
    "sourceField": "브랜드명",
    "valueEnable": false
},{
    "name": "판매분기",
    "sourceField": "판매날짜",
    "dateType":"quarter",
    "fieldHeader":"판매분기",
    "displayFormat": "${value}사분기",
    "summaryFormat": "요약",
    "valueEnable": false
},{
    "name": "판매년도",
    "sourceField": "판매날짜",
    "dateType": "year",
    "fieldHeader": "판매년도",
    "displayFormat": "${value}년도",
    "summaryFormat": "요약",
    "valueEnable": false
},{
    "name": "판매월",
    "sourceField": "판매날짜",
    "dateType": "month",
    "fieldHeader": "판매월",
    "displayFormat": "${value}월",
    "summaryFormat": "요약",
    "valueEnable": false
},{
    "name": "판매일",
    "sourceField": "판매날짜",
    "dateType": "day",
    "fieldHeader": "판매일",
    "displayFormat": "${value}일",
    "summaryFormat": "요약",
    "valueEnable": false
},{
    "name": "판매주",
    "sourceField": "판매날짜",
    "dateType": "weekofmonth",
    "fieldHeader": "판매월주차",
    "displayFormat": "${value}주차",
    "summaryFormat": "요약",
    "valueEnable": false
},{
    "name": "half",
    "sourceField": "판매날짜",
    "dateType": "half",
    "fieldHeader": "판매반기",
    "displayFormat": "${value}주",
    "summaryFormat": "요약",
    "valueEnable": false
},{
    "name": "weekofyear",
    "sourceField": "판매날짜",
    "dateType": "weekofyear",
    "fieldHeader": "판매연주차",
    "displayFormat": "${value}주",
    "summaryFormat": "요약",
    "valueEnable": false
},{
    "name": "판매수량",
    "sourceField": "판매수량",
    "numberFormat":"#,##0",
    "labelEnable": false
},{
    "name": "차량가격",
    "sourceField": "차량가격",
    "numberFormat":"#,##0",
    "labelEnable": false
},{
    "name":"차종",
    "sourceField":"차종",
    "valueEnable": false
},{
    "name":"연료",
    "sourceField":"연료",
    "valueEnable": false
}, {
    "name": "판매날짜",
    "fieldHeader": "판매날짜",
    "sourceField": "판매날짜",
    "dateType": "custom",
    "dateFormat":"yyyy-MM-dd"
}]);

  pivot.setPivotFields({
      "columns": ["판매년도","판매월"],
      "rows": ["국가","브랜드명","차종"],
      "values": [{
          "name": "차량가격",
          "expression": "sum"
      }, {
          "name": "판매수량",
          "expression": "sum"
      }]
  });


  pivot.drawView();
}

function start() {
  createGrid("realgrid", "realpivot");
}

// $.document.ready(start);
window.onload = start;
// domloaded를 대신 써도 됩니다.

window.onunload = function() {
  dataProvider.clearRows();

  dataProvider.destroy();

  dataProvider = null;
}


function btnDrawPivot(){
  pivot.buildPivot();
}