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
    
  setTests("actions", "Export - Merged RowGroup");
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
    var columns2 = [{
        fieldName: "Country",
        width: "80",
        styles: {
            textAlignment: "near"
        },
        header: {
            text: "Country"
        },
        footer: {
            expression: "count",
            groupExpression: "count",
            styles: {
                "suffix": " countries"
            }
        }
    }, {
        fieldName: "CompanyName",
        width: "160",
        styles: {
            textAlignment: "near"
        },
        header: {
            text: "Company"
        },
        footer: {
            groupExpression: "count",
            styles: {
                "suffix": " compaines"
            }
        }
    }];

    var columns = [{
        fieldName: "Country",
        width: "80",
        styles: {
            textAlignment: "near"
        },
        header: {
            text: "Country"
        },
        footer: {
            expression: "count",
            groupExpression: "count",
            styles: {
                "suffix": " countries"
            }
        }
    }, {
        fieldName: "CompanyName",
        width: "160",
        styles: {
            textAlignment: "near"
        },
        header: {
            text: "Company"
        },
        footer: {
            groupExpression: "count",
            styles: {
                "suffix": " compaines"
            }
        }
    },  {
        fieldName: "OrderID",
        width: "70",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "Order ID"
        },
        footer: {
            groupExpression: "count",
            styles: {
                "suffix": " orders"
            }
        }
    }, {
        fieldName: "ProductName",
        width: "160",
        styles: {
            textAlignment: "near"
        },
        header: {
            text: "Product"
        }
    }, {
        fieldName: "QuantityPerUnit",
        width: "140",
        styles: {
            textAlignment: "near"
        },
        header: {
            text: "Unit"
        },
        footer: {
            styles: {
                textAlignment: "far"
            },
            text: "합계 =>"
        }
    }, {
        fieldName: "Quantity",
        width: "60",
        styles: {
            textAlignment: "far"
        },
        header: {
            text: "Quantity"
        },
        footer: {
            styles: {
                textAlignment: "far",
                numberFormat: "0,000",
                suffix: " $"
            },
            text: "합계",
            expression: "sum",
            groupExpression: "sum"
        }
    }, {
        fieldName: "CustomerID",
        width: "130",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "Customer ID"
        }
    }, {
        fieldName: "UnitPrice",
        width: "80",
        styles: {
            textAlignment: "far"
        },
        header: {
            text: "Unit Price"
        },
        footer: {
            styles: {
                textAlignment: "far",
                numberFormat: "0,000",
                suffix: " $"
            },
            text: "Variance",
            expression: "sum",
            groupExpression: "sum"
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
            visible: false
        },
        stateBar: {
            visible: false
        },
        display: {
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
        select: {
            style: RealGridJS.SelectionStyle.ROWS
        }
    });

    grid.groupBy(["Country"]);
}

function setSkin() {
    grdMain.setStyles(skin103.SkinSource);
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
    $.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders", null, function (data) {
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
    createCheckBox(container, "allItems", function (e) {
    }, true);
    createListBox(container, "expandedAdornments", ["footer", "header", "both"], function (e) {
        grdMain.setRowGroup({expandedAdornments: _getSelected(e)});
    }, "footer");
    createListBox(container, "collapsedAdornments", ["footer", "header", "both"], function (e) {
        grdMain.setRowGroup({collapsedAdornments: _getSelected(e)});
    }, "footer");
}
