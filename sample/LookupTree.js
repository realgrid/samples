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
  setLookups(grdMain);
	setOptions(grdMain);
  setSkin();

	loadData(dataProvider);

    /*
    dataProvider.onRowInserting = function (provider, row) {

        if (!grdMain.existsLookupData("empLookup", "TOMSP")) {
            console.log("fillLookupData");

             grdMain.fillLookupData("empLookup", {
             keys: [
             ["TOMSP", 5], ["TOMSP", 6]
             ],
             values: [
             "TOMSP_5", "TOMSP_6"
             ]
             });

            grdMain.fillLookupData("empLookup", {
                rows: [
                    ["TOMSP", 5, "TOMSP_5X"], ["TOMSP", 6, "TOMSP_6X"]
                ]
            });
        };
    };

    dataProvider.onRowsDeleted = function (provider, rows) {
        grdMain.clearLookupData("empLookup");
    }
    */
    setTests("actions", "LookupTree");
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
        dataType: "datetime"
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

function setLookups(grid) {
    grid.setLookups([{
        "id": "empLookup",
        "levels": 2,
        "keys": [
            ["VINET", 5], ["VINET", 4], ["VINET", 3],
            ["CHOPS", 5], ["CHOPS", 4], ["CHOPS", 3],
            ["VICTE", 3], ["VICTE", 2],
            ["HANAR", 3], ["HANAR", 2],
            ["WELLI", 3], ["WELLI", 2]
        ],
        "values": [
            "VINET_5", "VINET_4", "VINET_3",
            "CHOPS_5", "CHOPS_4", "CHOPS_3",
            "VICTE_3", "VICTE_2",
            "HANAR_3", "HANAR_2",
            "WELLI_3", "WELLI_2"
        ]
    }]);
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
        "width": "120",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Employee ID",
            "styles": {
                "textAlignment": "center"
            }
        }
    }, {
        "name": "EmployeeID",
        "fieldName": "EmployeeID",
        "width": "120",
        "lookupDisplay": true,
        "lookupSourceId": "empLookup",
        "lookupKeyFields": ["CustomerID", "EmployeeID"],
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Employee ID 2",
            "styles": {
                "background": "linear,#22ffd500,#ffffd500,90"
            }
        }
    }, {
        "name": "EmployeeID",
        "fieldName": "EmployeeID",
        "width": "150",
        "lookupDisplay": true,
        "lookupSourceId": "empLookup",
        "lookupKeyFields": ["CustomerID", "EmployeeID"],
        "editor": {
            "type": "dropDown",
            "dropDownCount": 4
        },
        "header": {
            "text": "Employee ID 3",
            "styles": {
                "background": "linear,#22ffd500,#ffffd500,90"
            }
        },
        "styles": {
            "textAlignment": "center"
        }
    }, {
        "name": "OrderDate",
        "fieldName": "OrderDate",
        "type": "data",
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
        "type": "data",
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
        edit: {
            insertable: true,
            appendable: true,
            updatable: true,
            deletable: true,
            deleteRowsConfirm: true,
            deleteRowsMessage: "Are you sure?"
        },
        stateBar: {
            visible: false
        },
        select: {
            style: RealGridJS.SelectionStyle.ROWS
        },
        filtering: {
            selector: {
                minWidth: 200,          // min, max 너비 높이는 "50%" 와 같은 형식으로 그리드 크기에 대한 비율로 지정할 수 있음.
                maxWidth: 200,
                maxHeight: 250,
                closeWhenClick: false   // true면 항목 클릭 후 닫힘.
            },
            toast: {
            	visible: true
            }
        },
        grouping: {
            toast: true
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}
 
function loadData(provider) {
  provider.setRows(CustomerOrders);  
  
/*  
    grdMain.showToast("Load data...", true);
    $.ajax({
        url: "http://demo.realgrid.net/Demo/GetCustomOrders",
        dataType: 'json',
        success: function (data) {
            grdMain.hideToast();
            provider.setRows(data);
        },
        complete: function () {
            grdMain.hideToast();
        }
	}); 
*/
}
 
var tests = {
    existsLookupData: function () {
        var e = grdMain.existsLookupData("empLookup", ["WELLI", 3]);
        alert(e);
    },
    clearLookupdata: function () {
        grdMain.clearLookupData("empLookup");
    },
    fillLookupData: function () {
        grdMain.fillLookupData("empLookup", {
            "keys": [
                ["VINET", 5], ["VINET", 4], ["VINET", 3],
                ["CHOPS", 5], ["CHOPS", 4], ["CHOPS", 3],
                ["VICTE", 3], ["VICTE", 2],
                ["HANAR", 3], ["HANAR", 2],
                ["WELLI", 3], ["WELLI", 2]
            ],
            "values": [
                "VINET_5", "VINET_4", "VINET_3",
                "CHOPS_5", "CHOPS_4", "CHOPS_3",
                "VICTE_3", "VICTE_2",
                "HANAR_3", "HANAR_2",
                "WELLI_3", "WELLI_2"
            ]
        });
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
