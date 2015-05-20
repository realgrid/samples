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

	dataProvider.onValueChanged = function (provider, row, field) {
		var v = provider.getValue(row, field);
		console.log("valueChanged: " + row + ", " + field + " => " + v);
		setTimeout(function () {
			alert("valueChanged: " + row + ", " + field + " => " + v);
		}, 0);
	};
	dataProvider.onRowUpdated = function (provider, row) {
		console.log("rowUpdated: " + row);
	};
	dataProvider.onRowsUpdated = function (provider, row, count) {
		console.log("$$$$$$$$$$$$$ rowsUpdated: " + row + ", " + count);
	};
	dataProvider.onRowStateChanged = function (provider, row) {
		console.log("$$$$$$$$$$$$$ rowStateChanged: " + row);
	};
	dataProvider.onRowStatesChanged = function (provider, rows) {
		console.log("$$$$$$$$$$$$$ rowStatesChanged: " + rows);
	};
	dataProvider.onRowStatesCleared = function (provider) {
		console.log("$$$$$$$$$$$$$ rowStatesCleared");
	}

	setTests("actions", "SetValues");
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
	grid.setCheckBar({
		visible: false
	});
}

function setStyles() {
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
	grdMain.showToast("Load data...");
	$.getJSON("data/defaultloaddata.json?__time__=" + new Date().getTime(), null, function (data) {
		provider.fillJsonData(data, {
			count: 10
		});
		var count = provider.getRowCount();
		$("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
	})
	.done(function() {
		grdMain.hideToast();
		grdMain.setFocus();
	})
	.fail(function (jqxhr, textStatus, error) {
		grdMain.hideToast();
		var err = textStatus + ', ' + error;
		console.log("jQuery getJSON() Failed: " + err);
		$("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
		alert("jQuery getJSON() Failed: " + err);
	});
}

var tests = {
	setValue: function () {
		var row = 0, field = 0;
		var current = grdMain.getCurrent();

		if (current) {
			row = Math.max(0, current.dataRow);
			field = Math.max(0, current.fieldIndex);
			//field = current.fieldName;
		}

		var v = "Cell (" + field + ", " + row + ")";
		dataProvider.setValue(row, field, v);
	},
	updateRow: function () {
		var row = 0;
		var current = grdMain.getCurrent();

		if (current) {
			row = Math.max(0, current.dataRow);
		}

		var data = {
			id: "111",
			userid: "222",
			company: "333",
			first_name: "g dong",
			last_name: "Hong",
			gender: "Mail",
			email: undefined,
			city: undefined,
			ip_address: undefined,
			birthday: undefined,
			pay: undefined,
			card_number: undefined,
			card_type: undefined
		};

		dataProvider.updateRow(row, data);
	},
	updateStrictRow: function () {
		var row = 0;
		var current = grdMain.getCurrent();

		if (current) {
			row = Math.max(0, current.dataRow);
		}

		var data = {
			id: "111",
			userid: "222",
			company: "333",
			first_name: "g dong",
			last_name: "Hong",
			gender: "Mail",
			email: undefined,
			city: undefined,
			ip_address: undefined,
			birthday: undefined,
			pay: undefined,
			card_number: undefined,
			card_type: undefined
		};

		dataProvider.updateStrictRow(row, data);
	},
	updateRows: function () {
		var row = 0;
		var current = grdMain.getCurrent();

		if (current) {
			row = Math.max(0, current.dataRow);
		}

		var data = [{
			id: undefined
		}, {
			id: "111",
			userid: "222",
			company: "333",
			first_name: "g dong",
			last_name: "Hong",
			gender: "Mail",
			email: undefined,
			city: undefined,
			ip_address: undefined,
			birthday: undefined,
			pay: undefined,
			card_number: undefined,
			card_type: undefined
		}, {
			id: "444",
			userid: "555",
			company: "666",
			first_name: "u chi",
			last_name: "Jeon",
			gender: "Mail",
			email: undefined,
			city: undefined,
			ip_address: undefined,
			birthday: undefined,
			pay: undefined,
			card_number: undefined,
			card_type: undefined
		}];

		dataProvider.updateRows(row, data, 1);
	},
	updateStrictRows: function () {
		var row = 0;
		var current = grdMain.getCurrent();

		if (current) {
			row = Math.max(0, current.dataRow);
		}

		var data = [{
			id: undefined
		},{
			id: "111",
			userid: "222",
			company: "333",
			first_name: "g dong",
			last_name: "Hong",
			gender: "Mail",
			email: undefined
		}, {
			id: "444",
			userid: "555",
			company: "666",
			first_name: "u chi",
			last_name: "Jeon",
			gender: "Mail",
			email: undefined
		}];

		dataProvider.updateStrictRows(row, data, 1);
	},
	clearRowStates: function () {
		dataProvider.clearRowStates();
	},
	dataOptions: function () {
		var opts = dataProvider.getOptions();
		console.log(JSON.stringify(opts));
		alert(JSON.stringify(opts));
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
