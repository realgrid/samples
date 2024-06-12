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
    renderer: "custom_check",
    header: {
      text: " ",
      styleName: "orange-column",
      checkLocation: "left"
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
      dataProvider.setRowCount(5);
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
  gridView.checkBar.visible = false;


  gridView.editOptions.editable = true;

  //*** 그리드의 마지막이나 처음에 있을때 tab키 입력시 외부 엘리먼트로 이동
  gridView.editOptions.exitGridWhenTab = "grid";
  gridView.setRowStyleCallback(function(grid, item, fixed) {
    if (item.index == 1) {
      grid._view._headerView._dom.querySelectorAll('input').forEach((elt) => elt.title = "  ");
    }
  })


  //*** 편집시 바로 commit 하도록 처리 
  gridView.editOptions.commitByCell = true
  gridView.editOptions.commitWhenLeave = true
  
  //*** 개별행 체크와 헤드의 sync 
  gridView.checkBar.syncHeadCheck = true;

  //*** 전체 체크 되었을때의 이벤트 처리 */
  gridView.onColumnCheckedChanged =  function (grid, column, checked) {
    grid.checkAll(checked, false, false, false);
  };

  //*** 체크바 헤드 연동 처리 */
  gridView.onItemChecked = function (grid, itemIndex, checked) {
    const checkCnt = grid.getCheckedItems().length;
    const itemCnt = grid.getItemCount();

    grid.columnByName("checkField").checked = checkCnt == itemCnt;
  };

  ///*** 체크바 헤드 연동 처리 */
  gridView.onItemAllChecked = function (grid, checked) {
    grid.columnByName("checkField").checked = checked;
  };

  //*** 커스텀 체크렌더러 등록
  gridView.registerCustomRenderer("custom_check", {
    // 화살표 함수는 사용할수 없다.
    _changeHandler: function(e) {
        // 편집상태를 취소한다.
        this.grid.cancel();
        this.grid.checkItem(this.index.itemIndex, e.target.checked, false, true);      
    },
    initContent: function(parent) {
        const check = this._check = document.createElement("input");
        check.tabIndex = -1;
        this._impl["changeHandler"] = this._impl._changeHandler.bind(this);
        check.addEventListener("change", this._impl.changeHandler);
        parent.appendChild(check);
        check.type = "checkbox";
     
    },

    // 더이상 사용되지 않을때 생성된 것들을 제거해주어야 메모리 누수를 막을수 있다.
    clearContent: function(parent ) {
        console.log("clearContent");
        this._check.removeEventListener("change", this._impl["changeHandler"])
        this._impl["changeHandler"] = null;
        // 간혹 브라우저에 따라서 parent의 하위 element가 아닌 것을 remove하려고 하면 오류가 발생하는 경우가 있다.
        this._check.parentElement && this._check.parentElement.removeChild(this._check);
        parent.innerHTML = "";
    },

    render: function(grid, model, w, h) {
        // ariaLabelCallback에서 처리하기 힘든경우 여기서 처리할수도 있다.
        // this._dom.parentElement가 HTMLTableCellElement이다.
        const rowNum = model.index.itemIndex + 2;
        this._check.checked = grid.isCheckedItem(model.index.itemIndex);
        this._dom.parentElement.setAttribute("aria-label", this._check.checked ? "선택" + rowNum + "행" : "해제" + rowNum + "행" );
    },

    // 클릭시 편집상태로 변경되고 commitByCell인 경우 commit을 하도록 하지만 여기서는 dataRowState를 변경해서는 안되기 때문에 막아준다.
    editClick: function(index, event, result) {
        // 그리드 내부 commit을 막아준다.
        result.commit = false;
        return !!result;
    },

    // 특정 element가 click되었을때 편집상태로 변경되도록 한다.
    // 편집상태가 되지 않으면 click이벤트를 preventDefault처리하기 때문에 true를 return해줘야 한다.
    canEditClickAt: function(event) {
        return event.target instanceof HTMLInputElement;
    },

    // 해당 셀의 편집가능 여부.
    canEdit: function() {
        return true;
    },

    // true를 return하면 그리드 기본동작을 하지 않는다.
    // 센스리더는 특정한 키가 입력되면 element를 다시 읽는 동작을 하다. space의 경우 대부분 선택/해제를 toggle하는 걸로 판단해서 다시 읽어준다.
    // 다른 단축키와 충돌이 발생하는지 항상 조심해야 한다.
    // space키와 ctrl, shift, alt키의 조합은 단축키로 사용될 가능성이 많은 것들이어서 사용에 주의해야 한다.
    canEditKey: function(e) {
        if (e.shiftKey && e.key === " ") {
            const allChecked = !gridView.isAllChecked();
            this.grid.checkAll(allChecked, true, true, true);
            setTimeout(() => {
                this._dom.parentElement.setAttribute("aria-label", allChecked ? "전체 선택 되었습니다" : "전체 해제 되었습니다.");
            }, 100);
            // this._dom.parentElement.setAttribute("aria-label", "전체선택되었습니다")
            e.preventDefault();
            return true;

        } else if (e.key === " ") {
            // return true;
            this._check.checked = !this._check.checked;
            this.grid.checkItem(this.index.itemIndex, this._check.checked, false, true);
            e.preventDefault();
            return true;
        }
        return false;
    }
})   

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
