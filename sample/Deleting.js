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
    
  setTests("actions", "Deleting");

  dataProvider.onRowInserted = function (provider, row) {
      $("#message").css("color", "blue").text("row added: " + row).show();
      console.log("onRowInserted row = " + row);
  };
  dataProvider.onRowsDeleted = function (provider, rows) {
      $("#message").css("color", "blue").text("row deleted: " + rows).show();
      console.log("onRowsDeleted rows = " + rows);
  };
  dataProvider.onRowStateChanged = function (provider, row) {
      $("#message").css("color", "blue").text("row state changed: " + row).show();
      console.log("onRowStateChanged row = " + row);
  };
  dataProvider.onRowsStatesChanged = function (provider, rows) {
      $("#message").css("color", "blue").text("row states changed: " + rows).show();
      console.log("onRowsStatesChanged rows = " + rows);
  };
  dataProvider.onRowCountChanged = function (provider) {
      $("#loadResult").css("color", "green").text(dataProvider.getRowCount() + " rows.").show();
  };
});
 
function setFields(provider) {
    var fields = [{
        "fieldName": "OrderID",
        "dataType": "text"
    }, {
        "fieldName": "CustomerID"
    }, {
        "fieldName": "EmployeeID"
    }, {
        "fieldName": "OrderDate",
        "dataType": "datetime"
    }, {
        "fieldName": "CompanyName"
    }, {
        "fieldName": "Country"
    }, {
        "fieldName": "Phone"
    }, {
        "fieldName": "ProductName"
    }, {
        "fieldName": "QuantityPerUnit"
    }, {
        "fieldName": "Quantity",
        "dataType": "number"
    }, {
        "fieldName": "UnitPrice",
        "dataType": "number"
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
        "readOnly": true,
        "styles": { 
            "textAlignment": "center"
        },
        "header": "Customer ID"
    }, {
        "name": "EmployeeID",
        "fieldName": "EmployeeID",
        "width": "100",
        "styles": { 
            "textAlignment": "center"
        },
        "header": "Employee ID"
    }, {
        "name": "OrderDate" ,
        "fieldName": "OrderDate",
        "width": "130",
        "styles": { 
            "textAlignment": "center"
        },
        "header": "Order Date"
    }, {
        "name": "CompanyName",
        "fieldName": "CompanyName",
        "width": "200",
        "styles": { 
            "textAlignment": "near"
        },
        "header": "Company Name"
    }, {
        "name": "Country",
        "fieldName": "Country",
        "width": "100",
        "styles": { 
            "textAlignment": "center"
        }
    }, {
        "name": "Phone",
        "fieldName": "Phone",
        "width": "100",
        "styles": { 
            "textAlignment": "near"
        }
    }, {
        "name": "Quantity",
        "fieldName": "Quantity",
        "width": "100",
        "styles": { 
            "textAlignment": "far"
        },
        "header": "Quantity",
        "footer": {
            "expression": "sum",
            "styles": {
                "textAlignment": "far"
            }
        }
    }, {
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "width": "100",
        "styles": { 
            "textAlignment": "far"
        },
        "header": "Unit Price",
        "footer": {
            "expression": "sum",
            "styles": {
                "textAlignment": "far"
            }
        }
    }, {
        "name": "ProductName",
        "fieldName": "ProductName",
        "width": "200",
        "styles": { 
            "textAlignment": "near"
        },
        "header": "Product Name"
    }, {
        "name": "QuantityPerUnit",
        "fieldName": "QuantityPerUnit",
        "width": "100",
        "styles": { 
            "textAlignment": "near"
        },
        "header": "Quantity / Unit"
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        edit: {
            deletable: true,
            deleteRowsConfirm: true,
            deleteRowsMessage: "Are you sure?",
            insertable: true,
            appendable: true
        },
        select: {
            style: RealGridJS.SelectionStyle.ROWS
        }
    });
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}
 
function setStyles() {
}
 
function loadData(provider) {
    provider.setRows(CustomerOrders);
    $("#loadResult").css("color", "green").text(provider.getRowCount() + " rows.").show();
/*  
    $.ajaxSetup({ cache: false });

    var params = {
        CustomerId: "ANATR"
    };

    $.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders?", params, function (data) {
        dataProvider.setRows(data);
        $("#loadResult").css("color", "green").text(dataProvider.getRowCount() + " rows.").show();
    })
        .done(function () {
            grdMain.setFocus();
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console && console.log("jQuery getJSON() Failed: " + err);
            alert("jQuery getJSON() Failed: " + err);
        })
*/        
}
 
var tests = {
    "deleteSelection(true)": function () {
        grdMain.deleteSelection(true);
    },
    "deleteSelection(false)": function () {
        grdMain.deleteSelection(false);
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	createCheckBox(container, "softDeleting", function (e) {
        dataProvider.setOptions({
            softDeleting: _getChecked(e)
        });
	}, false);
    createCheckBox(container, "deleteCreated", function (e) {
        dataProvider.setOptions({
            deleteCreated: _getChecked(e)
        });
    }, false);
    createCheckBox(container, "hideDeletedRows", function (e) {
        grdMain.setOptions({
            hideDeletedRows: _getChecked(e)
        });
    }, false);
}
