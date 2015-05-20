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
    
  setTests("actions", "ItemModelApi");
});

function setFields(provider) {
    var fields = [{
        fieldName: "OrderID",
        header: "OrderID Field Header"
    }, {
        fieldName: "CustomerID",
        header: "CustomerID Field Header"
    }, {
        fieldName: "EmployeeID",
        header: "EmployeeID Field Header"
    }, {
        fieldName: "OrderDate",
        dataType: "datetime",
        header: "OrderDate Field Header"
    }, {
        fieldName: "CompanyName",
        header: "CompanyName Field Header"
    }, {
        fieldName: "Country",
        header: "Country Field Header"
    }, {
        fieldName: "Phone",
        header: "Phone Field Header"
    }, {
        fieldName: "ProductName",
        header: "ProductName Field Header"
    }, {
        fieldName: "QuantityPerUnit",
        header: "QuantityPerUnit Field Header"
    }, {
        fieldName: "Quantity",
        dataType: "number",
        header: "Quantity Field Header"
    }, {
        fieldName: "UnitPrice",
        dataType: "number",
        header: "UnitPrice Field Header"
    }];

    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        "name": "Country Column",
        "fieldName": "Country",
        "width": "80",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Country"
        }
    }, {
        "name": "CompanyName Column",
        "fieldName": "CompanyName",
        "width": "160",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Company"
        }
    },  {
        "fieldName": "OrderID",
        "width": "70",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Order ID"
        }
    }, {
        "fieldName": "QuantityPerUnit",
        "width": "140",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Unit"
        },
        "footer": {
            "styles": {
                "textAlignment": "far",
                "font": "굴림,12"
            },
            "text": "합계 =>"
        }
    }, {
        "fieldName": "Quantity",
        "width": "100",
        "styles": {
            "textAlignment": "far"
        },
        "header": {
            "text": "Quantity"
        },
        "footer": {
            "styles": {
                "textAlignment": "far",
                "numberFormat": "0,000",
                "postfix": " $",
                "font": "Arial,12"
            },
            "groupStyles": {
                "foreground": "#ffffff",
                "fontBold": true
            },
            "text": "합계",
            "expression": "sum",
            "groupExpression": "sum"
        }
    }, {
        "fieldName": "CustomerID",
        "width": "130",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Customer ID"
        },
        "footer": {
            "styles": {
                "textAlignment": "far",
                "font": "굴림,12"
            },
            "text": "분산 =>"
        }
    }, {
        "fieldName": "UnitPrice",
        "width": "100",
        "styles": {
            "textAlignment": "far"
        },
        "header": {
            "text": "Unit Price"
        },
        "footer": {
            "styles": {
                "textAlignment": "far",
                "numberFormat": "0,000",
                "postfix": " $",
                "font": "Arial,12"
            },
            "text": "Variance",
            "expression": "sum",
            "groupExpression": "var"
        }
    }];

    grid.setColumns(columns);
}

function setOptions(grid) {
    grid.setOptions({
        summaryMode: RealGridJS.SummaryMode.AGGREGATE,
        header: {
            height: 30
        },
        stateBar: {
            visible: false
        },
        selecting: {
            style: RealGridJS.SelectionStyle.ROWS
        }
    });
}

function setStyles() {
    grdMain.setStyles({
        selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

function loadData() {
    dataProvider.setRows(CustomerOrders);
/*  
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
    getModel: function () {
        var itemIndex = grdMain.getCurrent().itemIndex;
        if (itemIndex >= 0) {
            var extended = _getChecked("extended");
            var item = grdMain.getModel(itemIndex, extended);
            console.log(JSON.stringify(item));
            alert(JSON.stringify(item));
        }
    },
    getParentModel: function () {
        var idx = grdMain.getCurrent();
        if (idx.itemIndex >= 0) {
            var extended = _getChecked("extended");
            var item = grdMain.getModel(idx.itemIndex);
            var parent = grdMain.getParentModel(item, extended);
            console.log(JSON.stringify(parent));
            if (parent) {
                idx.itemIndex = parent.itemIndex;
                grdMain.setCurrent(idx);
            }
            alert(JSON.stringify(parent));
        }
    },
    getRootModel: function () {
        var idx = grdMain.getCurrent();
        if (idx.itemIndex >= 0){
            var extended = _getChecked("extended");
            var item = grdMain.getModel(idx.itemIndex);
            var root = grdMain.getRootModel(item, extended);
            console.log(JSON.stringify(root));
            if (root) {
                idx.itemIndex = root.itemIndex;
                grdMain.setCurrent(idx);
            }
            alert(JSON.stringify(root));
        }
    },
    getChildModels: function () {
        var itemIndex = grdMain.getCurrent().itemIndex;
        if (itemIndex >= 0) {
            var extended = _getChecked("extended");
            var item = grdMain.getModel(itemIndex);
            if (item) {
                var children = grdMain.getChildModels(item, extended);
                console.log(JSON.stringify(children));
                alert(JSON.stringify(children));
            }
        }
    },
    getChildModel: function () {
        var itemIndex = grdMain.getCurrent().itemIndex;
        if (itemIndex >= 0) {
            var extended = _getChecked("extended");
            var group = grdMain.getModelAs(itemIndex, RealGridJS.ItemType.GROUP);
            if (group && group.count > 0) {
                var item = grdMain.getChildModel(group, 0, extended);
                console.log(JSON.stringify(item));
                alert(JSON.stringify(item));
            }
        }
    },
    getModels: function () {
        var extended = _getChecked("extended");
        var items = grdMain.getModels([0, 1, 2], extended);
        var s = JSON.stringify(items);
        console.log(s);
        alert(s);
    },
    getModelOfRow: function () {
        var extended = _getChecked("extended");
        var row = grdMain.getCurrent().dataRow;
        var item = grdMain.getModelOfRow(row, extended);
        console.log(JSON.stringify(item));
        alert(JSON.stringify(item));
    },
    getModelsOfRows: function () {
        var extended = _getChecked("extended");
        var items = grdMain.getModelsOfRows([0, 1, 2],extended);
        var s = JSON.stringify(items);
        console.log(s);
        alert(s);
    },
    getGroupSummary: function () {
        var idx = grdMain.getCurrent();
        var item = grdMain.getModelAs(idx.itemIndex, RealGridJS.ItemType.ROW);

            if (item) {
            var group = grdMain.getParentModel(item);

            if (group && idx.fieldIndex >= 0) {
                var summary = grdMain.getGroupSummary(group, idx.fieldIndex);
                if (summary) {
                    console.log(JSON.stringify(summary));
                    alert(JSON.stringify(summary));
                }
            }
        }
    },
    expandModel: function () {
        var recursive = _getChecked("recursive");
        var force = _getChecked("force");
        var itemIndex = grdMain.getCurrent().itemIndex;
        var group = grdMain.getModelAs(itemIndex, RealGridJS.ItemType.GROUP);
        if (group) {
            grdMain.expandModel(group, recursive, force);
        }
    },
    collapseModel: function () {
        var recursive = _getChecked("recursive");
        var force = _getChecked("force");
        var itemIndex = grdMain.getCurrent().itemIndex;
        var group = grdMain.getModelAs(itemIndex, RealGridJS.ItemType.GROUP);
        if (group) {
            grdMain.collapseModel(group, recursive, force);
        }
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
    createCheckBox(container, "extended", function (e) {
    }, false);
    createCheckBox(container, "recursive", function (e) {
    }, false);
    createCheckBox(container, "force", function (e) {
    }, false);
}
