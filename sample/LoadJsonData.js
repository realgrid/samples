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

	setTests("actions", "LoadJsonData");
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
		stateBar: {
			visible: false
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
		"header": { "fontSize": "12", "fontFamily": "Tahoma", "fontBold": "true"},
		selection: {
			background: "#11000000",
			border: "#88000000,1"
		},
		checkBar: {
			figureBackground: "#ff555555",
			head: {
				figureBackground: "#ff555555"
			}
		}
	});

	// load data
	loadData(dataProvider);
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
	grdMain.showToast("Load data...");
	$.getJSON("data/defaultloaddata.json?__time__=" + new Date().getTime(), null, function (data) {
		provider.fillJsonData(data, {
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

function checkEditing() {
	if (grdMain.isItemEditing()) {
		alert('먼저 편집을 완료해야 합니다.');
		return true;
	}
	return false;
}

var tests = {
	getVersion: function () {
		alert(RealGridJS.getVersion());
	},
	insert: function () {
		if (checkEditing()) {
			return;
		}

		var current = grdMain.getCurrent();
		var dataRow = current.dataRow >= 0 ? current.dataRow : 0;

		grdMain.showToast("Load data...");
		$.getJSON("data/defaultloaddata.json?__time__=" + new Date().getTime(), null, function (data) {
			grdMain.hideToast();
			dataProvider.fillJsonData(data, {
				fillMode: "insert",
				fillPos: dataRow
			});
			var count = dataProvider.getRowCount();
			$("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
		})
		.done(function() {
			grdMain.setFocus();
		})
		.fail(function (jqxhr, textStatus, error) {
			grdMain.hideToast();
			var err = textStatus + ', ' + error;
			console.log("jQuery getJSON() Failed: " + err);
			$("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
			alert("jQuery getJSON() Failed: " + err);
		});
	},
	append: function () {
		if (checkEditing()) {
			return;
		}

		grdMain.showToast("Load data...");
		$.getJSON("data/defaultloaddata.json?__time__=" + new Date().getTime(), null, function (data) {
			grdMain.hideToast();
			dataProvider.fillJsonData(data, {
				fillMode: "append"
			});
			var count = dataProvider.getRowCount();
			$("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
		})
		.done(function() {
			grdMain.setFocus();
		})
		.fail(function (jqxhr, textStatus, error) {
			grdMain.hideToast();
			var err = textStatus + ', ' + error;
			console.log("jQuery getJSON() Failed: " + err);
			$("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
			alert("jQuery getJSON() Failed: " + err);
		});
	},
	update: function () {
		if (checkEditing()) {
			return;
		}

		var current = grdMain.getCurrent();
		var dataRow = current.dataRow >= 0 ? current.dataRow : 0;

		grdMain.showToast("Load data...");
		$.getJSON("data/defaultloaddata.json?__time__=" + new Date().getTime(), null, function (data) {
			grdMain.hideToast();
			dataProvider.fillJsonData(data, {
				fillMode: "update",
				fillPos: dataRow
			});
			var count = dataProvider.getRowCount();
			$("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
		})
		.done(function() {
			grdMain.setFocus();
		})
		.fail(function (jqxhr, textStatus, error) {
			grdMain.hideToast();
			var err = textStatus + ', ' + error;
			console.log("jQuery getJSON() Failed: " + err);
			$("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
			alert("jQuery getJSON() Failed: " + err);
		});
	}/*,
	collapseAll: function () {
		grdMain.collapseAll();
	}
	*/
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
