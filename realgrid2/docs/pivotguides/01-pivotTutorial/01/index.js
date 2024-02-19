/*eslint-disable*/

var pivot;
var dataProvider;
var id = "realpivot";
var step = 1;

function createGrid(container) {
  $("body").css("font-weight","1");
  $('#btnStep2').hide();
  $('#btnStep3').hide();
  $('#btnStep4').hide();

  $('#btnStep1').click(function() {
    if(step == 1){
      dataProvider = new RealGrid.LocalDataProvider();
      pivot = new RealPivot("realpivot");
      pivot.setDataProvider(dataProvider);
      pivot.drawView();
      $("#btnStep1").css("background-color","silver");
      $('#btnStep2').show();
      step++
    }else {
      alert("STEP " + step + ". 을 진행해 주세요.")
    }
  });

  $('#btnStep2').click(function() {
    if(step == 2){
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

      dataProvider.setFields(fields);

      pivot.setFieldMapping([{
          name: "국가",
          sourceField: "국가",
          valueEnable: false
      },{
          name: "브랜드명",
          sourceField: "브랜드명",
          valueEnable: false
      },{
          name: "판매분기",
          sourceField: "판매날짜",
          dateType:"quarter",
          fieldHeader:"판매분기",
          displayFormat: "${value}사분기",
          summaryFormat: "요약",
          valueEnable: false
      },{
          name: "판매년도",
          sourceField: "판매날짜",
          dateType: "year",
          fieldHeader: "판매년도",
          displayFormat: "${value}년도",
          summaryFormat: "요약",
          valueEnable: false
      },{
          name: "판매월",
          sourceField: "판매날짜",
          dateType: "month",
          fieldHeader: "판매월",
          displayFormat: "${value}월",
          summaryFormat: "요약",
          valueEnable: false
      },{
          name: "판매일",
          sourceField: "판매날짜",
          dateType: "day",
          fieldHeader: "판매일",
          displayFormat: "${value}일",
          summaryFormat: "요약",
          valueEnable: false
      },{
          name: "판매주",
          sourceField: "판매날짜",
          dateType: "weekofmonth",
          fieldHeader: "판매월주차",
          displayFormat: "${value}주차",
          summaryFormat: "요약",
          valueEnable: false
      },{
          name: "half",
          sourceField: "판매날짜",
          dateType: "half",
          fieldHeader: "판매반기",
          displayFormat: "${value}주",
          summaryFormat: "요약",
          valueEnable: false
      },{
          name: "weekofyear",
          sourceField: "판매날짜",
          dateType: "weekofyear",
          fieldHeader: "판매연주차",
          displayFormat: "${value}주",
          summaryFormat: "요약",
          valueEnable: false
      },{
          name: "판매수량",
          sourceField: "판매수량",
          numberFormat:"#,##0",
          labelEnable: false
      },{
          name: "차량가격",
          sourceField: "차량가격",
          numberFormat:"#,##0",
          labelEnable: false
      },{
          name:"차종",
          sourceField:"차종",
          valueEnable: false
      },{
          name:"연료",
          sourceField:"연료",
          valueEnable: false
      }]);

      pivot.setPivotFields({
          columns: ["판매분기","판매월"],
          rows: ["브랜드명","차종"],
          values: [{
              name: "차량가격",
              expression: "sum"
          }, {
              name: "판매수량",
              expression: "sum"
          }]
      });

      pivot.drawView();
      $("#btnStep2").css("background-color","silver");
      $('#btnStep3').show();
      step++
    }else {
      alert("STEP " + step + ". 을 진행해 주세요.")
    }
  });

  $('#btnStep3').click(function() {    
    if(step == 3){
      $.ajax({
          url: "/public/data/pivotDataSet.json",
          success: function (data) {
              dataProvider.fillJsonData(data,{count:5000});
          },
          complete: function(data){
            $("#btnStep3").css("background-color","silver");
          }
      });
    }
  });
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
