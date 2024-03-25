/*eslint-disable*/

var fields = [{
  fieldName: "Year",
  dataType: "text"
}, {
  fieldName: "GDP",
  dataType: "number"
}, {
  fieldName: "GNI",
  dataType: "number"
}, {
  fieldName: "PGNI",
  dataType: "number"
}, {
  fieldName: "DIncome",
  dataType: "number"
}];
  
  var columns = [{
    name: "Year",
    fieldName: "Year",
    width: "80",
    header: {
        text: "Year"
    }
}, {
    name: "GDP",
    fieldName: "GDP",
    width: "160",
    header: {
        text: "GDP ($100 milion)"
    },
    styleName: "column-background1"
}, {
    name: "GNI",
    fieldName: "GNI",
    width: "160",
    header: {
        text: "GNI ($100 milion)"
    },
    styleName: "column-background2"
}, {
    name: "PGNI",
    fieldName: "PGNI",
    width: "160",
    header: {
        text: "PGNI ($)"
    },
    styleName: "column-background3"
}, {
    name: "DIncome",
    fieldName: "DIncome",
    width: "160",
    header: {
        text: "DIncome ($)"
    },
    styleName: "column-background4"
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
      gridView.refresh();
    }
  }
}

var dataProvider, gridContainer, gridView;

function createGrid(container) {
  RealGrid.setLocale('en');
  dataProvider = new RealGrid.LocalDataProvider();
  dataProvider.setFields(fields);

  gridView = new RealGrid.GridView(container);
  gridView.displayOptions.emptyMessage = "There is no data to display.";
  gridView.header.height = 40;
  gridView.displayOptions.rowHeight = 36;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;

  gridView.setDataSource(dataProvider);
  gridView.setColumns(columns);
  setProvider("총생산소득.json");

  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  var columnNames = ["GDP", "GNI", "PGNI", "DIncome"];

  for (var i = 0; i < columnNames.length; i++){
    gridView.setColumnProperty(columnNames[i],"header",{
        "checkLocation": "left",
        "checked": true});
    gridView.setColumnProperty(columnNames[i],"checked",true);
  }

  gridEvents(gridView, dataProvider);

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

function setHiChart(provider) {
  var categories = provider.getFieldValues("year");
  var diVal = provider.getFieldValues("DIncome");
  $.each(diVal, function (k, v) {
      if (v == undefined)
          diVal[k] = null;
  });

  $('#container').highcharts({
      title: {
          text: '통계청 총생산소득',
          x: -20
      },
      subtitle: {
          text: 'www.realgrid.com',
          x: -20
      },
      xAxis: {
          categories: categories,
          crosshair: true
      },
      yAxis: [{
          title: {
              text: '소득 ($)'
          },
          labels: {
              format: '{value} $'
          }
      }],
      tooltip: {
          shared: true // 한 로우에 여러 컬럼의 값을 표시
      },
      legend: {
          enabled : false
      },
      series: [{
          name: "GDP",
          data: provider.getFieldValues("GDP"),
          tooltip: {
              valueSuffix: "$ ($100 million)"
          }
      }, {
          name: "GNI",
          data: provider.getFieldValues("GNI"),
          tooltip: {
              valueSuffix: "$ ($100 million)"
          }
      }, {
          name: "PGNI",
          data: provider.getFieldValues("PGNI"),
          tooltip: {
              valueSuffix: "$"
          }
      }, {
          name: "DIncome",
          data: diVal,
          tooltip: {
              valueSuffix: "$"
          }
      }],
      chart: {
          type: 'column',
          events: {
              load: function () {
                  var chart = $("#container").highcharts();
                  $.each(chart.series, function () {
                      var col = gridView.columnByName(this.name);
                      col.styles = { background: this.color.replace("#", "#39") };
                      gridView.setColumn(col);
                  });
              },
              click: function (e) {
                
              }
          }
      }
  });
}

function setColumnColor(name, color, check) {
    var col = gridView.columnByName(name);
    col.styles = check ? { background: color.replace("#", "#39") } : { background: null };
    gridView.setColumn(col);
}

function gridEvents(grid, provider) {
  grid.onColumnCheckedChanged = function (grid, column, checked) {
      var colName = column.name;
      var chart = $("#container").highcharts();
      $.each(chart.series, function () {
          if (this.name === colName) {
              this.setVisible(checked);
              setColumnColor(this.name, this.color, checked);
          }
      });
  }

  provider.onRowCountChanged = function () {
      setHiChart(dataProvider);
  }
}