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
    
  setTests("actions", "RowGroupMerging");
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
		dataType: "numeric"
	}, {
		fieldName: "UnitPrice",
		dataType: "numeric"
	}];

    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
		"fieldName": "Country",
		"width": "80",
		"styles": { 
			"textAlignment": "near" 
			},
		"header": {
			"text": "Country"
			},
        "footer": {
            "expression": "count",
            "groupExpression": "count",
            "styles": {
                "suffix": " countries"
             }
        }
    }, {
		"fieldName": "CompanyName",
		"width": "160",
		"styles": { 
			"textAlignment": "near" 
			},
		"header": {
			"text": "Company"
			},
        "footer": {
            "groupExpression": "count",
            "styles": {
                "suffix": " compaines"
            }
        }
    },  {
	    "fieldName": "OrderID",
	    "width": "70",
	    "styles": { 
		    "textAlignment": "center"
		    },
	    "header": {
		    "text": "Order ID"
		    },
        "footer": {
            "groupExpression": "count",
            "styles": {
                "suffix": " orders"
            }
        }
    }, {
		"fieldName": "ProductName",
		"width": "160",
		"styles": { 
			"textAlignment": "near" 
			},
		"header": {
			"text": "Product"
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
                "textAlignment": "far"
            },
            "text": "합계 =>"
        }
    }, {
        "fieldName": "Quantity",
        "width": "60",
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
				"postfix": " $"
				},
			"text": "합계",
			"expression": "sum",
			"groupExpression": "sum"
		}
    }, {
        "fieldName": "CustomerID",
        "width": "130",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Customer ID"
        }
    }, {
        "fieldName": "UnitPrice",
        "width": "80",
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
                "postfix": " $"
            },
            "text": "Variance",
            "expression": "sum",
            "groupExpression": "sum"
        }
    }];

    grid.setColumns(columns);
}

function setOptions(grid) {
    grid.setOptions({
        panel: {
            visible: true
        },
        footer: {
            visible: true
        },
        stateBar: {
            visible: false
        },
        display: {
        	columnMovable: true
        },
        header: {
        },
        sorting: {
            handleVisibility: "hidden"
        },
        rowGroup: {
            mergeMode: true,
            expandedAdornments: "footer",
            collapsedAdornments: "footer",
            headerStatement: " ${rowCount} rows"
        },
        grouping: {
            linear: true
        },
        select: {
            style: RealGridJS.SelectionStyle.ROWS
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
	
	// 49번 스타일이 잘못되어 있음.
	grdMain.setOptions({
		checkBar: {
			footStyles: {
				borderBottom: null
			}
		}
	});
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

function loadOptions(grid) {
    var rowGroup = grid.getRowGroupOptions();

    $(':radio[name=expanded]:input[value=' + rowGroup.expandedAdornments + ']').attr("checked", true);
    $(':radio[name=collapsed]:input[value=' + rowGroup.collapsedAdornments + ']').attr("checked", true);
    $(':radio[name=expander]:input[value=' + rowGroup.mergeExpander + ']').attr("checked", true);
}

function loadData(provider) {
    provider.setRows(CustomerOrders);
    var count = provider.getRowCount();
    $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
}

function expandedAdornmentsChange(e) {
    grdMain.setRowGroupOptions({
        expandedAdornments: $(':radio[name="expanded"]:checked').val()
    });
}

function collapsedAdornmentsChange(e) {
    grdMain.setRowGroupOptions({
        collapsedAdornments: $(':radio[name="collapsed"]:checked').val()
    });
}

function expanderChange(e) {
    grdMain.setRowGroupOptions({
        mergeExpander: $(':radio[name="expander"]:checked').val()
    });
}

var tests = {
    getChildModels: function () {
        var pModel = grdMain.getParentModel(grdMain.getModel(1));
        var cModels = grdMain.getChildModels(pModel);
        console.log(JSON.stringify(cModels));
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
    createListBox(container, "expandedAdornments", ["footer", "header", "both"], function (e) {
        grdMain.setRowGroup({ expandedAdornments: _getSelected(e) });
    }, "footer");
    createListBox(container, "collapsedAdornments", ["footer", "header", "both"], function (e) {
        grdMain.setRowGroup({ collapsedAdornments: _getSelected(e) });
    }, "footer");
    createCheckBox(container, "mergeExpander", function (e) {
        grdMain.setRowGroup({ mergeExpander: _getChecked(e) });
    }, true);
    createCheckBox(container, "mergeMode", function (e) {
        grdMain.setRowGroup({ mergeMode: _getChecked(e) });
    }, true);
}
