var grdMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

var cellDefaultStyles = [{
    criteria: "value >= 200",
    styles: "background=#55e3d36b"
}, {
    criteria: "value >= 500",
    styles: "background=#55cbc060"
}, {
    criteria: "value >= 2000",
    styles: "background=#5589913d"
}, {
    criteria: "value >= 10000",
    styles: "background=#5545612c;foreground=#ffffffff"
}];

var cellDefaultStyles2 = [{
    criteria: "value > base",
    styles: "background=#55f05025" // fffaae5e, fff05025, ffcb2026
}, {
    criteria: "value <= base",
    styles: "background=#5560cbc0"
}];

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
    
  setTests("actions", "DynamicStyleColumn");
});

function setFields(provider) {
    var fields = [{
        fieldName: "term"
    }, {
        fieldName: "category"
    }, {
        fieldName: "1997",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "1998",
        baseField: "1997",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "1999",
        baseField: "1998",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2000",
        baseField: "1999",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2001",
        baseField: "2000",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2002",
        baseField: "2001",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2003",
        baseField: "2002",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2004",
        baseField: "2003",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2005",
        baseField: "2004",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2006",
        baseField: "2005",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2007",
        baseField: "2006",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2008",
        baseField: "2007",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2009",
        baseField: "2008",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2010",
        baseField: "2009",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2011",
        baseField: "2010",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2012",
        baseField: "2011",
        dataType: RealGridJS.DataType.NUMBER
    }];
 
    provider.setFields(fields);
}
 
function setColumns(grid) {
    var colStyles = {
        background: "#33ffe27a",
        fontName: "Arial",
        fontBold: false,
        textAlignment: "far"
    };

    var columns = [{
        fieldName: "term",
        width: 80,
        equalBlank:true,
        header: { text: "Term" }
    }, {
        name: "category",
        fieldName: "category",
        width: 100,
        styles: { textAlignment: "far" },
        dynamicStyles: [{
            criteria: "value like '%Damage%'",
            styles: "background=#11ff0000"
        }],
        header: { text: "Category" }
    }, {
        fieldName: "1997",
        width: 50,
        styles: colStyles,
        header: { text: "1997" }
    }, {
        fieldName: "1998",
        width: 50,
        styles: colStyles,
        header: { text: "1998" }
    }, {
        fieldName: "1999",
        width: 50,
        styles: colStyles,
        header: { text: "1999" }
    }, {
        fieldName: "2000",
        width: 50,
        styles: colStyles,
        header: { text: "2000" }
    }, {
        fieldName: "2001",
        width: 50,
        styles: colStyles,
        header: { text: "2001" }
    }, {
        fieldName: "2002",
        width: 50,
        styles: colStyles,
        header: { text: "2002" }
    }, {
        fieldName: "2003",
        width: 50,
        styles: colStyles,
        header: { text: "2003" }
    }, {
        fieldName: "2004",
        width: 50,
        styles: colStyles,
        header: { text: "2004" }
    }, {
        fieldName: "2005",
        width: 50,
        styles: colStyles,
        header: { text: "2005" }
    }, {
        fieldName: "2006",
        width: 50,
        styles: colStyles,
        header: { text: "2006" }
    }, {
        fieldName: "2007",
        width: 50,
        styles: colStyles,
        header: { text: "2007" }
    }, {
        fieldName: "2008",
        width: 50,
        styles: colStyles,
        header: { text: "2008" }
    }, {
        fieldName: "2009",
        width: 50,
        styles: colStyles,
        header: { text: "2009" }
    }, {
        fieldName: "2010",
        width: 50,
        styles: colStyles,
        header: { text: "2010" }
    }, {
        fieldName: "2011",
        width: 50,
        styles: colStyles,
        header: { text: "2011" }
    }, {
        fieldName: "2012",
        width: 50,
        styles: colStyles,
        header: { text: "2012" }
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        panel: {
            visible: false
        },
        footer: {
            visible: false
        },
        checkBar: {
            visible: false
        },
        stateBar: {
            visible: false
        },
        display: {
            rowHeight: 31
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin97.SkinSource);
}

function setStyles() {
    grdMain.setStyles({
        body: {
            cellDynamicStyles: cellDefaultStyles
        }
    });
}
 
function loadData(provider) {
    $.ajax({
        url: "data/FireDamage.csv",
        dataType: 'text',
        success: function (data) {
            provider.fillCsvData(data, {
                start: 3
            });
            var count = provider.getRowCount();
            $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
        },
        complete: function (data) {
        }
    });
}

var tests = {
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
    createListBox(container, "Column", ["cellValue", "baseValue"], function (e) {
        var v = _getSelected(e);
        var styles = (v == "cellValue") ? cellDefaultStyles : cellDefaultStyles2;
        grdMain.setStyles({
            body: {
                cellDynamicStyles: styles
            }
        });
    }, "cellValue");
}
