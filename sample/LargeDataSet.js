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

	setTests("actions", "LargeDataSet");
});

function setFields(provider) {
	var fields = [{
		fieldName: "ItemId"
	}, {
		fieldName: "ItemName"
	}, {
		fieldName: "RequestType"
	}, {
		fieldName: "ServiceName"
	}, {
		fieldName: "ServiceCode"
	}, {
		fieldName: "Standard"
	}, {
		fieldName: "LowBounds"
	}, {
		fieldName: "LowSign"
	}, {
		fieldName: "HighSign"
	}, {
		fieldName: "HighBounds"
	}, {
		fieldName: "CheckUnit"
	}, {
		fieldName: "CheckPrice",
		dataType: "number"
	}];
	provider.setFields(fields);
}

function setColumns(grid) {
	var columns = [];

	var column = new RealGridJS.DataColumn();
	column.fieldName = "ItemId";
	column.header = { text: "ItemId" }
	column.width = 80;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.fieldName = "ItemName";
	column.header = { text: "항목명" }
	column.width = 100;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.fieldName = "RequestType";
	column.header = { text: "분야" }
	column.width = 80;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.fieldName = "ServiceName";
	column.header = { text: "유형명" }
	column.width = 200;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.fieldName = "ServiceCode";
	column.header = { text: "서비스코드" }
	column.width = 80;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.fieldName = "Standard";
	column.header = { text: "표준" }
	column.width = 200;
	columns.push(column);

	var group = {
		type: "group",
		header: {
			text: "기준 범위"
		},
		width: 200,
		columns: [{
			type: "group",
			orientation: "vertical",
			header: {
				text: "하위 조건",
				visible: false
			},
			columns: [{
				fieldName: "LowBounds",
				width: 80,
				header: { text: "하위 값" }
			}, {
				type: "data",
				fieldName: "LowSign",
				width: 80,
				header: { text: "기호" }
			}]
		}, {
			type: "group",
			orientation: "vertical",
			header: {
				text: "상위 조건",
				visible: false
			},
			columns: [{
				fieldName: "HighBounds",
				width: 80,
				header: { text: "상위 값" }
			}, {
				fieldName: "HighSign",
				width: 80,
				header: { text: "기호" }
			}]
		}]
	};
	columns.push(group);

	column = new RealGridJS.DataColumn();
	column.fieldName = "CheckUnit";
	column.header = { text: "단위" }
	column.width = 80;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.fieldName = "CheckPrice";
	column.header = { text: "수수료" }
	column.width = 90;
	column.styles = { textAlignment: "far" };
	columns.push(column);
	grid.setColumns(columns);
}

function setOptions(grid) {
	grid.setOptions({
		"sorting": {
			"toast": {
				"visible": true,
				"message": "정렬 중입니다..."
			}
		},
		"filtering": {
			"toast": "필터링 중입니다..."
		},
		"grouping": {
			"toast": true
		}
	});
}

function setStyles() {
	grdMain.setStyles({
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

function loadData() {
	var t = RealGridJS.getTimer();
	//grdMain.showToast("Load data...", true);
	grdMain.showProgress();
	$.ajax({
		url: "data/TooLargeDataSet.csv?__time__=" + new Date().getTime(),
		dataType: 'text',
		success: function (data) {
			grdMain.hideToast(function () {
				var t2 = RealGridJS.getTimer() - t;
				console.log("######## D A T A L O A D E D D: " + t2);
				dataProvider.fillCsvData(data, {
				});
				t2 = RealGridJS.getTimer() - t2;
				console.log("######## D A T A F I L L E D: " + t2);
			});
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
	Load: function () {
		loadData();
	}
};

function setTests(container, title) {
	title && (function () { document.title = "RealGrid - " + title; })();
	createButtons(container, tests);
}
