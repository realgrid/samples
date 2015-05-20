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
    
  setTests("actions", "Selecting");
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
		"name": "OrderID",
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
            style: RealGridJS.SelectionStyle.ROWS
        },
        rowGroup: {
            summaryMode: RealGridJS.SummaryMode.STATISTICAL
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
		edit: {
			editable: true,
			insertable: true,
			appendable: true,
			deletable: true
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
	getVersion: function () {
		alert(RealGridJS.getVersion());
	},
	getOptions: function () {
		var options = grdMain.getSelectOptions();
		console.log(options);
	},
	setBlock: function () {
		grdMain.setSelectOptions({
			style: RealGridJS.SelectionStyle.BLOCK
		});
	},
	setRows: function () {
		grdMain.setSelectOptions({
			style: RealGridJS.SelectionStyle.ROWS
		});
	},
	setColumns: function () {
		grdMain.setSelectOptions({
			style: RealGridJS.SelectionStyle.COLUMNS
		});
	},
	setSingleRow: function () {
		grdMain.setSelectOptions({
			style: RealGridJS.SelectionStyle.SINGLE_ROW
		});
	},
	setSingleColumn: function () {
		grdMain.setSelectOptions({
			style: RealGridJS.SelectionStyle.SINGLE_COLUMN
		});
	},
	clearSelection: function () {
		grdMain.clearSelection();
	},
	deleteSelection: function () {
		grdMain.deleteSelection();
	},
	getSelection: function () {
		var item = grdMain.getSelection();
		console.log(item);
	},
    getSelectionData: function () {
        var data = grdMain.getSelectionData();
        console.log(JSON.stringify(data));
    },
	getSelectedItems: function () {
		var items = grdMain.getSelectedItems();
		console.log(items);
	},
	getSelectedRows: function () {
		var rows = grdMain.getSelectedRows();
		console.log(rows);
	},
	isItemEditing: function () {
		alert(grdMain.isItemEditing());
	},
	setSelection: function () {
		grdMain.setSelection({
			startItem: 1,
			endItem: 10,
			startColumn: "Country",
			endColumn: "OrderID",
			style: "rows"
		});
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	/*
	createCheckBox(container, "panel", function (e) {
		grdMain.panel().setVisible(e.target.checked);
	}, true);
	createCheckBox(container, "merged", function (e) {
		grdMain.rowGroup().setMergeMode(e.target.checked);
	}, false);
	*/
}
