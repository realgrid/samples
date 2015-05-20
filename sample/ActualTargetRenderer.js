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
    
  setTests("actions", "ActualTargetRenderer");
});

function setFields(provider) {
    var fields = [{
        fieldName: "category",
        dataType: "text"
    }, {
        fieldName: "target",
        dataType: "number"
    }, {
        fieldName: "actual",
        dataType: "number"
    }];

    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        fieldName: "category",
        width: 200,
        styles: { textAlignment: "far" },
        header: { text: "Category" }
    }, {
        fieldName: "target",
        width: 70,
        styles: { textAlignment: "far" },
        header: { text: "Target" }
    }, {
        fieldName: "actual",
        width: 70,
        styles: { textAlignment: "far" },
        header: { text: "Actual" }
    }, {
        type: "group",
        orientation: "vertical",
        width: 230,
        header: { visible: false },
        columns: [{
            name: "colBullet",
            type: "series",
            fieldNames: "target,actual",
            height: 30,
            renderer: {
                type: "actualTargetBullet",
                maxValue: 100,
                maximumBackground: "#18000000"
            },
            header: { text: "Bullet" },
            styles: {
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 3,
                paddingBottom: 3,
                figureSize: "50%",
                figureBackground: "#88008800",
                figureBorder: "#88008800, 1",
                line: "#ff008800,2"
            }
        }, {
            name: "colText",
            type: "series",
            fieldNames: "target,actual",
            fillHeight: 100,
            renderer: {
                type: "actualTargetText",
                actualFont: "Arial,30,bold",
                actualForeground: "#ff888888",
                /*
                dynamicOptions: [{
                    criteria: "value[1] / value[0] >= 1.0",
                    options: "actualForeground=#ffff0000"
                }]
                */
                ///*
                dynamicStyles: [{
                    criteria: "value[1] / value[0] >= 1.0",
                    styles: "actualForeground=#ffff0000"
                }]
                //*/
            },
            header: { text: "Text" },
            styles: {
            }
        }]
    }];

    grid.setColumns(columns);
}

function setOptions(grid) {
    grid.setOptions({
        panel: {
            visible: false
        },
        footer: {
            visible: true
        },
        stateBar: {
            visible: false
        },
        display: {
            heightMeasurer: "fixed",
            rowHeight: 70,
            rowResizable: true
        },
        header: {
        },
        sorting: {
            handleVisibility: "hidden"
        }
    });
}

function setSkin() {
	grdMain.setStyles(skin103.SkinSource);
}

function setStyles() {
    grdMain.setStyles({
        border: "#ffff0000,5",
        body: {
            cellDynamicStyles: [{
                criteria: [
                    "value < 0"
                ],
                styles: [
                    "foreground=#ccff0000;fontBold=true"
                ]
            }]
        }
    });
}

function loadData(provider) {
    var rows = [
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67],
        [50, 40], [60, 70], [60, 53], [70, 75], [80, 89], [80, 67]
    ];

    var cats = [
        "Wheat flour", "Honey", "Raw food", "Raw containing food", "Cereal", "Vegetable cream",
        "Salt", "Solar salt", "Bamboo salt", "Ice", "Underground water",
        "Water"
    ];

    for (i = 0; i < rows.length; i++) {
        var row = rows[i];
        var k = Math.floor(Math.random() * cats.length);
        var v = cats[k];
        row.splice(0, 0, v);
    }
    grdMain.setFocus();
    provider.setRows(rows);
}

var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
