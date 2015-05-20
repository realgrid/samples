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

	loadData(dataProvider);

  grdMain.setPaging(true, 10, -1);

  setTests("actions", "PagingOverview");

  grdMain.onPageChanging = function (grid, newPage) {
      console.log("$$$$$$$$$$$$$$$$$$ page changing => " + newPage);
      return _getChecked("pageable");
  };
  grdMain.onPageChanged = function (grid, page) {
      console.log("$$$$$$$$$$$$$$$$$$ page changed => " + page);
  }
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
        indicator: {
            //displayValue: "row"
        },
        footer: {
            visible: false
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
 
function loadData() {
    grdMain.showToast("Load data...", true);
    $.ajax({
        url: "data/총생산소득.csv?__date__=" + new Date().getTime(),
        dataType: 'text',
        success: function (data) {
            grdMain.hideToast();
            dataProvider.fillCsvData(data, {
                quoted: true,
                start: 1
            });
        },
        complete: function (data) {
            grdMain.hideToast();
        }
	}); 
}

var tests = {
    setPage: function () {
        var page = $("#txtMain").val();
        grdMain.setPage(page);
    },
    "<<": function () {
        grdMain.setPage(0);
    },
    "<": function () {
        var page = grdMain.getPage();
        grdMain.setPage(page - 1);
    },
    ">": function () {
        var page = grdMain.getPage();
        grdMain.setPage(page + 1);
    },
    ">>": function () {
        var count = grdMain.getPageCount();
        grdMain.setPage(count - 1);
    },
    topIndex: function () {
        alert(grdMain._gridView.topIndex());
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
    $("#container").css("height", "300");
	createButtons(container, tests);
    createCheckBox(container, "paging", function (e) {
        grdMain.setPaging(e.target.checked);
    }, true);
    createCheckBox(container, "pageable", null, true);
}
