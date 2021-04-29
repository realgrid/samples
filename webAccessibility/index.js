/*eslint-disable*/

var fields = [{
  fieldName: "id"
}, {
  fieldName: "column1"
}, {
  fieldName: "column2"
}, {
  fieldName: "column3"
}, {
  fieldName: "column4"
}, {
  fieldName: "column5"
}, {
  fieldName: "column6"
}, {
  fieldName: "column7",
  dataType: "number"
}];

var columns = [{
  name: "column1",
  fieldName: "column1",
  width: "250",
  header: {
    text: "내역사업"
  }
}, {
  name: "column2",
  fieldName: "column2",
  width: "120",
  header: {
    text: "재무문서"
  }
}, {
  name: "column3",
  fieldName: "column3",
  width: "100",
  header: {
    text: "진행단계"
  }
}, {
  name: "column4",
  fieldName: "column4",
  width: "150",
  header: {
    text: "분류1"
  }
}, {
  name: "column5",
  fieldName: "column5",
  width: "150",
  header: {
    text: "분류2"
  }
}, {
  name: "column6",
  fieldName: "column6",
  width: "150",
  header: {
    text: "사업기간"
  }
}, {
  name: "column7",
  fieldName: "column7",
  width: "150",
  numberFormat: "#,##0",
  header: {
    text: "당해년도사업비"
  }
}];

var fields1 = [{
  fieldName: "id"
}, {
  fieldName: "column1"
}, {
  fieldName: "column2"
}, {
  fieldName: "column3"
}, {
  fieldName: "column4"
}, {
  fieldName: "column5"
}, {
  fieldName: "column6"
}, {
  fieldName: "column7"
}, {
  fieldName: "column8"
}];

var columns1 = [{
  name: "column1",
  fieldName: "column1",
  width: "150",
  header: {
    text: "보조사업"
  }
}, {
  name: "column2",
  fieldName: "column2",
  width: "80",
  header: {
    text: "보조사업체수"
  }
}, {
  name: "column3",
  fieldName: "column3",
  width: "80",
  header: {
    text: "수행기관"
  }
}, {
  name: "column4",
  fieldName: "column4",
  width: "100",
  header: {
    text: "사업기간"
  }
}, {
  name: "column5",
  fieldName: "column5",
  width: "50",
  header: {
    text: "입력"
  }
}, {
  name: "column6",
  fieldName: "column6",
  width: "50",
  header: {
    text: "기본"
  }
}, {
  name: "column7",
  fieldName: "column7",
  width: "50",
  header: {
    text: "상세"
  }
}, {
  name: "column8",
  fieldName: "column8",
  width: "150",
  header: {
    text: "보조사업ID"
  }
}];


var masterData = [
  ["1", "내역사업1", "재무문서1", "검토완료", "분류1", "분류1", "2021-01-01~2021-12-31", 15000000000],  
  ["2", "내역사업2", "재무문서2", "검토완료", "분류2", "분류2", "2021-01-01~2021-12-31",  5000000000],  
  ["3", "내역사업3", "재무문서3", "검토완료", "분류3", "분류3", "2021-01-01~2021-12-31",  2100000000],  
  ["4", "내역사업4", "재무문서4", "검토완료", "분류4", "분류4", "2021-01-01~2021-12-31", 15000000000],
  ["5", "내역사업5", "재무문서5", "검토완료", "분류5", "분류5", "2021-01-01~2021-12-31",    40000000]
];

