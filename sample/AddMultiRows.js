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

	grdMain.onDataCellClicked = function (id, index) {
		console.log(grdMain.getValues(index.itemIndex));
	};

	dataProvider.onRowInserting = function (provider, row) {
		console.log("onRowInserting row = " + row);
	};
	dataProvider.onRowInserted = function (provider, row) {
		console.log("onRowInserted row = " + row);
	};
	dataProvider.onRowsInserted = function (provider, row, count) {
		alert("Rows inserted: " + row + ", " + count);
	};
	dataProvider.onRowUpdating = function (provider, row) {
		console.log("onRowUpdating row = " + row);
	};
	dataProvider.onRowUpdated = function (provider, row) {
		console.log("onRowUpdated row = " + row);
	};
	dataProvider.onRowsUpdated = function (provider, row) {
		console.log("onRowsUpdated row = " + rows);
	};
	dataProvider.onRowsDeleted = function (provider, rows) {
		console.log("onRowsDeleted rows = " + rows);
	};
	dataProvider.onRowMoving = function (provider, row, newRow) {
		console.log("onRowMoving " + row + " => " + newRow);
		if (!_getChecked("movable")) {
			alert("Can not move!");
			return false;
		}
	};
	dataProvider.onRowMoved = function (provider, row, newRow) {
		console.log("onRowMoved " + row + " => " + newRow);
		setTimeout(function () {
			alert("onRowMoved " + row + " => " + newRow);
		}, 0)
	};
	dataProvider.onRowsMoving = function (provider, row, count, newRow) {
		console.log("onRowsMoving " + row + ", " + count + " => " + newRow);
		if (!_getChecked("movable")) {
			alert("Can not move!");
			return false;
		}
	};
	dataProvider.onRowsMoved = function (provider, row, count, newRow) {
		console.log("onRowsMoved " + row + ", " + count + " => " + newRow);
		setTimeout(function () {
			alert("onRowsMoved " + row + ", " + count + " => " + newRow);
		}, 0)
	};

	setTests("actions", "AddMultiRows");
});

function setFields(provider) {
	var fields = [{
		"fieldName": "id"
	}, {
		"fieldName": "userid"
	}, {
		"fieldName": "company"
	}, {
		"fieldName": "first_name"
	}, {
		"fieldName": "last_name"
	}, {
		"fieldName": "gender"
	}, {
		"fieldName": "email"
	}, {
		"fieldName": "city"
	}, {
		"fieldName": "ip_address"
	}, {
		"fieldName": "birthday"
	}, {
		"fieldName": "pay",
		"dataType": "number"
	}, {
		"fieldName": "card_number"
	}, {
		"fieldName": "card_type"
	}];
	provider.setFields(fields);
}

function setColumns(grid) {
	var columns = [{
		"fieldName": "id",
		"width": 40,
		"header": { "text": "No" },
		"styles": { "textAlignment": "center", "font": "Tahoma" }
	}, {
		"fieldName": "userid",
		"width": 80,
		"header": { "text": "사용자 Id" },
		"styles": { "textAlignment": "near", "font": "Tahoma" }
	}, {
		"fieldName": "company",
		"width": 100,
		"header": { "text": "회사" },
		"styles": { "textAlignment": "near", "font": "Tahoma" }
	}, {
		"fieldName": "first_name",
		"width": 80,
		"header": { "text": "이름" },
		"styles": { "textAlignment": "near", "font": "Tahoma" }
	}, {
		"fieldName": "last_name",
		"width": 80,
		"header": { "text": "성" },
		"styles": { "textAlignment": "near", "font": "Tahoma" }
	}, {
		"fieldName": "gender",
		"width": 80,
		"header": { "text": "성별" },
		"styles": { "textAlignment": "center", "font": "Tahoma" }
	}, {
		"fieldName": "email",
		"width": 150,
		"header": { "text": "E-Mail" },
		"styles": { "textAlignment": "near", "font": "Tahoma" }
	}, {
		"fieldName": "city",
		"width": 150,
		"header": { "text": "시" },
		"styles": { "textAlignment": "near", "font": "Tahoma" }
	}, {
		"fieldName": "ip_address",
		"width": 100,
		"header": { "text": "IP Address" },
		"styles": { "textAlignment": "near", "font": "Tahoma" }
	}, {
		"fieldName": "birthday",
		"width": 90,
		"header": { "text": "생년월일" },
		"editor": {
			"datetimeFormat": "yyyy-MM-dd"
		},
		"styles": {
			"textAlignment": "center",
			"font": "Tahoma",
			"datetimeFormat": "yyyy/MM/dd"
		}
	}, {
		"fieldName": "pay",
		"width": 90,
		"header": { "text": "급여" },
		"editor": {
			"type": "number"
		},
		"styles": {
			"textAlignment": "far",
			"font": "Tahoma",
			"numberFormat": "#,##0"
		}
	}, {
		"fieldName": "card_number",
		"width": 110,
		"header": { "text": "신용카드" },
		"styles": { "textAlignment": "near", "font": "Tahoma" }
	}, {
		"fieldName": "card_type",
		"width": 90,
		"header": { "text": "카드종류" },
		"styles": { "textAlignment": "near", "font": "Tahoma" }
	}];
	grid.setColumns(columns);
}

