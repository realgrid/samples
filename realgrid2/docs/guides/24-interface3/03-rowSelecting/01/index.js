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
    httpRequest.open("GET", "https://cdn.wooritech.com/realgrid/data/" + filename);
    httpRequest.send();
}

function loadData() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var data = JSON.parse(httpRequest.responseText);
            dataProvider.setRows(data);
            gridView.checkRows([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
            gridView.refresh();
        }
    }
}

var dataProvider, gridContainer, gridView;

function createGrid(container) {
    dataProvider = new RealGrid.LocalDataProvider();
    gridView = new RealGrid.GridView(container);
    dataProvider.setFields(fields);

    gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    gridView.header.height = 40;
    gridView.displayOptions.rowHeight = 36;
    gridView.footer.height = 40;
    gridView.stateBar.width = 16;

    gridView.setDataSource(dataProvider);
    gridView.setColumns(columns);

    gridView.editOptions.insertable = true;
    gridView.editOptions.appendable = true;

    gridView.onDataLoadComplated = function (grid) {
        grid.setFocus();
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
        if (v == undefined) diVal[k] = null;
    });

    config = {
        title: {
            text: "통계청 총생산소득",
        },
        subtitle: {
            text: "www.realgrid.com",
        },
        xAxis: {
            categories: categories,
            grid: false,
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
        legend: {
            location: "right",
        },
        series: [
            {
                type: "line",
                lineType: "spline",
                name: "GDP",
                visibleInLegend: false,
                color: "#7cb5ec",
                // yAxis: 1,
            },
            {
                type: "line",
                lineType: "spline",
                name: "GNI",
                visibleInLegend: false,
                color: "#434348",
            },
            {
                type: "line",
                lineType: "spline",
                name: "PGNI",
                color: "#90ed7d",
                visibleInLegend: false,
            },
            {
                type: "line",
                lineType: "spline",
                name: "DIncome",
                color: "#f7a35c",
                visibleInLegend: false,
            },
            {
                type: "pie",
                name: "pie",
                centerX: "15%",
                centerY: "35%",
                visibleInLegend: true,
                radius: "15%",
                pointLabel: {
                    visible: true,
                    position: "outside",
                    text: "${name}",
                },
                legendByPoint: true,
                data: [
                    {
                        name: "GDP",
                        color: "#7cb5ec",
                        y: gridView.getValue(
                            gridView.getCurrent().itemIndex,
                            1
                        ),
                    },
                    {
                        name: "GNI",
                        color: "#434348",
                        y: gridView.getValue(
                            gridView.getCurrent().itemIndex,
                            2
                        ),
                    },
                    {
                        name: "PGNI",
                        color: "#90ed7d",
                        y: gridView.getValue(
                            gridView.getCurrent().itemIndex,
                            3
                        ),
                    },
                    {
                        name: "DIncome",
                        color: "#f7a35c",
                        y:
                            gridView.getValue(
                                gridView.getCurrent().itemIndex,
                                4
                            ) == undefined
                                ? 0
                                : gridView.getValue(
                                      gridView.getCurrent().itemIndex,
                                      4
                                  ),
                    },
                ],
            },
        ],
    };

    rChart = RealChart.createChart(document, "realchart", config, true, () => {
        setPie();
    });
}

function gridEvents(grid, provider) {
    grid.onCurrentRowChanged = function (grid, index) {
        setPie();
    };

    provider.onRowCountChanged = function () {
        setRealChart(dataProvider);
    };

    grid.onItemChecked = function (grid, itemIndex, checked) {
        var checkItems = grid.getCheckedItems();
        var values = [];
        $.each(checkItems, function () {
            values.push(grid.getValues(this));
        });
        setCheckValueToChart(values);
    };

    grid.onItemsChecked = function (grid, items, checked) {
        var checkItems = grid.getCheckedItems();
        var values = [];
        $.each(checkItems, function () {
            values.push(grid.getValues(this));
        });
        setCheckValueToChart(values);
    };

    grid.onItemAllChecked = function (grid, checked) {
        if (checked) {
            setCheckValueToChart(dataProvider.getJsonRows());
        } else {
            setCheckValueToChart([]);
        }
    };
}

function setPie() {
    var index = gridView.getCurrent();
    var rowValue = dataProvider.getJsonRow(index.dataRow);
    var rcData = [];
    $.each(rowValue, function (k, v) {
        if (v == undefined) v = 0;
        if (k == "Year") return true;
        rcData.push(v);
    });

    var pieSeries = rChart.getSeries("pie").get("data");

    var updateData = pieSeries.map((e, i) => {
        return { name: e.name, color: e.color, y: rcData[i] };
    });

    rChart.getSeries("pie").updateData(updateData);
}

function setCheckValueToChart(values) {
    var mapValues = (values, name) => {
        return values.map((e) => [e.Year, e[name]]);
    };

    if (!rChart) return;
    config.series.forEach((series) => {
        if (series.name !== "pie") {
            rChart.getSeries(series.name).updateData(mapValues(values, series.name));
        }
    });
}
