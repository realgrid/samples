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
    
  setTests("actions", "BarCellRenderer");
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
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "type": "data",
        "width": 90,
        "renderer": {
            "type": "bar",
            "minimum": 0,
            "maximum": 100,
            "showLabel":false
        },
        "styles": {
            "textAlignment": "far",
            "paddingRight": 5
        },
        "header": {
            "text": "Unit Price"
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
            "figureBackground": "linear,#ff000044,#ffeeeeee",
            "textAlignment": "far",
            "paddingRight": 5,
            "figureSize": "50%"
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
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "type": "data",
        "width": 90,
        "renderer": {
            "type": "bar",
            "minimum": 0,
            "maximum": 100,
            "minWidth": 100,
            "showLabel": false,
            "origin":"right"
        },
        "styles": {
            "textAlignment": "far",
            "paddingRight": 5
        },
        "header": {
            "text": "Unit Price"
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
            "showLabel": true,
            "origin":"top"
        },
        "styles": {
            "figureBackground": "linear,#ff000044,#ffeeeeee,90",
            "textAlignment": "center",
            "lineAlignment": "far",
            "paddingRight": 5,
            "figureSize": "70%"
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
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "type": "data",
        "width": 90,
        "renderer": {
            "type": "bar",
            "minimum": 0,
            "maximum": 100,
            "minWidth": 100,
            "showLabel": false,
            "origin": "bottom"
        },
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
            "type": "group",
            "width": "200",
            "orientation": "vertical",
            "header": {
                "text": "",
                "visible": false
            },
            "columns": [{
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
                    "textAlignment": "center"
                },
                "header": {
                    "text": "Phone"
                }
            }]
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
        },
        display: {
            rowResizable: true
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
