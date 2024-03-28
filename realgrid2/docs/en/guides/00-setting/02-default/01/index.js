/*eslint-disable*/

var fields = [
  {
    fieldName: "OrderID"
  },
  {
    fieldName: "CustomerID",
    dataType: "text"
  },
  {
    fieldName: "CompanyName",
    dataType: "text"
  },
  {
    fieldName: "EmployeeID",
    dataType: "number"
  },
  {
    fieldName: "OrderDate",
    dataType: "datetime"
  },
  {
    fieldName: "ShipName",
    dataType: "text"
  },
  {
    fieldName: "ShipAddress",
    dataType: "text"
  },
  {
    fieldName: "ShipCity",
    dataType: "text"
  },
  {
    fieldName: "ShipCountry",
    dataType: "text"
  }
];

var columns = [
  {
    name: "OrderID",
    fieldName: "OrderID",
    width: "60",
    header: {
      text: "OrderID"
    }
  },
  {
    name: "CustomerID",
    fieldName: "CustomerID",
    width: "60",
    header: {
      text: "CustomerID"
    }
  },
  {
    name: "CompanyName",
    fieldName: "CompanyName",
    width: "100",
    header: {
      text: "CompanyName"
    }
  },
  {
    name: "EmployeeID",
    fieldName: "EmployeeID",
    width: "50",
    header: {
      text: "EmployeeID"
    }
  },
  {
    name: "OrderDate",
    fieldName: "OrderDate",
    width: "80",
    editor: {
      type: "date"
    },
    header: {
      text: "OrderDate",
      styleName: "orange-column"
    },
    datetimeFormat: "yyyy-MM"
  },
  {
    name: "ShipName",
    fieldName: "ShipName",
    width: "80",
    header: {
      text: "ShipName"
    }
  },
  {
    name: "ShipAddress",
    fieldName: "ShipAddress",
    width: "120",
    header: {
      text: "ShipAddress"
    }
  },
  {
    name: "ShipCity",
    fieldName: "ShipCity",
    width: "80",
    header: {
      text: "ShipCity"
    }
  },
  {
    name: "ShipCountry",
    fieldName: "ShipCountry",
    width: "80",
    header: {
      text: "ShipCountry"
    }
  }
];

var fields1 = [
  {
      "fieldName": "OrderID"
  },
  {
      "fieldName": "ProductName",
      "dataType": "text"
  },
  {
      "fieldName": "UnitPrice",
      "dataType": "number"
  },
  {
      "fieldName": "Quantity",
      "dataType": "number"
  }
];

var columns1 = [
  {
      "name": "OrderID",
      "fieldName": "OrderID",
      "header": "OrderID",
      "width": 70,
      "editable": false,
      "readOnly": true,
      "numberFormat": "0"
  },
  {
      "name": "ProductName",
      "fieldName": "ProductName",
      "required": true,
      "requiredLevel": "info",
      "requiredMessage": "ProductName는 반드시 입력해야 합니다.",
      "header": "ProductName",
      "width": 200
  },
  {
      "name": "UnitPrice",
      "fieldName": "UnitPrice",
      "editor": {
        "type": "number"
      },
      "editable": true,
      "editButtonVisibility": "always",
      "header": {
        text: "UnitPrice",
        styleName: "orange-column"
      },
      "numberFormat": "#,##0"
  },
  {
      "name": "Quantity",
      "fieldName": "Quantity",
      "header": "Quantity",
      "numberFormat": "#,##0"

  }
]

var masterData = [
  ["10248", "VINET", "Vins et alcools Chevalier", "5", "1996-07-04", "Vins et alcools Chevalier", "59 rue de l'Abbaye", "Reims", "France"],
  ["10249", "TOMSP", "Toms Spezialitäten", "6", "1996-07-05", "Toms Spezialitäten", "Luisenstr. 48", "Münster", "Germany"],
  ["10250", "HANAR", "Hanari Carnes", "4", "1996-07-08", "Hanari Carnes", "Rua do Paço, 67", "Rio de Janeiro", "Brazil"],
  ["10251", "VICTE", "Victuailles en stock", "3", "1996-07-08", "Victuailles en stock", "2, rue du Commerce", "Lyon", "France"],
  ["10252", "SUPRD", "Suprêmes délices", "4", "1996-07-09", "Suprêmes délices", "Boulevard Tirou, 255", "Charleroi", "Belgium"],
  ["10253", "HANAR", "Hanari Carnes", "3", "1996-07-10", "Hanari Carnes", "Rua do Paço, 67", "Rio de Janeiro", "Brazil"]
];

