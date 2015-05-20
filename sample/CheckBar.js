var grdMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

$(document).ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
  setFields(dataProvider);

  grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);
	
	setColumns(grdMain);
	setOptions(grdMain);
  setSkin();
  setStyles(grdMain);

	loadData(dataProvider);
    
  setTests("actions", "CheckBar");

  grdMain.onItemChecked = function (grid, itemIndex, checked) {
      console.log("$$$$$$$$$$$$ Item Checked: " + itemIndex + ", " + checked);
  };
  grdMain.onItemsChecked = function (grid, items, checked) {
      console.log("$$$$$$$$$$$$ Items Checked: " + items + ", " + checked);
  };
  grdMain.onItemAllChecked = function (grid, checked) {
      console.log("$$$$$$$$$$$$ Item All Checked: " + checked);
  };
});

function setFields(provider) {
    var fields = [{
		fieldName: "OrderID",
        header: "OrderID Field Header"
	}, {
		fieldName: "CustomerID",
		header: "CustomerID Field Header"
	}, {
		fieldName: "EmployeeID",
		header: "EmployeeID Field Header"
	}, {
		fieldName: "OrderDate",
		dataType: "datetime",
		header: "OrderDate Field Header"
	}, {
		fieldName: "CompanyName",
		header: "CompanyName Field Header"
	}, {
		fieldName: "Country",
		header: "Country Field Header"
	}, {
		fieldName: "Phone",
		header: "Phone Field Header"
	}, {
		fieldName: "ProductName",
		header: "ProductName Field Header"
	}, {
		fieldName: "QuantityPerUnit",
		header: "QuantityPerUnit Field Header"
	}, {
		fieldName: "Quantity",
		dataType: "numeric",
		header: "Quantity Field Header"
	}, {
		fieldName: "UnitPrice",
		dataType: "numeric",
		header: "UnitPrice Field Header"
	}];

	provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
		"name": "Country",
		"fieldName": "Country",
		"width": "80",
		"styles": { 
			"textAlignment": "near" 
			},
		"header": {
			"text": "Country"
			}
    }, {
		"name": "CompanyName",
		"fieldName": "CompanyName",
		"width": "160",
        "readOnly": true,
		"styles": { 
			"textAlignment": "near" 
			},
		"header": {
			"text": "Company"
			}
    }, {
        "name": "CompanyName",
        "fieldName": "CompanyName",
        "width": "160",
        "editable": false,
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Company"
        }
    },  {
	    "fieldName": "OrderID",
	    "width": "70",
	    "styles": { 
		    "textAlignment": "center"
		    },
	    "header": {
		    "text": "Order ID"
		    }
    }, {
        "fieldName": "QuantityPerUnit",
        "width": "140",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Unit"
        },
        "footer": {
            "styles": {
                "textAlignment": "far",
                "font": "굴림,12"
            },
            "text": "합계 =>"
        }
    }, {
        "fieldName": "Quantity",
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
				"numberFormat": "0,000.00",
				"suffix": " $",
				"font": "Arial,12"
			},
            "groupStyles": {
				"textAlignment": "far",
				"numberFormat": "#,##0.00",
                "foreground": "#ffffff",
                "fontBold": true
            },
			"text": "합계",
			"expression": "varp",
			"groupExpression": "varp"
		}
    }, {
        "fieldName": "CustomerID",
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
            "text": "분산 =>"
        }
    }, {
        "fieldName": "UnitPrice",
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
                "numberFormat": "0,.00",
                "postfix": " $",
                "font": "Arial,12"
            },
            "text": "Variance",
            "expression": "sum",
            "groupExpression": "var"
        }
    }];

    grid.setColumns(columns);
}

