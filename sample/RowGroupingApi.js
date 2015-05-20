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
    
  setTests("actions", "RowGroupingApi");
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
            "expression": "stdev",
            "groupExpression": "stdev"
        }
    }];

    grid.setColumns(columns);
}

function setOptions(grid) {
    grid.setOptions({
        summaryMode: RealGridJS.SummaryMode.AGGREGATE,
        header: {
            height: 30
        },
        stateBar: {
            visible: true
        },
        selecting: {
            style: RealGridJS.SelectionStyle.ROWS
        },
        grouping: {
            //toast: "Grouping..."
        }
    });
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
}

function loadData(provider) {
    provider.setRows(CustomerOrders);

    provider.checkRowStates(false);
    try {
        for (var i = 0; i < 10; i++) {
            provider.addRows(CustomerOrders);
        }
    } finally {
        provider.checkRowStates(true);
    }

    var count = provider.getRowCount();
    $("#loadResult").css("color", "green").text(parseInt(count) + " rows loaded.").show();
}

var tests = {
    grouping: function () {
        grdMain.groupBy(["OrderID", "CustomerID"]);
    },
    ungrouping: function () {
        grdMain.groupBy(null);
    },
    groupLevel: function () {
        var idx = grdMain.getCurrent();
        if (idx.fieldIndex >= 0) {
            var level = grdMain.getGroupLevel(idx.fieldIndex);
            alert("Group level of " + idx.fieldName + ": " + level);
        }
    },
    groupLevels: function () {
        alert("Group levels: " + grdMain.getGroupLevels());
    },
    getGroupItem: function () {
        var idx = grdMain.getCurrent();
        if (idx.itemIndex >= 0) {
            var g = grdMain.getGroupIndex(idx.itemIndex);
            if (g >= 0) {
                idx.itemIndex = g;
                grdMain.setCurrent(idx);
            } else {
                alert("No group");
            }
        }
    },
    checkGroupItem: function () {
        var idx = grdMain.getCurrent();
        if (grdMain.isGroupItem(idx.itemIndex)) {
            alert("Group item");
        } else {
            alert("Not group item");
        }
    },
    expand: function () {
        var recursive = _getChecked("recursive");
        var force = _getChecked("force");
        var itemIndex = grdMain.getCurrent().itemIndex;

        if (grdMain.isGroupItem(itemIndex)) {
            grdMain.expandGroup(itemIndex, recursive, force);
        }
    },
    collapse: function () {
        var recursive = _getChecked("recursive");
        var itemIndex = grdMain.getCurrent().itemIndex;

        if (grdMain.isGroupItem(itemIndex)) {
            grdMain.collapseGroup(itemIndex, recursive);
        }
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	createCheckBox(container, "recursive", function (e) {
	}, false);
	createCheckBox(container, "force", function (e) {
	}, false);
}
