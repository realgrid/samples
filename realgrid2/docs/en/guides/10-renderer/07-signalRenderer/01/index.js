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
      fieldName: "Rating",
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
      width: "60",
      header: {
        text: "Name"
      }
    },
    {
      name: "Gender",
      fieldName: "Gender",
      width: "40",
      header: {
        text: "Gender"
      }
    },
    {
      name: "Age",
      fieldName: "Age",
      width: "40",
      header: {
        text: "Age"
      },
      styleName: "right-column"
    },
    {
      name: "Rating",
      fieldName: "Rating",
      width: "200",
      renderer: {
        type: "signalbar",
        barCount: 10,    
        minimum: 0,
        maximum: 5,
        startRate: 10,
        endRate: 100
      },
      header: {
        text: "평가",
        styleName: "orange-column"
      },
      styleName: "right-column"
    },
    {
      name: "Phone",
      fieldName: "Phone",
      width: "100",
      header: {
        text: "Phone"
      }
    },
    {
      name: "ProductId",
      fieldName: "ProductId",
      width: "120",
      header: {
        text: "Product Code"
      }
    },
    {
      name: "KorCountry",
      fieldName: "KorCountry",
      width: "100",
      header: {
        text: "Country"
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
      width: "140",
      header: {
        text: "Card No."
      }
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
      width: "50",
      header: {
        text: "Pay Cnt."
      },
      styleName: "right-column"
    },
    {
      name: "Month",
      fieldName: "Month",
      width: "50",
      header: {
        text: "Residuum"
      },
      styleName: "right-column"
    },
    {
      name: "InterestRate",
      fieldName: "InterestRate",
      width: "50",
      numberFormat: "0.00",
      header: {
        text: "Interest Rate"
      },
      styleName: "right-column"
    },
    {
      name: "SaveCost",
      fieldName: "SaveCost",
      width: "80",
      numberFormat: "#,##0",
      header: {
        text: "Payment"
      },
      styleName: "right-column"
    },
    {
      name: "SaveMaturity",
      fieldName: "SaveMaturity",
      width: "80",
      numberFormat: "#,##0",
      header: {
        text: "Save Maturity"
      },
      styleName: "right-column"
    },
    {
      name: "CurrentSave",
      fieldName: "CurrentSave",
      width: "80",
      numberFormat: "#,##0",
      header: {
        text: "Currency Save"
      },
      styleName: "right-column"
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
  
  var dataProvider, gridContainer, grid;
  
  function createGrid(container) {
    dataProvider = new RealGrid.LocalDataProvider();
    gridView = new RealGrid.GridView(container);
  
    gridView.setDataSource(dataProvider);
    dataProvider.setFields(fields);
    gridView.setColumns(columns);
  
    gridView.displayOptions.emptyMessage = "There is no data to display.";
    gridView.displayOptions.rowHeight = 50;
    gridView.header.height = 40;
    gridView.footer.height = 40;
    gridView.stateBar.width = 16;
    gridView.editOptions.insertable = true;
    gridView.editOptions.appendable = true;
  

  
    setProvider("simple_data.json");
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