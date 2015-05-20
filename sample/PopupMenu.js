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
    
  setTests("actions", "PopupMenu");
});
 
function setFields(provider) {
    var fields = [{
        fieldName: "OrderID"
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
        dataType: "number"
    }, {
        fieldName: "UnitPrice",
        dataType: "number"
    }];

    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
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
        "name": "CustomerID",
        "fieldName": "CustomerID",
        "type": "data",
        "width": "100",
        "button": "popup",
        "popupMenu": "menu1",
        "alwaysShowButton": true,
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Customer ID"
        }
    }, {
        "name": "OrderDate",
        "fieldName": "OrderDate",
        "type": "data",
        "width": "130",
        "button": "popup",
        "popupMenu": "menu1",
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
        "button": "popup",
        "popupMenu": "menu2",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Company Name"
        }
    }];

    grid.setColumns(columns);
}

function setStyles(grid) {
    grid.setStyles({
        header: {
            group: {
                background: "linear,#ffe9f0f8,#ffc3f8d8,90",
                foreground: "#ff666666"
            }
        }
    });
	
	// 49번 스타일이 잘못되어 있음.
	grdMain.setOptions({
		checkBar: {
			footStyles: {
				borderBottom: null
			}
		}
	});
}

function setOptions(grid) {
    grid.setOptions({
        stateBar: {
            visible: false
        },
        panel: {
            visible: true
        },
        header: {
        },
        display: {
            rowResizable: true
        }
    });

    // popup menus
    var menu = [{
        label: "menu1 입니다.",
        enabled: true,
        children: [{
            label: "submenu1 입니다."
        }, {
            label: "submenu2 입니다."
        }, {
            label:"3단계",
            children:[
                {
                    label:"3단계 1",
                    tag:"aa",
                    callback: function(data) {
                        console.log("menu callback", JSON.stringify(data));
                    }
                },
                {
                    label:"3단계 2",
                    tag:"bb"
                }
            ],
            tag:"aaaa"
        }]
    }, {
        label: "menu2 입니다",
        enabled: false
    }, {
        label: "-"
    }, {
        label: "menu3 입니다",
        type: "check",
        checked: true,
        tag: "check_menu"
    }, {
        label: "group menu",
        children: [{
            label: "group1 - 첫번째",
            type: "radio",
            group: "group1",
            checked: true
        }, {
            label: "group1 - 두번째",
            type: "radio",
            group: "group1"
        }, {
            label: "group1 - 세번째",
            type: "radio",
            group: "group1"
        }]
    }];
    grid.addPopupMenu("menu1", menu);

    var menu2 = [ {
        label:"menu1",
        enabled:true,
        children:[{
            label:"group1",
            type:"radio",
            group:"group1"
        },{
            label:"group2",
            type:"radio",
            group:"group1"
        }]
    },{
        label:"groupmenu1",
        type:"radio",
        group:"group2"
    },{
        label:"groupmenu2",
        type:"radio",
        group:"group2"
    } ];
    grid.addPopupMenu("menu2", menu2);

    grid.onMenuItemClicked = function (grid, data) {
        var s = data.label + (data.checked ? " checked" : "");
        if (data.tag)
            s += "\n" + "tag: " + data.tag;
        alert(s);
    };
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    provider.setRows(CustomerOrders);
    //var count = provider.getRowCount();
    //$("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
}

var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	/*
	createCheckBox(container, "merged", function (e) {
		grdMain.rowGroup().setMergeMode(e.target.checked);
	}, false);
	*/
}

