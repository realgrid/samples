/*eslint-disable*/

var fields = [{
  "fieldName": "field1"
}, {
  "fieldName": "field2"
}]    

var columns = [{
  "fieldName": "field1",
  "name": "field1",
  "width": 90,
  "header": { "text": "구분" }
}, {
  "fieldName": "field2",
  "name": "field2",
  "width": 150,
  "header": { "text": "text/dropdown" },
  "styleCallback": function(grid, dataCell){
    var gubun = grid.getValue(dataCell.index.itemIndex, "field1");
    var ret = {};

    switch (gubun) {
        //구분값이 T이면 text에디터를 표시
        case 'T':  
            ret.editor = {
                type: "text"
            };
            break;
        //구분값이 D이면 드롭다운 에디터를 표시
        case 'D':  
            ret.editor = {
                type: "dropdown",
                values: ['A01', 'A02', 'A03', 'A04', 'A05'],
                labels: ['감자', '고구마', '오이', '토마토', '당근']
            }
    }
    return ret;
  },
  //기본적으로 드롭다운 데이터의 경우 코드값으로 표시되기에 라벨값으로 표시되게 처리
  "displayCallback": function (grid, index, value) {
    var retValue = value;
    var gubun = grid.getValue(index.itemIndex, "field1");

    if (gubun === 'D') {
        var idx = ['A01', 'A02', 'A03', 'A04', 'A05'].indexOf(value);

        retValue = ['감자', '고구마', '오이', '토마토', '당근'][idx];
    }

    return retValue;
  }
}];

var dataProvider, gridView;

function createGrid(container) {
  dataProvider = new RealGrid.LocalDataProvider();
  dataProvider.setFields(fields);

  gridView = new RealGrid.GridView(container);
  gridView.setDataSource(dataProvider);
  gridView.setColumns(columns);

  var datas = [
    ["T", "텍스트텍스트1"],
    ["T", "텍스트텍스트2"],
    ["D", "A01"],
    ["T", "텍스트텍스트3"],
    ["D", "A02"],
    ["D", "A03"],
    ["T", "텍스트텍스트4"],
    ["D", "A01"],
    ["T", "텍스트텍스트5"]
];

dataProvider.setRows(datas);

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