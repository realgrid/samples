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
    
  setTests("actions", "Export To Excel");
});
 
function setFields(provider) {
    var fields = [{
        fieldName: "OrderID",
        dataType: "number"
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
        name: "OrderID",
        fieldName: "OrderID",
        width: "90",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "Order ID"
        }
    }, {
        name: "CustomerID",
        fieldName: "CustomerID",
        width: "100",
        styles: {
            textAlignment: "center",
            fontBold: true
        },
        header: {
            text: "Customer ID"
        }
    }, {
        name: "EmployeeID",
        fieldName: "EmployeeID",
        width: "100",
        styles: {
            textAlignment: "center",
            "foreground": "#ffff0000"
        },
        header: {
            text: "Employee ID"
        }
    }, {
        name: "UnitPrice",
        fieldName: "UnitPrice",
        width: "100",
        styles: {
            textAlignment: "far",
            paddingRight: 5,
            suffix: " $",
            font: "Arial,12,bold"
        },
        header: {
            text: "Unit Price"
        },
        footer: {
            styles: {
                textAlignment: "far",
                paddingRight: 5,
                numberFormat: "#,##0",
                foreground: "#000088"
            },
            text: "SUM",
            expression: "sum"
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
            styles: {
                textAlignment: "far",
                paddingRight: 5,
                numberFormat: "#,##0.00",
                foreground: "#000088"
            },
            text: "SUM",
            expression: "sum"
        }
    }, {
        name: "OrderDate",
        fieldName: "OrderDate",
        width: "140",
        styles: {
            textAlignment: "center",
            dataFormat: "YYYY-MM-DD HH:NN",
            background: "#10ffff00"
        },
        header: {
            text: "Order Date"
        }
    }, {
        name: "CompanyName",
        fieldName: "CompanyName",
        width: "200",
        styles: {
            textAlignment: "near",
            background: "#1000ffff"
        },
        header: {
            text: "Company Name"
        }
    },{
        name: "Country",
        fieldName: "Country",
        width: "100",
        styles: {
            textAlignment: "center",
            background: "#10ff00ff"
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
    }, {
        name: "ProductName",
        fieldName: "ProductName",
        width: "200",
        styles: {
            textAlignment: "near"
        },
        header: {
            text: "Product Name"
        }
    }, {
        name: "QuantityPerUnit",
        fieldName: "QuantityPerUnit",
        width: "100",
        styles: {
            textAlignment: "near"
        },
        header: {
            text: "Quantity / Unit"
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
            target: "local",
            fileName: "local.xlsx",
            indicator: _getSelected("indicator"),
            header: _getSelected("header"),
            footer: _getSelected("footer")
        });
    },
    "Upload to Server": function () {
        grdMain.exportGrid({
            url:  "http://demo.realgrid.net/Demo/ExcelXBin",
            fileName: "remote.xlsx",
            indicator: _getSelected("indicator"),
            header: _getSelected("header"),
            footer: _getSelected("footer")
        });
    },
    checkVisible: function () {
        alert(grdMain.isVisible());
    },
    print: function () {
        grdMain._gv.print();
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
    createButtons(container, tests);
    createListBox(container, "indicator", ["default", "visible", "hidden"], null, "default");
    createListBox(container, "header", ["default", "visible", "hidden"], null, "default");
    createListBox(container, "footer", ["default", "visible", "hidden"], null, "default");
	createCheckBox(container, "gridVisible", function (e) {
		grdMain.setVisible(e.target.checked);
	}, true);
}
