var grdMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

$(document).ready(function () {
 //   RealGridJS.setDebug(true);

	dataProvider = new RealGridJS.LocalDataProvider();
  grdMain = new RealGridJS.GridView("container", true);
  setFields(dataProvider);

  grdMain.setDataSource(dataProvider);
  setColumns(grdMain);
  setOptions(grdMain);
  setSkin();
  setStyles(grdMain);

  setTimeout(function() {
    loadData(dataProvider);

  }, 100)
	    
  grdMain.onLinkableCellClicked = function (grid, index, url) {
    alert(url + "  페이지를 띄웁니다.");
    window.open(url, '_newtab');
  };

  //setTests("actions", "FixedColumns");
});

function setFields(provider) {
    var fields = [{
        "fieldName": "OrderID",
        "dataType": "text"
    }, {
        "fieldName": "CustomerID",
        "dataType": "text"
    }, {
        "fieldName": "EmployeeID",
        "dataType": "text"
    }, {
        "fieldName": "OrderDate",
        "dataType": "datetime",
        "dateFormat": "yyyy-MM-dd a hh:mm:ss",
        "amText": "오전",
        "pmText": "오후"
    }, {
        "fieldName": "CompanyName",
        "dataType": "text"
    }, {
        "fieldName": "Country",
        "dataType": "text"
    }, {
        "fieldName": "Phone",
        "dataType": "text"
    }, {
        "fieldName": "ProductName",
        "dataType": "text"
      }, {
        "fieldName": "QuantityPerUnit",
        "dataType": "text"
      }, {
        "fieldName": "Quantity",
        "dataType": "text"
      }, {
        "fieldName": "UnitPrice",
        "dataType": "text"
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
          "name": "Country",
          "fieldName": "Country",
          "type": "data",
          "width": "100",
          "renderer": {
            type: "link",
            url: "http://www.countryreports.org/country/${Country}.htm",
            requiredFields: "Country",
            showUrl: true
          },
          "styles": {
              "textAlignment": "center"
          },
          "header": {
              "text": "Country"
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
        "name": "Country2",
        "fieldName": "Country",
        "type": "data",
        "width": "100",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Country2"
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
        edit: {
            appendable: true,
       //     editable: false
        }
    })
}
 
function setStyles() {
    grdMain.setStyles({
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}
 
function loadData(provider) {
   
    provider.setRows(CustomerOrders);
    provider.setRowCount(20);
/* 
    var params = {
        CustomerId : ""
    };

    $.ajaxSetup({ cache: false });
 
    $.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders", params, function (data) {
        provider.setRows(data);
        provider.setRowCount(20);
    })
    .done(function () {
        grdMain.setFocus();
    })
    .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("jQuery getJSON() Failed: " + err);
        alert("jQuery getJSON() Failed: " + err);
    });
*/
}
 
var tests = {
	fixedColumns: function () {
		grdMain.setFixedOptions({
			colCount: 3
		});
	},
	fixedRows: function () {
		grdMain.setFixedOptions({
			rowCount: 3
		});
	},
    columnsByField: function () {
        var columns = grdMain.columnsByField("Country");
        console.log(JSON.stringify(columns));
    },
    getDataRow: function () {
        alert(grdMain.getDataRow(grdMain.getCurrent().itemIndex));
    },
    hasData: function () {
        dataProvider.clearRows();
        dataProvider.setRowCount(100);
        alert(dataProvider.hasData(99));
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	createCheckBox(container, "fixedEditable", function (e) {
        grdMain.setFixedOptions({
            editable: e.target.checked
        });
	}, false);
    /*
	createCheckBox(container, "merged", function (e) {
		grdMain.rowGroup().setMergeMode(e.target.checked);
	}, false);
	*/
}
