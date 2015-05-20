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
    
  setTests("actions", "ColumnSorting");
	createColumnList(grdMain);
});

function setFields(provider) {
	var fields = [{
		fieldName: "Years",
		dataType: RealGridJS.DataType.NUMBER
	}, {
		fieldName: "Months"
	}, {
		fieldName: "Days"
	}, {
		fieldName: "Hours",
		dataType: RealGridJS.DataType.NUMBER
	}];

	provider.setFields(fields);
}

function setColumns(grid) {
	var columns = [{
		"name": "colYear",
		"fieldName": "Years",
		"type": "data",
		"width": "150",
		"styles": {
			"textAlignment": "far"
		},
		"header": {
			"text": "Year"
		}
	}, {
		"name": "colMonth",
		"fieldName": "Months",
		"type": "data",
		"width": "150",
		"styles": {
			"textAlignment": "center"
		},
		"header": {
			"text": "Month"
		}
	}, {
		"name": "colDay",
		"fieldName": "Days",
		"type": "data",
		"width": "150",
		"styles": {
			"textAlignment": "center"
		},
		"header": {
			"text": "Day"
		}
	}, {
		"name": "colHour",
		"fieldName": "Hours",
		"type": "data",
		"width": "150",
		"styles": {
			"textAlignment": "far"
		},
		"header": {
			"text": "Hour"
		}
	}];

	grid.setColumns(columns);
}

function setOptions(grid) {
	grid.setOptions({
		panel: {
			visible: false
		},
		footer: {
			visible: true
		},
		checkBar: {
			visible: false
		},
		stateBar: {
			visible: false
		},
		sorting: {
			handleVisibility: "always"
		}
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

function loadData(provider) {
	var months = ['01.jan', '02.feb', '03.mar', '04.apr', '05.may', '06.jun',
		'07.jul', '08.aug', '09.sep', '10.oct', '11.nov', '12.dec'];
	var days = ['0-sun', '1-mon', '2-tue', '3-wed', '4-thu', '5-fri', '6-sat'];
	var rows = [];
	for (var i = 0; i < 1000; i++) {
		var row = [];
		row.push(Math.round(2000 + Math.random() * 13));
		row.push(months[Math.floor(Math.random() * 12)]);
		row.push(months[Math.floor(Math.random() * 7)]);
		row.push(Math.round(Math.random() * 24));
		rows.push(row);
	}

	provider.setRows(rows);

	var count = provider.getRowCount();
	$("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
	grdMain.setFocus();
}

function createColumnList(grid) {
	var names = grid.getColumnNames();
	_setListItems("Column", names);
}

function getSelected() {
	var colName = _getSelected("Column");
	return colName ? grdMain.columnByName(colName) : null;
}

var tests = {
	getVersion: function () {
		alert(RealGridJS.getVersion());
	},
	toggleSortable: function () {
		var col = getSelected();
		if (col) {
			col.sortable = !col.sortable;
			grdMain.setColumn(col);

			col = getSelected();
			$("#txtMain").val(col.sortable ? "True" : "False");
		}
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	createCheckBox(container, "sortable", function (e) {
		grdMain.setSortingOptions({ enabled: _getChecked(e) });
	}, true);
	createCheckBox(container, "headerResizable", function (e) {
		grdMain.setHeader({ resizable: _getChecked(e) });
	}, false);
	createListBox(container, "sortStyle", ["none", "exclusive", "inclusive", "reverse"], function (e) {
		var style = _getSelected(e);
		grdMain.orderBy([]);
		grdMain.setSortingOptions({ style: style });
	}, "exclusive");
	createListBox(container, "handleVisibility", ["hidden", "visible", "always"], function (e) {
		var vis = _getSelected(e);
		grdMain.setSortingOptions({ handleVisibility: vis });
	}, "always");
	createListBox(container, "Column", ["SelcectColumn"], function (e) {
		var colName = _getSelected(e);
		if (colName) {
			var columns = grdMain.columnsByTag("sel");
			if (columns) {
				for (var i = 0; i < columns.length; i++) {
					var column = columns[i];
					column.tag = undefined;
					column.header = {};
					column.header.styles = {
						borderLeft: undefined,
						borderRight: undefined,
						borderTop: undefined,
						borderBottom: undefined
					};
					grdMain.setColumn(column);
				}
			}

			var column = grdMain.columnByName(colName);
			if (column) {
				$("#txtMain").text(column.sortable ? "true" : "false");

				column.tag = "sel";
				column.header = {};
				column.header.styles = {
					borderLeft: "#ff660000,2",
					borderRight: "#ff660000,2",
					borderTop: "#ff660000,2",
					borderBottom: "#ff660000,2"
				};
				grdMain.setColumn(column);
			}

			$("#txtMain").val(column ? column.name : null);
		};
	});
}

