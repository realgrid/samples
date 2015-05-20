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
    
  setTests("actions", "BarcodeCellRenderer");
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
        fieldName: "OrderID",
        width: "60",
        styles: {
            "textAlignment": "center"
        },
        header: {
            "text": "Order ID"
        }
    }, {
        fieldName: "OrderID",
        width: "186",
        renderer: {
            type: "code128"
        },
        styles: {
            "figureBackground": "#ff111111"
        },
        header: {
            "text": "Code128"
        }
    }, {
        fieldName: "CustomerID",
        width: "80",
        styles: {
            "textAlignment": "center"
        },
        header: {
            "text": "Customer ID"
        }
    }, {
        fieldName: "CustomerID",
        width: "130",
        renderer: {
            type: "code39"
        },
        styles: {
            "figureBackground": "#ff000088"
        },
        header: {
            "text": "Code39"
        }
    }, {
        fieldName: "Country",
        width: "70",
        styles: {
            "textAlignment": "near"
        },
        header: {
            "text": "Country"
        }
    }, {
        fieldName: "Country",
        width: "280",
        renderer: {
            type: "code128"
        },
        styles: {
            "figureBackground": "#ff004400"
        },
        header: {
            "text": "Code128"
        }
    }, {
        fieldName: "CompanyName",
        width: "160",
        styles: {
            "textAlignment": "near"
        },
        header: {
            "text": "Company"
        }
    },  {
        fieldName: "QuantityPerUnit",
        width: "140",
        styles: {
            "textAlignment": "near"
        },
        header: {
            "text": "Unit"
        }
    }, {
        fieldName: "Quantity",
        width: "100",
        styles: {
            "textAlignment": "far"
        },
        header: {
            "text": "Quantity"
        }
    }, {
        fieldName: "UnitPrice",
        width: "100",
        styles: {
            "textAlignment": "far"
        },
        header: {
            "text": "Unit Price"
        }
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        summaryMode: RealGridJS.SummaryMode.AGGREGATE,
        header: {
            height: 30
        },
        display: {
            rowHeight: 40
        },
        stateBar: {
            visible: false
        },
        select: {
            style: RealGridJS.SelectionStyle.ROWS
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
