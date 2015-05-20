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
    
  setTests("actions", "ShapeCellRenderer");
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
        dataType: "number"
    }, {
        fieldName: "UnitPrice",
        dataType: "number"
    }];
 
    provider.setFields(fields);
}
 
function setColumns(grid) {
    var columns = [{
        "name": "OrderID",
        "fieldName": "OrderID",
        "type": "data",
        "width": "90",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Order ID"
        }
    }, {
        "name": "CustomerID",
        "fieldName": "CustomerID",
        "type": "data",
        "width": "100",
        "renderer": {
            "type": "shape"
        },
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Customer ID"
        }
    }, {
        "name": "CustomerID",
        "fieldName": "CustomerID",
        "type": "data",
        "width": "130",
        "renderer": {
            "type": "shape"
        },
        "dynamicStyles": [{
            "criteria": "(value = 'WARTH') or (value = 'HILAA')",
            "styles": {
                "figureBackground": "#ff0000ff",
                "figureName": "diamond"
            }
        }, {
            "criteria": "value = 'VINET'",
            "styles": "figureBackground=#ffffcc00;figureName=plus"
        }, {
            "criteria": "value = 'HANAR'",
            "styles": {
                "figureBackground": "#ff008800",
                "figureName": "minus",
                "iconLocation": "right",
                "paddingRight": 6
            }
        }, {
            "criteria": "value = 'HUNGO'",
            "styles": "figureBackground=#ff2ffc2f;figureBorder=#ffaaaaaa;figureName=equal"
        }, {
            "criteria": "value = 'SUPRD'",
            "styles": "figureBackground=#ffff44f5;figureName=rectangle"
        }],
        "styles": {
            "textAlignment": "center",
            "figureName": "null",
            "figureSize": 12,
            "paddingLeft": 6
        },
        "header": {
            "text": "ShapeCellRenderer",
            "styles": {
                "background": "linear,#22ffd500,#ffffd500,90"
            }
        }
    }, {
        "name": "EmployeeID",
        "fieldName": "EmployeeID",
        "type": "data",
        "width": "100",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Employee ID"
        }
    }, {
        "name": "Quantity",
        "fieldName": "Quantity",
        "type": "data",
        "width": "100",
        "renderer": {
            "type": "shape"
        },
        "styles": {
            "textAlignment": "far"
        },
        "dynamicStyles": [{
            "criteria": "value > 40",
            "styles": {
                "figureName": "star",
                "figureBackground": "#ffffcc00",
                "iconLocation": "center"
            }
        }],
        "header": {
            "text": "Quantity"
        }
    }, {
        "name": "Quantity2",
        "fieldName": "Quantity",
        "type": "data",
        "width": "100",
        "renderer": {
            "type": "shape"
        },
        "styles": {
            "figureName": "star",
            "figureBackground": "#ffffcc00",
            "iconLocation": "left",
            "iconPadding": "2"
        },
        "header": {
            "text": "Quantity2"
        }
    }, {
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "type": "data",
        "width": "100",
        "styles": {
            "textAlignment": "far"
        },
        "header": {
            "text": "Unit Price"
        }
    }, {
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "type": "data",
        "width": "130",
        "renderer": {
            "type": "shape"
        },
        "dynamicStyles": [{
            "criteria": "value < 20",
            "styles": "figureBackground=#ff0000ff;foreground=#ff0000ff;figureName=invertedtriangle"
        }, {
            "criteria": "value < 10",
            "styles": "background=#110000ff;figureBackground=#ff0000ff;foreground=#ff0000ff;figureName=downarrow"
        }, {
            "criteria": "value >= 20",
            "styles": "figureBackground=#ffff0000;foreground=#ffff0000;figureName=triangle"
        }, {
            "criteria": "value > 80",
            "styles": "background=#11ff0000;figureBackground=#ffff0000;foreground=#ffff0000;figureName=uparrow"
        }],
        "styles": {
            "textAlignment": "far",
            "figureName": "uparrow",
            "figureSize": "50%",
            "paddingLeft": 4
        },
        "header": {
            "text": "ShapeCellRenderer",
            "styles": {
                "background": "linear,#22ffd500,#ffffd500,90"
            }
        }
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
        "width": "100",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Country"
        }
    }, {
        "name": "Phone",
        "fieldName": "Phone",
        "type": "data",
        "width": "100",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Phone"
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
        display: {
            rowHeight: 30
        },
        header: {
            minHeight: 30
        },
        footer: {
            visible: false
        },
        checkBar: {
            visible: false
        },
        stateBar: {
            visible: false
        }
    });
}
 
function setStyles() {
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    provider.setRows(CustomerOrders);
    var count = provider.getRowCount();
    $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
/*
    $.ajaxSetup({ cache: false });
 
    var params = {
        CustomerId: ""
    };
 
    $.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders", params, function (data) {
        provider.setRows(data);
        var count = provider.getRowCount();
        $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
    })
    .done(function () {
        grdMain.setFocus();
    })
    .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console && console.log("jQuery getJSON() Failed: " + err);
        alert("jQuery getJSON() Failed: " + err);
    });
*/    
}

var tests = {
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
