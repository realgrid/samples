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
    
  setTests("actions", "ColumnFooter");

	var options = grdMain.getOptions();
	_setSelected("summaryMode", options.summaryMode);
	options = grdMain.getRowGroup();
	_setSelected("", options.summaryMode);
});

function setFields(provider) {
	var fields = [{
		fieldName: "OrderID"
	}, {
		fieldName: "CustomerID"
	}, {
		fieldName: "EmployeeID"
	}, {
		fieldName: "OrderDate",
		dataType: "datetime"
	}, {
		fieldName: "CompanyName"
	}, {
		fieldName: "Country"
	}, {
		fieldName: "Phone"
	}, {
		fieldName: "ProductName"
	}, {
		fieldName: "QuantityPerUnit"
	}, {
		fieldName: "Quantity",
		dataType: "number"
	}, {
		fieldName: "UnitPrice",
		dataType: "number"
	}];

	provider.setFields(fields);
}

function setColumns(grid) {
	var columns = [{
		"name": "OrderID",
		"fieldName": "OrderID",
		"type": "data",
		"width": "90",
		"styles": {
			"textAlignment": "center"
		},
		"header": {
			"text": "Order ID"
		}
	}, {
		"name": "QuantityPerUnit",
		"fieldName": "QuantityPerUnit",
		"type": "data",
		"width": "140",
		"styles": {
			"textAlignment": "near"
		},
		"header": {
			"text": "Quantity / Unit"
		},
		"footer": {
			"styles": {
				"textAlignment": "far",
				"font": "굴림,12"
			},
			"text": "합계 =>",
			"groupText": "합계 =>"
		}
	}, {
		"name": "Quantity",
		"fieldName": "Quantity",
		"type": "data",
		"width": "100",
		"styles": {
			"textAlignment": "far"
		},
		"header": {
			"text": "Quantity"
		},
		"footer": {
			"styles": {
				"textAlignment": "far",
				"numberFormat": "0,000",
				"postfix": " $",
				"font": "Arial,12"
			},
			"text": "합계",
			"expression": "sum",
			"groupText": "합계",
			"groupExpression": "sum"
		}
	}, {
		"name": "CustomerID",
		"fieldName": "CustomerID",
		"type": "data",
		"width": "130",
		"styles": {
			"textAlignment": "center"
		},
		"header": {
			"text": "Customer ID"
		},
		"footer": {
			"styles": {
				"textAlignment": "far",
				"font": "굴림,12"
			},
			"text": "분산 =>",
			"groupText": "분산 =>"
		}
	}, {
		"name": "UnitPrice",
		"fieldName": "UnitPrice",
		"type": "data",
		"width": "100",
		"styles": {
			"textAlignment": "far"
		},
		"header": {
			"text": "Unit Price"
		},
		"footer": {
			"styles": {
				"textAlignment": "far",
				"numberFormat": "0,000",
				"postfix": " $",
				"font": "Arial,12"
			},
			"text": "Variace",
			"expression": "var",
			"groupExpression": "var"
		}
	},  {
		"name": "CompanyName",
		"fieldName": "CompanyName",
		"type": "data",
		"width": "200",
		"styles": {
			"textAlignment": "near"
		},
		"header": {
			"text": "Company Name"
		}
	}];

	grid.setColumns(columns);
}

function setOptions(grid) {
	grid.setOptions({
		summaryMode: RealGridJS.SummaryMode.AGGREGATE,
		stateBar: {
			visible: false
		},
		select: {
			style: RealGridJS.SelectionStyle.ROWS
		}
	});

	setFilters(grid);
}

function setFilters(grid) {
	var column = grid.columnByName("CustomerID");
	if (column) {
		var filters = [{
			name: "VINET",
			criteria: "value = 'VINET'"
		}, {
			name: "VICTE",
			criteria: "value = 'VICTE'"
		}, {
			name: "HANAR",
			criteria: "value = 'HANAR'"
		}, {
			name: "SUPRD",
			criteria: "value = 'SUPRD'"
		}];

		column.filters = filters;
		grid.setColumn(column);
	};
};

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
  provider.setRows(CustomerOrders);  
/*  
	var params = {
		CustomerId: ""
	};

	$.ajaxSetup({ cache: false });

	grdMain.showToast("Load data...");
	$.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders", params, function (data) {
		provider.setRows(data);
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
		console && console.log("jQuery getJSON() Failed: " + err);
		alert("jQuery getJSON() Failed: " + err);
	});
*/	
}

function getSelected() {
	var colName = _getSelected("Column");
	return colName ? grdMain.columnByName(colName) : null;
}

var tests = {
	getVersion: function () {
		alert(RealGridJS.getVersion());
	},
	getSummary: function () {
		var summary = _getSelected("Summary");
		var v = grdMain.getSummary("Quantity", summary);
		alert(summary + " => " + v);
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	createCheckBox(container, "resizable", function (e) {
		grdMain.setFooter({
			resizable: e.target.checked
		});
	}, false);
	createListBox(container, "SummaryMode", ["none", "aggregate", "statistical"], function (e) {
		var mode = _getSelected(e);
		grdMain.setOptions({ summaryMode: mode });
	}, "aggregate");
	createListBox(container, "GroupSummaryMode", ["none", "aggregate", "statistical"], function (e) {
		var mode = _getSelected(e);
		grdMain.setRowGroup({ summaryMode: mode });
	}, "aggregate");
	createListBox(container, "Summary", ["count", "min", "max", "sum", "avg", "var", "varp", "stdev", "stdevp"], function (e) {
	}, "count");
}

