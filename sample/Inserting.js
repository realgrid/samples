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
    
  setTests("actions", "Insert and Add Rows");

  grdMain.onCurrentRowChanged = function (grid, oldRow, newRow) {
      console.log("grid.onCurrentRowChanged: " + oldRow + " => " + newRow);
  };
  grdMain.onShowEditor = function (grid, index) {
      //var st = grid.getItemState(index.itemIndex);
      //return RealGridJS.ItemState.isInserting(st);
  };
  grdMain.onRowInserting = function (grid, itemIndex) {
      console.log("grid.onRowInserting index=" + itemIndex);
  };
  grdMain.onEditCommit = function (grid, index, oldValue, newValue) {
      //return "error !!!";
  };
  dataProvider.onRowInserting = function (provider, row, values) {
      console.log("provider.onRowInserting row=" + row);
      values[0] = "xxx";
      //return false;
  };
  dataProvider.onRowInserted = function (provider, row) {
      console.log("provider.onRowInserted row=" + row);
  };
  dataProvider.onRowCountChanged = function (provider, newCount) {
      console.log("$$$$$$$$$ provider.onRowCountChanged: " + newCount);
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

    provider.setOptions({
        //restoreMode: "auto"
    });
}
 
function setColumns(grid) {
    var columns = [{
        "name": "OrderID",
        "fieldName": "OrderID",
        "width": "90",
        "readOnly": true,
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
        "readOnly": false,
        "required": true,
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
                "textAlignment": "far",
                "numberFormat": "#,##0.0"
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
            updatable: true,
            insertable: true,
            appendable: true,
            deletable: true,
            commitWhenExitLast:true,
            crossWhenExitLast:true,
            enterToTab: true
        },
        panel: {
            visible: false
        },
        display: {
            focusActiveColor: 0x5292f7,
            rowHeight: 21
        },
        fixed: {
            rowCount: 0
        },
        sorting: {
            keepFocusedRow: true
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}
 
function setStyles() {
}
 
function loadData(provider) {
    provider.setRows(CustomerOrders, 0, 10);

    /*
    $.ajaxSetup({ cache: false });
 
    var params = {
        CustomerId: "ANATR"
    };
 
    $.getJSON("/Demo/GetCustomOrders", params, function (data) {
        dataProvider.setRows(data);
        $("#loadResult").css("color", "green").text(dataProvider.getRowCount() + " rows loaded.").show();
    })
    .done(function () {
        grdMain.setFocus();
    })
    .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console && console.log("jQuery getJSON()  Failed: " + err);
        alert("jQuery getJSON()  Failed: " + err);
    })
    */
}
 
var tests = {
	insert: function () {
	    var curr = grdMain.getCurrent();
	    grdMain.beginInsertRow(Math.max(0, curr.itemIndex));
	    grdMain.showEditor();
	    grdMain.setFocus();
	},
	append: function () {
	    grdMain.beginAppendRow();
	    grdMain.showEditor();
	    grdMain.setFocus();
	},
	showEditor: function () {
		grdMain.showEditor();
	},
    showEditor2: function () {
        var row = dataProvider.addRow({});
        grdMain.setCurrent({dataRow:row});
        grdMain.setFocus();
    }
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
