/*eslint-disable*/

var fields = [
    {
      fieldName: "imageUrl",
      dataType: "text"
    },
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
      width: "60",
      header: {
        text: "Name"
      }
    },
    {
        name: "imageUrl",
        fieldName: "imageUrl",     
        width : "150", 
        renderer: {
            type: "image",
            imageField: "imageUrl",
            imageHeight: 80,
            exportImage: true
        },
        header: {
          text: "Image URL",
          styleName: "orange-column"
        }
    },
    {
        name: "imageUrl1",
        fieldName: "Monetary",
        width: "150",
        renderer: {
            type: "image",
            imageCallback: function (grid, cell) {
                var monetary = grid.getValue(cell.item.index, "Monetary");
                return "../../../../../public/images/monetaryFlag/" + monetary + ".png";
            },
            imageHeight: 80,
            exportImage: true
        },
        header: {
          text: "Image Callback",
          styleName: "orange-column"
        }
    },
    {
        name: "imageUrl2",
        fieldName: "Monetary",
        width: "150",
        renderer: {
            type: "image",
            imageMap: {
                "EUR": "../../../../../public/images/monetaryFlag/EUR.png",
                "USD": "../../../../../public/images/monetaryFlag/USD.png"
            },
            imageHeight: 80,
            exportImage: true
        },
        header: {
          text: "Image Map",
          styleName: "orange-column"
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
      name: "Gender",
      fieldName: "Gender",
      width: "80",
      header: {
        text: "Gender"
      },
      renderer: {
        type: "icon",
        iconCallback: function (grid, cell) {
            var sex = cell.value == '남' ? 'man' : 'woman';
            return "../../../../../public/images/common/" + sex + ".png";
        },
        iconHeight: 15,
        iconWidth: 15
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
      name: "Phone",
      fieldName: "Phone",
      width: "100",
      styleName: "right-column",
      header: {
        text: "Phone"
      }
    },
    {
      name: "ProductId",
      fieldName: "ProductId",
      width: "120",
      styleName: "right-column",
      header: {
        text: "Product Code"
      }
    },
    {
      name: "KorCountry",
      fieldName: "KorCountry",
      width: "100",
      styleName: "right-column",
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
      header: {
        text: "Interest Rate"
      },
      styleName: "right-column"
    },
    {
      name: "SaveCost",
      fieldName: "SaveCost",
      width: "70",
      header: {
        text: "Payment"
      },
      styleName: "right-column"
    },
    {
      name: "SaveMaturity",
      fieldName: "SaveMaturity",
      width: "120",
      header: {
        text: "Save Maturity"
      },
      styleName: "right-column"
    },
    {
      name: "CurrentSave",
      fieldName: "CurrentSave",
      width: "80",
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
    gridView.displayOptions.rowHeight = 100;
    gridView.header.height = 40;
    gridView.footer.height = 40;
    gridView.stateBar.width = 16;
    gridView.editOptions.insertable = true;
    gridView.editOptions.appendable = true;
  
    setProvider("simple_data_image.json");
  }
  
  function start() {
    createGrid("realgrid");
  }

  function excelExport() {
    gridView.exportGrid({
        type: "excel",
        target: "local",
        fileName: "gridExportSample.xlsx", 
        exportImage: true,
        applyDynamicStyles: true,
        done: function () {  
            alert("done excel export")
        }
    });
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