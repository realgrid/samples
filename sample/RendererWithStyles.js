var grdMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

$(document).ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
  dataProvider.setOptions({
      dateFormat: "yyyy-MM-dd a hh:mm:ss",
      amText: "오전",
      pmText: "오후"
  });
  setFields(dataProvider);

  grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);
	setColumns(grdMain);
	setOptions(grdMain);
  setSkin();
  setStyles(grdMain);

	loadData(dataProvider);
    
  setTests("actions", "RendererWithStyles");
});

function setFields(provider) {
    var fields = [{
        fieldName: "OrderID",
        dataType: "text"
    }, {
        fieldName: "CustomerID",
        dataType: "text"
    }, {
        fieldName: "EmployeeID",
        dataType: "text"
    }, {
        fieldName: "OrderDate",
        dataType: "datetime"
    }, {
        fieldName: "CompanyName",
        dataType: "text"
    }, {
        fieldName: "Country",
        dataType: "text"
    }, {
        fieldName: "Phone",
        dataType: "text"
    }, {
        fieldName: "ProductName",
        dataType: "text"
    }, {
        fieldName: "QuantityPerUnit",
        dataType: "text"
    }, {
        fieldName: "Quantity",
        dataType: "numeric"
    }, {
        fieldName: "UnitPrice",
        dataType: "numeric",
        baseField: "CustomerID"
    }];

    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        "name": "OrderID",
        "fieldName": "OrderID",
        "type": "data",
        "width": 60,
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Order ID"
        },
        "footer": {
            "text": "Count:%",
            "expression": "count"
        }
    }, {
        "fieldName": "CustomerID"
    }, {
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "type": "data",
        "width": 90,
        "styles": {
            "textAlignment": "far",
            "paddingRight": 5
        },
        "dynamicStyles": [{
            "criteria": "base = 'HANAR'",
            "styles": {
                "renderer": "signal02",
                "figureBackground": "#ff008800",
                "figureState": "value"
            }
        }],
        "header": {
            "text": "Unit Price"
        }
    }, {
        "name": "Quantity2",
        "fieldName": "Quantity",
        "type": "data",
        "width": 100,
        "styles": {
            "figureBackground": "linear,#ff000044,#ffeeeeee",
            "textAlignment": "far",
            "paddingRight": 5,
            "figureSize": "50%"
        },
        "dynamicStyles": [{
            "criteria": "value >= 20",
            "styles": {
                "renderer": "bar01"
            }
        }],
        "header": {
            "text": "Quantity"
        },
        "footer": {
            "styles": { "textAlignment": "far" },
            "text": "SUM",
            "expression": "sum"
        }
    }, {
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "type": "data",
        "width": 90,
        "styles": {
            "textAlignment": "far",
            "paddingLeft": 5
        },
        "dynamicStyles": [{
            "criteria": "checked",
            "maximum": 50,
            "styles": {
                "renderer": "shape01",
                "figureBackground": "#ff0000ff",
                "foreground": "#ff0000ff",
                "figureName": "invertedtriangle"
            }
        }, {
            "criteria": "value > 50",
            "styles": {
                "renderer": "shape01",
                "figureBackground": "#ff0000ff",
                "foreground": "#ffff0000",
                "figureName": "triangle"
            }
        }, {
            "criteria": "(value > 20) and (value < 30)",
            "styles": {
                "renderer": "bar02",
                "figureBackground": "#ff008800",
                "figureSize": "70%"
            }
        }],
        "header": {
            "text": "Unit Price"
        }
    }, {
        "name": "Quantity",
        "fieldName": "Quantity",
        "type": "data",
        "width": 100,
        "styles": {
            "textAlignment": "far"
        },
        "header": {
            "text": "Quantity"
        },
        "footer": {
            "styles": { "textAlignment": "far" },
            "text": "SUM",
            "expression": "sum"
        }
    }, {
        "name": "Quantity",
        "fieldName": "Quantity",
        "type": "data",
        "width": 100,
        "renderer": {
            "type": "bar",
            "minimum": 0,
            "maximum": 100,
            "minWidth": 150,
            "showLabel": true
        },
        "styles": {
            "figureBackground": "linear,#ff000044,#ffeeeeee,90",
            "textAlignment": "far",
            "paddingRight": 5,
            "figureSize": "70%"
        },
        "dynamicStyles": [{
            "criteria": "value >= 40",
            "styles": {
                "renderer": "signal01",
                "figureBackground": "#ff880000",
                "figureState": "value"
            }
        }],
        "header": {
            "text": "Quantity"
        }
    }, {
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "type": "data",
        "width": 90,
        "styles": {
            "textAlignment": "far",
            "paddingRight": 5
        },
        "header": {
            "text": "Unit Price"
        }
    }, {
        "type": "group",
        "width": "400",
        "header": {
            "text": "Company"
        },
        "columns": [{
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
            "width": "150",
            "styles": {
                "textAlignment": "center"
            },
            "header": {
                "text": "Country"
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
    }, {
        "name": "CustomerID",
        "fieldName": "CustomerID",
        "type": "data",
        "width": 80,
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
        "width": 70,
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Employee ID"
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
    }];

    grid.setColumns(columns);
}

function setOptions(grid) {
    grid.setOptions({
        stateBar: {
            visible: false
        },
        select: {
            style: RealGridJS.SelectionStyle.ROWS
        },
        footer: {
            visible: false
        }
    });

    setRenderers(grid);

    grid.setOptions({
		sorting: {
			style: RealGridJS.SortStyle.INCLUSIVE
		}
	});
}

function setRenderers(grid) {
    grid.addCellRenderers([{
        "id": "bar01",
        "type": "bar"
    }, {
        "id": "bar02",
        "type": "bar",
        "maximum": 30,
        "showLabel": false
    }, {
        "id": "shape01",
        "type": "shape"
    }, {
        "id": "signal01",
        "type": "signal",
        "barCount": 10,
        "minimum": 0,
        "maximum": 100
    }, {
        "id": "signal02",
        "type": "signal",
        "barCount": 10,
        "minimum": 0,
        "maximum": 50
    }]);
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

function loadData(provider) {
    provider.setRows(CustomerOrders);
    var count = provider.getRowCount();
    $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
}

var tests = {
    fitColumnWidth: function () {
        grdMain.fitColumnWidth("UnitPrice");
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
