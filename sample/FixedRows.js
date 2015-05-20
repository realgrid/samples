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
    
  setTests("actions", "FixedRows");
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
        dataType: "numeric"
    }, {
        fieldName: "UnitPrice",
        dataType: "numeric"
    }];
 
    provider.setFields(fields);
}
 
function setColumns(grid) {
    var columns = [{
        "name": "OrderID",
        "fieldName": "OrderID",
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
        "width": "130",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Customer ID"
        }
    }, {
        "name": "EmployeeID",
        "fieldName": "EmployeeID",
        "width": "100",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Employee ID"
        }
    }, {
        "name": "OrderDate",
        "fieldName": "OrderDate",
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
        "width": "100",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Quantity / Unit"
        }
    }, {
        "name": "Quantity",
        "fieldName": "Quantity",
        "width": "100",
        "styles": {
            "textAlignment": "far"
        },
        "header": {
            "text": "Quantity"
        }
    }, {
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "width": "100",
        "styles": {
            "textAlignment": "far"
        },
        "header": {
            "text": "Unit Price"
        }
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        panel: {
            visible: false
        },
        fixed: {
            rowCount: 0,
            rowEditable: true
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}
 
function setStyles() {
    loadData(dataProvider);
}
 
function loadOptions(grid) {
    var fixed = grid.fixedOptions();
    var count = fixed.rowCount;
    $('#txtCount').val(count);
}
 
function loadData(provider) {
    provider.setRows(CustomerOrders);
    
    var count = provider.getRowCount();
    $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
/*  
    $.ajaxSetup({ cache: false });
 
    var params = {
        CustomerId : ""
    };
 
    $.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders", params, function (data) {
        provider.setRows(data);
        var count = provider.getRowCount();
        $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
    })
    .done(function() {
        grdMain.setFocus();
    })
    .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("jQuery getJSON() Failed: " + err);
        $("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
        alert("jQuery getJSON() Failed: " + err);
    });
*/    
}

var tests = {
    setFixedRows: function () {
        grdMain.setOptions({
            fixed: {
                rowCount: 2
            }
        })
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
    createCheckBox(container, "fixedEditable", function (e) {
        grdMain.setFixedOptions({
            rowEditable: e.target.checked
        });
    }, true);
    /*
     createCheckBox(container, "merged", function (e) {
     grdMain.rowGroup().setMergeMode(e.target.checked);
     }, false);
     */
}
