var grdMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

$().ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
	setFields(dataProvider);

	grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);
	//prepareResources(grdMain);
	setColumns(grdMain);
	setOptions(grdMain);
	setSkin();
	setStyles(grdMain);

	loadData(dataProvider);

	setTests("actions", "LoadXmlData");
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
		fieldName: "birthday"
	}, {
		fieldName: "pay",
		dataType: "number"
	}, {
		fieldName: "card_number"
	}, {
		fieldName: "card_type"
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
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

function checkEditing() {
	if (grdMain.isItemEditing()) {
		alert('먼저 편집을 완료해야 합니다.');
		return true;
	}
	return false;
}

function loadData(provider) {
	grdMain.showToast("Load xml data...");
	$.ajax({
		type: "GET",
		url: "data/defaultloaddata.xml?__time__=" + new Date().getTime(),
		dataType: 'text',
		success: function (data) {
			grdMain.hideToast(function () {
				dataProvider.fillXmlData(data, {});
				var count = provider.getRowCount();
				$("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
			});
		},
		error: function(xhr, status, error) {
			grdMain.hideToast();
			var err = xhr + ', ' + status + ', ' + error;
			console.log("jQuery getJSON() Failed: " + err);
			$("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
			alert("jQuery getJSON() Failed: " + err);
		},
		complete: function (data) {
		}
	});
}

var tests = {
	insert: function () {
		if (checkEditing()) {
			return;
		}

		var current = grdMain.getCurrent();
		var dataRow = current.dataRow >= 0 ? current.dataRow : 0;

		grdMain.showToast("Load xml data...");
		$.ajax({
			type: "GET",
			url: "data/defaultloaddata.xml?__time__=" + new Date().getTime(),
			dataType: 'text',
			success: function (data) {
				grdMain.hideToast(function () {
					dataProvider.fillXmlData(data, {
						count: 10,
						fillMode: "insert",
						fillPos: dataRow
					});
					var count = dataProvider.getRowCount();
					$("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
				});
			},
			error: function(xhr, status, error) {
				grdMain.hideToast();
				var err = xhr + ', ' + status + ', ' + error;
				console.log("jQuery getJSON() Failed: " + err);
				$("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
				alert("jQuery getJSON() Failed: " + err);
			},
			complete: function (data) {
			}
		});
	},
	append: function () {
		if (checkEditing()) {
			return;
		}

		grdMain.showToast("Load xml data...");
		$.ajax({
			type: "GET",
			url: "data/defaultloaddata.xml?__time__=" + new Date().getTime(),
			dataType: 'text',
			success: function (data) {
				grdMain.hideToast(function () {
					dataProvider.fillXmlData(data, {
						count: 10,
						fillMode: "append"
					});
					var count = dataProvider.getRowCount();
					$("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
				});
			},
			error: function(xhr, status, error) {
				grdMain.hideToast();
				var err = xhr + ', ' + status + ', ' + error;
				console.log("jQuery getJSON() Failed: " + err);
				$("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
				alert("jQuery getJSON() Failed: " + err);
			},
			complete: function (data) {
			}
		});
	},
	update: function () {
		if (checkEditing()) {
			return;
		}

		var current = grdMain.getCurrent();
		var dataRow = current.dataRow >= 0 ? current.dataRow : 0;

		grdMain.showToast("Load xml data...");
		$.ajax({
			type: "GET",
			url: "data/defaultloaddata.xml?__time__=" + new Date().getTime(),
			dataType: 'text',
			success: function (data) {
				grdMain.hideToast(function () {
					dataProvider.fillXmlData(data, {
						count: 10,
						fillMode: "update",
						fillPos: dataRow
					});
					var count = dataProvider.getRowCount();
					$("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
				});
			},
			error: function(xhr, status, error) {
				grdMain.hideToast();
				var err = xhr + ', ' + status + ', ' + error;
				console.log("jQuery getJSON() Failed: " + err);
				$("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
				alert("jQuery getJSON() Failed: " + err);
			},
			complete: function (data) {
			}
		});
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
