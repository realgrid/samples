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
      gridView.checkItems([0,4,9,14,19,24,29,34,39,44],true); 
      setChart();
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

function setChart(){
    am4core.ready(function() {
        am4core.useTheme(am4themes_animated);
    
        var chart = am4core.create("chartdiv", am4charts.XYChart);
    
        chart.colors.step = 3;
    
        chart.data = generateChartData();
    
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;
    
        function createAxisAndSeries(field, name, opposite, bullet) {
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        if(chart.yAxes.indexOf(valueAxis) != 0){
            valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
        }
        
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.strokeWidth = 2;
        series.yAxis = valueAxis;
        series.name = name;
        series.tooltipText = "{name}: [bold]{valueY}[/]";
        series.tensionX = 0.8;
        series.showOnInit = true;
        
        var interfaceColors = new am4core.InterfaceColorSet();
        
        switch(bullet) {
            case "triangle":
            var bullet = series.bullets.push(new am4charts.Bullet());
            bullet.width = 12;
            bullet.height = 12;
            bullet.horizontalCenter = "middle";
            bullet.verticalCenter = "middle";
            
            var triangle = bullet.createChild(am4core.Triangle);
            triangle.stroke = interfaceColors.getFor("background");
            triangle.strokeWidth = 2;
            triangle.direction = "top";
            triangle.width = 12;
            triangle.height = 12;
            break;
            case "rectangle":
            var bullet = series.bullets.push(new am4charts.Bullet());
            bullet.width = 10;
            bullet.height = 10;
            bullet.horizontalCenter = "middle";
            bullet.verticalCenter = "middle";
            
            var rectangle = bullet.createChild(am4core.Rectangle);
            rectangle.stroke = interfaceColors.getFor("background");
            rectangle.strokeWidth = 2;
            rectangle.width = 10;
            rectangle.height = 10;
            break;
            default:
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.stroke = interfaceColors.getFor("background");
            bullet.circle.strokeWidth = 2;
            break;
        }
        
        valueAxis.renderer.line.strokeOpacity = 1;
        valueAxis.renderer.line.strokeWidth = 2;
        valueAxis.renderer.line.stroke = series.stroke;
        valueAxis.renderer.labels.template.fill = series.stroke;
        valueAxis.renderer.opposite = opposite;
        }
    
        createAxisAndSeries("GDP", "GDP", false, "circle");
        createAxisAndSeries("GNI", "GNI", true, "triangle");
        createAxisAndSeries("PGNI", "PGNI", true, "rectangle");
        createAxisAndSeries("DIncome", "DIncome", true, "rectangle");
    
        chart.legend = new am4charts.Legend();
    
        chart.cursor = new am4charts.XYCursor();
    
        function generateChartData() {
        var chartData = [];
        var rows = gridView.getCheckedRows(true);
    
        for(var i = 0; i < rows.length; i++){
            chartData.push({
            date: dataProvider.getValue(rows[i],0),
            GDP: dataProvider.getValue(rows[i],1),
            GNI: dataProvider.getValue(rows[i],2),
            PGNI: dataProvider.getValue(rows[i],3),
            DIncome: dataProvider.getValue(rows[i],4)
            })
        }
        return chartData;
        }
    
        // 그리드 체크 이벤트
        gridView.onItemChecked = function (grid, itemIndex, checked) {
            var chartData = [];
            var rows = gridView.getCheckedRows(true);
    
            for(var i = 0; i < rows.length; i++){
                chartData.push({
                    date: dataProvider.getValue(rows[i],0),
                    GDP: dataProvider.getValue(rows[i],1),
                    GNI: dataProvider.getValue(rows[i],2),
                    PGNI: dataProvider.getValue(rows[i],3),
                    DIncome: dataProvider.getValue(rows[i],4)
                })
            }
            chart.data = chartData;
        };
    
    });
}