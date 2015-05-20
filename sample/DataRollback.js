var grdMain;
var dataProvider;
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

	setTests("actions", "DataRollback");
});

function setFields(provider) {
	var fields = [{
		fieldName: "id"
	}, {
		fieldName: "userid"
	}, {
		fieldName: "company"
	}, {
		fieldName: "first_name"
	}, {
		fieldName: "last_name"
	}, {
		fieldName: "gender"
	}, {
		fieldName: "email"
	}, {
		fieldName: "city"
	}, {
		fieldName: "ip_address"
	}, {
		fieldName: "birthday",
		dataType: "datetime"
	}, {
		fieldName: "pay",
		dataType: "number"
	}, {
		fieldName: "card_number"
	}, {
		fieldName: "card_type"
	}, {
		fieldName: "birthday2",
		dataType: "datetime"
	}];
	provider.setFields(fields);
}

function setColumns(grid) {
	var columns = [{
		fieldName: "id",
		width: 40,
		header: { text: "No" },
		styles: { textAlignment: "center", font: "Tahoma" }
	}, {
		fieldName: "userid",
		width: 80,
		header: { text: "User Id" },
		styles: { textAlignment: "near", font: "Tahoma" }
	}, {
		fieldName: "company",
		width: 100,
		header: { text: "Company" },
		styles: { textAlignment: "near", font: "Tahoma" }
	}, {
		fieldName: "first_name",
		width: 80,
		header: { text: "First Name" },
		styles: { textAlignment: "near", font: "Tahoma" }
	}, {
		fieldName: "last_name",
		width: 80,
		header: { text: "Last Name" },
		styles: { textAlignment: "near", font: "Tahoma" }
	}, {
		fieldName: "gender",
		width: 80,
		header: { text: "Gender" },
		styles: { textAlignment: "center", font: "Tahoma" }
	}, {
		fieldName: "email",
		width: 150,
		header: { text: "E-Mail" },
		styles: { textAlignment: "near", font: "Tahoma" }
	}, {
		fieldName: "city",
		width: 150,
		header: { text: "City" },
		styles: { textAlignment: "near", font: "Tahoma" }
	}, {
		fieldName: "ip_address",
		width: 100,
		header: { text: "IP Address" },
		styles: { textAlignment: "near", font: "Tahoma" }
	}, {
		fieldName: "birthday",
		width: 90,
		header: { text: "Birthday" },
		editor: {
			datetimeFormat: "yyyy-MM-dd"
		},
		styles: {
			textAlignment: "center",
			font: "Tahoma",
			datetimeFormat: "yyyy/MM/dd"
		}
	}, {
		fieldName: "birthday2",
		width: 90,
		header: { text: "Birthday2" },
		editor: {
			datetimeFormat: "yyyy-MM-dd"
		}
	}, {
		fieldName: "pay",
		width: 90,
		header: { text: "Pay" },
		editor: {
			type: "number"
		},
		styles: {
			textAlignment: "far",
			font: "Tahoma",
			numberFormat: "#,##0"
		}
	}, {
		fieldName: "card_number",
		width: 110,
		header: { text: "Card Number" },
		styles: { textAlignment: "near", font: "Tahoma" }
	}, {
		fieldName: "card_type",
		width: 90,
		header: { text: "Card Type" },
		styles: { textAlignment: "near", font: "Tahoma" }
	}];

	grid.setColumns(columns);
}

function setOptions(grid) {
	grid.setOptions({
		edit: {
			deletable: true,
			deleteRowsConfirm: true,
			deleteRowsMessage: "Are you sure?",
			insertable: true,
			appendable: true
		},
		stateBar: {
			visible: true
		},
		select: {
			style: RealGridJS.SelectionStyle.ROWS
		},
		footer: {
			visible: false
		}
	});
}

function setStyles() {
	grdMain.setStyles({
		header: { "fontSize": "12", "fontFamily": "Tahoma", "fontBold": "true" },
		selection: {
			background: "#11000000",
			border: "#88000000,1"
		},
		checkBar: {
			figureBackground: "#ff555555",
			head: {
				figureBackground: "#ff555555"
			}
		},
		body: {
			dynamicStyles: [{
				criteria: "state <> null",
				styles: "background=#22ffff00"
			}]
		}
	});
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

function loadData() {
	grdMain.showToast("Load data...", true);
	$.ajax({
		url: "data/defaultloaddata.json?__time__=" + new Date().getTime(),
		dataType: 'json',
		success: function (data) {
			grdMain.hideToast();
			dataProvider.fillJsonData(data, {
				count: 200
			});
			dataProvider.savePoint();
			refreshPoints();
		},
		complete: function (data) {
			grdMain.hideToast();
		}
	});
}

function refreshPoints() {
	var points = dataProvider.getSavePoints();
	var list = $("#_listbox_points");

	list.empty();
	$.map(points, function (c) {
		$("<option />", { value: c, text: "point_" + c }).appendTo(list);
	});
}

var tests = {
	savePoint: function () {
		grdMain.cancel();
		dataProvider.savePoint(_getChecked("saveStates"));
		refreshPoints();
	},
	rollback: function () {
		var point = _getSelected("points");

		grdMain.cancel();
		dataProvider.rollback(point); // point를 생략하면 최초 복제로 복원
		refreshPoints();
	},
	clearPoints: function () {
		dataProvider.clearSavePoints();
		refreshPoints();
	}
};

function setTests(container, title) {
	title && (function () { document.title = "RealGrid - " + title; })();
	createButtons(container, tests);
	createCheckBox(container, "saveStates", null, true);
	createListBox(container, "points", null, function (e) {
	})
}
