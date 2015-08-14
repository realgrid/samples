var grdMain, dataProvider;

$(document).ready(function() {
	$("html, body").css({
		width : "100%",
		height : "100%"
	});
	$("#grdMain").css({
		width : "100%",
		height : "95%"
	});
	RealGridJS.setRootContext("../lib");
	dataProvider = new RealGridJS.LocalDataProvider();
	grdMain = new RealGridJS.GridView("grdMain");
	grdMain.setDataSource(dataProvider);

	setFields(dataProvider);
	setColumns(grdMain);
	setOptions(grdMain, dataProvider);
	setStyles(grdMain);

	loadData(dataProvider);
	cfnOrientationGrid(grdMain);
	
	grdMain.onDataCellClicked = function(grid, index){
		var checked = grid.getCheckedItems().indexOf(index.itemIndex) > -1 ? false : true;
		grid.checkItem(index.itemIndex, checked);
	}
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
        dataType: "number"
    }, {
        fieldName: "UnitPrice",
        dataType: "number"
    }];
	
	provider.setFields(fields);
}

function setColumns(grid) {
	var columns = [ {
		name : "OrderID",
		fieldName : "OrderID",
		type : "data",
		width : 90*2,
		styles : {
			textAlignment : "center"
		},
		header : {
			text : "Order"
		}
	}, {
		name : "CustomerID",
		fieldName : "CustomerID",
		width : 130*2,
		styles : {
			textAlignment : "center"
		},
		header : {
			text : "Customer ID"
		}
	}, {
		name : "EmployeeID",
		fieldName : "EmployeeID",
		width : 100*2,
		styles : {
			textAlignment : "center"
		},
		header : {
			text : "Employee ID"
		}
	}, {
		name : "OrderDate",
		fieldName : "OrderDate",
		width : 130*2,
		styles : {
			textAlignment : "center"
		},
		header : {
			text : "Order Date"
		}
	}, {
		name : "CompanyName",
		fieldName : "CompanyName",
		width : 100*2,
		styles : {
			textAlignment : "near"
		},
		header : {
			text : "Company Name"
		}
	} ];

	grid.setColumns(columns);
}

function setStyles(grid){
	grid.setStyles(generalBlueSkin);
	grid.setStyles({
		body : {
			dynamicStyles : [{
				criteria : "checked",
				styles : "background=#3300ff00"
			}]
		}
	});
}

function setOptions(grid, provider){
	grid.setOptions({
        display: {
            fitStyle : "fill"
        },
        statesBar : {
        	visible : false
        },
        edit : {
        	editable : false
        }
    });
	
	provider.setOptions({
        datetimeFormat: "yyyy-MM-dd a hh:mm:ss",
        amText: "오전",
        pmText: "오후"
    });
}

function loadData(provider) {
	provider.fillJsonData(mobileData);
}