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
    
  setTests("actions", "CheckCellRenderer");

  grdMain.onColumnHeaderDblClicked = function (grid, column) {
      alert(column.name);
  };
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
    }, {
        fieldName: "Shipping",
        dataType: "text"
    }];
 
    provider.setFields(fields);
}
 
function setColumns(grid) {
    var columns = [{
        "name": "OrderID",
        "fieldName": "OrderID",
        "type": "data",
        "width": "60",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Order ID"
        }
    }, {
        "name": "Shipping",
        "fieldName": "Shipping",
        "type": "data",
        "width": "70",
        "editable": false,
        "readOnly": false,
        "renderer": {
            "type": "check",
            "editable": true,
            "threeState": true,
            "startEditOnClick": true,
            "spaceKey": true,
            "trueValues": "True",
            "falseValues": "False",
            "labelPosition": "center"
        },
        "styles": {
            "paddingLeft": 8,
            "textAlignment": "center",
            "background": "#33ffff00"
        },
        "header": {
            "text": "Check Edit",
            "styles": {
                "fontBold": true
            }
        }
    }, {
        "name": "EmployeeID",
        "fieldName": "EmployeeID",
        "type": "data",
        "width": "85",
        "renderer": {
            "type": "check",
            "editable": true,
            "startEditOnClick": false,
            "falseValues": "2,4,6"
        },
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Employee ID 1"
        }
    }, {
        "name": "EmployeeID",
        "fieldName": "EmployeeID",
        "type": "data",
        "width": "85",
        "renderer": {
            "type": "check",
            "falseValues": "1,3"
        },
        "styles": {
            "textAlignment": "center",
            "figureBackground": "#ffff0000",
            "figureInactiveBackground": "#33ff0000",
            "figureSize": "130%"
        },
        "header": {
            "text": "Employee ID 2"
        }
    }, {
        "name": "EmployeeID",
        "fieldName": "EmployeeID",
        "type": "data",
        "width": "85",
        "renderer": {
            "type": "check",
            "falseValues": "1,3",
            "labelPosition": "left"
        },
        "styles": {
            "paddingRight": 8,
            "textAlignment": "left",
            "figureBackground": "#ff000088",
            "figureInactiveBackground": "#33000088",
            "figureSize": "80%"
        },
        "header": {
            "text": "Employee ID 3"
        }
    }, {
        "name": "EmployeeID",
        "fieldName": "EmployeeID",
        "type": "data",
        "width": "85",
        "renderer": {
            "type": "check",
            "falseValues": "1,3"
        },
        "styles": {
            "textAlignment": "center",
            "figureBackground": "#ff000088",
            "figureInactiveBackground": "#33000088"
        },
        "header": {
            "text": "Employee ID 4"
        },
        "dynamicStyles": [{
            criteria: "value mod 2 = 1",
            styles: "figureBackground=#fff0000;figureSize=150%"
        }]
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
        "name": "OrderDate",
        "fieldName": "OrderDate",
        "type": "data",
        "width": "130",
        "styles": {
            "textAlignment": "center",
            "datetimeFormat": "yyyy.MM.dd"
        },
        "header": {
            "text": "Order Date"
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
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        display: {
            rowHeight: 27
        },
        header: {
            minHeight: 33
        },
        edit: {
            updatable: true,
            insertable: true,
            appendable: true,
            deletable: true
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
    getItemsOfRows: function () {
        var items = grdMain.getItemsOfRows([0, 1, 2]);
        alert(items);
    },
    getRowsOfItems: function () {
        var rows = grdMain.getRowsOfItems([0, 1, 2]);
        alert(rows);
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
