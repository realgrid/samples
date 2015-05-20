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

  setTests("actions", "EditButtons");
});
 
function setFields(provider) {
    var fields = [{
        fieldName: "OrderID",
        dataType: "text"
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
        "dataType": "numeric"
    }, {
        fieldName: "UnitPrice",
        "dataType": "numeric"
    }];
 
    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
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
        "name": "CustomerID",
        "fieldName": "CustomerID",
        "type": "data",
        "width": "100",
        "button": "action",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Customer ID"
        }
    }, {
        "name": "OrderDate",
        "fieldName": "OrderDate",
        "type": "data",
        "width": "130",
        "button": "action",
        "readOnly": true,
        "editable": false,
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
        "button": "popup",
        "popupMenu": "companyName",
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
    }, {
        "name": "Quantity",
        "fieldName": "Quantity",
        "type": "data",
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
        "type": "data",
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
    // options
    grid.setOptions({
        select: {
            style: "columns"
        }
    });

    // popup menus
    var menu = [{
        label: "menu1 입니다."
    }, {
        label: "menu2 입니다"
    }, {
        label: "menu3 입니다"
    }];
    grid.addPopupMenu("companyName", menu);
    grid.onMenuItemClicked = function (grid, data) {
        alert(data.label);
    };

    // event handling
    grid.onCellButtonClicked = function (grid, itemIndex, column) {
        setTimeout(function () {
            alert("CellButton Clicked: itemIndex=" + itemIndex + ", fieldName=" + column.fieldName);
        }, 100);
    };
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function setStyles() {
    grdMain.setStyles({
    });
}
 
function loadData() {
    dataProvider.setRows(CustomerOrders);
/*  
    grdMain.showToast("Load data...", true);
    $.ajax({
        url: "http://demo.realgrid.net/Demo/GetCustomOrders",
        dataType: 'json',
        success: function (data) {
            grdMain.hideToast();
            dataProvider.setRows(data);
        },
        complete: function (data) {
            grdMain.hideToast();
        }
	}); 
*/	
}

var tests = {
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
    createCheckBox(container, "alwaysShowButton", function (e) {
        var checked = _getChecked(e);

        var column = grdMain.columnByName("CustomerID");
        column.alwaysShowButton = checked;
        column.styles = {
            background: checked ? "#110088ff" : "#ffffffff"
        };
        grdMain.setColumn(column);

        column = grdMain.columnByName("OrderDate");
        column.alwaysShowButton = checked;
        column.styles = {
            background: checked ? "#1188ff00" : "#ffffffff"
        };
        grdMain.setColumn(column);

        column = grdMain.columnByName("CompanyName");
        column.alwaysShowButton = checked;
        column.styles = {
            background: checked ? "#118800ff" : "#ffffffff"
        };
        grdMain.setColumn(column);

        grdMain.setFocus();
    }, false);
}
