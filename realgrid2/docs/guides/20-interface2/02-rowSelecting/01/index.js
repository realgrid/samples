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
    httpRequest.open("GET", "/public/data/" + filename);
    httpRequest.send();
  }
  
  function loadData() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        dataProvider.setRows(data);
        setChart();
        gridView.resetCurrent();
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

        var chart = am4core.create("chartdiv", am4charts.PieChart);
    
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
    
        chart.innerRadius = am4core.percent(30);
    
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template
        .cursorOverStyle = [
            {
            "property": "cursor",
            "value": "pointer"
            }
        ];
    
        pieSeries.alignLabels = false;
        pieSeries.labels.template.bent = true;
        pieSeries.labels.template.radius = 3;
        pieSeries.labels.template.padding(0,0,0,0);
    
        pieSeries.ticks.template.disabled = true;
    
        var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
        shadow.opacity = 0;
    
        var hoverState = pieSeries.slices.template.states.getKey("hover"); 
    
        var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
        hoverShadow.opacity = 0.7;
        hoverShadow.blur = 5;
    
        chart.legend = new am4charts.Legend();
    
        //그리드 행 변경 이벤트
        gridView.onCurrentRowChanged =  function (grid, oldRow, newRow) {
            var a = dataProvider.getValue(newRow, "GDP")
            var b = dataProvider.getValue(newRow, "GNI")
            var c = dataProvider.getValue(newRow, "PGNI")
            var d = dataProvider.getValue(newRow, "DIncome")
    
            chart.data = [{
                country: "GDP",
                litres: dataProvider.getValue(newRow, "GDP")
            },{
                country: "GNI",
                litres: dataProvider.getValue(newRow, "GNI")
            },{
                country: "PGNI",
                litres: dataProvider.getValue(newRow, "PGNI")
            },{
                country: "DIncome",
                litres: dataProvider.getValue(newRow, "DIncome")
            }]
        };
    });
  }