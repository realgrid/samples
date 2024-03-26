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
    amText: "AM",
    pmText: "PM"
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
    amText: "AM",
    pmText: "PM"
  },
  {
    fieldName: "EndDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "AM",
    pmText: "PM"
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
      text: "Name"
    },
    checkded: "true"
  },
  {
    name: "Gender",
    fieldName: "Gender",
    width: "40",
    header: {
      text: "Gender"
    }
  },
  {
    name: "Age",
    fieldName: "Age",
    width: "40",
    header: {
      text: "Age"
    },
    styleName: "right-column"
  },
  {
    name: "Phone",
    fieldName: "Phone",
    width: "100",
    header: {
      text: "Phone"
    }
  },
  {
    name: "ProductId",
    fieldName: "ProductId",
    width: "120",
    header: {
      text: "Product Code"
    }
  },
  {
    name: "KorCountry",
    fieldName: "KorCountry",
    width: "100",
    header: {
      text: "Country"
    }
  },
  {
    name: "OrderDate",
    fieldName: "OrderDate",
    width: "100",
    header: {
      text: "Order Date"
    }
  },
  {
    name: "CardNumber",
    fieldName: "CardNumber",
    width: "140",
    header: {
      text: "Card No."
    }
  },
  {
    name: "Monetary",
    fieldName: "Monetary",
    width: "40",
    header: {
      text: "Monetary"
    }
  },
  {
    name: "StartDate",
    fieldName: "StartDate",
    width: "100",
    header: {
      text: "Start Date"
    }
  },
  {
    name: "EndDate",
    fieldName: "EndDate",
    width: "100",
    header: {
      text: "End Date"
    }
  },
  {
    name: "ToMonth",
    fieldName: "ToMonth",
    width: "50",
    header: {
      text: "Pay Cnt."
    },
    styleName: "right-column"
  },
  {
    name: "Month",
    fieldName: "Month",
    width: "50",
    header: {
      text: "Residuum"
    },
    styleName: "right-column"
  },
  {
    name: "InterestRate",
    fieldName: "InterestRate",
    width: "50",
    numberFormat: "0.00",
    header: {
      text: "Interest Rate"
    },
    styleName: "right-column"
  },
  {
    name: "SaveCost",
    fieldName: "SaveCost",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "Payment"
    },
    footer: {
      text: "합계 =>"
    },
    styleName: "right-column"
  },
  {
    name: "SaveMaturity",
    fieldName: "SaveMaturity",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "Save Maturity"
    },
    footer: {
      text: "합계",
      expression: "sum",
      groupExpression: "sum"
    },
    styleName: "right-column"
  },
  {
    name: "CurrentSave",
    fieldName: "CurrentSave",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "Currency Save"
    },
    styleName: "right-column"
  }
];

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
      gridView.setFocus();
    }
  }
}

var dataProvider, gridContainer, grid;

function createGrid(container) {
  RealGrid.setLocale('en');
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  gridView.displayOptions.emptyMessage = "There is no data to display.";
  gridView.displayOptions.rowHeight = 36;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.editable = true;
  gridView.editOptions.updatable = true;


  setProvider("simple_data.json");
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

function btnBeginUpdateRow() {
  var curr = gridView.getCurrent();
  gridView.beginUpdateRow(curr.itemIndex);
  gridView.showEditor();
  gridView.setFocus();
}

function btnUpdateRow() {
  gridView.commit(true);
  var curr = gridView.getCurrent();
  dataProvider.updateRow(curr.dataRow, {KorName: "수정이름", Gender: "수정", Age: 0, Phone: "수정전화번호", ProductId: "수정제품번호", KorCountry: "수정투자국가"});
}

function btnUpdateRows() {
  gridView.commit(true);
  var curr = gridView.getCurrent();
  var datas = [
    {KorName: "수정이름0", Gender: "수정0", Age: 0, Phone: "수정전화번호0", ProductId: "수정제품번호0", KorCountry: "수정투자국가0"},
    {KorName: "수정이름1", Gender: "수정1", Age: 1, Phone: "수정전화번호1", ProductId: "수정제품번호1", KorCountry: "수정투자국가1"},
    {KorName: "수정이름2", Gender: "수정2", Age: 2, Phone: "수정전화번호2", ProductId: "수정제품번호2", KorCountry: "수정투자국가2"},
    {KorName: "수정이름3", Gender: "수정3", Age: 3, Phone: "수정전화번호3", ProductId: "수정제품번호3", KorCountry: "수정투자국가3"}
  ]

  dataProvider.updateRows(curr.dataRow, datas, 0);
}

function btnUpdateRowsByDataRow() {
  gridView.commit(true);
  var curr = gridView.getCurrent();
  var datas = {
    5: {KorName: "수정이름5", Gender: "수정6", Age: 6, Phone: "수정전화번호6", ProductId: "수정제품번호6", KorCountry: "수정투자국가6"},
    7: {KorName: "수정이름8", Gender: "수정8", Age: 8, Phone: "수정전화번호8", ProductId: "수정제품번호8", KorCountry: "수정투자국가8"}
  }

  dataProvider.updateRowsByDataRow(datas);
}

function btnOnRowUpdating() {
  dataProvider.onRowUpdating = function(provider, row) {
    var item = gridView.getEditingItem(); // 현재 편집 중인 행 정보와 값을 가져옵니다.
    if (item) {
      if (item.values["Age"] <= 100) {
        setTimeout(function() {
          alert("Age must be greater than 100 !");
        }, 0);
        return false; // false를 리턴하면 DataProvider에 저장되지 않습니다.
      }
    }
    return true;
  };
}

function btnOnRowUpdated() {
  dataProvider.onRowUpdated = function(provider, row) {
    var r = provider.getJsonRow(row);
    alert(JSON.stringify(r));
  };
}