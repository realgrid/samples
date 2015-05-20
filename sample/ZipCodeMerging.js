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
    
  setTests("actions", "ZipCodeMerging");
});

function setFields(provider) {
    var fields = [{
        fieldName: "우편번호",
        dataType: "number"
    }, {
        fieldName: "일련번호",
        dataType: "number"
    }, {
        fieldName: "시도"
    }, {
        fieldName: "시군구"
    }, {
        fieldName: "읍면동"
    }, {
        fieldName: "리"
    }, {
        fieldName: "도서"
    }, {
        fieldName: "번지"
    }, {
        fieldName: "건물명"
    }];

	provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        fieldName: "우편번호",
        groupable: false,
        width: 80
    }, {
        fieldName: "시도",
        width: 120
    }, {
        fieldName: "시군구",
        width: 120
    }, {
        fieldName: "읍면동",
        width: 120
    }, {
        fieldName: "리",
        width: 120
    }, {
        fieldName: "도서",
        width: 120
    }, {
        fieldName: "번지",
        width: 120
    }, {
        fieldName: "건물명",
        width: 160
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
        stateBar: {
            visible: false
        },
        display: {
        },
        header: {
        },
        sorting: {
            handleVisibility: "hidden"
        },
        rowGroup: {
            mergeMode: true,
            headerStatement: " ${rowCount} rows",
            expandedAdornments: "header",
            collapsedAdornments: "header"
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

function loadData(provider) {
    grdMain.showToast("Load data...", true);
    console.log("############ START: " + RealGridJS.getTimer());
    $.ajax({
        type: "GET",
        url: "data/우편번호.csv?__date__=" + new Date().getTime(),
        dataType: 'text',
        success: function (data) {
            console.log("############ LOADED: " + RealGridJS.getTimer());
            grdMain.hideToast();
            dataProvider.fillCsvData(data, {
                start: 1
            });
            console.log("############ FINISHED: " + RealGridJS.getTimer());
            var count = provider.getRowCount();
            $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
        },
        error: function(xhr, status, error) {
            var err = xhr + ', ' + status + ', ' + error;
            console.log("jQuery getJSON() Failed: " + err);
            $("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
            alert("jQuery getJSON() Failed: " + err);
        },
        complete: function (data) {
            grdMain.hideToast();
        }
    });
}

var tests = {
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
    createCheckBox(container, "merged", function (e) {
        grdMain.setRowGroup({ mergeMode: _getChecked(e) });
    }, true);
}
