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

  setTests("actions", "CellIndex");
});
 
function setFields(provider) {
    var fields = [{
        "fieldName": "OrderID",
        "dataType": "text"
    }, {
        "fieldName": "CustomerID",
        "dataType": "text"
    }, {
        "fieldName": "EmployeeID",
        "dataType": "text"
    }, {
        "fieldName": "OrderDate",
        "dataType": "datetime",
        "dateFormat": "yyyy-MM-dd a hh:mm:ss",
        "amText": "오전",
        "pmText": "오후"
    }, {
        "fieldName": "CompanyName",
        "dataType": "text"
    }, {
        "fieldName": "Country",
        "dataType": "text"
    }, {
        "fieldName": "Phone",
        "dataType": "text"
    }, {
        "fieldName": "ProductName",
        "dataType": "text"
    }, {
        "fieldName": "QuantityPerUnit",
        "dataType": "text"
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
        },
        "footer": {
            "expression": "sum",
            "styles": {
                "textAlignment": "far",
                "numberFormat": "#,000"
            }
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
        },
        "footer": {
            "expression": "avg",
            "styles": {
                "textAlignment": "far",
                "numberFormat": "0.00",
                "prefix": "AVG = "
            }
        }
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        panel: {
            visible: false
        },
        checkBar: {
            visible: false
        },
        header: {
            minHeight: 30
        },
        edit: {
            insertable: true,
            appendable: true,
            deletable: true
        }
    });

    grid.onCurrentChanging = currentChangingHandler;
    grid.onCurrentChanged = currentChangedHandler;
}

function currentChangingHandler(grid, oldIndex, newIndex) {
    var allow = _getChecked("allow");
    return allow;
}

function currentChangedHandler(grid, newIndex) {
    console.log("##### C U R : " + JSON.stringify(newIndex));
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
        }
    });
}
 
function loadData() {
  dataProvider.setRows(CustomerOrders);

/*  http://demo.realgrid.net/Demo/GetCustomOrders 원격 데이터를 load 
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
    setCurrent: function () {
        var index = { itemIndex: $("#txtMain").val() };
        grdMain.setCurrent(index);
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
  	createButtons(container, tests);
    createCheckBox(container, "allow", null, true);
    /*
    createCheckBox(container, "visible", function (e) {
        grdMain.setStateBar({ visible: e.target.checked });
    }, true);
    createListBox(container, "figureBackground", ["#ffff0000", "#ff00ff00"], function (e) {
        grdMain.setStyles( { stateBar: { figureBackground: _getSelected(e) } } );
    }, "#ff00ff00");
    */
}
