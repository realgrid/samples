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

  setTests("actions", "ColumnResizing");
	createColumnList(grdMain);
});

function setFields(provider) {
	var fields = [{
		"fieldName": "OrderID",
		"dataType": "text"
	}, {
		"fieldName": "CustomerID",
		"dataType": "text"
	}, {
		"fieldName": "EmployeeID",
		"dataType": "text"
	}, {
		"fieldName": "OrderDate",
		"dataType": "datetime",
		"dateFormat": "yyyy-MM-dd a hh:mm:ss",
		"amText": "오전",
		"pmText": "오후"
	}, {
		"fieldName": "CompanyName",
		"dataType": "text"
	}, {
		"fieldName": "Country",
		"dataType": "text"
	}, {
		"fieldName": "Phone",
		"dataType": "text"
	}, {
		"fieldName": "ProductName",
		"dataType": "text"
	}, {
		"fieldName": "QuantityPerUnit",
		"dataType": "text"
	}, {
		"fieldName": "Quantity",
		"dataType": "text"
	}, {
		"fieldName": "UnitPrice",
		"dataType": "text"
	}];

	provider.setFields(fields);
}

function setColumns(grid) {
	var columns = [{
		"type": "group",
		"name": "GroupOrder",
		"orientation": "vertical",
		"width": 250,
		"columns": [{
			"type": "group",
			"name": "GroupIds",
			"columns": [{
				"name": "OrderID",
				"fieldName": "OrderID",
				"type": "data",
				"width": "90",
				"styles": {
					"textAlignment": "center"
				},
				"header": {
					"text": "Order"
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
				"name": "EmployeeID",
				"fieldName": "EmployeeID",
				"type": "data",
				"width": "100",
				"styles": {
					"textAlignment": "center"
				},
				"header": {
					"text": "Employee ID"
				}
			}]
		}, {
			"name": "OrderDate",
			"fieldName": "OrderDate",
			"type": "data",
			"width": "130",
			"styles": {
				"textAlignment": "center"
			},
			"header": {
				"text": "Order Date"
			}
		}]
	}, {
		"name": "CompanyName",
		"fieldName": "CompanyName",
		"type": "data",
		"width": "100",
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
		"width": "70",
		"styles": {
			"textAlignment": "center"
		},
		"header": {
			"text": "Country"
		}
	}, {
		"name": "Phone",
		"fieldName": "Phone",
		"type": "data",
		"width": "80",
		"styles": {
			"textAlignment": "near"
		},
		"header": {
			"text": "Phone"
		}
	}, {
		"type": "group",
		"name": "GroupSales",
		"width": 300,
		"columns": [{
			"type":"group",
			"name":"GroupProduct",
			"orientation":"vertical",
			"columns": [{
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
				"name": "QuantityPerUnit",
				"fieldName": "QuantityPerUnit",
				"type": "data",
				"width": "100",
				"styles": {
					"textAlignment": "near"
				},
				"header": {
					"text": "Quantity / Unit"
				}
			}]
		}, {
			"type": "group",
			"name": "GroupUnit",
			"orientation": "vertical",
			"columns": [{
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
			}]
		}]
	}];

	grid.setColumns(columns);
}

function setOptions(grid) {
	grid.setSortingOptions({
		enabled: false
	});
	grid.setFooter({
		visible: false
	});
	grid.setPanel({
		visible: false
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

function createColumnList(grid) {
	var names = grid.getColumnNames();
	_setListItems("Column", names);
}

function loadData(provider) {
  provider.setRows(CustomerOrders);
  
/*
	grdMain.showToast("Load data...", true);
	$.ajax({
		url: "http://demo.realgrid.net/Demo/GetCustomOrders",
		dataType: 'json',
		success: function (data) {
			grdMain.hideToast();
			provider.setRows(data);
		},
		complete: function (data) {
			grdMain.hideToast();
		}
	});
*/	
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

function getSelected() {
	var colName = _getSelected("Column");
	return colName ? grdMain.columnByName(colName) : null;
}

var tests = {
	toggleResizable: function () {
		var column = getSelected();
		if (column) {
			//grdMain.setColumnProperty(column, "resizable", !column.resizable);
			column.resizable = !column.resizable;
			grdMain.setColumn(column);

			column = getSelected();
			$("#txtMain").val(column.resizable ? "True" : "False");
		}
	},
	changeWidth: function () {
		var column = getSelected();
		if (column) {
			var newWidth = $("#txtSub").val();
			column.displayWidth = newWidth;
			grdMain.setColumn(column);
		}
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	$("#txtSub").show();
	createButtons(container, tests);
	createCheckBox(container, "columnResizable", function (e) {
		grdMain.setDisplayOptions({ columnResizable: _getChecked(e) });
	}, true);
	createListBox(container, "Column", ["SelcectColumn"], function (e) {
		var colName = _getSelected("Column")
		if (colName) {
			var columns = grdMain.columnsByTag("sel");
			if (columns) {
				for (i = 0; i < columns.length; i++) {
					var column = columns[i];
					column.tag = undefined;
					column.header = {};
					column.header.styles = {
						borderLeft: undefined,
						borderRight: undefined,
						borderTop: undefined,
						borderBottom: undefined
					};
					grdMain.setColumn(column);
				}
			}

			var column = grdMain.columnByName(colName);
			if (column) {
				$("#txtMain").val(column.movable ? "True" : "False");

				column.tag = "sel";
				column.header = {};
				column.header.styles = {
					borderLeft: "#ff660000,2",
					borderRight: "#ff660000,2",
					borderTop: "#ff660000,2",
					borderBottom: "#ff660000,2"
				};
				grdMain.setColumn(column);
			}
		}
	});
}

