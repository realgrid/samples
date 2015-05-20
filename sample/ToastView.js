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

    setTests("actions", "ToastView");
});
 
function setFields(provider) {
    var fields = [{
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
        fieldName: "ItemId",
        width: 80,
        header: { text: "ItemId" }
    }, {
        fieldName: "ItemName",
        width: 100,
        header: { text: "항목명" },
        styles: { textAlignment: "near" }
    }, {
        fieldName: "RequestType",
        width: 80,
        header: { text: "분야" },
        filters: [{
            name: "식품",
            criteria: "value = '식품'"
        }, {
            name: "수질",
            criteria: "value = '수질'"
        }
        ],
        styles: { textAlignment: "near" }
    }, {
        fieldName: "ServiceName",
        width: 150,
        header: { text: "유형명" },
        styles: { textAlignment: "near" }
    }, {
        fieldName: "ServiceCode",
        width: 150,
        header: { text: "서비스코드" },
        styles: { textAlignment: "near" }
    }, {
        fieldName: "Standard",
        width: 150,
        header: { text: "표준" },
        styles: { textAlignment: "near" }
    }, {
        fieldName: "LowBounds",
        width: 80,
        header: { text: "하위 값" },
        styles: { textAlignment: "near" }
    }, {
        fieldName: "HighBounds",
        width: 80,
        header: { text: "상위 값" },
        styles: { textAlignment: "near" }
    }, {
        fieldName: "CheckUnit",
        width: 80,
        header: { text: "단위" },
        styles: { textAlignment: "near" }
    }, {
        fieldName: "CheckPrice",
        width: 90,
        header: { text: "수수료" },
        styles: { textAlignment: "far" }
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        stateBar: {
            visible: false
        },
        select: {
            style: RealGridJS.SelectionStyle.ROWS
        },
        footer: {
            visible: false
        },
        checkBar: {
            visible: false
        },
        sorting: {
            toast: {
                visible: true,
                message: "정렬 중입니다..."
            }
        },
        filtering: {
            toast: {
                visible: true,
                message: "필터링 중입니다..."
            }
        },
        grouping: {
            toast: {
                visible: true,
                message: "그룹핑 중입니다..."
            }
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function setStyles() {
    grdMain.setStyles({
        header: { "fontSize": "12", "fontFamily": "맑은 고딕", "fontBold": "true" },
        selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
}
 
function loadData() {
    grdMain.showToast("Load data...", true);
    $.ajax({
        url: "data/LargeDataSet.json?__time__=" + new Date().getTime(),
        dataType: 'json',
        success: function (data) {
            grdMain.hideToast();
            dataProvider.setRows(data);
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
