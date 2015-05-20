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
    
  setTests("actions", "TextCellRenderer");
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
            "textAlignment": "center",
            "font": "Arial"
        },
        "header": {
            "text": "Order ID"
        },
        "footer": {
            "text": "Count:%",
            "expression": "count"
        }
    }, {
        "name": "CustomerID",
        "fieldName": "CustomerID",
        "type": "data",
        "width": "100",
        "styles": {
            "textAlignment": "center",
            "font": "Tahoma",
            "fontBold": true
        },
        "header": {
            "text": "Customer ID"
        }
    }, {
        "name": "EmployeeID",
        "fieldName": "EmployeeID",
        "type": "data",
        "width": "100",
        "styles": {
            "textAlignment": "center",
            "font": "Arial",
            "foreground": "#ffff0000"
        },
        "header": {
            "text": "Employee ID"
        }
    }, {
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "type": "data",
        "width": "100",
        "styles": {
            "textAlignment": "far",
            "paddingRight": 5,
            "suffix": " $",
            "font": "Arial,12,bold"
        },
        "header": {
            "text": "Unit Price"
        }
    }, {
        "name": "Quantity",
        "fieldName": "Quantity",
        "type": "data",
        "width": "100",
        "styles": {
            "textAlignment": "far",
            "font": "Arial",
            "paddingRight": 5,
            "numberFormat": "00.00",
            "foreground": "#0000ff"
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
        "name": "OrderDate",
        "fieldName": "OrderDate",
        "type": "data",
        "width": "140",
        "styles": {
            "textAlignment": "center",
            "font": "Tahoma",
            "datetimeFormat": "yyyy-MM-dd HH:mm"
        },
        "header": {
            "text": "Order Date"
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
                "textAlignment": "near",
                "font": "Tahoma"
            },
            "header": {
                "text": "Company Name"
            }
        },{
            "name": "Country",
            "fieldName": "Country",
            "type": "data",
            "width": "100",
            "styles": {
                "textAlignment": "center",
                "font": "Tahoma"
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
                "textAlignment": "center",
                "font": "Arial"
            },
            "header": {
                "text": "Phone"
            }
        }]
    }, {
        "name": "ProductName",
        "fieldName": "ProductName",
        "type": "data",
        "width": "200",
        "styles": {
            "textAlignment": "near",
            "font": "Tahoma"
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
            "textAlignment": "near",
            "font": "Tahoma"
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
