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
  setStyles();

	loadData(dataProvider);

  setValidations(grdMain);
  setTests("actions", "ColumnValidation");
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
        "dataType": "numeric"
    }, {
        "fieldName": "UnitPrice",
        "dataType": "numeric"
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
        edit: { appendable: true, insertable: true }
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
    });
}

function loadData(provider) {
    provider.setRows(CustomerOrders);
/*  
    $.ajax({
	  url: "http://demo.realgrid.net/Demo/GetCustomOrders",  
	  dataType: 'json',  
	  success: function (data) {
        provider.setRows(data);
	  }  
	}); 
*/	
}

function setValidations(grid) {
    var validations = [{
        criteria: "value > 100",
        message: "Quantity는 100보다 커야 합니다!",
        mode: "always",
        level: "error"
    }, {
        criteria: "value < 200",
        message: "Quantity는 200보다 작아야 합니다!",
        mode: "always",
        level: "warning"
    }, {
        criteria: "value <> 150",
        message: "Quantity 값은 150과 달라야 합니다!",
        mode: "always",
        level: "info"
    }];

    var column = grid.columnByName("Quantity");
    column.validations = validations;
    grid.setColumn(column);

    validations = [{
        criteria: "value is not empty",
        message: "CustomerID는 반드시 필요합니다.",
        mode: "always",
        level: "error"
    }];
    column = grid.columnByName("CustomerID");
    column.validations = validations;
    grid.setColumn(column);

};
 
var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
