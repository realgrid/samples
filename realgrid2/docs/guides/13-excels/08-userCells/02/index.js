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
    fieldName: "Address",
    dataType: "text"
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
      width: "60",
    header: {
      text: "이름"
    },
  },
  {
    name: "Gender",
    fieldName: "Gender",
      width: "40",
    header: {
      text: "성별"
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
    name: "Address",
    fieldName: "Address",
      width: "200",
    header: {
      text: "주소"
    },
    styleName: "left-column"
  },
  {
    name: "Phone",
    fieldName: "Phone",
      width: "100",
    header: {
      text: "전화번호"
    }
  },
  {
    name: "ProductId",
    fieldName: "ProductId",
      width: "120",
    header: {
      text: "제품번호"
    }
  },
  {
    name: "KorCountry",
    fieldName: "KorCountry",
      width: "100",
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
    numberFormat: "0.00",
    header: {
      text: "이율"
    },
    styleName: "right-column"
  },
  {
    name: "SaveCost",
    fieldName: "SaveCost",
      width: "80",
    numberFormat: "#,##0",
    header: {
      text: "납입금"
    },
    styleName: "right-column"
  },
  {
    name: "SaveMaturity",
    fieldName: "SaveMaturity",
      width: "80",
    numberFormat: "#,##0",
    header: {
      text: "만기금액"
    },
    styleName: "right-column"
  },
  {
    name: "CurrentSave",
    fieldName: "CurrentSave",
      width: "80",
    numberFormat: "#,##0",
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
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container, true);

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.displayOptions.rowHeight = 30;
  gridView.header.height = 50;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;



  var layout = [
      "KorName",
      {
          name: "PersonalInfo",
          direction: "vertical",
          width: 200,
          items: [
              {
                  name: "info1",
                  direction: "horizontal",
                  hideChildHeaders: true,
                  items: [
                      "Gender", 
                      "Age"
                      //{name: "Gender", width: 100},
                      //{name: "Age", width: 100}
                  ],
                  header: {
                      text: "성별/나이",
                      visible: false
                  }
              }, 
              "Address"
          ],
          header: {
              text: "인적정보"
          }
      },
      "Phone",
      "ProductId"
  ]

 // gridView.setColumnLayout(layout);

  setProvider("simple_data.json");


}

function start() {
  createGrid("realgrid");
}

function excelExport() {
  var userCells = [
    { row: 0, col: 0, value: "사용자 입력문자열" },
    { row: 1, col: 0, styleName: "orangeFontColor", value: "스타일을 적용" },
    {
      row: 2,
      col: 0,
      mergeRow: 1,
      mergeCol: 3,
      styleName: "orangeFontColor",
      value: "merge를 하고 스타일을 적용.",
    },
    {
      row: 3,
      col: 0,
      mergeRow: 2,
      mergeCol: 3,
      value: "inline-style",
      styles: { background: "red", fontSize: "20px" },
    },
    {
      row: 5,
      col: 1,
      value: 12345,
      format: "#,##0.0_ ",
      styles: { textAlign: "right" },
    },
    {
      row: 5,
      col: 4,
      value: new Date(2022, 4, 16),
      format: "[$-F800]dddd, mmmm dd, yyyy",
      styles: { textAlign: "center" },
    },
  ];
  gridView.exportGrid({
    type: "excel",
    target: "local",
    yOffset: 6,
    userCells: userCells,
  });
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