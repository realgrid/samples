
var fields = [{
  fieldName: "KorName",
  dataType: "text"
},{
  fieldName: "Gender",
  dataType: "text"
},{
  fieldName: "Color",
  dataType: "text"
},{
  fieldName: "Age",
  dataType: "number"
},{
  fieldName: "Email",
  dataType: "text"
}];

var columns = [{
  name: "col1",
  fieldName: "KorName",
  header: {
    text: "Name"
  },
  width: 150
},{
  name: "col2",
  fieldName: "Gender",
  header: {
    text: "Gender"
  },
  width: 150
},{
  name: "col3",
  fieldName: "Color",
  header: {
    text: "colorPicker",
    styleName: "orange-column"
  },
  width: 150,
  renderer: "custom_renderer",
  styleName: "picker-renderer",
  editable: false
},{
  name: "col4",
  fieldName: "Age",
  header: {
    text: "Age"
  },
  width: 150,
  numberFormat: "##"
},{
  name: "col5",
  fieldName: "Email",
  header: {
    text: "이메일"
  },
  width: 150
}];

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

var dataProvider, gridView;

$(function () {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView("realgrid");  
  gridView.setDataSource(dataProvider);

  gridView.displayOptions.emptyMessage = "There is no data to display.";
  gridView.header.height = 40;
  gridView.displayOptions.rowHeight = 36;
  gridView.footer.height = 40;
  gridView.stateBar.width = 25;

  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  setProvider("simple_data2.json");

  gridView.registerCustomRenderer("custom_renderer", {
        initContent: function(parent) {
            var input = this._input = document.createElement("input");
            input.type = "text";
            input.setAttribute("data-swatches", "#ef9a9a|#90caf9|#a5d6a7|#fff59d|#ffcc80|#bcaaa4|#eeeeee|#f44336|#2196f3|#4caf50|#ffeb3b|#ff9800|#795548|#9e9e9e");
            parent.appendChild(input);
        },
        render: function(grid, model, width, height, info) {
          var topItem = gridView.getTopItem();
          if(model.index.itemIndex < topItem + 5){
            var pickerPosition = 'bottom'
          }else {
            var pickerPosition = 'top left'
          }
            var input = this._input;
            $(input).minicolors && $(input).minicolors({
                control: $(input).attr('data-control') || 'hue',
                defaultValue: $(input).attr('data-defaultValue') || '',
                format: $(input).attr('data-format') || 'hex',
                keywords: $(input).attr('data-keywords') || '',
                inline: $(input).attr('data-inline') === 'true',
                letterCase: $(input).attr('data-letterCase') || 'lowercase',
                opacity: $(input).attr('data-opacity'),
                position: $(input).attr('data-position') || pickerPosition,//'bottom',                
                swatches: $(input).attr('data-swatches') ? $(input).attr('data-swatches').split('|') : [],
                change: function(hex, opacity) {
                    if (!hex) {
                        return;
                    }
                    var index = gridView.getIndexOfElement(this);  // this는 input을 의미한다.
                    if (index) {
                        var itemIndex = index.itemIndex;
                        gridView.setValue(itemIndex, index.fieldIndex, hex);
                    }
                },
                show: function() {
                    console.log($(this._input).minicolors("settings"));
                    console.log('Show event triggered!');
                }
            });
            if (model.value != null) {
                this._input.value = model.value;
                $(this._input).minicolors("value", model.value);
            } else {
                $(this._input).minicolors("value", null);
            }
        },
        clearContent: function(parent) {
            $(this._input).minicolors("destroy");
            parent.innerHTML = "";
        }
    }) 
});

