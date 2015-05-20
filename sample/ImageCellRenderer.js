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
	setOptions(grdMain);
  setSkin();
  setStyles(grdMain);

	loadData(dataProvider);
    
  setTests("actions", "ImageCellRenderer");
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
        dataType: "number"
    }, {
        fieldName: "UnitPrice",
        dataType: "number"
    }, {
        fieldName: "NormalFlag"
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
        "name": "NormalFlag1",
        "fieldName": "NormalFlag",
        "width": "200",
        "header": {
            "text": "ContentFit.NONE"
        },
        "renderer": {
            "type": "image",
            "smoothing": "true"
        },
        "styles": {
            "contentFit": "none"
        }
    }, {
        "name": "NormalFlag2",
        "fieldName": "NormalFlag",
        "width": "200",
        "header": {
            "text": "ContentFit.CENTER"
        },
        "renderer": {
            "type": "image",
            "smoothing": "true"
        },
        "styles": {
            "contentFit": "center"
        }
    }, {
        "name": "NormalFlag3",
        "fieldName": "NormalFlag",
        "width": "200",
        "header": {
            "text": "ContentFit.BOTH"
        },
        "renderer": {
            "type": "image",
            "smoothing": "true"
        },
        "styles": {
            "contentFit": "both"
        }
    }, {
        "name": "NormalFlag4",
        "fieldName": "NormalFlag",
        "width": "200",
        "header": {
            "text": "ContentFit.WIDTH"
        },
        "renderer": {
            "type": "image",
            "smoothing": "true"
        },
        "styles": {
            "contentFit": "width"
        }
    }, {
        "name": "NormalFlag5",
        "fieldName": "NormalFlag",
        "width": "200",
        "header": {
            "text": "ContentFit.HEIGHT"
        },
        "renderer": {
            "type": "image",
            "smoothing": "true"
        },
        "styles": {
            "contentFit": "height"
        }
    }, {
        "name": "NormalFlag6",
        "fieldName": "NormalFlag",
        "width": "200",
        "header": {
            "text": "ContentFit.AUTO"
        },
        "renderer": {
            "type": "image",
            "smoothing": "true"
        },
        "styles": {
            "contentFit": "auto"
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
        "name": "CustomerID",
        "fieldName": "CustomerID",
        "width": "100",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Customer ID"
        }
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
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        display: {
            rowHeight: 80,
            rowResizable: true
        },
        header : {
            textWrap:"none"
        },
        footer: {
            visible: false
        },
        checkBar: {
            visible: false
        },
        stateBar: {
            visible: false
        }
    });
}
 
function setStyles() {
    grdMain.setStyles({
        header: {
            textWrap: "none"
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    provider.setRows(CustomerOrders);
    var count = provider.getRowCount();
    $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
/*  
    $.ajaxSetup({ cache: false });
 
    var params = {
        CustomerId: ""
    };
 
    $.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders", params, function (data) {
        provider.setRows(data);
        var count = provider.getRowCount();
        $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
    })
    .done(function () {
        grdMain.setFocus();
    })
    .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console && console.log("jQuery getJSON() Failed: " + err);
        alert("jQuery getJSON() Failed: " + err);
    });
*/    
}

var tests = {
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
