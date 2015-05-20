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

  grdMain.onCurrentChanging = function (grid, oldIndex, newIndex) {

  };

  dataProvider.onRowUpdating = function (provider, row) {
      var item = grdMain.getEditingItem();
      if (item) {
          console.log(item);
          if (item.values["OrderID"] <= 100) {
              alert('OrderID must be greater than 100 !');
              return false;
          }
      }
      return true;
  };
  dataProvider.onRowUpdated = function (provider, row) {
      var r = dataProvider.getJsonRow(row);
      console.log("$$$$$$$$$$$$$$ onRowUpdated: " + JSON.stringify(r));
  };
  grdMain.onEditChange = function (grid, index, value) {
      console.log("$$$$$$ Eidt change: " + value);
  };
  grdMain.onEditCommit = function (grid, index, oldValue, newValue) {
      console.log("$$$$$$ Edit commit: " + oldValue + " => " + newValue);
      //return false;
  };
  grdMain.onEditCanceled = function (grid, index) {
      console.log("$$$$$$ Edit canceled: " + JSON.stringify(index));
  };
  grdMain.onCellEdited = function (grid, itemIndex, dataRow, field) {
      console.log("$$$$$$ Cell edited: " + itemIndex + ", " + dataRow + ", " + field);
  };
  grdMain.onEditRowChanged = function (grid, itemIndex, dataRow, field, oldValue, newValue) {
      console.log("$$$$$$ Edit row changed: " + itemIndex + ", " + dataRow + ", " + field + ", " + oldValue + " => " + newValue);
  };

  grdMain.onColumnHeaderDblClicked = function (grid, column) {
      alert("Dbl clicked : " + column.name);
  };

  /*
  window.addEventListener("mousemove", function (e) {
      var index = grdMain.mouseToIndex();
      console.log(JSON.stringify(index));
  });
  */

  setTests("actions", "Update Rows");
});
 
function setFields(provider) {
    dataProvider.setOptions({
        restoreMode: "auto"
    });

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
        "readOnly": false,
        "editable": false,
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Order ID"
        }
    }, {
        "name": "CustomerID",
        "fieldName": "CustomerID",
        "width": "130",
        "required": true,
        "requiredMessage": "Required !!!",
        "requiredLevel": RealGridJS.ValidationLevel.WARNING,
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Customer ID"
        },
        "editor": {
            "readOnly": true
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
    }, {
        "name": "CompanyName",
        "fieldName": "CompanyName",
        "width": "200",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Company Name"
        },
        "editor": {
            "type": "multiline"
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
        },
        "editor": {
            "type": "dropDown",
            "items": ["Mexico", "Japan", "China", "Russia", "France", "Germany", "England", "India"],
            "dropDownCount": 4
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
        },
        "editor": {
            "type": "multiline"
        }
    }, {
        "name": "QuantityPerUnit",
        "fieldName": "QuantityPerUnit",
        "width": "140",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Quantity / Unit"
        }
    }, {
        "name": "Quantity",
        "fieldName": "Quantity",
        "width": "80",
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
                "suffix": "$"
            }
        },
        "editor": {
            "type": "number"
        }
    }, {
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "width": "80",
        "styles": {
            "textAlignment": "far"
        },
        "header": {
            "text": "Unit Price"
        },
        "footer": {
            "expression": "sum",
            "styles": {
                "textAlignment": "far",
                "suffix": "$"
            }
        },
        "editor": {
            "type": "number"
        }
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        edit: {
            editable: true,
            updatable: true,
            insertable: true,
            appendable: true,
            deletable: true,
            readOnly: false,
            checkDiff: true
        },
        display: {
            focusColor: 0x5292f7
        },
        copy: {
          datetimeFormat: "yyyyMMddaHHmmss"
        },
        paste: {
            numberChars: [",", "&", "$", "\\"],
            startEdit: true,
            datetimeFormats: ["yyyyMMddaHHmmss"]
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}
 
function setStyles() {
    grdMain.setStyles({
        selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
}
 
function loadData(provider) {
    provider.setRows(CustomerOrders);
    var count = provider.getRowCount();
    $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
/*  
    $.ajaxSetup({ cache: false });

    var params = {
        //CustomerId: "ANATR"
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
    beginUpdate: function () {
        var curr = grdMain.getCurrent();
        grdMain.beginUpdateRow(1);//Math.max(0, curr.itemIndex));
        grdMain.showEditor();
        grdMain.setFocus();
    },
    beginInsert: function () {
        var curr = grdMain.getCurrent();
        grdMain.beginInsertRow(Math.max(0, curr.itemIndex));
        grdMain.showEditor();
        grdMain.setFocus();
    },
    setValues: function () {
        var curr = grdMain.getCurrent();
        var vals = {
            "CustomerID": "xxx",
            "EmployeeID": 999
        };
        grdMain.setValues(curr.itemIndex, vals);
    },
    setArrayValues: function () {
        var curr = grdMain.getCurrent();
        var vals = [1, 2, 3];
        grdMain.setValues(curr.itemIndex, vals);
    },
    ping: function () {
        grdMain.ping("Good!");
    },
    getItemState: function () {
        var curr = grdMain.getCurrent();
        alert(grdMain.getItemState(curr.itemIndex));
    },
    mouseToIndex: function () {
        var index = grdMain.mouseToIndex(190, 100);
        alert(JSON.stringify(index));
    },
    getJsonRows: function () {
        var rows = dataProvider.getJsonRows(1);
        console.log(rows);
    },
    getModel: function () {
        var curr = grdMain.getCurrent();
        alert(JSON.stringify(grdMain.getModel(curr.itemIndex)));
    },
    getValue: function () {
        var curr = grdMain.getCurrent();
        var val = dataProvider.getValue(curr.dataRow, curr.fieldIndex);
        alert(JSON.stringify(val));
    },
    setValue: function () {
        var curr = grdMain.getCurrent();
        var val = dataProvider.getValue(curr.dataRow, curr.fieldIndex);
        dataProvider.setValue(curr.dataRow, curr.fieldIndex, val + "_2");
    },
    setVisible: function () {
        $("#container").css("display", "block");
        grdMain.resetSize();
    },
    setEditable: function () {
        var curr = grdMain.getCurrent();
        grdMain.setColumnProperty(curr.column, "editable", false);
    },
    restoreUpdates: function () {
        dataProvider.restoreUpdatedRows();
    },
    restoreUpdateRow: function () {
        var curr = grdMain.getCurrent();
        if (curr.dataRow >= 0) {
            dataProvider.restoreUpdatedRows(curr.dataRow);
        }
    },
    setRowState: function () {
        var curr = grdMain.getCurrent();
        if (curr.dataRow >= 0) {
            dataProvider.setRowState(curr.dataRow, "updated");
        }
    },
    setDynamicStyles: function () {
        grdMain._gv.getColumn(0).setDynamicStyles([{
            criteria: "row % 2 = 0",
            styles: "background=#ffff00"
        }])
    },
    setFocus: function () {
        $("#txtMain").focus();
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
    createButtons(container, tests);
	/*
	createCheckBox(container, "panel", function (e) {
		grdMain.panel().setVisible(e.target.checked);
	}, true);
	*/
}
