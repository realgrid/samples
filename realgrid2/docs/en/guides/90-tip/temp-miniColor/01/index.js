/*eslint-disable*/

var fields = [
  { fieldName: "KorName",             dataType: "text"   },
  { fieldName: "Gender",              dataType: "text"   },
  { fieldName: "Age",                 dataType: "number" },
  { fieldName: "Color",               dataType: "text" },
  { fieldName: "Phone",               dataType: "text"   },
  { fieldName: "StartDate",           dataType: "datetime", datetimeFormat: "yyyy-MM-dd", amText: "오전", pmText: "오후" },
  { fieldName: "KorCountry",          dataType: "text"   },
  { fieldName: "Rating",              dataType: "number" },
  { fieldName: "BusinessProficiency", dataType: "number" },
  { fieldName: "Address",             dataType: "text"   },
  { fieldName: "SaveCost",            dataType: "number" },
  { fieldName: "Email",               dataType: "text"   },
  { fieldName: "InterestRate",        dataType: "number" },
  { fieldName: "Button",              dataType: "text"   }    
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
    name: "Color",
    fieldName: "Color",
    width: "100",
    renderer: "miniColor-renderer",
    editable: false,
    header: {
      text: "색깔",
      styleName: "orange-column"
    },
    styleName: "picker-renderer"
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
    header: {
      text: "Phone"
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
    name: "StartDate",
    fieldName: "StartDate",
    width: "100",
    header: {
      text: "Start Date"
    }
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
      dataProvider.setRowCount(20);
      gridView.refresh();
    }
  }
}

var dataProvider, gridContainer, grid;

function createGrid(container) {
  RealGrid.setLocale('en');
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);

  setMiniColorRenderer(gridView);

  gridView.setColumns(columns);

  gridView.displayOptions.emptyMessage = "There is no data to display.";
  gridView.displayOptions.rowHeight = 28;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.editable = false;

  setProvider("simple_data2.json");
}

function start() {
  createGrid("realgrid");
}

function setMiniColorRenderer(grid) {
  grid.registerCustomRenderer("miniColor-renderer", {
    initContent: function(parent) {
        var input = this._input = document.createElement("input");
        input.type = "text";
        input.setAttribute("data-swatches", "#ef9a9a|#90caf9|#a5d6a7|#fff59d|#ffcc80|#bcaaa4|#eeeeee|#f44336|#2196f3|#4caf50|#ffeb3b|#ff9800|#795548|#9e9e9e");
        parent.appendChild(input);

        $(input).minicolors && $(input).minicolors({
            control: $(input).attr('data-control') || 'hue',
            defaultValue: $(input).attr('data-defaultValue') || '',
            format: $(input).attr('data-format') || 'hex',
            keywords: $(input).attr('data-keywords') || '',
            inline: $(input).attr('data-inline') === 'true',
            letterCase: $(input).attr('data-letterCase') || 'lowercase',
            opacity: $(input).attr('data-opacity'),
            position: $(input).attr('data-position') || 'bottom',                
            swatches: $(input).attr('data-swatches') ? $(input).attr('data-swatches').split('|') : [],
            change: function(hex, opacity) {
                // debugger;
                if (!hex) {
                    return;
                }
                var td = grid._view.getCellViewOf(this);
                var index = grid._view.getDataCellIndex(td);
                console.log(index);
                //var index = grid.getCellIndexOfElement(this);
                if (index) {
                    var field = index.dataField;
                    var itemIndex = index.itemIndex;
                    grid.setValue(itemIndex, field, hex);
                    // debugger;
                }
            }

        });

    },
    render: function(grid, model, width, height, info) {
        if (model.value != null) {
            this._input.value = model.value;
            $(this._input).minicolors("value", model.value);
        } else {
            $(this._input).minicolors("value", null);
            //grid.getValue(model.index.itemIndex, "Color");
        }
    },
    clearContent: function(parent) {
        $(this._input).minicolors("destroy");
        parent.innerHTML = "";
    }
  })

  $("#colorpicker").dblclick(function(){
    console.log("dbl click");
    $('#colorpicker').hide();
  })

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
