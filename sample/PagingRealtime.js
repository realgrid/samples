var grdMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

$(document).ready(function () {
    dataProvider = new RealGridJS.LocalDataProvider();
    setFields(dataProvider);

    grdMain = new RealGridJS.GridView("container");
    grdMain.setDataSource(dataProvider);
    setColumns(grdMain);
    setOptions(grdMain);
    setSkin();
    setStyles(grdMain);

    dataProvider.setRowCount(10);
    loadData(dataProvider, 0);

    grdMain.setPaging(true, 10, 5);

    grdMain.onPageChanging = function (grid, newPage) {
        //return false;
    };
    grdMain.onPageChanged = function (grid, newPage) {
        $("#txtMain").val(newPage);
    };

    setTests("actions", "PazingRealtime");
});

function setFields(provider) {
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

    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        "fieldName": "Year",
        "width": "80",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Year"
        }
    }, {
        "fieldName": "GDP",
        "width": "160",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "#,##0.00"
        },
        "header": {
            "text": "GDP ($100 milion)"
        }
    },  {
        "fieldName": "GNI",
        "width": "160",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "#,##0.00"
        },
        "header": {
            "text": "GNI ($100 milion)"
        }
    }, {
        "fieldName": "PGNI",
        "width": "160",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "#,##0.00"
        },
        "header": {
            "text": "PGNI ($)"
        }
    }, {
        "fieldName": "DIncome",
        "width": "160",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "#,##0.00"
        },
        "header": {
            "text": "DIncome ($)"
        }
    }];

    grid.setColumns(columns);
}

function setOptions(grid) {
    grid.setOptions({
        panel: {
            visible: true
        },
        footer: {
            visible: false
        },
        indicator: {
            displayValue: "row"
        },
        stateBar: {
            visible: false
        },
        display: {
        },
        header: {
        },
        select: {
            style: RealGridJS.SelectionStyle.ROWS
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function setStyles() {
    grdMain.setStyles({
        selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
}

function loadData(provider, start) {
    grdMain.showToast("Load data...", true);
    $.ajax({
        url: "data/총생산소득.csv?__date__=" + new Date().getTime(),
        dataType: 'text',
        success: function (data) {
            grdMain.hideToast();
            provider.fillCsvData(data, {
                quoted: true,
                start: 1 + start,
                count: 10,
                fillPos: start
            });
        },
        complete: function (data) {
            grdMain.hideToast();
        }
    });
}

function setPage(newPage) {
    var count = grdMain.getPageCount();
    newPage = Math.max(0, Math.min(newPage, count - 1));

    if (newPage == grdMain.getPage()) {
        return;
    }

    var size = $('#txtPageSize').val() || 10;

    // 항상 첫번째 행 부터 가져온다.
    grdMain.setPage(newPage, 0);
    grdMain.setIndicator({rowOffset: newPage * size});
    dataProvider.clearRows();
    loadData(dataProvider, newPage * size);
}

var tests = {
    setPageSize: function () {
        var size = $("#txtSub").val();
        grdMain.setPaging(true, size, -1);
    },
    setPage: function () {
        var page = $("#txtMain").val();
        setPage(page);
    },
    "<<": function () {
        setPage(0);
    },
    "<": function () {
        var page = grdMain.getPage();
        setPage(page - 1);
    },
    ">": function () {
        var page = grdMain.getPage();
        setPage(page + 1);
    },
    ">>": function () {
        var count = grdMain.getPageCount();
        setPage(count - 1);
    },
    "getValue": function () {
        var v = grdMain.getValue(0, "Year")
        alert(v);
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
    $("#txtSub").show();
    $("#container").css("height", "300");
    createButtons(container, tests);
    createCheckBox(container, "paging", function (e) {
        grdMain.setPaging(e.target.checked);
    }, true);
}