var detailData = [
  { OrderID: "10248", ProductName: "Queso Cabrales", UnitPrice: 14, Quantity: 12 },
  { OrderID: "10248", ProductName: "Singaporean Hokkien Fried Mee", UnitPrice: 9.8, Quantity: 10 },
  { OrderID: "10248", ProductName: "Mozzarella di Giovanni", UnitPrice: 34.8, Quantity: 5 },
  { OrderID: "10249", ProductName: "Tofu", UnitPrice: 18.6, Quantity: 9 },
  { OrderID: "10249", ProductName: "Manjimup Dried Apples", UnitPrice: 42.4, Quantity: 40 },
  { OrderID: "10250", ProductName: "Jack's New England Clam Chowder", UnitPrice: 7.7, Quantity: 10 },
  { OrderID: "10250", ProductName: "Manjimup Dried Apples", UnitPrice: 42.4, Quantity: 35 },
  { OrderID: "10250", ProductName: "Louisiana Fiery Hot Pepper Sauce", UnitPrice: 16.8, Quantity: 15 },
  { OrderID: "10251", ProductName: "Gustaf's Knäckebröd", UnitPrice: 16.8, Quantity: 6 },
  { OrderID: "10251", ProductName: "Ravioli Angelo", UnitPrice: 15.6, Quantity: 15 },
  { OrderID: "10251", ProductName: "Louisiana Fiery Hot Pepper Sauce", UnitPrice: 16.8, Quantity: 20 },
  { OrderID: "10252", ProductName: "Sir Rodney's Marmalade", UnitPrice: 64.8, Quantity: 40 },
  { OrderID: "10252", ProductName: "Geitost", UnitPrice: 2, Quantity: 25 },
  { OrderID: "10252", ProductName: "Camembert Pierrot", UnitPrice: 27.2, Quantity: 40 },
  { OrderID: "10253", ProductName: "Gorgonzola Telino", UnitPrice: 10, Quantity: 20 },
  { OrderID: "10253", ProductName: "Chartreuse verte", UnitPrice: 14.4, Quantity: 42 }
];

var masterProvider, masterGrid, detailProvider, detailGrid;

function createMasterGrid() {
  masterProvider = new RealGrid.LocalDataProvider();
  masterGrid = new RealGrid.GridView("realgrid_master");

  masterGrid.setDataSource(masterProvider);
  masterProvider.setFields(fields);
  masterGrid.setColumns(columns);  

  masterGrid.editOptions.editable = true;

  masterGrid.onCurrentRowChanged = function (grid, oldRow, newRow) {
    detailGet(newRow);
  };

  masterProvider.setRows(masterData);

}

function createDetailGrid() {
  detailProvider = new RealGrid.LocalDataProvider();
  detailGrid = new RealGrid.GridView("realgrid_detail");

  detailGrid.setDataSource(detailProvider);
  detailProvider.setFields(fields1);
  detailGrid.setColumns(columns1);

  detailGrid.footer.visible = true;

  masterGrid.setFocus();
}

function detailGet(masterRow) {
  detailProvider.clearRows();

  if (masterRow >= 0) {
      var mstKey = masterProvider.getValue(masterRow, "OrderID");

      // detailData 배열에서 자료추출. DB대용
      var datas = detailData.filter(function (element) {
          if (element.OrderID === mstKey) {
              return true;
          }
      });

      detailProvider.setRows(datas);
  };
};


function start() {
  RealGrid.setLicenseKey('upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYm9cY8amGDkiMnVeQKUHJDjW2y71jtk+wteqHQ1mRMIXzEcGIrzZpzzNTakk0yR9UcO/hzNodVsIiqQNVtxmmYt');
  
  RealGrid.setDefault({
    editor: {
      dateCellEditor: {
        viewMode: "month",
        editFormat: "yyyy-MM"
      },
      numberCellEditor: {
        showStepButton: true
      }
    },
    edit: {
      editable: false,
      commitByCell: true,
      commitWhenLeave: true,
      columnEditableFirst: true
    },
    rowIndicator: {
      visible: false
    },
    stateBar: {
      visible: false
    },
    header: {
      height: 40
    },
    footer: {
      visible: false,
      styleName: "orange-color"
    },
    display: {
      rowHeight: 30,
      rowResizable: true,
      eachRowResizable: true,
      selectionStyle: "singleColumn"
    }
  });

  createMasterGrid();
  createDetailGrid();
}

document.addEventListener("DOMContentLoaded", (event) => {
  start();
});

window.onunload = function() {
  dataProvider.clearRows();

  gridView.destroy();
  dataProvider.destroy();

  gridView = null;
  dataProvider = null;
}
