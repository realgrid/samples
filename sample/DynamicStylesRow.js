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
    
  setTests("actions", "DynamicStyleRow");
});

function setFields(provider) {
    var fields = [{
        fieldName: "continent"
    }, {
        fieldName: "country"
    }, {
        fieldName: "2000",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2001",
        baseField: "2000",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2002",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2003",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2004",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2005",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2006",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2007",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2008",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2009",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2010",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2011",
        dataType: RealGridJS.DataType.NUMBER
    }, {
        fieldName: "2012",
        dataType: RealGridJS.DataType.NUMBER
    }];
 
    provider.setFields(fields);
}
 
function setColumns(grid) {
    var colStyles = {
        background: "#33ffe27a",
        fontName: "Arial",
        textAlignment: "far",
        numberFormat: "#,000"
    };
 
    var colStyles2 = {
        background: "#3300ff00",
        fontName: "Arial",
        textAlignment: "far",
        numberFormat: "#,000"
    };
 
    var columns = [{
        fieldName: "continent",
        width: 60,
        equalBlank: true,
        header: { text: "Continent" }
    }, {
        name: "country",
        fieldName: "country",
        width: 80,
        styles: { textAlignment: "center" },
        header: { text: "Country" }
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
        header: { text: "2002" }
    }, {
        fieldName: "2003",
        width: 50,
        header: { text: "2003" }
    }, {
        fieldName: "2004",
        width: 50,
        styles: colStyles2,
        header: { text: "2004" }
    }, {
        fieldName: "2005",
        width: 50,
        styles: colStyles2,
        header: { text: "2005" }
    }, {
        fieldName: "2006",
        width: 50,
        header: { text: "2006" }
    }, {
        fieldName: "2007",
        width: 50,
        header: { text: "2007" }
    }, {
        fieldName: "2008",
        width: 50,
        header: { text: "2008" }
    }, {
        fieldName: "2009",
        width: 50,
        header: { text: "2009" }
    }, {
        fieldName: "2010",
        width: 50,
        header: { text: "2010" }
    }, {
        fieldName: "2011",
        width: 50,
        header: { text: "2011" }
    }, {
        fieldName: "2012",
        width: 50,
        header: { text: "2012" }
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        stateBar: {
            visible: false
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin97.SkinSource);
}

function setStyles() {
    grdMain.setStyles({
        body: {
            dynamicStyles: [{
                criteria: [
                    "values['2010'] / values['2009'] >= 1.03",
                    "values['2010'] / values['2009'] >= 1.02"
                ],
                styles: [
                    "background=#55ff0000",
                    "background=#22ff0000"
                ]
            }, {
                criteria: "checked",
                styles: "background=#22000000"
            }],
	        dynamicStyles2: [{
	            criteria: "values['2004'] > 4",
	            styles: "background=#55ff0000"
	        }, {
	            criteria: "values['2012'] / values['2011'] >= 1.02",
	            styles: "background=#22ff0000"
	        }, {
	            criteria: "checked",
	            styles: "background=#22000000"
	        }]
        }
    });
}
 
function loadData(provider) {
    grdMain.showToast("Load data...", true);
    console.log("############ START: " + RealGridJS.getTimer());
    $.ajax({
        type: "GET",
        url: "data/CountriesByPopulation.csv?__time__=" + new Date().getTime(),
        dataType: 'text',
        success: function (data) {
            console.log("############ LOADED: " + RealGridJS.getTimer());
            grdMain.hideToast();
            dataProvider.fillCsvData(data, {
                start: 3
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
    createCheckBox(container, "rowStylesFirst", function (e) {
        grdMain.setOptions({
            body: {
                rowStylesFirst: _getChecked(e)
            }
        });
    }, false);
}
