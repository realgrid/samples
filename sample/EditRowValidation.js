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
  setValidations(grdMain);
    
	loadData(dataProvider);
    
  setTests("actions", "RowValidation");
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
        "dataType": "datetime"
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
        "dataType": "numeric"
    }, {
        "fieldName": "UnitPrice",
        "dataType": "numeric"
    }];
 
    provider.setFields(fields);
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
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "type": "data",
        "width": "100",
        "styles": {
            "background": "#118800ff",
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
 
function setValidations(grid) {
    var validations = [{
        criteria: "value['CustomerID'] is not empty",
        message: "CustomerID는 반드시 필요합니다.",
        mode: "always",
        level: "error"
    }, {
        criteria: "(values['Quantity'] >= 100) and (values['UnitPrice'] >= 50)",
        message: "Quantity는 100보다 크고 UnitPrice는 50보다 커야합니다!",
        mode: "always",
        level: "error"
    }, {
        criteria: "values['Quantity'] <= 200",
        message: "Quantity는 200보다 작아야 합니다",
        mode: "always",
        level: "warning"
    }];
 
    grid.setValidations(validations);
};

function loadData(provider) {
    provider.setRows(CustomerOrders);
}

var tests = {
		
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	/*
	createCheckBox(container, "panel", function (e) {
		grdMain.panel().setVisible(e.target.checked);
	}, true);
	*/
}
