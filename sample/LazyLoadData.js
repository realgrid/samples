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

	grdMain.onScrollToBottom = function (grid) {
		grdMain.showToast("Load data...", true);
		$.ajax({
			url: "data/defaultloaddata.json?__time__=" + new Date().getTime(),
			dataType: 'json',
			success: function (data) {
				grdMain.hideToast();
				dataProvider.fillJsonData(data, {
					fillMode: "append",
					count: 1000
				});
			},
			complete: function (data) {
				grdMain.hideToast();
			}
		});
	};

	setTests("actions", "LazyLoadData");
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
	grdMain.showToast("Load data...", true);
	$.ajax({
		url: "data/defaultloaddata.json?__time__=" + new Date().getTime(),
		dataType: 'json',
		success: function (data) {
			grdMain.hideToast();
			dataProvider.fillJsonData(data, {
				count: 1000
			});
		},
		complete: function (data) {
			grdMain.hideToast();
		}
	});
}

var tests = {
};

function setTests(container, title) {
	title && (function () { document.title = "RealGrid - " + title; })();
	createButtons(container, tests);
}
