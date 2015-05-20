var dataProvider;
var grdMain;
RealGridJS.setRootContext("../lib");

$().ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
  setFields(dataProvider);

  grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);

	setColumns(grdMain);
	setOptions(grdMain);
	setSkin();
  setStyles(grdMain);

	loadData(dataProvider);
    
  setTests("actions", "ColumnProperties");
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

function setColumns(grid) {
	var columns = [];

	var column = new RealGridJS.DataColumn();
	column.name = "column1";
	column.fieldName = "Field1";
	column.header = { text: "Column 1" }
	column.width = 150;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.name = "column2";
	column.fieldName = "Field2";
	column.header = { text: "Column 2" }
	column.width = 150;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.name = "column3";
	column.fieldName = "Field3";
	column.header = { text: "Column 3" }
	column.width = 110;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.name = "column4";
	column.fieldName = "Field4";
	column.header = { text: "Column 4" }
	column.width = 170;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.name = "column5";
	column.fieldName = "Field5";
	column.header = { text: "Column 5" }
	column.width = 140;
	columns.push(column);

	grid.setColumns(columns);
}

function setOptions(grid) {
	grid.setPanel({
		visible: false
	});

	grid.onColumnHeaderClicked = function (grid, column) {
		if (column) {
			var columns = grdMain.columnsByTag("sel");
			if (columns) {
				for (var i = 0; i < columns.length; i++) {
					grdMain.setColumnProperty(columns[i], "tag", undefined);
				}
			}

			grdMain.setColumnProperty(column, "tag", "sel");
			_setSelected("Column", column.name);
		}
	};
}

function setStyles() {
    grdMain.setStyles({
		body: {
			cellDynamicStyles: [{
				criteria: "tag = 'sel'",
				styles: "background=#3300ff00"
			}]
		},
        selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

function getSelected() {
	var colName = _getSelected("Column");
	return colName ? grdMain.columnByName(colName) : null;
}

var tests = {
	toggleVisible: function () {
		var column = getSelected();
		if (column) {
			var visible = !grdMain.getColumnProperty(column, "visible");
			grdMain.setColumnProperty(column, "visible", visible);
		}
	},
	"너비 10 증가": function () {
		var column = getSelected();
		if (column) {
			var width = grdMain.getColumnProperty(column, "width") + 10;
			grdMain.setColumnProperty(column, "width", width);
		}
	},
	"너비 10 감소": function () {
		var column = getSelected();
		if (column) {
			var width = grdMain.getColumnProperty(column, "width") - 10;
			grdMain.setColumnProperty(column, "width", width);
		}
	},
	toggleResizable: function () {
		var column = getSelected();
		if (column) {
			var resizable = !grdMain.getColumnProperty(column, "resizable");
			grdMain.setColumnProperty(column, "resizable", resizable);
		}
	},
	toggleSortable: function () {
		var column = getSelected();
		if (column) {
			var sortable = !grdMain.getColumnProperty(column, "sortable");
			grdMain.setColumnProperty(column, "sortable", sortable);
		}
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	createListBox(container, "Column", ["SelcectColumn", "column1", "column2", "column3", "column4", "column5"], function (e) {
		var colName = _getSelected("Column")
		if (colName) {
			var columns = grdMain.columnsByTag("sel");
			if (columns) {
				for (var i = 0; i < columns.length; i++) {
					grdMain.setColumnProperty(columns[i], "tag", undefined);
				}
			}

			var column = grdMain.columnByName(colName);
			if (column) {
				grdMain.setColumnProperty(column, "tag", "sel");
			}
		}
	});
}

