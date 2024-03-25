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
    renderer: {
      type: "text"
    }
  },
  {
    name: "Gender",
    fieldName: "Gender",
    width: "40",
    header: {
      text: "성별"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "Age",
    fieldName: "Age",
    width: "40",
    header: {
      text: "나이"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "Phone",
    fieldName: "Phone",
    width: "100",
    header: {
      text: "전화번호"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "ProductId",
    fieldName: "ProductId",
    width: "120",
    header: {
      text: "제품번호"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "KorCountry",
    fieldName: "KorCountry",
    width: "100",
    header: {
      text: "투자국가"
    },
    renderer: {
      type: "text"
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
    },
    renderer: {
      type: "text"
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
      type: "text"
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
    width: "40",
    header: {
      text: "납입 횟수"
    }
  },
  {
    name: "Month",
    fieldName: "Month",
    width: "40",
    header: {
      text: "남은 횟수"
    }
  },
  {
    name: "InterestRate",
    fieldName: "InterestRate",
    width: "40",
    numberFormat: "0.00",
    header: {
      text: "이율"
    }
  },
  {
    name: "SaveCost",
    fieldName: "SaveCost",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "납입금"
    }
  },
  {
    name: "SaveMaturity",
    fieldName: "SaveMaturity",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "만기금액"
    }
  },
  {
    name: "CurrentSave",
    fieldName: "CurrentSave",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "현재잔액"
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

  setProvider("simple_data.json");

  setContextMenu(gridView);
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

var toggle = false;
function setContextMenu(grid) {
   grid.onContextMenuItemClicked = function (grid, item, clickData) { 
       if (item.tag == "excel") {
           grid.exportGrid({
               type: "excel",
               target: "local",
               fileName: "gridExportSample.xlsx"
           });
       } else if (item.tag == 'filter' && clickData.column) {
           createColumnFilter(grid, clickData.column);
       } else if (item.tag == 'visibleTrue') {
           var columns = grid.getColumns();

           for (var i in columns) {
               grid.setColumnProperty(columns[i].name, "visible", true);
           }
           toggle = false;
           setHeaderCellContextMenu(grid, toggle);
       } else if (item.tag == 'visibleFalse') {
           grid.setColumnProperty(clickData.column, "visible", false);

           toggle = true;
           setHeaderCellContextMenu(grid, toggle);
       } else if (item.tag == 'fixedCol') {
           var count = grid.layoutByColumn(clickData.column).root.vindex + 1;
           grid.setFixedOptions({ colCount: count });
       } else if (item.tag == 'fixedRow') {
           var count = clickData.itemIndex + 1;
           grid.setFixedOptions({ rowCount: count });
       } else if (item.tag == 'fixedCancel') {
           grid.setFixedOptions({ colCount: 0, rowCount: 0 });
       };
   }

   grid.onContextMenuPopup = function (grid, x, y, elementName) {
       if (elementName.cellType == 'header') {
           setHeaderCellContextMenu(grid, toggle);
       } else if (elementName.cellType == 'data') {
           setDataCellContextMenu(grid);
       } else {
           return false;
       }
   };

   setDataCellContextMenu(grid);
}

function setHeaderCellContextMenu(grid, val) {
   var contextMenu = [{
       label: '엑셀 내보내기',
       tag: 'excel'
   }, {
       label: '필터 만들기',
       tag: 'filter'
   }, {
       label: "-"
   }, {
       label: '컬럼 숨기기',
       tag: 'visibleFalse'
   }, {
       label: '컬럼 모두 보이기',
       tag: 'visibleTrue',
       enabled: val
   }];

   grid.setContextMenu(contextMenu);
}

function setDataCellContextMenu(grid) {
   var contextMenu = [{
       label: '엑셀 내보내기',
       tag: 'excel'
   }, {
       label: "-"
   }, {
       label: '열 고정',
       tag: 'fixedCol'
   }, {
       label: '행 고정',
       tag: 'fixedRow'
   }, {
       label: '고정 취소',
       tag: 'fixedCancel'
   }];

   grid.setContextMenu(contextMenu);
}

function setHeaderCellContextMenu(grid, val) {
   var contextMenu = [{
       label: '엑셀 내보내기',
       tag: 'excel'
   }, {
       label: '필터 만들기',
       tag: 'filter'
   }, {
       label: "-"
   }, {
       label: '컬럼 숨기기',
       tag: 'visibleFalse'
   }, {
       label: '컬럼 모두 보이기',
       tag: 'visibleTrue',
       enabled: val
   }];

   grid.setContextMenu(contextMenu);
}

function setDataCellContextMenu(grid) {
   var contextMenu = [{
       label: '엑셀 내보내기',
       tag: 'excel'
   }, {
       label: "-"
   }, {
       label: '열 고정',
       tag: 'fixedCol'
   }, {
       label: '행 고정',
       tag: 'fixedRow'
   }, {
       label: '고정 취소',
       tag: 'fixedCancel'
   }];

   grid.setContextMenu(contextMenu);
}

function createColumnFilter(grid, colName) {
    grid.columnByName(colName).autoFilter = true
}

