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
    fieldName: "OrderDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "AM",
    pmText: "PM"
  },
  {
    fieldName: "SaveCost",
    dataType: "number"
  },
  {
    fieldName: "SaveMaturity",
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
    }
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
    name: "OrderDate",
    fieldName: "OrderDate",
    width: "100",
    editor: {
      type: "date"
    },
    editButtonVisibility: "always",
    header: {
      text: "Order Date"
    }
  },
  {
    name: "SaveCost",
    fieldName: "SaveCost",
    width: "80",
    editor: {
      type: "number"
    },
    numberFormat: "#,##0",
    header: {
      text: "Payment"
    },
    styleName: "right-column"
  },
  {
    name: "SaveMaturity",
    fieldName: "SaveMaturity",
    width: "80",
    editor: {
      type: "number"
    },
    numberFormat: "#,##0",
    header: {
      text: "Save Maturity"
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

var dataProvider, gridContainer, gridView, formView;

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
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;
  gridView.formView.model.header.height = 35;


  setProvider("simple_data.json");

  formView = gridView._view.container.formView;
  formView.visible = false;
  formView.options.modal = true;
  formView.options.modalPadding = "10% 8%";
  formView.options.autoClose = true;
  formView.options.saveLabel = "저장";
  formView.options.cancelLabel = "취소";
  
  formView.model.load({
      items: [
          {
              header: "이름",
              column: "KorName"
          },
          {
              header: "성별",
              column: "Gender"
          },
          {
              header: "주문일",
              column: "OrderDate"
          },
          {
              header: "납입금",
              column: "SaveCost"
          },
          {
              header: "만기금액",
              column: "SaveMaturity"
          }
      ]
  });
}

function start() {
  createGrid("realgrid");
}

function showFormView() {
  if (gridView.getCurrent().itemIndex == -1) {
    gridView.setFocus();
  }

  formView.visible = true;
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