function setOptions(grid) {
    grid.setOptions({
        summaryMode: RealGridJS.SummaryMode.STATISTICAL,
        header: {
            height: 30
        },
        stateBar: {
            visible: true
        },
        selecting: {
            style: RealGridJS.SelectionStyle.BLOCK
        },
        rowGroup: {
            summaryMode: RealGridJS.SummaryMode.STATISTICAL
        },
        edit: {
            enterToTab: true,
            crossWhenExitLast: false,
            commitWhenExitLast: true
        }
    });
    
    //grid.groupBy(["Country", "CompanyName"]);
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function setStyles() {
    grdMain.setStyles({
        selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
	
	// 49번 스타일이 잘못되어 있음.
	grdMain.setOptions({
		checkBar: {
			footStyles: {
				borderBottom: null
			}
		},
        fixed: {
            rowCount: 1,
            rowResizable: true
        },
        display: {
            rowResizable: true
        }
	});
}

function loadData(provider) {
    provider.setRows(CustomerOrders);
    
    for (var i = 0; i < 10; i++) {
        provider.addRows(CustomerOrders);
    }
    
    var count = provider.getRowCount();
    $("#loadResult").css("color", "green").text(parseInt(count) + " rows loaded.").show();
}

var tests = {
    isCheckable: function () {
        var curr = grdMain.getCurrent();
        if (curr.itemIndex >= 0) {
            alert(grdMain.isCheckable(curr.itemIndex) ? "checkable" : "uncheckable");
        }
    },
    setCheckable: function () {
        var curr = grdMain.getCurrent();
        if (curr.itemIndex >= 0) {
            grdMain.setCheckable(curr.itemIndex, true);
        }
    },
    setUncheckable: function () {
        var curr = grdMain.getCurrent();
        if (curr.itemIndex >= 0) {
            grdMain.setCheckable(curr.itemIndex, false);
        }
    },
	getCheckedItems: function () {
		var items = grdMain.getCheckedItems(false);
		console.log(items);
	},
	getCheckedRows: function () {
		var rows = grdMain.getCheckedRows(true, false);
		console.log(rows);
	},
    checkAll: function () {
        var visibleOnly = _getChecked("visibleOnly");
        grdMain.checkAll(true, visibleOnly);
    },
    uncheckAll: function () {
        var visibleOnly = _getChecked("visibleOnly");
        grdMain.checkAll(false, visibleOnly);
    },
    checkItem: function () {
        var curr = grdMain.getCurrent();
        if (curr.itemIndex >= 0) {
            grdMain.checkItem(curr.itemIndex, true, _getChecked("exclusive"));
        }
    },
    uncheckItem: function () {
        var curr = grdMain.getCurrent();
        if (curr.itemIndex >= 0) {
            grdMain.checkItem(curr.itemIndex, false, _getChecked("exclusive"));
        }
    },
    checkRow: function () {
        var curr = grdMain.getCurrent();
        if (curr.dataRow >= 0) {
            grdMain.checkRow(curr.dataRow, true, _getChecked("exclusive"));
        }
    },
    uncheckRow: function () {
        var curr = grdMain.getCurrent();
        if (curr.dataRow >= 0) {
            grdMain.checkRow(curr.dataRow, false, _getChecked("exclusive"));
        }
    },
    checkItems: function () {
        var items = grdMain.getSelectedItems();
        grdMain.checkItems(items, true);
    },
    uncheckItems: function () {
        var items = grdMain.getSelectedItems();
        grdMain.checkItems(items, false);
    },
    checkRows: function () {
        var rows = grdMain.getSelectedRows();
        grdMain.checkRows(rows, true);
    },
    uncheckRows: function () {
        var rows = grdMain.getSelectedRows();
        grdMain.checkRows(rows, false);
    },
    isChecked: function () {
        var curr = grdMain.getCurrent();
        if (curr.itemIndex >= 0) {
            alert(grdMain.isCheckedItem(curr.itemIndex));
        }
    },
    isCheckedRow: function () {
        var curr = grdMain.getCurrent();
        if (curr.dataRow >= 0) {
            alert(grdMain.isCheckedRow(curr.dataRow));
        }
    },
    toggleAllCheck: function () {
        var checked = grdMain.isAllChecked();
        grdMain.setAllCheck(!checked);
    },
    setCheckbarExp: function () {
        grdMain.setCheckBar({
            checkableExpression: "state = 'u'"
        });
    },
    applyCheckable: function () {
        grdMain.applyCheckables();
    },
    setCheckableExpression: function () {
        grdMain.setCheckableExpression("values['Quantity'] < 1000", true);
    },
    unsetCheckableExpression: function () {
        grdMain.setCheckableExpression("", true);
    },
    resetCheckable: function () {
        grdMain.resetCheckables();
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	createCheckBox(container, "visible", function (e) {
		grdMain.setCheckBar({ visible: _getChecked(e) });
	}, true);
    createCheckBox(container, "exclusive", function (e) {
        grdMain.setCheckBar({ exclusive: _getChecked(e) });
    }, false);
    createCheckBox(container, "visibleOnly", function (e) {
        grdMain.setCheckBar({ visibleOnly: _getChecked(e) });
    }, false);
    createCheckBox(container, "showAll", function (e) {
        grdMain.setCheckBar({ showAll: _getChecked(e) });
    }, true);
    createCheckBox(container, "showGroup", function (e) {
        grdMain.setCheckBar({ showGroup: _getChecked(e) });
    }, true);
}
