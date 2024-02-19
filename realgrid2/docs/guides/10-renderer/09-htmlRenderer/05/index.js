/*eslint-disable*/

var fields = [
  {
    fieldName: "KorName",
    dataType: "text",
  },
  {
    fieldName: "Gender",
    dataType: "text",
  },
  {
    fieldName: "Age",
    dataType: "number",
  },
  {
    fieldName: "Phone",
    dataType: "text",
  },
  {
    fieldName: "ProductId",
    dataType: "text",
  },
  {
    fieldName: "KorCountry",
    dataType: "text",
  },
  {
    fieldName: "OrderDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후",
  },
  {
    fieldName: "CardNumber",
    dataType: "text",
  },
  {
    fieldName: "Monetary",
    dataType: "text",
  },
  {
    fieldName: "StartDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후",
  },
  {
    fieldName: "EndDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후",
  },
  {
    fieldName: "ToMonth",
    dataType: "number",
  },
  {
    fieldName: "Month",
    dataType: "number",
  },
  {
    fieldName: "Year",
    dataType: "number",
  },
  {
    fieldName: "InterestRate",
    dataType: "number",
  },
  {
    fieldName: "SaveCost",
    dataType: "number",
  },
  {
    fieldName: "SaveMaturity",
    dataType: "number",
  },
  {
    fieldName: "CurrentSave",
    dataType: "number",
  },
  {
    fieldName: "BtnField"
  }
];

var columns = [
  {
    name: "KorName",
    fieldName: "KorName",
    header: {
      text: "이름"
    },
    width: "200",
    editable: false,
  },
  {
    name: "Gender",
    fieldName: "Gender",
    width: "40",
    header: {
      text: "성별"
    },
  },
  {
    name: "BtnField",
    fieldName: "BtnField",
    width: "200",
    editable: false,
    renderer: {
      type: "html",
      callback: function (grid, cell, w, h) {
        var gender = grid.getValue(cell.index.itemIndex, "Gender");
        var str = gender == '남' ? `<button onclick="BtnClicked(${cell.index.itemIndex})">남자버튼</button>`: ``;
                
        return str;
      },
    },
    header: {
      text: "버튼",
      styleName: "orange-column"
    },
  },
  {
    name: "Age",
    fieldName: "Age",
    width: "40",
    header: {
      text: "나이",
    },
    styleName: "right-column",
  },
  {
    name: "Phone",
    fieldName: "Phone",
    width: "100",
    styleName: "right-column",
    header: {
      text: "전화번호",
    },
  },
  {
    name: "ProductId",
    fieldName: "ProductId",
    width: "120",
    styleName: "right-column",
    header: {
      text: "제품번호",
    },
  },
  {
    name: "KorCountry",
    fieldName: "KorCountry",
    width: "100",
    styleName: "right-column",
    header: {
      text: "투자국가",
    },
  },
  {
    name: "OrderDate",
    fieldName: "OrderDate",
    width: "100",
    header: {
      text: "주문일자",
    },
  },
  {
    name: "CardNumber",
    fieldName: "CardNumber",
    width: "140",
    header: {
      text: "카드번호",
    },
  },
  {
    name: "StartDate",
    fieldName: "StartDate",
    width: "100",
    header: {
      text: "최초납입일",
    },
  },
  {
    name: "EndDate",
    fieldName: "EndDate",
    width: "100",
    header: {
      text: "종료일",
    },
  },
  {
    name: "ToMonth",
    fieldName: "ToMonth",
    width: "50",
    header: {
      text: "납입 횟수",
    },
    styleName: "right-column",
  },
  {
    name: "Month",
    fieldName: "Month",
    width: "50",
    header: {
      text: "남은 횟수",
    },
    styleName: "right-column",
  },
  {
    name: "InterestRate",
    fieldName: "InterestRate",
    width: "50",
    header: {
      text: "이율",
    },
    styleName: "right-column",
  },
  {
    name: "SaveCost",
    fieldName: "SaveCost",
    width: "70",
    header: {
      text: "납입금",
    },
    styleName: "right-column",
  },
  {
    name: "SaveMaturity",
    fieldName: "SaveMaturity",
    width: "120",
    header: {
      text: "만기금액",
    },
    styleName: "right-column",
  },
  {
    name: "CurrentSave",
    fieldName: "CurrentSave",
    width: "80",
    header: {
      text: "현재잔액",
    },
    styleName: "right-column",
  },
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
      //에제 데이터 설정
      dataProvider.setValue(3, "Monetary", "USD,KRW");
      dataProvider.setValue(4, "Monetary", "EUR,USD,KRW");
      dataProvider.setValue(6, "Monetary", "EUR,USD,HKD,KRW");
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
  gridView.displayOptions.rowHeight = 36;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.visible = false;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  setProvider("simple_data.json");
}

function start() {
  createGrid("realgrid");
}

// $.document.ready(start);
window.onload = start;
// domloaded를 대신 써도 됩니다.

window.onunload = function () {
  dataProvider.clearRows();

  gridView.destroy();
  dataProvider.destroy();

  gridView = null;
  dataProvider = null;
};

function BtnClicked(itemIndex) {
  alert(itemIndex + 1 + "번째 행의 남자버튼이 클릭되었습니다!");
}
