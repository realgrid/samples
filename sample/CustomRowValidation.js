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
    
  setTests("actions", "CustomRowValidation");

  grdMain.onValidateRow = function (grid, itemIndex, dataRow, inserting, values) {
      console.log("onValidatRow:" + itemIndex + "," + dataRow + ", " + inserting + "," + values);

      var error = {};

      //validate Quantity
      if (values.Quantity < 100) {
          error.level = RealGridJS.ValidationLevel.ERROR;
          error.message = "onValidateRow Event: if Quantity < 100, validation level 'ERROR!!'";
      } else if (values.Quantity > 200) {
          error.level = RealGridJS.ValidationLevel.WARNING;
          error.message = "onValidateRow Event: if Quantity > 200, validation level 'WARNING!!'";
      } else if (values.Quantity == 150) {
          error.level = RealGridJS.ValidationLevel.INFO;
          error.message = "onValidateRow Event: if Quantity = 150, validation level 'INFO!!'";
      }

      //validate Unit Price
      if (values.UnitPrice < 30) {
          console.log("values.UnitPrice < 30");
          error.level = RealGridJS.ValidationLevel.ERROR;
          error.message = "onValidateRow Event: if Unit Price < 30, validation level 'ERROR!!'";
      } else if (values.UnitPrice > 70) {
          error.level = RealGridJS.ValidationLevel.WARNING;
          error.message = "onValidateRow Event: if Unit Price > 70, validation level 'WARNING!!'";
      } else if (values.UnitPrice == 50) {
          error.level = RealGridJS.ValidationLevel.INFO;
          error.message = "onValidateRow Event: if Unit Price = 50, validation level 'INFO!!'";
      }

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
        stateBar: { visible: true }
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
