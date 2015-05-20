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
    
  setTests("actions", "Editors");
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
}
 
function setColumns(grid) {
    var columns = [{
        "name": "OrderID",
        "fieldName": "OrderID",
        "width": "90",
        "styles": {
            "textAlignment": "center"
        },
        "textInputCase": "upper",
        "header": {
            "text": "Text editor"
        }
    }, {
        "name": "CustomerID",
        "fieldName": "CustomerID",
        "width": "150",
        "sortable": false,
        "lookupDisplay": true,
        "values": ["VINET", "HANAR", "SUPRD", "VICTE", "THREE", "SEVEN"],
        "labels": ["<VINET>", "<HANAR>", "<SUPRD>", "<VICTE>", "<THREE>", "<SEVEN>"],
        "editor": {
            "type": "dropDown",
            "dropDownCount": 4
        },
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "DropDown Edit",
            "styles": {
                "background": "linear,#22ffd500,#ffffd500,90"
            }
        }
    }, {
        "name": "CustomerID2",
        "fieldName": "CustomerID",
        "width": "150",
        "sortable": false,
        "editor": {
            "type": "dropDown",
            "dropDownCount": 4,
            "domainOnly": true,
            "values": ["VINET", "HANAR", "SUPRD", "VICTE", "THREE", "SEVEN"],
            "labels": ["<VINET>", "<HANAR>", "<SUPRD>", "<VICTE>", "<THREE>", "<SEVEN>"]
        },
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Domain Only",
            "styles": {
                "background": "linear,#22ffd500,#ffffd500,90"
            }
        }
    }, {
        "name": "CustomerID3",
        "fieldName": "CustomerID",
        "width": "150",
        "sortable": false,
        "editor": {
            "type": "search",
            "searchLength": 1,
            "searchDelay": 500
        },
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Search Editor ",
            "styles": {
                "background": "linear,#22ffd500,#ffffd500,90"
            }
        }
    }, {
        "name": "OrderDate",
        "fieldName": "OrderDate",
        "width": "180",
        "sortable": false,
        "button": "action",
        "editor": {
            "type": "date",
            "editFormat": "yyyy.MM.dd"
        },
        "styles": {
            "textAlignment": "center",
            "datetimeFormat": "yyyy.MM.dd"
        },
        "header": {
            "text": "Date Edit",
            "styles": {
                "background": "linear,#22ffd500,#ffffd500,90"
            }
        }
    }, {
        "name": "Quantity",
        "fieldName": "Quantity",
        "width": "100",
        "sortable": false,
        "editor": {
            "type": "number"
        },
        "styles": {
            "textAlignment": "far",
            "numberFormat": "#,##0"
        },
        "header": {
            "text": "Number Edit",
            "styles": {
                "background": "linear,#22ffd500,#ffffd500,90"
            }
        }
    }, {
        "name": "CompanyName",
        "fieldName": "CompanyName",
        "width": "200",
        "editor": {
            "type": "multiline",
            "textCase": "upper"
        },
        "styles": {
            "textAlignment": "near",
            "textWrap": "explicit"
        },
        "header": {
            "text": "Multiline Edit",
            "styles": {
                "background": "linear,#22ffd500,#ffffd500,90"
            }
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
    },{
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
        edit: {
            insertable: true,
            appendable: true,
            updatable: true,
            checkDiff: true,
            checkCellDiff: true,
            enterToTab: false
        }
    });
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
        },
        selection: {
            background: "#11880000",
            border: "#88880000,1"
        }
    });}
 
function loadData(provider) {
    provider.setRows(CustomerOrders);
/*  
    $.ajaxSetup({ cache: false });

    var params = {
        CustomerId: ""
    };

    grdMain.showToast("Load data...", true);
    $.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders", params, function (data) {
        provider.setRows(data);
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
        })
	}, true);
    createCheckBox(container, "forceDeleting", null, true);
    createCheckBox(container, "deleteRows", null, false);
    createCheckBox(container, "fireEvent", null, false);
    createListBox(container, "rowState", ["created", "updated", "deleted", "createAndDeleted", "none", "all"], null, "created")
    */
}
