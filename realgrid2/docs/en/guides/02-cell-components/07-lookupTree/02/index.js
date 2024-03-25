/*eslint-disable*/

var fields = [{
    fieldName: "field1"
}, {
    fieldName: "field2"
}];

var columns = [{
    name: "column1",
    fieldName: "field1",
    width: 150,
    header: {
        text: "제조사"
    },
    styles: {
        textAlignment: "center"
    },
    lookupDisplay: true,
    //1단계의 경우 바로 values, labels에 설정
    values: ["O","M"],
    labels: ["오뚜기","매일유업"],
    editor:{
      type: "dropdown"
    }
}, {
    name: "column2",
    fieldName: "field2",
    width: 150,
    header: {
        text: "제품명"
    },
    styles: {
        textAlignment: "center"
    },
    editor:{
        type:"dropdown"
    },
    lookupDisplay: true,
    //위의 setLookups에서 설정한 id 지정
    lookupSourceId: "type1",
    lookupKeyFields: [
        "field1",
        "field2"
    ]
}];

var httpRequest;

var dataProvider, gridContainer, grid;

function createGrid(container) {
    dataProvider = new RealGrid.LocalDataProvider();
    gridView = new RealGrid.GridView(container);
    gridView.setDataSource(dataProvider);

    dataProvider.setFields(fields);
    gridView.setColumns(columns);

    gridView.displayOptions.emptyMessage = "There is no data to display.";
    gridView.header.height = 40;
    gridView.displayOptions.rowHeight = 36;
    gridView.footer.height = 40;
    gridView.stateBar.width = 16;
    gridView.editOptions.insertable = true;
    gridView.editOptions.appendable = true;

    //lookup설정
    setLookups(gridView);

    gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
        var fieldName = dataProvider.getOrgFieldName(field);

        if (fieldName == "field1") {
            grid.setValue(itemIndex, "field2", "");
        };
    }

    //코드형태로 값이 넘어옴.
    rows = [
        ["O", "O1"],
        ["M", "M1"],
        ["O", "O2"],
        ["O", "O3"],
        ["M", "M2"],
        ["M", "M3"],
        ["O", "O3"]
    ];

    dataProvider.setRows(rows);

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

function setLookups(grid) {
    grid.setLookups([{
        id: "type1",
        levels: 2,
        //모든 경우의 수를 나열
        keys: [
            ["O", "O1"],
            ["O", "O2"],
            ["O", "O3"],
            ["M", "M1"],
            ["M", "M2"],
            ["M", "M3"],
        ],
        //경우의 수에 따른 표시값 설정
        values: [
            ["3분카레"],
            ["참치"],
            ["불고기피자"],
            ["우유"],
            ["바이오딸기"],
            ["상하치즈"]
        ]
    }]);
}