var detailData = [
  {id: "1", column1: "보조사업1-1", column2: "1-1", column3: "수행기관1-1", column4: "2021-01-01", column5: "입력1", column6: "기본1", column7: "상세1", column8: "2011220000000001"},
  {id: "1", column1: "보조사업1-2", column2: "1-2", column3: "수행기관1-2", column4: "2021-01-02", column5: "입력2", column6: "기본2", column7: "상세2", column8: "2011220000000001"},
  {id: "1", column1: "보조사업1-3", column2: "1-3", column3: "수행기관1-3", column4: "2021-01-03", column5: "입력3", column6: "기본3", column7: "상세3", column8: "2011220000000001"},
  {id: "1", column1: "보조사업1-4", column2: "1-4", column3: "수행기관1-4", column4: "2021-01-04", column5: "입력4", column6: "기본4", column7: "상세4", column8: "2011220000000001"},
  {id: "1", column1: "보조사업1-5", column2: "1-5", column3: "수행기관1-5", column4: "2021-01-05", column5: "입력5", column6: "기본5", column7: "상세5", column8: "2011220000000001"},
  {id: "1", column1: "보조사업1-6", column2: "1-6", column3: "수행기관1-6", column4: "2021-01-06", column5: "입력6", column6: "기본6", column7: "상세6", column8: "2011220000000001"},
  {id: "1", column1: "보조사업1-7", column2: "1-7", column3: "수행기관1-7", column4: "2021-01-07", column5: "입력7", column6: "기본7", column7: "상세7", column8: "2011220000000001"},
  {id: "1", column1: "보조사업1-8", column2: "1-8", column3: "수행기관1-8", column4: "2021-01-08", column5: "입력8", column6: "기본8", column7: "상세8", column8: "2011220000000001"},
  {id: "2", column1: "보조사업2-1", column2: "2-1", column3: "수행기관2-1", column4: "2021-02-01", column5: "입력1", column6: "기본1", column7: "상세1", column8: "2011220000000121"},
  {id: "2", column1: "보조사업2-2", column2: "2-2", column3: "수행기관2-2", column4: "2021-02-02", column5: "입력2", column6: "기본2", column7: "상세2", column8: "2011220000000121"},
  {id: "2", column1: "보조사업2-3", column2: "2-3", column3: "수행기관2-3", column4: "2021-02-03", column5: "입력3", column6: "기본3", column7: "상세3", column8: "2011220000000121"},
  {id: "2", column1: "보조사업2-4", column2: "2-4", column3: "수행기관2-4", column4: "2021-02-04", column5: "입력4", column6: "기본4", column7: "상세4", column8: "2011220000000121"},
  {id: "2", column1: "보조사업2-5", column2: "2-5", column3: "수행기관2-5", column4: "2021-02-05", column5: "입력5", column6: "기본5", column7: "상세5", column8: "2011220000000121"},
  {id: "2", column1: "보조사업2-6", column2: "2-6", column3: "수행기관2-6", column4: "2021-02-06", column5: "입력6", column6: "기본6", column7: "상세6", column8: "2011220000000121"},
  {id: "2", column1: "보조사업2-7", column2: "2-7", column3: "수행기관2-7", column4: "2021-02-07", column5: "입력7", column6: "기본7", column7: "상세7", column8: "2011220000000121"},
  {id: "2", column1: "보조사업2-8", column2: "2-8", column3: "수행기관2-8", column4: "2021-02-08", column5: "입력8", column6: "기본8", column7: "상세8", column8: "2011220000000121"},
  {id: "3", column1: "보조사업3-1", column2: "3-1", column3: "수행기관3-1", column4: "2021-03-01", column5: "입력1", column6: "기본1", column7: "상세1", column8: "2011233300000121"},
  {id: "3", column1: "보조사업3-2", column2: "3-2", column3: "수행기관3-2", column4: "2021-03-02", column5: "입력2", column6: "기본2", column7: "상세2", column8: "2011233300000121"},
  {id: "3", column1: "보조사업3-3", column2: "3-3", column3: "수행기관3-3", column4: "2021-03-03", column5: "입력3", column6: "기본3", column7: "상세3", column8: "2011233300000121"},
  {id: "3", column1: "보조사업3-4", column2: "3-4", column3: "수행기관3-4", column4: "2021-03-04", column5: "입력4", column6: "기본4", column7: "상세4", column8: "2011233300000121"},
  {id: "3", column1: "보조사업3-5", column2: "3-5", column3: "수행기관3-5", column4: "2021-03-05", column5: "입력5", column6: "기본5", column7: "상세5", column8: "2011233300000121"},
  {id: "3", column1: "보조사업3-6", column2: "3-6", column3: "수행기관3-6", column4: "2021-03-06", column5: "입력6", column6: "기본6", column7: "상세6", column8: "2011233300000121"},
  {id: "3", column1: "보조사업3-7", column2: "3-7", column3: "수행기관3-7", column4: "2021-03-07", column5: "입력7", column6: "기본7", column7: "상세7", column8: "2011233300000121"},
  {id: "3", column1: "보조사업3-8", column2: "3-8", column3: "수행기관3-8", column4: "2021-03-08", column5: "입력8", column6: "기본8", column7: "상세8", column8: "2011233300000121"},
  {id: "4", column1: "보조사업4-1", column2: "4-1", column3: "수행기관4-1", column4: "2021-04-01", column5: "입력1", column6: "기본1", column7: "상세1", column8: "2011244400000121"},
  {id: "4", column1: "보조사업4-2", column2: "4-2", column3: "수행기관4-2", column4: "2021-04-02", column5: "입력2", column6: "기본2", column7: "상세2", column8: "2011244400000121"},
  {id: "4", column1: "보조사업4-3", column2: "4-3", column3: "수행기관4-3", column4: "2021-04-03", column5: "입력3", column6: "기본3", column7: "상세3", column8: "2011244400000121"},
  {id: "4", column1: "보조사업4-4", column2: "4-4", column3: "수행기관4-4", column4: "2021-04-04", column5: "입력4", column6: "기본4", column7: "상세4", column8: "2011244400000121"},
  {id: "4", column1: "보조사업4-5", column2: "4-5", column3: "수행기관4-5", column4: "2021-04-05", column5: "입력5", column6: "기본5", column7: "상세5", column8: "2011244400000121"},
  {id: "4", column1: "보조사업4-6", column2: "4-6", column3: "수행기관4-6", column4: "2021-04-06", column5: "입력6", column6: "기본6", column7: "상세6", column8: "2011244400000121"},
  {id: "4", column1: "보조사업4-7", column2: "4-7", column3: "수행기관4-7", column4: "2021-04-07", column5: "입력7", column6: "기본7", column7: "상세7", column8: "2011244400000121"},
  {id: "4", column1: "보조사업4-8", column2: "4-8", column3: "수행기관4-8", column4: "2021-04-08", column5: "입력8", column6: "기본8", column7: "상세8", column8: "2011244400000121"},
  {id: "5", column1: "보조사업5-1", column2: "5-1", column3: "수행기관5-1", column4: "2021-05-01", column5: "입력1", column6: "기본1", column7: "상세1", column8: "2011255500000121"},
  {id: "5", column1: "보조사업5-2", column2: "5-2", column3: "수행기관5-2", column4: "2021-05-02", column5: "입력2", column6: "기본2", column7: "상세2", column8: "2011255500000121"},
  {id: "5", column1: "보조사업5-3", column2: "5-3", column3: "수행기관5-3", column4: "2021-05-03", column5: "입력3", column6: "기본3", column7: "상세3", column8: "2011255500000121"},
  {id: "5", column1: "보조사업5-4", column2: "5-4", column3: "수행기관5-4", column4: "2021-05-04", column5: "입력4", column6: "기본4", column7: "상세4", column8: "2011255500000121"},
  {id: "5", column1: "보조사업5-5", column2: "5-5", column3: "수행기관5-5", column4: "2021-05-05", column5: "입력5", column6: "기본5", column7: "상세5", column8: "2011255500000121"},
  {id: "5", column1: "보조사업5-6", column2: "5-6", column3: "수행기관5-6", column4: "2021-05-06", column5: "입력6", column6: "기본6", column7: "상세6", column8: "2011255500000121"},
  {id: "5", column1: "보조사업5-7", column2: "5-7", column3: "수행기관5-7", column4: "2021-05-07", column5: "입력7", column6: "기본7", column7: "상세7", column8: "2011255500000121"},
  {id: "5", column1: "보조사업5-8", column2: "5-8", column3: "수행기관5-8", column4: "2021-05-08", column5: "입력8", column6: "기본8", column7: "상세8", column8: "2011255500000121"}
];

