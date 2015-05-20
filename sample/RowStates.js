var grdMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

$(document).ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
  setDataOptions(dataProvider);
  setFields(dataProvider);

  grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);
	
	setColumns(grdMain);
	setOptions(grdMain);
  setSkin();
  setStyles(grdMain);

	loadData(dataProvider);
    
  setTests("actions", "RowStates");

  dataProvider.onRowStateChanged = function (provider, row) {
      var state = dataProvider.getRowState(row);
      console.log("row = " + row + ", state = " + state);
  }
  dataProvider.onRowStatesCleared = function (provider, row) {
      console.log("rowStates cleared.");
  }
});

function setDataOptions(provider) {
    provider.setOptions({
        softDeleting: true
    });
}

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
        "dataType": "datetime",
        "dateFormat": "yyyy-MM-dd a hh:mm:ss",
        "amText": "오전",
        "pmText": "오후"
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
        panel: {
            visible: false
        },
        checkBar: {
            visible: true
        },
        header: {
            minHeight: 30
        },
        edit: {
            insertable: true,
            appendable: true,
            deletable: true,
            deleteRowsConfirm: true
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}
 
function setStyles() {
    grdMain.setStyles({
        body: {
            dynamicStyles: [{
                criteria: "state = 'd'",
                styles: "background=#11000000;foreground=#ffaaaaaa"
            }, {
                criteria: "state = 'u'",
                styles: "background=#11ffff00"
            }, {
                criteria: "state = 'c'",
                styles: "background=#11ff00ff"
            }, {
                criteria: "state = 'x'",
                styles: "background=#1100ffff;foreground=#ffaaaaaa"
            }]
        },
        selection: {
            background: "#11880000",
            border: "#88880000,1"
        }
    });}
 
function loadData(provider) {
    provider.setRows(CustomerOrders);
/*  
    $.ajaxSetup({ cache: false });

    var params = {
        CustomerId: ""
    };

    grdMain.showToast("Load data...", true);
    $.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders", params, function (data) {
        provider.setRows(data);
    })
    .done(function () {
        grdMain.hideToast();
        grdMain.setFocus();
    })
    .fail(function (jqxhr, textStatus, error) {
        grdMain.hideToast();
        var err = textStatus + ', ' + error;
        console && console.log("jQuery getJSON() Failed: " + err);
        alert("jQuery getJSON() Failed: " + err);
    })
*/    
}
 
var tests = {
    deleteSelection: function () {
        grdMain.deleteSelection(_getChecked("forceDeleting"));
    },
    clearRowStates: function () {
        dataProvider.clearRowStates(_getChecked("deleteRows"), _getChecked("fireEvent"));
    },
    setRowStates: function () {
        var rows = grdMain.getCheckedRows();
        var state = _getSelected("rowState");
        dataProvider.setRowStates(rows, state, true);
    },
    setRowState: function () {
        var row = grdMain.getCurrent().dataRow;
        if (row >= 0) {
            var state = _getSelected("rowState");
            dataProvider.setRowState(row, state, true);
        }
    },
    getStateRows: function () {
        var rows;
        var state = _getSelected("rowState");
        if (!state || state == "all") {
            rows = dataProvider.getAllStateRows();
        } else {
            rows = dataProvider.getStateRows(state);
        }
        alert(JSON.stringify(rows));
    },
    getStateCount: function () {
        var states;
        var state = _getSelected("rowState");

        if (!state || state == "all") {
            states = "*";
        } else {
            states = [state];
        }

        if (states) {
            var count = dataProvider.getRowStateCount(states);
            alert(count);
        }
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	createCheckBox(container, "softDeleting", function (e) {
		dataProvider.setOptions({
            softDeleting: _getChecked(e)
        })
	}, true);
    createCheckBox(container, "forceDeleting", null, true);
    createCheckBox(container, "deleteRows", null, false);
    createCheckBox(container, "fireEvent", null, false);
    createListBox(container, "rowState", ["created", "updated", "deleted", "createAndDeleted", "none", "all"], null, "created")
}
