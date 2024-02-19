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
    httpRequest.open("GET", "/public/data/" + filename);
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

    var columnNames = ["GDP", "GNI", "PGNI", "DIncome"];

    for (var i = 0; i < columnNames.length; i++) {
        gridView.setColumnProperty(columnNames[i], "header", {
            checkLocation: "left",
            checked: true,
        });
        gridView.setColumnProperty(columnNames[i], "checked", true);
    }

    gridView.onCurrentRowChanged = function (grid, oldRow, newRow) {
        if (newRow > -1 && oldRow !== -1) {
            var idx = gridView.getItemIndex(newRow);
            gridView.checkItem(idx, true, true);
        }
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
        if (v == undefined) diVal[k] = null;
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


function gridEvents(grid, provider) {
    grid.onColumnCheckedChanged = function (grid, column, checked) {
        var colName = column.name;
        var options = config;
        $.each(options.series, function (e) {
            if (this.name === colName) {
                rChart.getSeries(this.name).set('visible', checked);
            }
        });
    };

    provider.onRowCountChanged = function () {
        setRealChart(provider);
    };
}
