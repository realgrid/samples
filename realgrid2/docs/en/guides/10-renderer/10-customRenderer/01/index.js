/*eslint-disable*/

var fields = [
  { fieldName: "KorName",             dataType: "text"   },
  { fieldName: "Gender",            dataType: "text"   },
  { fieldName: "Age",                 dataType: "number" },
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
      name: "KorName",
      fieldName: "KorName",
      width: "300",     
      header: {
          text: "직원 사진"
      },
      renderer: {
          type: "image",
          imageCallback: function (grid, cell) {
              var i = cell.index.itemIndex + 1;
              return "../../../../../public/images/employee/"+ i.toString() +".png";
          },
          titleField: "KorName",
          imageHeight: 100
      }
  },  
  {
    name: "KorName",
    fieldName: "KorName",
    width: "500",
    header: {
      text: "직원 정보"
    },
    renderer: {
      type: "rendererEmployee"
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

  setHtmlRenderer(gridView);

  gridView.setColumns(columns);

  gridView.displayOptions.emptyMessage = "There is no data to display.";
  gridView.displayOptions.rowHeight = 120;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.editable = false;



  setProvider("simple_data2.json");
}

function start() {
  createGrid("realgrid");
}

function setHtmlRenderer(grid) {
  grid._getView().registerCustomRenderer("rendererEmployee", {
    type: "rendererEmployee",
    initContent: function(parent) {
        var table = this._table = document.createElement("table");
        table.className = "cardtable";
        var titles = ["직원명", "이메일", "연락처", "소재지", "계약 급여"];
        var tds = this._tds = [];

        for(var i=0; i<5; i++){
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.style.width = "150px";
            td1.style.fontWeight = "600";
            td1.style.borderStyle = "hidden"
            td1.textContent = titles[i];                
            var td2 = document.createElement("td");
            td2.className = "left-column";
            td2.style.borderStyle = "hidden"
            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);

            tds.push(td2);
        }
        parent.appendChild(table);
    },
    clearContent: function(parent) {
        console.log("DISPOSED......");
        parent.innerHTML = "";
    },
    render: function(vgrid, model, width, height) {
        this._tds[0].textContent = grid.getValue(model.index.itemIndex, "KorName");
        this._tds[1].textContent = grid.getValue(model.index.itemIndex, "Email");
        this._tds[2].textContent = grid.getValue(model.index.itemIndex, "Phone");
        this._tds[3].textContent = grid.getValue(model.index.itemIndex, "Address");
        this._tds[4].textContent = grid.getValue(model.index.itemIndex, "SaveCost");
        // let span = this._span;
        // span.textContent = model.value + "-YYY";
        // this._value = model.value;
    },
    click: function(event) {
        // alert(this._value);
        // return true;
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
