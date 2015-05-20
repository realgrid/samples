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
  setDataCellStyles(grdMain);

	loadData(dataProvider);

  setTests("actions", "DataCellOverview");
});
 
function setFields(provider) {
    var fields = [
        "RowIndex", "ItemId", "ItemName", "RequestType", "Standard",
        "LowBounds", "HighBounds", "LowSign", "HighSign", "ServiceName",
        "ServiceCode", "CheckUnit",
        { fieldName: "CheckPrice", dataType: "number" }
    ];
    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        name: "colRow",
        fieldName: "RowIndex",
        width: 50,
        header: { text: "Row" },
        styles: { textAlignment: "far" }
    }, {
        name: "colItemId",
        fieldName: "ItemId",
        width: 80,
        header: { text: "ItemId" },
        styles: { textAlignment: "near" }
    }, {
        name: "colItemName",
        fieldName: "ItemName",
        width: 100,
        header: { text: "항목명" },
        styles: { textAlignment: "near" }
    }, {
        name: "colRequestType",
        fieldName: "RequestType",
        width: 80,
        header: { text: "분야" }
    }, {
        name: "colStandard",
        fieldName: "Standard",
        width: 200,
        header: { text: "표준" },
        styles: { textAlignment: "near" }
    }, {
        name: "colLowBounds",
        fieldName: "LowBounds",
        width: 80,
        header: { text: "하위 값" },
        styles: { textAlignment: "near" }
    }, {
        name: "colHighBounds",
        fieldName: "HighBounds",
        width: 80,
        header: { text: "상위 값" },
        styles: { textAlignment: "far" }
    }, {
        name: "colUnit",
        fieldName: "CheckUnit",
        width: 80,
        header: { text: "단위" },
        styles: { textAlignment: "center" }
    }, {
        fieldName: "CheckPrice",
        width: 90,
        header: { text: "수수료" },
        styles: { textAlignment: "far" }
    }, {
        fieldName: "ServiceName",
        width: 250,
        header: { text: "유형명" },
        styles: { textAlignment: "near" }
    }, {
        fieldName: "ServiceCode",
        width: 250,
        header: { text: "서비스코드" },
        styles: { textAlignment: "near" }
    }];

    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grdMain.setEditOptions({
        insertable: true,
        appendable: true,
        deletable: true
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function setStyles() {
    grdMain.setStyles({
        selection: {
            background: "#11000000",
            border: "#55000000,2"
        }
    });
}

function setDataCellStyles(grid) {
    grid.addCellStyles([{
        "id": "style1",
        "foreground": "#ffffffff",
        "background": "#ff333333",
        "fontSize": 14,
        "fontBold": true,
        "editable": false
    }, {
        "id": "style11",
        "foreground": "#ffffff00",
        "background": "#ff111111",
        "fontSize": 16,
        "fontBold": true,
        "readOnly": false
    }, {
        "id": "style2",
        "background": "#110000ff",
        "foreground": "#ff000088",
        "fontSize": 13,
        "fontBold": true,
        "textAlignment": "center"
    }, {
        "id": "styleNew",
        "background": "#33ffff00"
    }]);
}
 
function loadData() {
    grdMain.showToast("Load data...", true);
    $.ajax({
        url: "data/LargeDataSetwithNumber.csv?__time__=" + new Date().getTime(),
        dataType: 'text',
        success: function (data) {
            grdMain.hideToast();
            dataProvider.fillCsvData(data, {
                count: 20
            });
            var count = dataProvider.getRowCount();
            $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
        },
        error: function(xhr, status, error) {
            grdMain.hideToast();
            var err = xhr + ', ' + status + ', ' + error;
            console.log("jQuery getJSON() Failed: " + err);
            $("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
            alert("jQuery getJSON() Failed: " + err);
        },
        complete: function (data) {
        }
	}); 
}

var tests = {
    setRow: function () {
        grdMain.addCellStyle("style01", {
            "background": "#4400ff00",
            "fontSize": 14,
            "paddingTop": 5
        });
        // field가 -1이면 행 전체 셀들에 대해 지정한다.
        grdMain.setCellStyles([1, 3], -1, "style01");
        grdMain.setCellStyles([7, 8], -1, "style2");
        // row가 -1이면 추가 중인 행에 대해 적용된다.
        grdMain.setCellStyle(-1, -1, "styleNew", true);
    },
    setField: function () {
        grdMain.addCellStyle("style02", {
            "paddingLeft": 15,
            "background": "#000000",
            "foreground": "#ffffff"
        }, true);
        grdMain.setCellStyle(4, "ItemId", "style02");
        grdMain.setCellStyle(4, 3, "style02");
        grdMain.setCellStyle(3, 2, "style02");
    },
    setRange: function () {
        grdMain.addCellStyle("style03", {
            "background": "#cc880000",
            "foreground": "#ffffff",
            "fontSize": 14
        }, true);
        grdMain.setCellStyles([6,7,8,9], [2,3,4,5,6], "style03");
    },
    clearAll: function () {
        grdMain.clearCellStyles();
    },
    hasStyle: function () {
        alert(grdMain.hasCellStyle("style01"));
    },
    getStyle: function () {
        alert(grdMain.getCellStyle(4, 1));
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
    //$("#txtSub").show();
    //$("#txtMin").show();
	createButtons(container, tests);
    /*
    createCheckBox(container, "visible", function (e) {
        grdMain.setIndicator({ visible: e.target.checked });
    }, true);
    createCheckBox(container, "selectable", function (e) {
        grdMain.setIndicator({ selectable: e.target.checked });
    }, true);
    createCheckBox(container, "zeroBase", function (e) {
        grdMain.setIndicator({ zeroBase: _getChecked(e) });
    }, false);
    createListBox(container, "displayValue", ["none", "index", "row"], function (e) {
        grdMain.setIndicator( { displayValue: _getSelected(e) } );
    }, "index")
    createListBox(container, "textAlign", ["near", "center", "far"], function (e) {
        grdMain.setStyles( { indicator: { textAlignment: _getSelected(e) } } );
    }, "center");
    */
}
