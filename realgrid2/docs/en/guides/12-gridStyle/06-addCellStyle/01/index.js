/*eslint-disable*/

var fields = [
    {
      fieldName: "KorName",
      dataType: "text"
    },
    {
      fieldName: "Gender",
      dataType: "text"
    },
    {
      fieldName: "Age",
      dataType: "number"
    },
    {
      fieldName: "Phone",
      dataType: "text"
    },
    {
      fieldName: "ProductId",
      dataType: "text"
    },
    {
      fieldName: "KorCountry",
      dataType: "text"
    },
    {
      fieldName: "OrderDate",
      dataType: "datetime",
      datetimeFormat: "yyyy-MM-dd",
      amText: "오전",
      pmText: "오후"
    },
    {
      fieldName: "CardNumber",
      dataType: "text"
    },
    {
      fieldName: "Monetary",
      dataType: "text"
    },
    {
      fieldName: "StartDate",
      dataType: "datetime",
      datetimeFormat: "yyyy-MM-dd",
      amText: "오전",
      pmText: "오후"
    },
    {
      fieldName: "EndDate",
      dataType: "datetime",
      datetimeFormat: "yyyy-MM-dd",
      amText: "오전",
      pmText: "오후"
    },
    {
      fieldName: "ToMonth",
      dataType: "number"
    },
    {
      fieldName: "Month",
      dataType: "number"
    },
    {
      fieldName: "Year",
      dataType: "number"
    },
    {
      fieldName: "InterestRate",
      dataType: "number"
    },
    {
      fieldName: "SaveCost",
      dataType: "number"
    },
    {
      fieldName: "SaveMaturity",
      dataType: "number"
    },
    {
      fieldName: "CurrentSave",
      dataType: "number"
    }
  ];
  
  var columns = [
    {
      name: "KorName",
      fieldName: "KorName",
      width: "70",
      header: {
        text: "Name"
      }
    },
    {
      name: "Gender",
      fieldName: "Gender",
      width: "55",
      header: {
        text: "Gender"
      }
    },
    {
      name: "Age",
      fieldName: "Age",
      width: "55",
      header: {
        text: "Age"
      }
    },
    {
      name: "Phone",
      fieldName: "Phone",
      width: "130",
      header: {
        text: "Phone"
      },
    },
    {
      name: "ProductId",
      fieldName: "ProductId",
      width: "150",
      header: {
        text: "Product Code"
      }
    },
    {
      name: "KorCountry",
      fieldName: "KorCountry",
      width: "100",
      header: {
        text: "Country",
      }
    },
    {
      name: "OrderDate",
      fieldName: "OrderDate",
      width: "100",
      header: {
        text: "Order Date"
      }
    },
    {
      name: "CardNumber",
      fieldName: "CardNumber",
      width: "170",
      header: {
        text: "Card No."
      },
    },
    {
      name: "Monetary",
      fieldName: "Monetary",
      width: "40",
      header: {
        text: "Monetary"
      }
    },
    {
      name: "StartDate",
      fieldName: "StartDate",
      width: "100",
      header: {
        text: "Start Date"
      }
    },
    {
      name: "EndDate",
      fieldName: "EndDate",
      width: "100",
      header: {
        text: "End Date"
      }
    },
    {
      name: "ToMonth",
      fieldName: "ToMonth",
      width: "40",
      header: {
        text: "Pay Cnt."
      }
    },
    {
      name: "Month",
      fieldName: "Month",
      width: "40",
      header: {
        text: "Residuum"
      }
    },
    {
      name: "InterestRate",
      fieldName: "InterestRate",
      width: "40",
      numberFormat: "0.00",
      header: {
        text: "Interest Rate"
      }
    },
    {
      name: "SaveCost",
      fieldName: "SaveCost",
      width: "80",
      numberFormat: "#,##0",
      header: {
        text: "Payment"
      }
    },
    {
      name: "SaveMaturity",
      fieldName: "SaveMaturity",
      width: "80",
      numberFormat: "#,##0",
      header: {
        text: "Save Maturity"
      }
    },
    {
      name: "CurrentSave",
      fieldName: "CurrentSave",
      width: "80",
      numberFormat: "#,##0",
      header: {
        text: "Currency Save"
      }
    }
  ];
  
  var httpRequest;
  
  function setProvider(filename) {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = loadData;
    httpRequest.open("GET", "/public/data/en/" + filename);
    httpRequest.send();
  }
  
  function loadData() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        dataProvider.setRows(data);
        gridView.refresh();
      }
    }
  }
  
  var dataProvider, gridContainer, gridView;
  
  function createGrid(container) {
    dataProvider = new RealGrid.LocalDataProvider();
    dataProvider.setFields(fields);
  
    gridView = new RealGrid.GridView(container);
    gridView.setDataSource(dataProvider);
    gridView.setColumns(columns);
    setProvider("simple_data.json");
  
    gridView.editOptions.insertable = true;
    gridView.editOptions.appendable = true;
  
  }
  
  function start() {
    createGrid("realgrid");
  }
  
  // $.document.ready(start);
  window.onload = start;
  // domloaded를 대신 써도 됩니다.

  window.onunload = function() {
    dataProvider.clearRows();
  
    gridView.destroy();
    dataProvider.destroy();
  
    gridView = null;
    dataProvider = null;
  }

  function addUserCellStyle() {
    var current = gridView.getCurrent()
    gridView.addUserCellStyle(current.itemIndex, current.fieldName,{style:{background:"#ff0000"}})
  }
  function removeUserCellStyle() {
    var current = gridView.getCurrent()
    gridView.removeUserCellStyle(current.itemIndex, current.fieldName);
  }

  function allRemoveUserCellStyle() {
    gridView.removeUserCellStyle()
  }
  