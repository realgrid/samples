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
    
  setTests("actions", "CustomColumnValidation");

  grdMain.onValidateColumn = function (grid, column, inserting, value) {
      console.log("onValidateColumn:" + column.fieldName + "," + inserting + "," + value);

      var error = {};
      if (column.fieldName === "Quantity") {
          if (value < 100) {
              error.level = RealGridJS.ValidationLevel.ERROR;
              error.message = "Quantity는 100 이상이어야 합니다.";
          } else if (value > 200) {
              error.level = RealGridJS.ValidationLevel.WARNING;
              error.message = "Quantity는 200보다 작아야 합니다.";
          } else if (value == 150) {
              error.level = RealGridJS.ValidationLevel.INFO;
              error.message = "Quantity 값이 150과 달라야 합니다.";
          }
      };
      return error;
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
        "type": "data",
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
        "type": "data",
        "width": "100",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Customer ID"
        }
    }, {
        "name": "Quantity",
        "fieldName": "Quantity",
        "type": "data",
        "width": "100",
        "styles": {
            "background": "#1188ff00",
            "textAlignment": "far"
        },
        "header": {
            "text": "Quantity"
        }
    }, {
        "name": "Quantity2",
        "fieldName": "Quantity",
        "type": "data",
        "width": "100",
        "styles": {
            "background": "#110088ff",
            "textAlignment": "far"
        },
        "header": {
            "text": "Quantity 2"
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
    }, {
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
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        footer: { visible: false },
        panel: { visible: false },
        checkBar: { visible: false },
        header: { visible: true },
        stateBar: { visible: true },
        paste: {
            commitEdit: true
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}
 
function setStyles() {
    grdMain.setStyles({
        body: {
            "font-size": "12"
        }
    });}
 
function loadData(provider) {
    provider.setRows(CustomerOrders);
    $("#loadResult").css("color", "green").text(provider.getRowCount() + " rows.").show();
/*  
    $.ajaxSetup({ cache: false });

    var params = {
        CustomerId: ""
    };

    grdMain.showToast("Load data...");
    $.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders?", params, function (data) {
        provider.setRows(data);
        $("#loadResult").css("color", "green").text(provider.getRowCount() + " rows.").show();
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
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
    /*
	createCheckBox(container, "softDeleting", function (e) {
        dataProvider.setOptions({
            softDeleting: _getChecked(e)
        });
	}, false);
	*/
}
