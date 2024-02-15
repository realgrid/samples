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
  httpRequest.open("GET", "https://cdn.wooritech.com/realgrid/data/" + filename);
  httpRequest.send();
}

function loadData() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var data = JSON.parse(httpRequest.responseText);
      dataProvider.setRows(data);
      gridView.checkRows([0, 2, 4, 6, 8, 10, 12, 14, 16, 18])
      gridView.refresh();
    }
  }
}

var dataProvider, gridContainer, gridView;

function createGrid(container) {
  dataProvider = new RealGrid.LocalDataProvider();
  dataProvider.setFields(fields);

  gridView = new RealGrid.GridView(container);
  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.header.height = 40;
  gridView.displayOptions.rowHeight = 36;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;

  gridView.setDataSource(dataProvider);
  gridView.setColumns(columns);

  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  dataProvider.onRowCountChanged = function () {
    setHiChart(dataProvider);
  };

  gridEvents(gridView, dataProvider);
  
  setProvider("총생산소득.json");

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
            //center
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
            shared: true
            // 한 로우에 여러 컬럼의 값을 표시
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            type: 'spline',
            name: "GDP",
            //              data : provider.getFieldValues("GDP"),
            tooltip: {
                valueSuffix: "$ ($100 million)"
            }
        }, {
            type: 'spline',
            name: "GNI",
            //              data : provider.getFieldValues("GNI"),
            tooltip: {
                valueSuffix: "$ ($100 million)"
            }
        }, {
            type: 'spline',
            name: "PGNI",
            //              data : provider.getFieldValues("PGNI"),
            tooltip: {
                valueSuffix: "$"
            }
        }, {
            type: 'spline',
            name: "DIncome",
            //              data : diVal,
            tooltip: {
                valueSuffix: "$"
            }
        }, {
            type: 'pie',
            name: 'Total consumption',
            data: [{
                name: 'GDP',
                y: gridView.getValue(gridView.getCurrent().itemIndex, 1),
                color: Highcharts.getOptions().colors[0]
            }, {
                name: 'GNI',
                y: gridView.getValue(gridView.getCurrent().itemIndex, 2),
                color: Highcharts.getOptions().colors[1]
            }, {
                name: 'PGNI',
                y: gridView.getValue(gridView.getCurrent().itemIndex, 3),
                color: Highcharts.getOptions().colors[3]
            }, {
                name: 'DIncome',
                y: gridView.getValue(gridView.getCurrent().itemIndex, 4) == undefined ? null : gridView.getValue(gridView.getCurrent().itemIndex, 4),
                color: Highcharts.getOptions().colors[4]
            }],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: true
            }
        }],
        chart: {
            events: {
                load: function () {
 
                },
                click: function (e) {
                    //console.log(e);
                }
            }
        }
    });
}

function gridEvents(grid, provider) {
    grid.onCurrentChanged = function (grid, index) {
        var chart = $("#container").highcharts();
        if (!chart)
            return;
        setPie(chart);
    }
 
    provider.onRowCountChanged = function () {
        setHiChart(dataProvider);
    }
 
    grid.onItemChecked = function (grid, itemIndex, checked) {
        var checkItems = grid.getCheckedItems();
        var values = [];
        $.each(checkItems, function () {
            values.push(grid.getValues(this));
        });
        setCheckValueToChart(values);
    }
 
    grid.onItemsChecked = function (grid, items, checked) {
        var checkItems = grid.getCheckedItems();
        var values = [];
        $.each(checkItems, function () {
            values.push(grid.getValues(this));
        });
        setCheckValueToChart(values);
    }

    grid.onItemAllChecked = function (grid, checked) {
        if (checked) {
            setCheckValueToChart(dataProvider.getJsonRows());
        } else {
            setCheckValueToChart([]);
        }
    }
}

function setPie(chart, index) {
    index = index ? index : gridView.getCurrent();
    var rowValue = dataProvider.getJsonRow(index.dataRow);
    var hcData = [];
    $.each(rowValue, function (k, v) {
        if (v == undefined)
            v = null;
        if (k == "Year")
            return true;
        hcData.push(v);
    });
    chart.series[4].setData(hcData);
}

function setCheckValueToChart(values) {
    var year = [], gdp = [], gni = [], pgni = [], dincome = [];

    $.each(values, function (k, v) {
        year.push(v.Year);
        gdp.push(v.GDP);
        gni.push(v.GNI);
        pgni.push(v.PGNI);
        dincome.push(v.DIncome ? v.DIncome : null);
    });

    var chart = $("#container").highcharts();
    if (!chart)
        return;
    chart.xAxis[0].setCategories(year);
    chart.series[0].setData(gdp);
    chart.series[1].setData(gni);
    chart.series[2].setData(pgni);
    chart.series[3].setData(dincome);

    gridView.setFocus();
    setPie(chart, gridView.getCurrent());
}