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

	setTests("actions", "GetValues");

	grdMain.onDataCellClicked = function (id, index) {
		console.log(grdMain.getValues(index.itemIndex));
	};
	dataProvider.onRowInserting = function (provider, row) {
		console.log("onRowInserting row = " + row);
	};
	dataProvider.onRowInserted = function (provider, row) {
		console.log("onRowInserted row = " + row);
	};
	dataProvider.onRowUpdating = function (provider, row) {
		console.log("onRowUpdating row = " + row);
	};
	dataProvider.onRowUpdated = function (provider, row) {
		console.log("onRowUpdated row = " + row);
	}
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
		header: { "fontSize": "12", "fontFamily": "Tahoma", "fontBold": "true"},
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
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
	//grdMain.showToast("Load data...");
	grdMain.showProgress();
	$.ajax({
		type: "GET",
		url: "data/defaultloaddata.csv?__time__=" + new Date().getTime(),
		dataType: 'text',
		success: function (data) {
			//grdMain.hideToast();
			grdMain.closeProgress();
			dataProvider.fillCsvData(data, {
				count: 10
			});
			var count = provider.getRowCount();
			$("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
		},
		error: function(xhr, status, error) {
			var err = xhr + ', ' + status + ', ' + error;
			$("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
			alert("jQuery getJSON() Failed: " + err);
		},
		complete: function (data) {
			//grdMain.hideToast();
			grdMain.closeProgress();
		},
		xhr: function () {
			var xhr = new window.XMLHttpRequest();
			//Download progress
			xhr.addEventListener("progress", function (evt) {
				if (evt.lengthComputable) {
					grdMain.setProgress(0, evt.total, evt.loaded);
				}
			}, false);
			return xhr;
		}
	});
}

var tests = {
	getValue: function () {
		var row = 0, field = 0;
		var current = grdMain.getCurrent();

		if (current) {
			row = Math.max(0, current.dataRow);
			field = Math.max(0, current.fieldIndex);
			//field = current.fieldName;
		}

		var v = dataProvider.getValue(row, field);
		alert("(" + row + ", " + field + ") => " + v);
	},
	getValues: function () {
		var row = 0;
		var current = grdMain.getCurrent();

		if (current) {
			row = Math.max(0, current.dataRow);
		}

		var v = dataProvider.getValues(row);
		alert(row + " => " + v);
	},
	getJsonRow: function () {
		var row = 0;
		var current = grdMain.getCurrent();

		if (current) {
			row = Math.max(0, current.dataRow);
		}

		var v = dataProvider.getJsonRow(row);
		alert(row + " => " + JSON.stringify(v));
	},
	getRows: function () {
		var v = dataProvider.getRows(0, 1);
		alert("0 ~ 1 => " + v);
	},
	getJsonRows: function () {
		var v = dataProvider.getJsonRows(0, 1);
		alert("0 ~ 1 => " + JSON.stringify(v));
	},
	getFieldValues: function () {
		var row = 0, field = 0;
		var current = grdMain.getCurrent();

		if (current) {
			field = Math.max(0, current.fieldIndex);
			//field = current.fieldName;
			row = Math.max(0, current.dataRow);
		}

		var v = dataProvider.getFieldValues(field, row);
		alert(field + "(" + row + " ~ end) => " + v);
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
