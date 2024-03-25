/*eslint-disable*/

var fields = [
    {
        fieldName: "Year",
        dataType: "text",
    },
    {
        fieldName: "GDP",
        dataType: "number",
    },
    {
        fieldName: "GNI",
        dataType: "number",
    },
    {
        fieldName: "PGNI",
        dataType: "number",
    },
    {
        fieldName: "DIncome",
        dataType: "number",
    },
];

var columns = [
    {
        name: "Year",
        fieldName: "Year",
        width: "80",
        header: {
            text: "Year",
        },
    },
    {
        name: "GDP",
        fieldName: "GDP",
        width: "160",
        header: {
            text: "GDP ($100 milion)",
        },
        styleName: "column-background1",
    },
    {
        name: "GNI",
        fieldName: "GNI",
        width: "160",
        header: {
            text: "GNI ($100 milion)",
        },
        styleName: "column-background2",
    },
    {
        name: "PGNI",
        fieldName: "PGNI",
        width: "160",
        header: {
            text: "PGNI ($)",
        },
        styleName: "column-background3",
    },
    {
        name: "DIncome",
        fieldName: "DIncome",
        width: "160",
        header: {
            text: "DIncome ($)",
        },
        styleName: "column-background4",
    },
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
            setTimeout(setFilter(), 300);
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
    setProvider("총생산소득.json");

    gridView.editOptions.insertable = true;
    gridView.editOptions.appendable = true;

    gridView.onDataLoadComplated = (grid) => {
        setRealChart(dataProvider);
    };

    gridEvents(gridView, dataProvider);
}

function start() {
    createGrid("realgrid");
}

// $.document.ready(start);
window.onload = start;
// domloaded를 대신 써도 됩니다.

window.onunload = function () {
    dataProvider.clearRows();

    gridView.destroy();
    dataProvider.destroy();

    gridView = null;
    dataProvider = null;
};

let rChart;
let config;

function setRealChart(provider) {
    var categories = provider.getFieldValues("year");
    var diVal = provider.getFieldValues("DIncome");
    $.each(diVal, function (k, v) {
        if (v == undefined) diVal[k] = 0;
    });

    config = {
        title: {
            text: "통계청 총생산소득",
        },
        subtitle: {
            text: "www.realgrid.com",
        },
        options: {},
        xAxis: {
            categories: categories,
        },
        yAxis: [
            {
                title: {
                    text: "소득 ($)",
                },
                label: {
                    suffix: " $",
                    numberSymbols: "",
                },
            },
        ],
        series: [
            {
                name: "GDP",
                data: provider.getFieldValues("GDP"),
                color: "#7cb5ec",
            },
            {
                name: "GNI",
                data: provider.getFieldValues("GNI"),
                color: "#434348",
            },
            {
                name: "PGNI",
                data: provider.getFieldValues("PGNI"),
                color: "#90ed7d",
            },
            {
                name: "DIncome",
                data: diVal,
                color: "#f7a35c",
            },
        ],
    };

    rChart = RealChart.createChart(document, "realchart", config);
}

function setFilter() {
    var filters = [];
    var vals = dataProvider.getDistinctValues("year");
    $.each(vals, function (k, v) {
        var filter = {};
        filter.name = v;
        filter.criteria = "value = '" + v + "'";
        filters.push(filter);
    });

    var col = gridView.columnByName("Year");
    col.filters = filters;
    gridView.setColumn(col);
}

function gridEvents(grid, provider) {
    grid.onFilteringChanged = function (grid) {
        var count = grid.getItemCount();
        var jArr = [];
        for (var i = 0; i < count; i++) {
            var jObj = grid.getValues(i);
            if (!jObj.Year) jObj.Year = null;
            jArr.push(jObj);
        }
        if (!config) return;
        $.each(config.series, function (index, series) {
            var updateData = jArr.map(function (val) {
                return [val.Year, val[series.name]];
            });
            rChart.getSeries(series.name).updateData(updateData);
        });
    };
}