function setOptions(grid) {
	grid.setOptions({
		checkBar: {
			visible: false
		}
	});
}

function setStyles() {
	// 추가된 행의 배경색을 바꾼다.
	grdMain.setStyles({
		body: {
			dynamicStyles: [{
				criteria: "state = 'c'",
				styles: "background=#33a1deff"
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
		url: "data/defaultloaddata.csv?__time__=" + new Date().getTime(),
		dataType: 'text',
		success: function (data) {
			grdMain.hideToast();
			dataProvider.fillCsvData(data, {
				count: 10
			});
		},
		complete: function (data) {
			grdMain.hideToast();
		}
	});
}

var tests = {
	getVersion: function () {
		alert(RealGridJS.getVersion());
	},
	appendRows: function () {
		var rows = [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			[11, 22, 33, 44, 55, 66, 77, 88, 99, 1010]
		];

		dataProvider.addRows(rows, 0, 2, _getChecked("rowEvents"));

		/*
		 // 많은 행을 추가할 때는 beginUpdate(), endUpdate()로 묶어서 개별 행 추가 이벤트가 발생하지 않도록 한다.
		 dataProvider.beginUpdate();
		 try {
		 for (i = 0; i < 1000; i++)
		 dataProvider.addRows(rows, 0, 2);
		 } finally {
		 dataProvider.endUpdate();
		 }
		 */
	},
	updateRows: function () {
		var rows = [{
			"id": 1,
			"userid": 2,
			"company": 3,
			"first_name": 4,
			"last_name": 5,
			"gender": undefined,
			"email": 7,
			"city": 8,
			"ip_address": 9,
			"birthday": 10
		}, {
			"id": 11,
			"userid": 22,
			"company": 33,
			"first_name": 44,
			"last_name": 55,
			"gender": undefined,
			"email": 77,
			"city": 88,
			"ip_address": 99,
			"birthday": 1010
		}];

		var current = grdMain.getCurrent();
		var row = current.itemIndex >= 0 ? current.itemIndex : 0;
		dataProvider.updateRows(row, rows, 0, 2, true);
	},
	updateStrictRows: function () {
		var rows = [{
			"id": 1,
			"userid": 2,
			"company": 3,
			"first_name": 4,
			"last_name": 5,
			"gender": undefined,
			"email": 7,
			"city": 8,
			"ip_address": 9,
			"birthday": 10
		}, {
			"id": 11,
			"userid": 22,
			"company": 33,
			"first_name": 44,
			"last_name": 55,
			"gender": undefined,
			"email": 77,
			"city": 88,
			"ip_address": 99,
			"birthday": 1010
		}];

		var current = grdMain.getCurrent();
		var row = current.itemIndex >= 0 ? current.itemIndex : 0;
		dataProvider.updateStrictRows(row, rows, 0, 2, true);
	},
	insertRows: function () {
		var rows = [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			[11, 22, 33, 44, 55, 66, 77, 88, 99, 1010]
		];

		var current = grdMain.getCurrent();
		var row = current.itemIndex >= 0 ? current.itemIndex : 0;
		dataProvider.insertRows(row, rows, 0, 2, true);
	},
	deleteRows: function () {
		var rows = grdMain.getSelectedRows();
		dataProvider.removeRows(rows, _getChecked("rowEvents"));
	},
	moveRow: function () {
		var cur = grdMain.getCurrent();
		if (cur.dataRow >= 0) {
			dataProvider.moveRow(cur.dataRow, cur.dataRow + 1);
		}
	},
	moveRows: function () {
		var cur = grdMain.getCurrent();
		if (cur.dataRow >= 0) {
			dataProvider.moveRows(cur.dataRow, 3, cur.dataRow + 3);
		}
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	createCheckBox(container, "checkStates", function (e) {
		dataProvider.checkRowStates(_getChecked(e));
	}, true);
	createCheckBox(container, "rowEvents", null, false);
	createCheckBox(container, "movable", null, true);
}
