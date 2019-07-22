var gridView, dataProvider;


$(document).ready( function() {
    RealGridJS.setTrace(false);
    RealGridJS.setRootContext("../lib");

    gridView = new RealGridJS.GridView('realgrid');
    dataProvider = new RealGridJS.LocalDataProvider();
    gridView.setDataProvider(dataProvider);

    setFields(dataProvider);
    setColumns(gridView);
    
    dataProvider.fillJsonData(datas)

    gridView.setMobileOptions({showTooltip:true});
    gridView.setEditOptions({editable:true});
    gridView.setHeader({showTooltip: true})

    gridView.onShowTooltip = function (grid, index, value) {
    var column = index.column;
    var itemIndex = index.itemIndex;
     
    var tooltip = value;
    if (column == "OrderID") {
            tooltip = "No: " + value +
                "\r\nSales Emp: " + grid.getValue(itemIndex, "EmployeeID") +
                "\r\nProduct:" + grid.getValue(itemIndex, "ProductName") +
                "\r\nQty:" + grid.getValue(itemIndex, "Quantity");
        } else if (column == "CustomerID") {
            tooltip = "Id: " + value +
                "\r\nName: " + grid.getValue(itemIndex, "CompanyName") +
                "\r\nPhone:" + grid.getValue(itemIndex, "Phone");
        } else if (column == "ShipVia") {
            tooltip = "ShipVia: " + value +
                "\r\nShip Name: " + grid.getValue(itemIndex, "ShipName") +
                "(" + grid.getValue(itemIndex, "ShipAddress") +  " " +
                      grid.getValue(itemIndex, "ShipCity") + " " +
                      grid.getValue(itemIndex, "ShipCountry") +  ")" +
                "\r\nFreight:" + grid.getValue(itemIndex, "Freight");
        }
        return tooltip;
    }

});

function setFields() {
    var fields = [
    {
        "fieldName": "OrderID"
    },
    {
        "fieldName": "EmployeeID"
    },
    {
        "fieldName": "OrderDate",
        "dataType": "datetime",
        "datimeFormat": "yyyy-MM-dd"
    },
    {
        "fieldName": "ProductName"
    },
    {
        "fieldName": "CustomerID"
    },
    {
        "fieldName": "CompanyName"
    },
    {
        "fieldName": "Phone"
    },
    {
        "fieldName": "RequiredDate",
        "dataType": "datetime",
        "datimeFormat": "yyyy-MM-dd"
    },
    {
        "fieldName": "ShippedDate",
        "dataType": "datetime",
        "datimeFormat": "yyyy-MM-dd"
    },
    {
        "fieldName": "ShipVia"
    },
    {
        "fieldName": "Freight",
        "dataType": "number"
    },
    {
        "fieldName": "ShipName"
    },
    {
        "fieldName": "ShipAddress"
    },
    {
        "fieldName": "ShipCity"
    },
    {
        "fieldName": "ShipRegion"
    },
    {
        "fieldName": "ShipPortalCode"
    },
    {
        "fieldName": "ShipCountry"
    },
    {
        "fieldName": "Quantity",
        "dataType": "numeric"
    },
    {
        "fieldName": "UnitPrice",
        "dataType": "numeric"
    }
];

    dataProvider.setFields(fields);
}

function setColumns() {
    var columns = [
    {
        "name": "OrderID",
        "fieldName": "OrderID",
        "width": "90",
        "renderer": {
            "showTooltip": true
        },
        "styles": {
            "textAlignment": "center",
            "background": "#ffffff99"
        },
        "header": {
            "text": "Order"
        }
    },
    {
        "name": "CustomerID",
        "fieldName": "CustomerID",
        "renderer": {
            "showTooltip": true
        },
        "styles": {
            "textAlignment": "center",
            "background": "#ffffff99"
        },
        "header": {
            "text": "Customer"
        }
    },
    {
        "name": "RequiredDate",
        "fieldName": "RequiredDate",
        "width": "80",
        "renderer": {
            "showTooltip": true
        },
        "styles": {
            "textAlignment": "center",
            "datetimeFormat": "yyyy.MM.dd"
        },
        "header": {
            "showTooltip": true,
            "tooltip": "Require Date",
            "text": "R/D",
            "styles": {
                "background": "#ffffff99"
            }
        }
    },
    {
        "name": "OrderDate",
        "fieldName": "OrderDate",
        "width": "80",
        "styles": {
            "textAlignment": "center",
            "datetimeFormat": "yyyy.MM.dd"
        },
        "header": {
            "showTooltip": true,
            "text": "O/D",
            "styles": {
                "background": "#ffffff99"
            }
        }
    },
    {
        "name": "ShipVia",
        "fieldName": "ShipVia",
        "width": "120",
        "renderer": {
            "showTooltip": true
        },
        "styles": {
            "background": "#ffffff99"
        },
        "header": {
            "text": "Shipping"
        }
    },
    {
        "name": "Quantity",
        "fieldName": "Quantity",
        "width": "100",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "#,##0.00"
        }
    },
    {
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "width": "100",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "#,##0.00"
        }
    }
];

    gridView.setColumns(columns);

}