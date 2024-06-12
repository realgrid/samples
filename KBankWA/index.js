/*eslint-disable*/

var fields = [
  {
    fieldName: "checkField",
    dataType: "text",
    //*** 체크 값 지정
    booleanFormat: "N:Y"
  },
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
    name: "Gender",
    fieldName: "Gender",
    width: "40",
    header: {
      text: "성별"
    }
  },
  {
    name: "checkField",
    fieldName: "checkField",
    width: "60",
    editable: false,
    renderer: {
      type: "check",
      //*** 선택/해제 했을때 값을 읽어주도록 처리
      ariaLabelCallback: function(grid, model) {
        let val = model.value;
        let s = val == 'Y' ? "선택" : "해제";

        return s
      },
      trueValues: "Y",
      falseValues: "N"
    },
    header: {
      text: " ",
      styleName: "orange-column",
      checkLocation: "left"
    }
  },
  {
    name: "Monetary",
    fieldName: "Monetary",
    width: "40",
    header: {
      text: "통화"
    },
    renderer: {
      type: "button",
      enterKey: true,
      spaceKey: true,
      //*** 버튼값을 읽어주도록 처리
      ariaLabelCallback: function(grid, model) {
        let s = model.value + "버튼";

        return s
      }
    }
  },
  {
    name: "Age",
    fieldName: "Age",
    width: "40",
    header: {
      text: "나이"
    },
    styleName: "right-column"
  },
  {
    name: "Phone",
    fieldName: "Phone",
    width: "100",
    styleName: "right-column",
    header: {
      text: "전화번호"
    }
  },
  {
    name: "ProductId",
    fieldName: "ProductId",
    width: "120",
    styleName: "right-column",
    header: {
      text: "제품번호"
    }
  },
  {
    name: "KorCountry",
    fieldName: "KorCountry",
    width: "100",
    styleName: "right-column",
    header: {
      text: "투자국가"
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
    width: "140",
    header: {
      text: "카드번호"
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
    width: "50",
    header: {
      text: "납입 횟수"
    },
    styleName: "right-column"
  },
  {
    name: "Month",
    fieldName: "Month",
    width: "50",
    header: {
      text: "남은 횟수"
    },
    styleName: "right-column"
  },
  {
    name: "InterestRate",
    fieldName: "InterestRate",
    width: "50",
    header: {
      text: "이율"
    },
    styleName: "right-column"
  },
  {
    name: "SaveCost",
    fieldName: "SaveCost",
    width: "70",
    header: {
      text: "납입금"
    },
    styleName: "right-column"
  },
  {
    name: "SaveMaturity",
    fieldName: "SaveMaturity",
    width: "120",
    header: {
      text: "만기금액"
    },
    styleName: "right-column"
  },
  {
    name: "CurrentSave",
    fieldName: "CurrentSave",
    width: "80",
    header: {
      text: "현재잔액"
    },
    styleName: "right-column"
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

  let waiOptions = {
    title: "리얼그리드 테이블 (테이블에서 엔터키로 버튼 링크등의 기능이 실행됩니다)",
    description: "${columns} 열로 이루어진 데이터 테이블입니다.",
  };
  dataProvider = new RealGrid.LocalDataProvider();
  //*** conatiner 옆 두번째, 세번째 파라미터 반드시 지정
  gridView = new RealGrid.GridView(container, true, waiOptions);

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

  gridView.editOptions.editable = false;

  //*** 그리드의 editable이 false 이더라도 컬럼에 지정한 editable 이 우선 적용된다.
  //*** checkField 컬럼은 특수한 경우이니 컬럼의 editable: false는 그대로 두세요.
  gridView.editOptions.columnEditableFirst = true;

  //*** 체크바와 checkField 컬럼 연동
  gridView.checkBar.fieldName = "checkField";   

  //*** 전체 체크 되었을때의 이벤트 처리 */
  gridView.onColumnCheckedChanged =  function (grid, column, checked) {
    grid.commit(true);
    grid.checkAll(checked, false, false, false);
  };

  setProvider("simple_data_check.json");
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
