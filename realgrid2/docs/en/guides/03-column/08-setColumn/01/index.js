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

var datas = [{"Field1":"Cell(0, 0)","Field2":"Cell(0, 1)","Field3":"Cell(0, 2)","Field4":"Cell(0, 3)","Field5":"Cell(0, 4)"},{"Field1":"Cell(1, 0)","Field2":"Cell(1, 1)","Field3":"Cell(1, 2)","Field4":"Cell(1, 3)","Field5":"Cell(1, 4)"},{"Field1":"Cell(2, 0)","Field2":"Cell(2, 1)","Field3":"Cell(2, 2)","Field4":"Cell(2, 3)","Field5":"Cell(2, 4)"},{"Field1":"Cell(3, 0)","Field2":"Cell(3, 1)","Field3":"Cell(3, 2)","Field4":"Cell(3, 3)","Field5":"Cell(3, 4)"},{"Field1":"Cell(4, 0)","Field2":"Cell(4, 1)","Field3":"Cell(4, 2)","Field4":"Cell(4, 3)","Field5":"Cell(4, 4)"},{"Field1":"Cell(5, 0)","Field2":"Cell(5, 1)","Field3":"Cell(5, 2)","Field4":"Cell(5, 3)","Field5":"Cell(5, 4)"},{"Field1":"Cell(6, 0)","Field2":"Cell(6, 1)","Field3":"Cell(6, 2)","Field4":"Cell(6, 3)","Field5":"Cell(6, 4)"},{"Field1":"Cell(7, 0)","Field2":"Cell(7, 1)","Field3":"Cell(7, 2)","Field4":"Cell(7, 3)","Field5":"Cell(7, 4)"},{"Field1":"Cell(8, 0)","Field2":"Cell(8, 1)","Field3":"Cell(8, 2)","Field4":"Cell(8, 3)","Field5":"Cell(8, 4)"},{"Field1":"Cell(9, 0)","Field2":"Cell(9, 1)","Field3":"Cell(9, 2)","Field4":"Cell(9, 3)","Field5":"Cell(9, 4)"}]

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
  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.header.height = 40;
  gridView.displayOptions.rowHeight = 36;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;

  gridView.setDataSource(dataProvider);

  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;


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

function btnSetColumns() {
  var fields = [{
    "fieldName": "Field1"
  },{
    "fieldName": "Field2"
  },{
    "fieldName": "Field3"
  },{
    "fieldName": "Field4"
  },{
    "fieldName": "Field5"
  }];

  dataProvider.setFields(fields);

  var columns = [{
    "name": "column1",
    "fieldName": "Field1",
    "header": {"text": "Column 1"},
    "tag": "columntag1",
    "width": 90
  },{
    "name": "column2",
    "fieldName": "Field2",
    "header": {"text": "Column 2"},
    "tag": "columntag2",
    "width": 90
  },{
    "name": "column3",
    "fieldName": "Field3",
    "header": {"text": "Column 3"},
    "tag": "columntag3",
    "width": 90
  },{
    "name": "column4",
    "fieldName": "Field4",
    "header": {"text": "Column 4"},
    "tag": "columntag4",
    "width": 90
  },{
    "name": "column5",
    "fieldName": "Field5",
    "header": {"text": "Column 5"},
    "tag": "columntag5",
    "width": 90
  },{
    "name": "column6",
    "fieldName": "Field3",
    "header": {"text": "Column 6"},
    "tag": "columntag6",
    "width": 90
  }];

  gridView.setColumns(columns);

  dataProvider.fillJsonData(datas);
}
