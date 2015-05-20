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
    
  setTests("actions", "ColumnGrouping");
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
        dataType: "number"
    }, {
        fieldName: "UnitPrice",
        dataType: "number"
    }];

    provider.setFields(fields, "ColumnGrouping");
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
            name: "GroupIds",
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
            width: "100",
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
    }, {
        name: "Company2",
        fieldName: "CompanyName",
        width: "100",
        styles: {
            numberFormat: "#,##0",
            textAlignment: "near",
            paddingRight: 5,
            fontFamily: "Arial",
            fontSize: 11,
            fontBold: true,
            background: "#110000ff",
            foreground: "#000088"
        },
        header: {
            text: "Company 2"
        },
        footer: {
            expression: "sum",
            groupExpression: "sum",
            styles: {
                textAlignment: "near",
                numberFormat: "#,##0"
            }
        }
    }];

    grid.setColumns(columns);
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
	
	// 49번 스타일이 잘못되어 있음.
	grdMain.setOptions({
		checkBar: {
			footStyles: {
				borderBottom: null
			}
		}
	});
}

function setOptions(grid) {
    grid.setOptions({
        stateBar: {
            visible: true
        },
        panel: {
            visible: true
        },
        header: {
            height: 79
        },
        display: {
            rowHeight: 50
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    provider.setRows(CustomerOrders);
    //var count = provider.getRowCount();
    //$("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
}

function createGroupList(grid) {
    var names = grid.getGroupNames();
    var list = $("#groupList");
    appendListOptions(names, list);
}

function selectGroup() {
    var column;
    var header;
    var colName = _getSelected("Column");

    if (colName) {
        var columns = grdMain.columnsByTag("sel");
        if (columns && columns.length) {
            for (var i = 0; i < columns.length; i++) {
                column = columns[i];
                grdMain.setColumnProperty(column, "tag", undefined);

                header = {};
                header.styles = {
                    borderLeft: undefined,
                    borderRight: undefined,
                    borderTop: undefined,
                    borderBottom: undefined
                };
                grdMain.setColumnProperty(column, "header", header);
            }
        }

        column = grdMain.columnByName(colName);
        if (column) {
            grdMain.setColumnProperty(column, "tag", "sel");

            header = {};
            header.styles = {
                borderLeft: "#ff000000,2",
                borderRight: "#ff000000,2",
                borderTop: "#ff000000,2",
                borderBottom: "#ff000000,2"
            };
            grdMain.setColumnProperty(column, "header", header);
        }
    }
}

function getSelected() {
    var colName = _getSelected("Column");
    return colName ? grdMain.columnByName(colName) : null;
}


var tests = {
    toggleOrientation: function () {
        var group = getSelected();
        if (group) {
            var orientation = grdMain.getColumnProperty(group, "orientation");
            orientation = (orientation == "vertical") ? "horizontal" : "vertical";
            grdMain.setColumnProperty(group, "orientation", orientation);
        }
    },
    toggleHeaderVisible: function () {
        var group = getSelected();
        if (group) {
            var header = grdMain.getColumnProperty(group, "header");
            header.visible = !header.visible;
            grdMain.setColumnProperty(group, "header", header);
        }
    },
    toggleHideChildHeaders: function () {
        var group = getSelected();
        if (group) {
            var hide = !grdMain.getColumnProperty(group, "hideChildHeaders");
            grdMain.setColumnProperty(group, "hideChildHeaders", hide);
        }
    },
    incWidth: function () {
        var group = getSelected();
        if (group) {
            var width = grdMain.getColumnProperty(group, "displayWidth") + 10;
            grdMain.setColumnProperty(group, "displayWidth", width);
        }
    },
    decWidth: function () {
        var group = getSelected();
        if (group) {
            var width = grdMain.getColumnProperty(group, "displayWidth") - 10;
            grdMain.setColumnProperty(group, "displayWidth", width);
        }
    },
    getDisplayColumns: function () {
        var cols = grdMain.getDisplayColumns();
        alert(JSON.stringify(cols));
        console.log(JSON.stringify(cols));
    },
	addRow: function () {
		dataProvider.addRows([{}]);
	},
	setFixed: function () {
		grdMain.setFixedOptions({
			colCount: 3
		});
	},
    toggleVisible: function () {
        var col = grdMain.columnByName("OrderID");
        grdMain.setColumnProperty(col, "visible", !col.visible);
    },
    getColumnNames: function () {
        var cols = grdMain.getColumnNames(true);
        alert(cols);
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	createCheckBox(container, "parentChangable", function (e) {
		grdMain.setDisplayOptions({
            parentChangable: e.target.checked
        });
    }, false);
    createListBox(container, "Column", ["SelcectColumn", "GroupOrder", "GroupCustomer", "ProductName", "GroupSales"], function (e) {
        selectGroup();
    });
}

