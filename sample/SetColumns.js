var dataProvider;
var grdMain;
RealGridJS.setRootContext("../lib");

$().ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
  setFields(dataProvider);

  grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);
	setOptions(grdMain);
  setStyles(grdMain);

	loadData(dataProvider);
    
  setTests("actions", "SetColumns");
});

function setFields(provider) {
	var fields = [
		new RealGridJS.DataField("Field1"),
		new RealGridJS.DataField("Field2"),
		new RealGridJS.DataField("Field3"),
		new RealGridJS.DataField("Field4"),
		new RealGridJS.DataField("Field5")
	];
	provider.setFields(fields);
}

function loadData(provider) {
	var flds = provider.getFieldCount();
	if (flds > 0) {
		var rows = [];

		for (var i = 0; i < 10; i++) {
			var row = [];
			for (var c = 0; c < flds; c++) {
				row.push("Cell(" + i + ", " + c + ")");
			}
			rows.push(row);
		}

		provider.setRows(rows);
	}
}

function prepareResources(grid) {
	var images = new RealGridJS.ImageList("images01", "img/demo/smallflag/");
	images.addUrls(["ar.png", "at.png", "be.png", "br.png", "ca.png", "dk.png", "fi.png", "fr.png", "de.png"]);
	grid.registerImageList(images);
	//images.getImage(0);
}

function addColumns(grid) {
	var columns = [];

	var column = new RealGridJS.DataColumn();
	column.name = "column1";
	column.fieldName = "Field1";
	column.header = { text: "Column 1" }
	column.width = 110;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.name = "column2";
	column.fieldName = "Field2";
	column.header = { text: "Column 2" }
	column.width = 110;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.name = "column3";
	column.fieldName = "Field3";
	column.header = { text: "Column 3" }
	column.width = 110;
	column.styles = { background: "#33ffff00" };
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.name = "column4";
	column.fieldName = "Field4";
	column.header = { text: "Column 4" }
	column.width = 110;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.name = "column5";
	column.fieldName = "Field5";
	column.header = { text: "Column 5" }
	column.width = 110;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.name = "column6";
	column.fieldName = "Field3";
	column.header = { text: "Column 6" }
	column.width = 110;
	column.styles = { background: "#33ffff00" };
	columns.push(column);

	grid.setColumns(columns);
	setSkin();
}

function setOptions(grid) {
	grid.setPanel({
		visible: false
	});
}

function setStyles() {
    grdMain.setStyles({
        selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

var tests = {
	addColumns: function () {
		addColumns(grdMain);
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}

