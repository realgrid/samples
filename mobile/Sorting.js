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
	
	$("#rdoDiv :radio").change(fnRdoChange);
	
	dataProvider = new RealGridJS.LocalDataProvider();
	grdMain = new RealGridJS.GridView("grdMain");
	grdMain.setDataSource(dataProvider);

	setFields(dataProvider);
	setColumns(grdMain);
	setOptions(grdMain, dataProvider);
	
	grdMain.setStyles(generalBlueSkin);
	
	cfnOrientationGrid(grdMain);
	
	loadData(dataProvider);
});

function setFields(provider) {
	var fields = [ {
		fieldName : "OrderID"
	}, {
		fieldName : "CustomerID"
	}, {
		fieldName : "EmployeeID"
	}, {
		fieldName : "OrderDate",
		dataType : "datetime"
	}, {
		fieldName : "CompanyName"
	}, {
		fieldName : "Country"
	}, {
		fieldName : "Phone"
	}, {
		fieldName : "ProductName"
	}, {
		fieldName : "QuantityPerUnit"
	}, {
		fieldName : "Quantity",
		dataType : "number"
	}, {
		fieldName : "UnitPrice",
		dataType : "number"
	} ];

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

function setOptions(grid, provider) {
	grid.setOptions({
        display: {
            fitStyle : "even"
        }
    });
	provider.setOptions({
		datetimeFormat : "yyyy-MM-dd a hh:mm:ss",
		amText : "오전",
		pmText : "오후"
	});
}

function loadData(provider) {
	provider.fillJsonData(mobileData);
}

function fnRdoChange(e){
	var style = this.value;
	grdMain.orderBy([]);
	grdMain.setSortingOptions({style : style});
}