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

	setTests("actions", "RowCount");
});

function setFields(provider) {
	var fields = [{
		fieldName: "OrderID",
		defaultValue: "order id"
	}, {
		fieldName: "CustomerID",
		defaultValue: "customer id"

	}, {
		fieldName: "CompanyName",
		defaultValue: "company"
	}, {
		fieldName: "Country"
	}, {
		fieldName: "ProductName",
		defaultValue: "product"
	}, {
		fieldName: "Quantity",
		dataType: "number",
		defaultValue: 1
	}, {
		fieldName: "UnitPrice",
		dataType: "number",
		defaultValue: 10
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
		"name": "CustomerID",
		"fieldName": "CustomerID",
		"type": "data",
		"width": "130",
		"styles": {
			"textAlignment": "center"
		},
		"header": {
			"text": "Customer ID"
		}
	}, {
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
	}, {
		"name": "Country",
		"fieldName": "Country",
		"type": "data",
		"width": "100",
		"styles": {
			"textAlignment": "center"
		},
		"header": {
			"text": "Country"
		}
	}, {
		"name": "ProductName",
		"fieldName": "ProductName",
		"type": "data",
		"width": "200",
		"styles": {
			"textAlignment": "near"
		},
		"header": {
			"text": "Product Name"
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
		}
	}];

	grid.setColumns(columns);
}

function setOptions(grid) {
	grid.setOptions({
		edit: {
			insertable: true,
			appendable: true,
			updatable: true,
			deletable: true
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
		selection: {
			background: "#11000000",
			border: "#88000000,1"
		}
	});
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

function loadData() {
  dataProvider.fillJsonData(CustomerOrders, {
				count: 10
			});
/*  
	grdMain.showToast("Load data...", true);
	$.ajax({
		url: "http://demo.realgrid.net/Demo/GetCustomOrders",
		dataType: 'json',
		success: function (data) {
			grdMain.hideToast();
			dataProvider.fillJsonData(data, {
				count: 10
			});
		},
		complete: function (data) {
			grdMain.hideToast();
		}
	});
*/	
}

var tests = {
	setRowCount: function () {
		var count = $("#txtMain").val();
		var defaults = _getChecked("fillDefaults");
		var values = null;
		var fill = _getChecked("fillValues");
		var state = _getSelected("rowState");

		if (fill) {
			values = [
				"OrderId",
				"CustomerId",
				"Company",
				"Country",
				"Product",
				0,
				100
			];
		}

		dataProvider.setRowCount(count, defaults, values, state);
	},
	clearRows: function () {
		dataProvider.clearRows();
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	createCheckBox(container, "fillDefaults", null, false);
	createCheckBox(container, "fillValues", null, false);
	createListBox(container, "rowState", ["none", "created", "updated", "createAndDeleted"], function (e) {
		grdMain.setStyles( { indicator: { textAlignment: _getSelected(e) } } );
	}, "none");
}
