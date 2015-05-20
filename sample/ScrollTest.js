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

  setTests("actions", "ScrollTest");
});
 
function setFields(provider) {
    var fields = [{
        fieldName: "RowIndex"
    }, {
        fieldName: "ItemId"
    }, {
        fieldName: "ItemName"
    }, {
        fieldName: "RequestType"
    }, {
        fieldName: "ServiceName"
    }, {
        fieldName: "ServiceCode"
    }, {
        fieldName: "Standard"
    }, {
        fieldName: "LowBounds"
    }, {
        fieldName: "LowSign"
    }, {
        fieldName: "HighSign"
    }, {
        fieldName: "HighBounds"
    }, {
        fieldName: "CheckUnit"
    }, {
        fieldName: "CheckPrice",
        dataType: "number"
    }];
 
    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        fieldName: "RowIndex",
        width: 50,
        header: { text: "Row" },
        styles: { textAlignment: "far", font: "맑은 고딕" }
    }, {
        fieldName: "ItemId",
        width: 80,
        header: { text: "ItemId" },
        styles: { textAlignment: "near", font: "Arial" }
    }, {
        fieldName: "ItemName",
        width: 100,
        header: { text: "항목명" },
        styles: { textAlignment: "near", font: "Tahoma" }
    }, {
        fieldName: "RequestType",
        width: 80,
        header: { text: "분야" },
        styles: { textAlignment: "near", font: "Tahoma" }
    }, {
        fieldName: "ServiceName",
        width: 150,
        header: { text: "유형명" },
        styles: { textAlignment: "near", font: "맑은 고딕" }
    }, {
        fieldName: "ServiceCode",
        width: 150,
        header: { text: "서비스코드" },
        styles: { textAlignment: "near", font: "Arial" }
    }, {
        fieldName: "Standard",
        width: 150,
        header: { text: "표준" },
        styles: { textAlignment: "near", font: "Tahoma" }
    }, {
        fieldName: "LowBounds",
        width: 80,
        header: { text: "하위 값" },
        styles: { textAlignment: "near", font: "Arial" }
    }, {
        fieldName: "HighBounds",
        width: 80,
        header: { text: "상위 값" },
        styles: { textAlignment: "near", font: "맑은 고딕" }
    }, {
        fieldName: "CheckUnit",
        width: 80,
        header: { text: "단위" },
        styles: { textAlignment: "near", font: "맑은 고딕" }
    }, {
        fieldName: "CheckPrice",
        width: 90,
        header: { text: "수수료" },
        styles: { textAlignment: "far", font: "Arial" }
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        display: {
            rowHeight: 19
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
        url: "data/LargeDataSetwithNumber.csv?__time__=" + new Date().getTime(),
        dataType: 'text',
        success: function (data) {
            grdMain.hideToast();
            dataProvider.fillCsvData(data, {
                count: 1000
            });
        },
        complete: function (data) {
            grdMain.hideToast();
        }
	}); 
}

var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
    /*
    createCheckBox(container, "visible", function (e) {
        grdMain.setStateBar({ visible: e.target.checked });
    }, true);
    createListBox(container, "figureBackground", ["#ffff0000", "#ff00ff00"], function (e) {
        grdMain.setStyles( { stateBar: { figureBackground: _getSelected(e) } } );
    }, "#ff00ff00");
    */
}