var masterProvider,masterGrid, detailProvider, detailGrid;

function createMasterGrid() {
  masterProvider = new RealGrid.LocalDataProvider();
  masterGrid = new RealGrid.GridView("realgrid_master", true, {checkItemCallback: function() {detailGrid.shadowDom.setFocus();} });
  
  masterGrid.setDataSource(masterProvider);
  masterProvider.setFields(fields);
  masterGrid.setColumns(columns);
  
  masterGrid.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  masterGrid.displayOptions.rowHeight = 36;
  masterGrid.header.height = 40;
  masterGrid.footer.height = 40;
  masterGrid.checkBar.exclusive = true;
  masterGrid.checkBar.visible = true;
  masterGrid.stateBar.visible = false;
  masterGrid.editOptions.exitGridWhenTab = "row";
  masterGrid.editOptions.editable = false;
  masterGrid.displayOptions.selectionStyle = "singleRow";
  //masterGrid.editOptions.exitGridWhenTab = "grid";
  
  var layout = [
    "column1",
    "column2",
    "column3",
    {
      name: "group",
      direction: "horizontal",
      items: [
        "column4",
        "column5",
      ],
      header: {
        text: "내역사업분류"
      }
    },
    "column6",
    "column7"
  ]
  
 masterGrid.setColumnLayout(layout);

//   masterGrid.onKeyUp = function (grid, event) {
    
//     if (event.keyCode == 32) {
//       var itemIndex = grid.getCurrent().itemIndex;
//       detailGet(itemIndex);
//     }
// }

  masterGrid.onItemChecked = function (grid, itemIndex, checked) {
    detailGet(itemIndex);

  }

  masterGrid.onCurrentRowChanged = function (grid, oldRow, newRow) {
    
  };
  
  masterProvider.setRows(masterData);
  
  
}

