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

  setTests("actions", "ColumnLayout");

    // create column layouts
  createLayouts(grdMain);
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
        dataType: "datetime",
        "dateFormat": "yyyy-MM-dd a hh:mm:ss",
        "amText": "오전",
        "pmText": "오후"
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
        name: "GroupOrder",
        orientation: "vertical",
        width: "150",
        header: {
            text: "Order",
            "visible": true
        },
        columns: [{
            type: "group",
            name: "GruopIds",
            width: "200",
            header: {
                text: "IDs",
                visible: true
            },
            columns: [{
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
            }]
        }, {
            name: "OrderDate",
            fieldName: "OrderDate",
            type: "data",
            width: "130",
            styles: {
                textAlignment: "center"
            },
            header: {
                text: "Order Date"
            }
        }]
    }, {
        type: "group",
        name: "GroupCustomer",
        width: "260",
        header: {
            text: "Customer"
        },
        columns: [{
            name: "CompanyName",
            fieldName: "CompanyName",
            type: "data",
            width: "200",
            styles: {
                textAlignment: "near"
            },
            header: {
                text: "Company"
            }
        }, {
            type: "group",
            name: "GroupCompany",
            width: "150",
            orientation: "vertical",
            header: {
                text: "Company"
            },
            columns: [{
                name: "CustomerID",
                fieldName: "CustomerID",
                type: "data",
                width: "100",
                styles: {
                    textAlignment: "center"
                },
                header: {
                    text: "ID"
                }
            }, {
                name: "Country",
                fieldName: "Country",
                width: "100",
                styles: {
                    textAlignment: "center"
                },
                header: {
                    text: "Country"
                }
            }, {
                name: "Phone",
                fieldName: "Phone",
                width: "100",
                styles: {
                    textAlignment: "center"
                },
                header: {
                    text: "Phone"
                }
            }]
        }]
    }, {
        name: "ProductName",
        fieldName: "ProductName",
        width: "130",
        mergeRule: {
            criteria: "value"
        },
        styles: {
            textAlignment: "near"
        },
        header: {
            text: "Product"
        }
    }, {
        type: "group",
        name: "ProductGroup",
        width: 200,
        header: "ProductName2",
        columns:[{
            name: "ProductName2",
            fieldName: "ProductName",
            width: "130",
            mergeRule: {
                criteria: "value"
            },
            styles: {
                textAlignment: "near"
            },
            header: {
                text: "Product"
            }
        }]
    }, {
        type: "group",
        name: "GroupSales",
        width: "240",
        header: {
            text: "Sales"
        },
        columns: [{
            name: "Unit",
            fieldName: "QuantityPerUnit",
            width: "150",
            styles: {
                textAlignment: "near"
            },
            header: {
                text: "Unit"
            }
        }, {
            name: "Quantity",
            fieldName: "Quantity",
            width: "80",
            styles: {
                numberFormat: "#,##0",
                textAlignment: "far",
                paddingRight: 5,
                fontFamily: "Arial",
                fontSize: 11,
                fontBold: true
            },
            header: {
                text: "Quantity"
            },
            footer: {
                expression: "sum",
                groupExpression: "sum",
                styles: {
                    textAlignment: "far",
                    numberFormat: "#,##0"
                }
            }
        }, {
            name: "UnitPrice",
            fieldName: "UnitPrice",
            width: "100",
            styles: {
                numberFormat: "#,##0.0",
                textAlignment: "far",
                paddingRight: 5
            },
            header: {
                text: "Unit Price"
            },
            mergeRule: {
                criteria: "value"
            },
            footer: {
                expression: "sum",
                groupExpression: "sum",
                styles: {
                    textAlignment: "far",
                    numberFormat: "#,##0.0",
                    suffix: "$"
                }
            }
        }]
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        stateBar: {
            visible: false
        },
        panel: {
            visible: true
        },
        header: {
            height2: 75
        },
        display: {
            rowHeight2: 50
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function setStyles(grid) {
    grid.setStyles({
        header: {
            group: {
                background: "linear,#ffe9f0f8,#ffc3f8d8,90",
                foreground: "#ff666666"
            }
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

function createLayouts(grid) {
    var layouts = [{
        name: "layout_1",
        columns: [
            "OrderID", "EmployeeID", "OrderDate", "OrderID"
        ]
    }, {
        name: "layout_2",
        columns: [{
            "header":"Order",
            "orientation":"vertical",
            "width":150,
            "columns":[
                {
                    "header": "IDs",
                    "orientation":"horizontal",
                    "width":200,
                    "columns":[
                        "OrderID",
                        "EmployeeID"
                    ]
                },
                "OrderDate"
            ]
        }]
    }];

    grid.registerColumnLayouts(layouts);
}

function saveLayout(SessionId) {
    var dispCols = grdMain.getDisplayColumns();
    var params = {Id: SessionId, layout:JSON.stringify(dispCols)};
    $.ajax({
        type: "post",
        url: "/Demo/SetColumnLayout",
        data: params
    });
}

function loadLayout(SessionId) {
    var params = {Id: SessionId};
    $.ajax({
        type: "post",
        url: "/Demo/GetColumnLayout",
        data: params,
        success: function (responseData) {
            console.log(responseData);
            var layout = JSON.parse(responseData);
            grdMain.setColumnLayout(layout);
        }
    });
}

var tests = {
    linearize: function () {
        grdMain.restoreColumns();
        grdMain.linearizeColumns();
        grdMain.setFocus();
    },
    restore: function () {
        grdMain.restoreColumns();
        grdMain.setFocus();
    },
    setLayout: function () {
        var layout = [
            "OrderID", "EmployeeID", "OrderDate", "CompanyName", "CustomerID", "OrderId"
        ];

        //grdMain.restoreColumns();
        grdMain.setColumnLayout(layout);
        grdMain.setFocus();
    },
    selectLayout_1: function () {
        grdMain.restoreColumns();
        grdMain.setColumnLayout("layout_1");
        grdMain.setFocus();
    },
    selectLayout_2: function () {
        grdMain.restoreColumns();
        grdMain.setColumnLayout("layout_2");
        grdMain.setFocus();
    },
    saveLayout: function () {
        saveCols = JSON.stringify(grdMain.saveColumnLayout());
    },
    loadLayout: function () {
        var cols = JSON.parse(saveCols);
        grdMain.setColumnLayout(cols);
    }
};

var saveCols;

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
