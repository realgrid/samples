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

  setTests("actions", "ColumnHeights");
});
 
function setFields(provider) {
    var fields = [{
        fieldName: "OrderID",
        dataType: "text"
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
        "dataType": "numeric"
    }, {
        fieldName: "UnitPrice",
        "dataType": "numeric"
    }];
 
    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        type: "group",
        orientation: "vertical",
        width: 120,
        header: {
            visible: false
        },
        columns: [{
            name: "OrderID",
            fieldName: "OrderID",
            width: "90",
            fillHeight: 40,
            styles: {
                textAlignment: "center",
                background: "#110000ff"
            },
            header: {
                text: "Order ID"
            }
        }, {
            name: "CustomerID",
            fieldName: "CustomerID",
            width: "130",
            styles: {
                textAlignment: "center"
            },
            header: {
                text: "Customer ID"
            }
        }, {
            name: "EmployeeID",
            fieldName: "EmployeeID",
            width: "100",
            fillHeight: 60,
            styles: {
                textAlignment: "center",
                background: "#1100ff00"
            },
            header: {
                text: "Employee ID"
            }
        }]
    }, {
        type: "group",
        orientation: "vertical",
        width: 120,
        header: {
            visible: false
        },
        columns: [{
            name: "Country",
            fieldName: "Country",
            width: "100",
            header: {
                text: "Country"
            },
            styles: {
                textAlignment: "near"
            }
        }, {
            name: "CompanyName",
            fieldName: "CompanyName",
            width: "200",
            fillHeight: 100,
            styles: {
                textAlignment: "near",
                textWrap: "normal",
                background: "#1100ff00"
            },
            header: {
                text: "Company Name"
            }
        }]
    }, {
        type: "group",
        orientation: "vertical",
        width: 150,
        header: {
            visible: false
        },
        columns: [{
            name: "ProductName",
            fieldName: "ProductName",
            width: "200",
            fillHeight:40,
            styles: {
                textAlignment: "near",
                textWrap: "normal",
                background: "#1100ff00"
            },
            header: {
                text: "Product Name"
            }
        }, {
            name: "QuantityPerUnit",
            fieldName: "QuantityPerUnit",
            width: "100",
            fillHeight:60,
            styles: {
                textAlignment: "near",
                textWrap: "normal",
                background: "#110000ff"
            },
            header: {
                text: "Quantity / Unit"
            }
        }]
    }, {
        name: "OrderDate",
        fieldName: "OrderDate",
        width: "130",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "Order Date"
        }
    }, {
        name: "Phone",
        fieldName: "Phone",
        width: "100",
        styles: {
            textAlignment: "near"
        },
        header: {
            text: "Phone"
        }
    }, {
        name: "Quantity",
        fieldName: "Quantity",
        width: "100",
        styles: {
            textAlignment: "far"
        },
        header: {
            text: "Quantity"
        },
        footer: {
            "expression": "sum",
            styles: {
                textAlignment: "far",
                numberFormat: "#,000"
            }
        }
    }, {
        name: "UnitPrice",
        fieldName: "UnitPrice",
        width: "100",
        styles: {
            textAlignment: "far"
        },
        header: {
            text: "Unit Price"
        },
        footer: {
            expression: "avg",
            styles: {
                textAlignment: "far",
                numberFormat: "0.00",
                prefix: "AVG = "
            }
        }
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        panel: {
            visible: false
        },
        stateBar: {
            visible: false
        },
        header: {
            minHeight: 30,
            resizable: true
        },
        footer: {
            visible: false
        },
        display: {
            heightMeasurer: "fixed",
            rowHeight: 80,
            rowResizable: true
        },
        edit: {
            insertable: true,
            appendable: true
        },
        fixed: {
            rowResizable: false,
            rowCount: 1
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function setStyles(grid) {
    grdMain.setStyles({
        body: {
            dynamicStyles: [{
                criteria: "state = 'd'",
                styles: "background=#11000000;foreground=#ffaaaaaa"
            }, {
                criteria: "state = 'u'",
                styles: "background=#11ffff00"
            }, {
                criteria: "state = 'c'",
                styles: "background=#11ff00ff"
            }, {
                criteria: "state = 'x'",
                styles: "background=#1100ffff;foreground=#ffaaaaaa"
            }]
        }
    });
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

var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
