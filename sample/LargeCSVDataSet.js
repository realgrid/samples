var gridView;
var dataProvider;
RealGridJS.setRootContext("../lib");

$().ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
	setFields(dataProvider);

	gridView = new RealGridJS.GridView("container");
	gridView.setDataSource(dataProvider);
	
	setFields(dataProvider);
    setColumns(gridView);
    setOptions(gridView);

	setTests("actions", "LargeDataSet");
});

function setFields() {
    var fields = [];

    for(var i = 1; i < createNum; i++){
        fields.push({fieldName: "field" + i})
    }

    dataProvider.setFields(fields);
}

function setColumns() {
    var columns = [];

    for(var i = 1; i < createNum; i++){
        columns.push({name: "column" + i, header:{text: "column" + i}, fieldName: "field" + i, width: 110})
    }

    gridView.setColumns(columns);

}

function loadData(provider){
    var datas = [];
    for(var i = 1; i < 100001; i++){
        var rowDatas = [];
        for(var j = 1; j < 101; j++){
            rowDatas.push("sampleData" + j);
        }
        datas.push(rowDatas);
    }

    dataProvider.setRows(datas);
}

function setOptions(grid){
    grid.setDisplayOptions({height:23});
}

var tests = {
	Load: function () {
		loadData();
	}
};

function setTests(container, title) {
	title && (function () { document.title = "RealGrid - " + title; })();
	createButtons(container, tests);
}
