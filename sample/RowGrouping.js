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
    
  setTests("actions", "RowGrouping");

  grdMain.onGrouping = function (grid, fields) {
      console.log('grouping: ' + JSON.stringify(fields));
      //return false;
  };
  grdMain.onGroupingChanged = function (grid) {
      console.log('groupingChanged: ' + JSON.stringify(grid.getGroupFieldNames(true)));
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
        "textInputCase": "upper",
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
        },
        edit: {
        	insertable: true
        },
        display: {
            rowResizable: true
        },
        fixed: {
            rowCount: 0
        }
    });
    
    //grid.groupBy(["Country", "CompanyName"]);
}

function setSkin(skinId) {
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

function setRowGroupOptions(summary, expanded, collapsed) {
    var options = new RealGridJS.RowGroupOptions();
    console.log("summay:" + summary + "," + "expanede:" + expanded + "," + "collapsed:" + collapsed);
    options.summaryMode = summary;
    options.expandedAdornments = expanded;
    options.collapsedAdornments = collapsed;

    grdMain.setRowGroupOptions(options);
};

function headerStatementChangeHandler(e) {
    var stateCase = $(':radio[name="headerStatement"]:checked').val();
    var statement = "${"+stateCase+"}: ${groupValue} - ${rowCount} rows";
    grdMain.setRowGroupOptions({
        headerStatement: statement
    });
}

function chkLinearHandler(e) {
   var linear = $("#chkLinear").is(":checked");
   grdMain.setGroupingOptions({
        linear: linear
   });
}

function btnAdornmentsHandler(e) {
	grdMain.setRowGroupOptions({
        expandedAdornments: "header",
        collapsedAdornments: "both"
    });
}

function btnAdornments2Handler(e) {
	grdMain.setRowGroupOptions({
        expandedAdornments: "both",
        collapsedAdornments: "header"
    });
}

function btnSetColumnHandler(e) {
	var col = grdMain.columnByName("Country");
	col.header.text = "xxxx";
	grdMain.setColumn(col);
}

function btnSetGroupHeaderHandler(e) {
	grdMain.setRowGroupOptions({
		headerStatement: "${columnHeader}: ${groupValue} - ${rowCount} rows"
	});
}

function btnVersionHandler(e) {
	alert(RealGridJS.getVersion());
}

function btnGetDataValueHandler(e) {
	var curr = grdMain.getCurrent();
	alert(dataProvider.getValue(curr.dataRow, curr.fieldIndex));
}

function btnSetDataValueHandler(e) {
	var curr = grdMain.getCurrent();
	var v = dataProvider.getValue(curr.dataRow, curr.fieldIndex);
	dataProvider.setValue(curr.dataRow, curr.fieldIndex, v + "_xxxx");
}

function btnGetValueHandler(e) {
	var curr = grdMain.getCurrent();
	alert(grdMain.getValue(curr.itemIndex, curr.fieldIndex));
}

function btnSetValueHandler(e) {
	var curr = grdMain.getCurrent();
	var v = grdMain.getValue(curr.itemIndex, curr.fieldIndex);
	grdMain.setValue(curr.itemIndex, curr.fieldIndex, v + "_xxxx");
}

function btnHideColumnHandler(e) {
	var col = grdMain.columnByName("Country");
	grdMain.setColumnProperty(col, "visible", !col.visible);
}

function btnSetFontHandler(e) {
	var col = grdMain.columnByName("Country");
	grdMain.setColumnProperty(col, "styles", {
		font: "굴림,12,bold,italic"
	});
}

function btnSetColumnsHandler(e) {
	var columns = [{
        name: "OrderID",
        fieldName: "OrderID",
        type: "data",
        width: "120",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "Order ID"
        }
    }, {
        name: "EmployeeID",
        fieldName: "EmployeeID",
        type: "data",
        width: "80",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "Emp ID"
        }
    }];

	grdMain.setColumns(columns);
}

function btnSetLinearHandler(e) {
	/*
	grdMain.setOptions({
		grouping: {
			linear: true
		}
	});
	*/
	var options = grdMain.getGroupingOptions();
	options.linear = !options.linear;
	grdMain.setGroupingOptions(options);
}

function btnOrderByHandler(e) {
	grdMain.orderBy(['Quantity'], ['descending']);
}

var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    },
	setRowState: function () {
		dataProvider.setRowState(0, RealGridJS.RowState.CREATE_AND_DELETED, true);
	},
	setFixedRows: function () {
		grdMain.setFixedOptions({
			rowCount: 2
		});
	},
    getGroupLevel: function () {
        alert(grdMain.getGroupLevel("Country"));
    },
    setRowGroup: function () {
        grdMain.setRowGroup({
            mergeMode: true
        });
        grdMain.groupBy(["Country"]);
    },
    setRowGroup2: function () {
        grdMain.setRowGroup({
            mergeMode: false
        })
    },
    setRowGroup3: function () {
        grdMain.groupBy([]);
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
