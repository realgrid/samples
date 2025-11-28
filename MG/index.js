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
      dataProvider.setRowCount(5);
      gridView.refresh();
    }
  }
}

var dataProvider, gridContainer, grid;

function createGrid(container) {

  let waiOptions = {
    title: "리얼그리드 테이블 (테이블에서 전체선택 시 Ctrl + Shift + Z 를 입력하세요)",
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
  gridView.editOptions.insertable = false;
  gridView.editOptions.appendable = false;

  gridView.editOptions.editable = true;

  gridView.editOptions.crossWhenExitLast = true;

    //*** 편집시 바로 commit 하도록 처리 
  gridView.editOptions.commitByCell = true
  gridView.editOptions.commitWhenLeave = true

  gridView.checkBar.visible = false;
  gridView.stateBar.visible = false;

  //*** 그리드의 editable이 false 이더라도 컬럼에 지정한 editable 이 우선 적용된다.
  //*** checkField 컬럼은 특수한 경우이니 컬럼의 editable: false는 그대로 두세요.
  gridView.editOptions.columnEditableFirst = true;

    //*** 그리드의 마지막이나 처음에 있을때 tab키 입력시 외부 엘리먼트로 이동
  gridView.editOptions.exitGridWhenTab = "grid";

  //*** 체크바와 checkField 컬럼 연동
  gridView.checkBar.fieldName = "checkField";   

  //*** 전체 체크 되었을때의 이벤트 처리 */
  gridView.onColumnCheckedChanged =  function (grid, column, checked) {
    grid.commit(true);
    grid.checkAll(checked, false, false, false);
  };

    ///*** 체크바 헤드 연동 처리 */
  gridView.onItemAllChecked = function (grid, checked) {
    console.log("onItemAllChecked");
    grid.columnByName("checkField").checked = checked;
  };

  gridView.onCellEdited = function (grid, itemIndex, row, field) {
      let dp = grid.getDataSource();
      //debugger;
      if (dp.getOrgFieldName(field) == 'checkField') {
        console.log("onCellEdited");
        const checkCnt = grid.getCheckedItems().length;
        const itemCnt = grid.getItemCount();

        grid.columnByName("checkField").checked = checkCnt == itemCnt;
      }
      console.log(field);
  }

  //*** 개별행 체크와 헤드의 sync 
  gridView.checkBar.syncHeadCheck = true;

  gridView.onKeyUp = function (grid, event) {
    console.log(event);
    if (event.shiftKey && event.ctrlKey && (event.code == 'KeyZ' || event.key == 'Z')) {
      let checked = grid.isAllChecked();
      //console.log(checked);
      grid.checkAll(!checked, false, false, true);
      
    }
  }


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
