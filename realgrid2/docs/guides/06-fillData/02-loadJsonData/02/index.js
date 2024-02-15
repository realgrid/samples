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
    width: "60",
    header: {
      text: "이름"
    }
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

var dataProvider, gridContainer, gridView;

function createGrid(container) {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);
  gridView.setDataSource(dataProvider);

  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.header.height = 40;
  gridView.displayOptions.rowHeight = 36;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  fillJsonData();
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

function fillJsonData() {
  var data = [
    {
      KorName: "박영호",
      Gender: "남",
      Age: "71",
      Phone: "(025)6563-2802",
      ProductId: "198160731-00008",
      KorCountry: "모잠비크",
      OrderDate: "2021-01-16",
      CardNumber: "5587-2139-9692-3644",
      Monetary: "EUR",
      StartDate: "2018-02-25",
      EndDate: "2021-08-12",
      ToMonth: "23",
      Month: "41",
      Year: "3",
      InterestRate: "0.15",
      SaveCost: "51000",
      SaveMaturity: "14950650",
      CurrentSave: "9304950",
      Rating: "5",
      BusinessProficiency: "59",
      Address: "서울특별시 강서구 공항동 45-89"
    },
    {
      KorName: "조일형",
      Gender: "남",
      Age: "62",
      Phone: "(093)8809-8696",
      ProductId: "571215854-00001",
      KorCountry: "캐나다",
      OrderDate: "2019-07-29",
      CardNumber: "5348-5093-3750-0623",
      Monetary: "USD",
      StartDate: "2019-10-21",
      EndDate: "2022-12-11",
      ToMonth: "3",
      Month: "37",
      Year: "3",
      InterestRate: "0.38",
      SaveCost: "14000",
      SaveMaturity: "7801080",
      CurrentSave: "1108520",
      Rating: "3",
      BusinessProficiency: "53",
      Address: "서울특별시 중구 봉래동2가 122"
    }
  ];

  dataProvider.fillJsonData(data, { fillMode: "set" });
}

function appendData() {
  var data = [
    {
      KorName: "김덕중",
      Gender: "여",
      Age: "53",
      Phone: "(064)5483-6874",
      ProductId: "149115669-00009",
      KorCountry: "캐나다",
      OrderDate: "2020-03-08",
      CardNumber: "5121-9931-3555-9853",
      Monetary: "HKD",
      StartDate: "2018-12-30",
      EndDate: "2022-01-16",
      ToMonth: "13",
      Month: "36",
      Year: "3",
      InterestRate: "0.32",
      SaveCost: "112000",
      SaveMaturity: "50480640",
      CurrentSave: "20805120",
      Rating: "3",
      BusinessProficiency: "14",
      Address: "서울특별시 양천구 신월동 115-15"
    },
    {
      KorName: "국영석",
      Gender: "남",
      Age: "63",
      Phone: "(044)7055-3032",
      ProductId: "738027655-00005",
      KorCountry: "부베 섬",
      OrderDate: "2020-05-01",
      CardNumber: "5571-3720-2975-7540",
      Monetary: "AUD",
      StartDate: "2019-08-15",
      EndDate: "2021-12-23",
      ToMonth: "5",
      Month: "28",
      Year: "2",
      InterestRate: "0.2",
      SaveCost: "84000",
      SaveMaturity: "15523200",
      CurrentSave: "4704000",
      Rating: "3",
      BusinessProficiency: "14",
      Address: "서울특별시 강남구 역삼동 707-9"
    }
  ];

  dataProvider.fillJsonData(data, { fillMode: "append", start: 0, count: 1 });
}
