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

	loadData(dataProvider);
    
  setTests("actions", "ColumnFiltering");

  grdMain.onSorting = function (grid, fields, dirs) {
      console.log("$$$$$$$$$$$$$$$$$$$ sorting: " + JSON.stringify(fields) + ", " + JSON.stringify(dirs));
  };
  grdMain.onSortingChanged = function (grid) {
      console.log("$$$$$$$$$$$$$$$$$$$ sorting changed.");
  };
  grdMain.onFiltering = function (grid) {
      console.log("$$$$$$$$$$$$$$$$$$$ filtering.");
//      return false;
  };
  grdMain.onFilteringChanged = function (grid) {
      console.log("$$$$$$$$$$$$$$$$$$$ filtering changed.");
  };
  grdMain.onFilterActionClicked = function (grid, column, action, x, y) {
      console.log("onFilterActionClicked: " + column + ", " + action + ", " + x + ", " + y);
  };
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
        fieldName: "Quantity"
    }, {
        fieldName: "UnitPrice"
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
        },
        "footer": {
        	"expression": "count",
        	"groupExpression": "count",
            "styles": {
                "textAlignment": "far",
                "suffix": " rows"
            }
        }
    }, {
        "name": "CustomerID",
        "fieldName": "CustomerID",
        "width": "130",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Customer ID"
        },
        "filters": [{
            name: "VINET",
            criteria: "value = 'VINET'"
        }, {
            name: "VICTE",
            criteria: "value = 'VICTE'",
            hidden: false
        }]
    }, {
        "name": "EmployeeID",
        "fieldName": "EmployeeID",
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
    }, {
        "name": "QuantityPerUnit",
        "fieldName": "QuantityPerUnit",
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
        edit: {
            deletable: true,
            deleteRowsConfirm: true,
            deleteRowsMessage: "Are you sure?",
            insertable: true,
            appendable: true
        },
        stateBar: {
            visible: true
        },
        select: {
            style: RealGridJS.SelectionStyle.ROWS
        },
        filtering: {
            selector: {
                minWidth: 160,          // min, max 너비 높이는 "50%" 와 같은 형식으로 그리드 크기에 대한 비율로 지정할 수 있음.
                maxWidth: 250,
                maxHeight: 250,
                closeWhenClick: false   // true면 항목 클릭 후 닫힘.
            },
            toast: {
            	visible: true
            }
        },
        grouping: {
            toast: true
        },
        sorting: {
            style: "inclusive"
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}
 
function loadData(provider) {
  dataProvider.setRows(CustomerOrders);

  	/*
    var params = {
        CustomerId: ""
    };
 
    $.ajaxSetup({ cache: false });
 
    $.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders", params, function (data) {
        dataProvider.setRows(data);
    })
    .done(function () {
        //grdMain.setFocus();
    })
    .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console && console.log("jQuery getJSON() Failed: " + err);
        alert("jQuery getJSON() Failed: " + err);
    });
    */
}
 
var tests = {
	setFilters: function () {
	    var column = grdMain.columnByName('CustomerID');
	    if (column) {
	        var filters = [{
	            name: "VINET",
	            criteria: "value = 'VINET'"
	        }, {
	            name: "VICTE",
	            criteria: "value = 'VICTE'",
                hidden: true
	        }, {
	            name: "HANAR",
	            criteria: "value = 'HANAR'"
	        }, {
	            name: "'VICTE' or 'HANAR'",
	            criteria: "(value = 'VICTE') or (value = 'HANAR')"
	        }, {
	            name: "HANAR: value > 'HANAR'",
	            criteria: "value > 'HANAR'"
	        }, {
	            name: "SUPRD",
	            criteria: "value = 'SUPRD'"
	        }, {
	            name: "SUPRD: value <> 'SUPRD'",
	            criteria: "value <> 'SUPRD'"
	        }, {
	            name: "W: value like 'L%'",
	            criteria: "value like 'L%'"
	        }, {
	            name: "W: value not like 'L%'",
	            criteria: "value not like 'L%'"
	        }, {
	            name: "S: value like '%S'",
	            criteria: "value like '%S'"
	        }, {
	            name: "S: value not like '%S'",
	            criteria: "value not like '%S'"
	        }, {
	            name: "TC: value match 'TC'",
	            criteria: "value match 'TC'"
	        }, {
	            name: "match '^RATTC$|^SUPRD$'",
	            criteria: "value match '^RATTC$|^SUPRD$'"
	        }, {
	            name: "TC: value not match 'TC'",
	            criteria: "value not match 'TC'"
	        }];
	 
	        // 컬럼 필터를 재설정한다.
	        grdMain.setColumnFilters(column.name, filters);
	 
	        // 아래와 같이 호출해도 된다.
	        //column.filters = filters;
	        //grdMain.setColumn(column);
	 
	        $("#btnFilter").attr("disabled", "disabled");
	        $("#txtFilter").text("'CustomerId' 컬럼에 필터가 설정됐습니다.");
	    };
	},
	setFilters2: function () {
		var acol = grdMain.columnByName("Quantity");
		 var filters = [{
              criteria:"value > 1000 ", name:"filter1", text:"XXXXXXXXXX", active:true
         }];
		 grdMain.setColumnFilters(acol, filters);	
	},
    setFilters3: function () {
        var acol = grdMain.columnByName("Country");
        var filters = [{
            criteria:"(value = 'Germany')", name:"filter1"
        }];
        grdMain.setColumnFilters(acol, filters);
    },
	clearFilters: function () {
	    grdMain.clearColumnFilters('CustomerID');
	},
	addFilter: function () {
	    var filter = {
	        name: "TOMSP",
	        criteria: "value = 'TOMSP'",
	        active: false
	    };
	    var overwrite = true; // false면 기존에 같은 이름의 필터가 있을 때 예외 발생.

	    grdMain.addColumnFilters('CustomerID', filter, overwrite);
	},
	removeFilter: function () {
	    grdMain.removeColumnFilters('CustomerID', "TOMSP");
	},
	activateFilter: function () {
	    grdMain.activateColumnFilters('CustomerID', "TOMSP", true);
	},
	deactivateFilter: function () {
	    grdMain.activateColumnFilters('CustomerID', "TOMSP", false);
	},
	toggleFilter: function () {
	    grdMain.toggleColumnFilters('CustomerID', "TOMSP");
	},
	addFilters: function () {
	    var filters = [{
	        name: "VINET",
	        criteria: "value = 'VINET'",
	        active: false
	    }, {
	        name: "VICTE",
	        criteria: "value = 'VICTE'",
	        active: true
	    }, {
	        name: "HANAR",
	        criteria: "value = 'HANAR'"
	    }];
	    var overwrite = true; // false면 기존에 같은 이름의 필터가 있을 때 예외 발생.
	 
	    grdMain.addColumnFilters('CustomerID', filters, overwrite);
	},
	removeFilters: function () {
	    grdMain.removeColumnFilters('CustomerID', ["VINET", "VICTE"]);
	},
	activateFilters: function () {
	    grdMain.activateColumnFilters('CustomerID', ["VINET", "VICTE"], true);
	},
	deactivateFilters: function () {
	    grdMain.activateColumnFilters('CustomerID', ["VINET", "VICTE"], false);
	},
	toggleFilters: function () {
	    grdMain.toggleColumnFilters('CustomerID', ["VINET", "VICTE"]);
	},
	activateAllFilters: function () {
	    grdMain.activateAllColumnFilters('CustomerID', true);
	},
	deactivateAllFilters: function () {
	    grdMain.activateAllColumnFilters('CustomerID', false);
	},
	toggleAllFilters: function () {
	    grdMain.toggleAllColumnFilters('CustomerID');
	},
	getFilter: function () {
		var filter = grdMain.getColumnFilter('CustomerID', 'VINET');
		alert(JSON.stringify(filter));
	},
	getFilters: function () {
		var filters = grdMain.getColumnFilters('CustomerID');
		alert(JSON.stringify(filters));
	},
    getActiveFilters: function () {
        var filters = grdMain.getActiveColumnFilters("CustomerID");
        alert(JSON.stringify(filters));
    },
    setFilterActions: function () {
        var actions = [{
            name: "autoFilter",
            text: "Auto Filter",
            description: "100개의 순차 데이터중 선택하여 filter하는 action."
        }];

        grdMain.setColumnFilterActions('CustomerID', actions);

        actions = [{
            name: "actionFilter1",
            text: "Action Filter 1",
            description: "100개의 순차 데이터중 선택하여 filter하는 action 1."
        }/*, {
            name: "actionFilter2",
            text: "Action Filter 2",
            description: "100개의 순차 데이터중 선택하여 filter하는 action 2."
        }*/];

        grdMain.setColumnFilterActions('OrderID', actions);
    },
    clearFilterActions: function () {
        grdMain.clearColumnFilterActions('CustomerID');
        //grdMain.clearColumnFilterActions('OrderID');
    },
    getSortedFields: function () {
        var flds = grdMain.getSortedFields();
        alert(JSON.stringify(flds));
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
