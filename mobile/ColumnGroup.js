var grdMain, dataProvider;

$(window).on("orientationchange", function(event) {
	var angle = Math.abs(window.orientation) / 90;
	if (angle == 1) {
		if (grdMain)
			grdMain.linearizeColumns();
	} else {
		if (grdMain)
			grdMain.restoreColumns();
	}
	sizeTxt();
});

function orientationGrid(grid) {
	if ($("body").height() < $("body").width()) {
		grid.linearizeColumns();
	}
}

$(document).ready(function() {
	$("html, body").css({
		width : "100%",
		height : "100%"
	});
	$("#grdMain").css({
		width : "100%",
		height : "95%"
	});
	RealGridJS.setRootContext("../lib");
	dataProvider = new RealGridJS.LocalDataProvider();
	grdMain = new RealGridJS.GridView("grdMain");
	grdMain.setDataSource(dataProvider);

	setFields(dataProvider);
	setColumns(grdMain);
	setOptions(grdMain, dataProvider);
	setStyles(grdMain);

	loadData(dataProvider);

	orientationGrid(grdMain);

	cfnOrientationGrid(grdMain);
	sizeTxt();

});
function sizeTxt() {
	$("#sizeDiv").text("width : " + $(window).width() + ", height : " + $(window).height());
}

function setFields(provider) {
	var fields = [ {
		fieldName : "OrderID"
	}, {
		fieldName : "CustomerID"
	}, {
		fieldName : "EmployeeID"
	}, {
		fieldName : "OrderDate",
		dataType : "datetime"
	}, {
		fieldName : "CompanyName"
	}, {
		fieldName : "Country"
	}, {
		fieldName : "Phone"
	}, {
		fieldName : "ProductName"
	}, {
		fieldName : "QuantityPerUnit"
	}, {
		fieldName : "Quantity",
		dataType : "number"
	}, {
		fieldName : "UnitPrice",
		dataType : "number"
	} ];

	provider.setFields(fields);
}

function setColumns(grid) {
	var columns = [ {
		type : "group",
		name : "GroupOrder",
		orientation : "vertical",
		width : 250 * 2,
		columns : [ {
			type : "group",
			name : "GroupIds",
			columns : [ {
				name : "OrderID",
				fieldName : "OrderID",
				type : "data",
				width : 90 * 2,
				styles : {
					textAlignment : "center"
				},
				header : {
					text : "Order"
				}
			}, {
				name : "CustomerID",
				fieldName : "CustomerID",
				width : 130 * 2,
				styles : {
					textAlignment : "center"
				},
				header : {
					text : "Customer ID"
				}
			}, {
				name : "EmployeeID",
				fieldName : "EmployeeID",
				width : 100 * 2,
				styles : {
					textAlignment : "center"
				},
				header : {
					text : "Employee ID"
				}
			} ]
		}, {
			name : "OrderDate",
			fieldName : "OrderDate",
			width : 130 * 2,
			styles : {
				textAlignment : "center"
			},
			header : {
				text : "Order Date"
			}
		} ]
	}, {
		name : "CompanyName",
		fieldName : "CompanyName",
		width : 100 * 2,
		styles : {
			textAlignment : "near"
		},
		header : {
			text : "Company Name"
		}
	}, {
		name : "Country",
		fieldName : "Country",
		width : 70 * 2,
		styles : {
			textAlignment : "center"
		},
		header : {
			text : "Country"
		}
	}, {
		name : "Phone",
		fieldName : "Phone",
		width : 80 * 2,
		styles : {
			textAlignment : "near"
		},
		header : {
			text : "Phone"
		}
	}, {
		type : "group",
		name : "GroupSales",
		width : 300 * 2,
		columns : [ {
			type : "group",
			name : "GroupProduct",
			orientation : "vertical",
			columns : [ {
				name : "ProductName",
				fieldName : "ProductName",
				width : 200 * 2,
				styles : {
					textAlignment : "near"
				},
				header : {
					text : "Product Name"
				}
			}, {
				name : "QuantityPerUnit",
				fieldName : "QuantityPerUnit",
				width : 100 * 2,
				styles : {
					textAlignment : "near"
				},
				header : {
					text : "Quantity / Unit"
				}
			} ]
		}, {
			type : "group",
			name : "GroupUnit",
			orientation : "vertical",
			columns : [ {
				name : "Quantity",
				fieldName : "Quantity",
				width : 100 * 2,
				styles : {
					textAlignment : "far"
				},
				header : {
					text : "Quantity"
				}
			}, {
				name : "UnitPrice",
				fieldName : "UnitPrice",
				width : 100 * 2,
				styles : {
					textAlignment : "far"
				},
				header : {
					text : "Unit Price"
				}
			} ]
		} ]
	} ];

	grid.setColumns(columns);
}

function setStyles(grid) {
	grid.setStyles(generalBlueSkin);
}

function setOptions(grid, provider) {
	grid.setOptions({
		display : {
			fitStyle : "even"
		}
	});

	provider.setOptions({
		datetimeFormat : "yyyy-MM-dd a hh:mm:ss",
		amText : "오전",
		pmText : "오후"
	});
}

function loadData(provider) {
	provider.fillJsonData(mobileData);
}
