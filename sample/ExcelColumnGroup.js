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
    
  setTests("actions", "Excel - ColumnGroup");
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
            width: "80",
            styles: {
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
                textAlignment: "far",
                paddingRight: 5
            },
            header: {
                text: "Unit Price"
            },
            footer: {
                expression: "sum",
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
        panel: {
            visible: false
        },
        stateBar: {
            visible: false
        },
        select: {
            style: RealGridJS.SelectionStyle.ROWS
        },
        footer: {
            visible: true
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
    $("#loadResult").css("color", "green").text(provider.getRowCount() + " rows loaded.").show();
/*  
    $.ajaxSetup({ cache: false });
 
    var params = {
        CustomerId: ""
    };
 
    $.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders", params, function (data) {
        provider.setRows(data);
        $("#loadResult").css("color", "green").text(provider.getRowCount() + " rows loaded.").show();
    })
    .done(function () {
        grdMain.setFocus();
    })
    .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console && console.log("jQuery getJSON()  Failed: " + err);
        alert("jQuery getJSON()  Failed: " + err);
    })
*/    
}
 
var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    },
    "Save to Local": function () {
        grdMain.exportGrid({
            target: "local"
        });
    },
    "Upload to Server": function () {
        grdMain.exportGrid({
            url:  "http://demo.realgrid.net/Demo/ExcelXBin?__time__=" + new Date().getTime()
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
	*/
}