function createDetailGrid() {
  detailProvider = new RealGrid.LocalDataProvider();
  detailGrid = new RealGrid.GridView("realgrid_detail", true);
  
  detailGrid.setDataSource(detailProvider);
  detailProvider.setFields(fields1);
  detailGrid.setColumns(columns1);
  
  detailGrid.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  detailGrid.displayOptions.rowHeight = 36;
  detailGrid.header.height = 40;
  detailGrid.footer.height = 40;
  detailGrid.stateBar.width = 10;
  detailGrid.checkBar.visible = false;
  detailGrid.stateBar.visible = false;
  //detailGrid.editOptions.crossWhenExitLast = true;
  detailGrid.editOptions.editable = false;
  detailGrid.displayOptions.selectionStyle = "singleRow";
  
  detailGrid.editOptions.exitGridWhenTab = "row";
  
  var layout = [
    "column1",
    "column2",
    "column3",
    "column4",
    {
      name: "group",
      direction: "horizontal",
      items: [
        "column5",
        "column6",
        "column7"
      ],
      header: {
        text: "담당자정보"
      }
    },
    "column8"
  ]

  detailGrid.setColumnLayout(layout);

}

function detailGet(masterRow) {
  detailProvider.clearRows();

  if (masterRow >= 0) {
      var mstKey = masterGrid.getValue(masterRow, "id");

      // detailData 배열에서 자료추출. DB대용
      var datas = detailData.filter(function (element) {
          if (element.id === mstKey) {
              return true;
          }
      });

      detailProvider.setRows(datas);
      detailGrid.setCurrent({dataRow: 0});
  };
};


function start() {
  createMasterGrid();
  createDetailGrid();

  masterGrid.setFocus();
}

// $.document.ready(start);
window.onload = start;
// domloaded를 대신 써도 됩니다.

window.onunload = function() {

}

function btnDetailInfo() {
  var dataRow = detailGrid.getCurrent().dataRow;

  if (dataRow > -1) {
    alert(JSON.stringify(detailProvider.getJsonRow(dataRow)));
  }
}
