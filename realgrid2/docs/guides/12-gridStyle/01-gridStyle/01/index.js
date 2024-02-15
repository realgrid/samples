/*eslint-disable*/

var fields = [
    {
      fieldName: "KorName",
      dataType: "text"
    },
    {
      fieldName: "Gender",
      dataType: "text"
    },
    {
      fieldName: "Age",
      dataType: "number"
    },
    {
      fieldName: "Phone",
      dataType: "text"
    },
    {
      fieldName: "ProductId",
      dataType: "text"
    },
    {
      fieldName: "KorCountry",
      dataType: "text"
    },
    {
      fieldName: "OrderDate",
      dataType: "datetime",
      datetimeFormat: "yyyy-MM-dd",
      amText: "오전",
      pmText: "오후"
    },
    {
      fieldName: "CardNumber",
      dataType: "text"
    },
    {
      fieldName: "Monetary",
      dataType: "text"
    },
    {
      fieldName: "StartDate",
      dataType: "datetime",
      datetimeFormat: "yyyy-MM-dd",
      amText: "오전",
      pmText: "오후"
    },
    {
      fieldName: "EndDate",
      dataType: "datetime",
      datetimeFormat: "yyyy-MM-dd",
      amText: "오전",
      pmText: "오후"
    },
    {
      fieldName: "ToMonth",
      dataType: "number"
    },
    {
      fieldName: "Month",
      dataType: "number"
    },
    {
      fieldName: "Year",
      dataType: "number"
    },
    {
      fieldName: "InterestRate",
      dataType: "number"
    },
    {
      fieldName: "SaveCost",
      dataType: "number"
    },
    {
      fieldName: "SaveMaturity",
      dataType: "number"
    },
    {
      fieldName: "CurrentSave",
      dataType: "number"
    }
  ];
  
  var columns = [
    {
      name: "KorName",
      fieldName: "KorName",
      width: "70",
      header: {
        text: "이름"
      }
    },
    {
      name: "Gender",
      fieldName: "Gender",
      width: "55",
      header: {
        text: "성별"
      },
      styleCallback: function(grid,dataCell){
        var ret = {}
        ret.styleName = "orange-column"
        ret.editable = false;
        ret.prefix = "<";
        ret.suffix = ">";

        if(dataCell.value == '남'){
          return ret;
        }
      }
    },
    {
      name: "Age",
      fieldName: "Age",
      width: "55",
      header: {
        text: "나이"
      }
    },
    {
      name: "Phone",
      fieldName: "Phone",
      width: "130",
      header: {
        text: "전화번호"
      },
      styleName:"orange-column"
    },
    {
      name: "ProductId",
      fieldName: "ProductId",
      width: "150",
      header: {
        text: "제품번호"
      }
    },
    {
      name: "KorCountry",
      fieldName: "KorCountry",
      width: "100",
      header: {
        text: "투자국가",
        styleName: "orange-column"
      }
    },
    {
      name: "OrderDate",
      fieldName: "OrderDate",
      width: "100",
      header: {
        text: "주문일자"
      }
    },
    {
      name: "CardNumber",
      fieldName: "CardNumber",
      width: "170",
      header: {
        text: "카드번호"
      },
      styleName: "blue-column cursor"
    },
    {
      name: "Monetary",
      fieldName: "Monetary",
      width: "40",
      header: {
        text: "통화"
      }
    },
    {
      name: "StartDate",
      fieldName: "StartDate",
      width: "100",
      header: {
        text: "최초납입일"
      }
    },
    {
      name: "EndDate",
      fieldName: "EndDate",
      width: "100",
      header: {
        text: "종료일"
      }
    },
    {
      name: "ToMonth",
      fieldName: "ToMonth",
      width: "40",
      header: {
        text: "납입 횟수"
      }
    },
    {
      name: "Month",
      fieldName: "Month",
      width: "40",
      header: {
        text: "남은 횟수"
      }
    },
    {
      name: "InterestRate",
      fieldName: "InterestRate",
      width: "40",
      numberFormat: "0.00",
      header: {
        text: "이율"
      }
    },
    {
      name: "SaveCost",
      fieldName: "SaveCost",
      width: "80",
      numberFormat: "#,##0",
      header: {
        text: "납입금"
      }
    },
    {
      name: "SaveMaturity",
      fieldName: "SaveMaturity",
      width: "80",
      numberFormat: "#,##0",
      header: {
        text: "만기금액"
      }
    },
    {
      name: "CurrentSave",
      fieldName: "CurrentSave",
      width: "80",
      numberFormat: "#,##0",
      header: {
        text: "현재잔액"
      }
    }
  ];
  
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
    gridView.setDataSource(dataProvider);
    gridView.setColumns(columns);
    setProvider("simple_data.json");
  
    gridView.editOptions.insertable = true;
    gridView.editOptions.appendable = true;

    gridView.setFooter({styleName:"orange-column"});
  
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