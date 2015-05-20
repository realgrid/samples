var grdMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

$(document).ready(function () {
  //Grids.$_setMobileEnabled(true);
  //RealGridJS.setMobile(true);
  RealGridJS.setTrace(true);

	dataProvider = new RealGridJS.LocalDataProvider();
  setFields(dataProvider);

  grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);
	setColumns(grdMain);
	setOptions(grdMain);
  setSkin();
  setStyles(grdMain);

	loadData(dataProvider);

  setTests("actions", "Indicator");
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
        "type": "data",
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
        "type": "data",
        "width": "150",
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
    grid.setOptions({
        panel: {
            visible: true
        },
        stateBar: {
            visible: true
        },
        header: {
            minHeight: 30
        },
        edit: {
            insertable: true,
            appendable: true,
            deletable: true
        },
        display: {
            rowResizable: true
        },
        paste: {
            singleMode: false
        },
        select: {
            style: "block"
        },
        sorting: {
            keepFocusedRow: true
        }
    });

    grid.setContextMenu([{
        label: "Menu1"
    }, {
        label: "Menu2"
    }, {
        label: "-" // menu separator를 삽입합니다.
    }, {
        label: "ExcelExport"
    }]);

    grid.onContextMenuItemClicked = function (grid, data, index) {
        alert(JSON.stringify(data) + " at " + index.toString());
    }
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
    indexOffset: function () {
        grdMain.setIndicator({ indexOffset: $("#txtMain").val() });
    },
    rowOffset: function () {
        grdMain.setIndicator({ rowOffset: $("#txtMain").val() });
    },
    fontSize: function () {
        grdMain.setStyles({
            indicator: { fontSize: parseInt($("#txtMain").val()) || 12 }
        })
    },
    changeWidth: function () {
        var minWidth = $("#txtMain").val();
        var maxWidth = $("#txtSub").val();
        var width = $("#txtMin").val();

        grdMain.setIndicator({
            minWidth: minWidth,
            maxWidth: maxWidth,
            width: width
        });
    },
    setFocus: function () {
        grdMain.setFocus();
    },
    setCurrent: function () {
        grdMain.setCurrent({itemIndex: 2, fieldIndex: 1});
    },
    setIndicator: function () {
        grdMain.setIndicator({displayValue:"row", zeroBase:true});
    },
    setValue: function () {
        dataProvider.setValue(0, "CustomerID", "XXX");
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
    $("#txtSub").show();
    $("#txtMin").show();
	createButtons(container, tests);
    createCheckBox(container, "visible", function (e) {
        grdMain.setIndicator({ visible: e.target.checked });
    }, true);
    createCheckBox(container, "selectable", function (e) {
        grdMain.setIndicator({ selectable: e.target.checked });
    }, true);
    createCheckBox(container, "zeroBase", function (e) {
        grdMain.setIndicator({ zeroBase: _getChecked(e) });
    }, false);
    createListBox(container, "displayValue", ["none", "index", "row"], function (e) {
        grdMain.setIndicator( { displayValue: _getSelected(e) } );
    }, "index")
    createListBox(container, "textAlign", ["near", "center", "far"], function (e) {
        grdMain.setStyles( { indicator: { textAlignment: _getSelected(e) } } );
    }, "center");
}
