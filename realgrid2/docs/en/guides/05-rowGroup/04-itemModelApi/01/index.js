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
    },
    checkded: "true"
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
      text: "만기금액"
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
      text: "현재잔액"
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
      gridView.refresh();
    }
  }
}

var dataProvider, gridContainer, grid;

function createGrid(container) {
  RealGrid.setLocale('en');
  dataProvider = new RealGrid.LocalDataProvider();
  dataProvider.setFields(fields);

  gridView = new RealGrid.GridView(container);
  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.header.height = 40;
  gridView.displayOptions.rowHeight = 36;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;

  gridView.setDataSource(dataProvider);
  gridView.setColumns(columns);
  setProvider("simple_data.json");

  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  setRowGroup(gridView);
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

function setRowGroup(grid) {
  grid.groupPanel.visible = true
}

function btnGetModel() {
  var extended = document.getElementById("chkExtendedModel").checked;
  var itemIndex = gridView.getCurrent().itemIndex;
  var item = gridView.getModel(itemIndex, extended);
  alert(JSON.stringify(item));
}

function btnGetParentModel() {
  var extended = document.getElementById("chkExtendedModel").checked;
  var idx = gridView.getCurrent();
  var item = gridView.getModel(idx.itemIndex);
  var parent = gridView.getParentModel(item, extended);
  alert(JSON.stringify(item));
  if (parent) {
    idx.itemIndex = parent.itemIndex;
    gridView.setCurrent(idx);
  }
}

function btnGetRootModel() {
  var extended = document.getElementById("chkExtendedModel").checked;
  var idx = gridView.getCurrent();
  var item = gridView.getModel(idx.itemIndex);
  var root = gridView.getRootModel(item, extended);
  alert(JSON.stringify(root));
  if (root) {
    idx.itemIndex = root.itemIndex;
    gridView.setCurrent(idx);
  }
}

function btnGetChildModels() {
  var extended = document.getElementById("chkExtendedModel").checked;
  var itemIndex = gridView.getCurrent().itemIndex;
  var item = gridView.getModel(itemIndex);
  if (item) {
    var children = gridView.getChildModels(item, extended);
    alert(JSON.stringify(children));
  }
}

function btnGetChildModel() {
  var extended = document.getElementById("chkExtendedModel").checked;
  var itemIndex = gridView.getCurrent().itemIndex;
  var group = gridView.getModelAs(itemIndex, "group");
  if (group && group.count > 0) {
    var item = gridView.getChildModel(group, 0, extended);
    alert(JSON.stringify(item));
  }
}

function btnGetModels() {
  var extended = document.getElementById("chkExtendedModel").checked;
  var items = gridView.getModels([0, 1, 2], extended);
  var s = JSON.stringify(items);
  alert(JSON.stringify(s));
}

function btnGetModelOfRow() {
  var extended = document.getElementById("chkExtendedModel").checked;
  var row = gridView.getCurrent().dataRow;
  var item = gridView.getModelOfRow(row, extended);
  alert(JSON.stringify(item));
}

function btnGetModelsOfRows() {
  var extended = document.getElementById("chkExtendedModel").checked;
  var items = gridView.getModelsOfRows([0, 1, 2], extended);
  var s = JSON.stringify(items);
  alert(JSON.stringify(s));
}

function btnGetGroupSummary() {
  var idx = gridView.getCurrent();
  var item = gridView.getModelAs(idx.itemIndex, "row");

  if (item) {
    var group = gridView.getParentModel(item);

    if (group && idx.fieldIndex >= 0) {
      var summary = gridView.getGroupSummary(group, idx.fieldIndex);
      if (summary) {
        alert(JSON.stringify(summary));
      }
    }
  }
}

function btnExpandModel() {
  var recursive = false;
  var force = false;
  var itemIndex = gridView.getCurrent().itemIndex;
  var group = gridView.getModelAs(itemIndex, "group");
  if (group) {
    gridView.expandModel(group, recursive, force);
  }
}

function btnCollapseModel() {
  var recursive = false;
  var itemIndex = gridView.getCurrent().itemIndex;
  var group = gridView.getModelAs(itemIndex, "group");
  if (group) {
    gridView.collapseModel(group, recursive);
  }
}
