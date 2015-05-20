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

  setTests("actions", "DataCellStyle Editing Properties");
});
 
function setFields(provider) {
    var fields = [{
        fieldName: "Prod_Lv"
    }, {
        fieldName: "DC_Lv"
    }, {
        fieldName: "Sales_Lv"
    }, {
        fieldName: "Category"
    }, {
        fieldName: "2014_02",
        dataType: "number"
    }, {
        fieldName: "2014_02_01",
        dataType: "number"
    }, {
        fieldName: "2014_02_02",
        dataType: "number"
    }, {
        fieldName: "2014_02_03",
        dataType: "number"
    }, {
        fieldName: "2014_02_04",
        dataType: "number"
    }, {
        fieldName: "2014_02_05",
        dataType: "number"
    }, {
        fieldName: "2014_02_06",
        dataType: "number"
    }, {
        fieldName: "2014_02_07",
        dataType: "number"
    }, {
        fieldName: "2014_02_08",
        dataType: "number"
    }, {
        fieldName: "2014_02_09",
        dataType: "number"
    }, {
        fieldName: "2014_02_10",
        dataType: "number"
    }, {
        fieldName: "2014_03",
        dataType: "number"
    }, {
        fieldName: "2014_03_01",
        dataType: "number"
    }, {
        fieldName: "2014_03_02",
        dataType: "number"
    }, {
        fieldName: "2014_03_03",
        dataType: "number"
    }, {
        fieldName: "2014_03_04",
        dataType: "number"
    }, {
        fieldName: "2014_03_05",
        dataType: "number"
    }, {
        fieldName: "2014_03_06",
        dataType: "number"
    }, {
        fieldName: "2014_03_07",
        dataType: "number"
    }, {
        fieldName: "2014_03_08",
        dataType: "number"
    }, {
        fieldName: "2014_03_09",
        dataType: "number"
    }, {
        fieldName: "2014_03_10",
        dataType: "number"
    }, {
        fieldName: "2014_04",
        dataType: "number"
    }, {
        fieldName: "2014_04_01",
        dataType: "number"
    }, {
        fieldName: "2014_04_02",
        dataType: "number"
    }, {
        fieldName: "2014_04_03",
        dataType: "number"
    }, {
        fieldName: "2014_04_04",
        dataType: "number"
    }, {
        fieldName: "2014_04_05",
        dataType: "number"
    }, {
        fieldName: "2014_04_06",
        dataType: "number"
    }, {
        fieldName: "2014_04_07",
        dataType: "number"
    }, {
        fieldName: "2014_04_08",
        dataType: "number"
    }, {
        fieldName: "2014_04_09",
        dataType: "number"
    }, {
        fieldName: "2014_04_10",
        dataType: "number"
    }, {
        fieldName: "2014_05",
        dataType: "number"
    }, {
        fieldName: "2014_05_01",
        dataType: "number"
    }, {
        fieldName: "2014_05_02",
        dataType: "number"
    }, {
        fieldName: "2014_05_03",
        dataType: "number"
    }, {
        fieldName: "2014_05_04",
        dataType: "number"
    }, {
        fieldName: "2014_05_05",
        dataType: "number"
    }, {
        fieldName: "2014_05_06",
        dataType: "number"
    }, {
        fieldName: "2014_05_07",
        dataType: "number"
    }, {
        fieldName: "2014_05_08",
        dataType: "number"
    }, {
        fieldName: "2014_05_09",
        dataType: "number"
    }, {
        fieldName: "2014_05_10",
        dataType: "number"
    }, {
        fieldName: "2014_06",
        dataType: "number"
    }, {
        fieldName: "2014_06_01",
        dataType: "number"
    }, {
        fieldName: "2014_06_02",
        dataType: "number"
    }, {
        fieldName: "2014_06_03",
        dataType: "number"
    }, {
        fieldName: "2014_06_04",
        dataType: "number"
    }, {
        fieldName: "2014_06_05",
        dataType: "number"
    }, {
        fieldName: "2014_06_06",
        dataType: "number"
    }, {
        fieldName: "2014_06_07",
        dataType: "number"
    }, {
        fieldName: "2014_06_08",
        dataType: "number"
    }, {
        fieldName: "2014_06_09",
        dataType: "number"
    }, {
        fieldName: "2014_06_10",
        dataType: "number"
    }, {
        fieldName: "2014_07",
        dataType: "number"
    }, {
        fieldName: "2014_07_01",
        dataType: "number"
    }, {
        fieldName: "2014_07_02",
        dataType: "number"
    }, {
        fieldName: "2014_07_03",
        dataType: "number"
    }, {
        fieldName: "2014_07_04",
        dataType: "number"
    }, {
        fieldName: "2014_07_05",
        dataType: "number"
    }, {
        fieldName: "2014_07_06",
        dataType: "number"
    }, {
        fieldName: "2014_07_07",
        dataType: "number"
    }, {
        fieldName: "2014_07_08",
        dataType: "number"
    }, {
        fieldName: "2014_07_09",
        dataType: "number"
    }, {
        fieldName: "2014_07_10",
        dataType: "number"
    }];
    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        fieldName: "Prod_Lv",
        name: "Prod_Lv",
        type: "data",
        width: "70",
        header: {
            text: "Prod_Lv"
        },
        styles: {
            background: "#FFE6F5FE",
            borderRight: "#FFC6C6C6, 1",
            textAlignment: "near"
        },
        mergeRule: {
            criteria: "row div 6"
        }
    }, {
        fieldName: "DC_Lv",
        name: "DC_Lv",
        type: "data",
        width: "44",
        header: {
            text: "DC_Lv"
        },
        styles: {
            background: "#FFE6F5FE",
            borderRight: "#FFC6C6C6, 1",
            textAlignment: "near"
        },
        mergeRule: {
            criteria: "row div 6"
        }
    }, {
        fieldName: "Sales_Lv",
        name: "Sales_Lv",
        type: "data",
        width: "80",
        header: {
            text: "Sales_Lv"
        },
        styles: {
            background: "#FFE6F5FE",
            borderRight: "#FFC6C6C6, 1",
            textAlignment: "near"
        },
        mergeRule: {
            criteria: "row div 3"
        }
    }, {
        fieldName: "Category",
        name: "Category",
        type: "data",
        width: "70",
        header: {
            text: "Category"
        },
        styles: {
            background: "#FFE6F5FE",
            borderRight: "#FFC6C6C6, 1",
            textAlignment: "near"
        }
    }, {
        fieldName: "2014_02",
        name: "2014_02",
        type: "data",
        width: "44",
        header: {
            text: "Total"
        },
        styles: {
            background: "#FFF5F5F5"
        }
    }, {
        fieldName: "2014_02_01",
        name: "2014_02_01",
        type: "data",
        width: "44",
        header: {
            text: "02/01"
        }
    }, {
        fieldName: "2014_02_02",
        name: "2014_02_02",
        type: "data",
        width: "44",
        header: {
            text: "02/02"
        }
    }, {
        fieldName: "2014_02_03",
        name: "2014_02_03",
        type: "data",
        width: "44",
        header: {
            text: "02/03"
        }
    }, {
        fieldName: "2014_02_04",
        name: "2014_02_04",
        type: "data",
        width: "44",
        header: {
            text: "02/04"
        }
    }, {
        fieldName: "2014_02_05",
        name: "2014_02_05",
        type: "data",
        width: "44",
        header: {
            text: "02/05"
        }
    }, {
        fieldName: "2014_02_06",
        name: "2014_02_06",
        type: "data",
        width: "44",
        header: {
            text: "02/06"
        }
    }, {
        fieldName: "2014_02_07",
        name: "2014_02_07",
        type: "data",
        width: "44",
        header: {
            text: "02/07"
        }
    }, {
        fieldName: "2014_02_08",
        name: "2014_02_08",
        type: "data",
        width: "44",
        header: {
            text: "02/08"
        }
    }, {
        fieldName: "2014_02_09",
        name: "2014_02_09",
        type: "data",
        width: "44",
        header: {
            text: "02/09"
        }
    }, {
        fieldName: "2014_02_10",
        name: "2014_02_10",
        type: "data",
        width: "44",
        header: {
            text: "02/10"
        }
    }, {
        fieldName: "2014_03",
        fieldName: "2014_03",
        name: "2014_03",
        type: "data",
        width: "44",
        header: {
            text: "Total"
        },
        styles: {
            background: "#FFF5F5F5"
        }
    }, {
        fieldName: "2014_03_01",
        name: "2014_03_01",
        type: "data",
        width: "44",
        header: {
            text: "03/01"
        }
    }, {
        fieldName: "2014_03_02",
        name: "2014_03_02",
        type: "data",
        width: "44",
        header: {
            text: "03/02"
        }
    }, {
        fieldName: "2014_03_03",
        name: "2014_03_03",
        type: "data",
        width: "44",
        header: {
            text: "03/03"
        }
    }, {
        fieldName: "2014_03_04",
        name: "2014_03_04",
        type: "data",
        width: "44",
        header: {
            text: "03/04"
        }
    }, {
        fieldName: "2014_03_05",
        name: "2014_03_05",
        type: "data",
        width: "44",
        header: {
            text: "03/05"
        }
    }, {
        fieldName: "2014_03_06",
        name: "2014_03_06",
        type: "data",
        width: "44",
        header: {
            text: "03/06"
        }
    }, {
        fieldName: "2014_03_07",
        name: "2014_03_07",
        type: "data",
        width: "44",
        header: {
            text: "03/07"
        }
    }, {
        fieldName: "2014_03_08",
        name: "2014_03_08",
        type: "data",
        width: "44",
        header: {
            text: "03/08"
        }
    }, {
        fieldName: "2014_03_09",
        name: "2014_03_09",
        type: "data",
        width: "44",
        header: {
            text: "03/09"
        }
    }, {
        fieldName: "2014_03_10",
        name: "2014_03_10",
        type: "data",
        width: "44",
        header: {
            text: "03/10"
        }
    }, {
        fieldName: "2014_04",
        name: "2014_04",
        type: "data",
        width: "44",
        header: {
            text: "Total"
        },
        styles: {
            background: "#FFF5F5F5"
        }
    }, {
        fieldName: "2014_04_01",
        name: "2014_04_01",
        type: "data",
        width: "44",
        header: {
            text: "04/01"
        }
    }, {
        fieldName: "2014_04_02",
        name: "2014_04_02",
        type: "data",
        width: "44",
        header: {
            text: "04/02"
        }
    }, {
        fieldName: "2014_04_04",
        name: "2014_04_04",
        type: "data",
        width: "44",
        header: {
            text: "04/03"
        }
    }, {
        fieldName: "2014_04_04",
        name: "2014_04_04",
        type: "data",
        width: "44",
        header: {
            text: "04/04"
        }
    }, {
        fieldName: "2014_04_05",
        name: "2014_04_05",
        type: "data",
        width: "44",
        header: {
            text: "04/05"
        }
    }, {
        fieldName: "2014_04_06",
        name: "2014_04_06",
        type: "data",
        width: "44",
        header: {
            text: "04/06"
        }
    }, {
        fieldName: "2014_04_07",
        name: "2014_04_07",
        type: "data",
        width: "44",
        header: {
            text: "04/07"
        }
    }, {
        fieldName: "2014_04_08",
        name: "2014_04_08",
        type: "data",
        width: "44",
        header: {
            text: "04/08"
        }
    }, {
        fieldName: "2014_04_09",
        name: "2014_04_09",
        type: "data",
        width: "44",
        header: {
            text: "04/09"
        }
    }, {
        fieldName: "2014_04_10",
        name: "2014_04_10",
        type: "data",
        width: "44",
        header: {
            text: "04/10"
        }

    }, {
        fieldName: "2014_05",
        name: "2014_05",
        type: "data",
        width: "44",
        header: {
            text: "Total"
        },
        styles: {
            background: "#FFF5F5F5"
        }
    }, {
        fieldName: "2014_05_01",
        name: "2014_05_01",
        type: "data",
        width: "44",
        header: {
            text: "05/01"
        }
    }, {
        fieldName: "2014_05_02",
        name: "2014_05_02",
        type: "data",
        width: "44",
        header: {
            text: "05/02"
        }
    }, {
        fieldName: "2014_05_05",
        name: "2014_05_05",
        type: "data",
        width: "44",
        header: {
            text: "05/03"
        }
    }, {
        fieldName: "2014_05_04",
        name: "2014_05_04",
        type: "data",
        width: "44",
        header: {
            text: "05/04"
        }
    }, {
        fieldName: "2014_05_05",
        name: "2014_05_05",
        type: "data",
        width: "44",
        header: {
            text: "05/05"
        }
    }, {
        fieldName: "2014_05_06",
        name: "2014_05_06",
        type: "data",
        width: "44",
        header: {
            text: "05/06"
        }
    }, {
        fieldName: "2014_05_07",
        name: "2014_05_07",
        type: "data",
        width: "44",
        header: {
            text: "05/07"
        }
    }, {
        fieldName: "2014_05_08",
        name: "2014_05_08",
        type: "data",
        width: "44",
        header: {
            text: "05/08"
        }
    }, {
        fieldName: "2014_05_09",
        name: "2014_05_09",
        type: "data",
        width: "44",
        header: {
            text: "05/09"
        }
    }, {
        fieldName: "2014_05_10",
        name: "2014_05_10",
        type: "data",
        width: "44",
        header: {
            text: "05/10"
        }
    }, {
        fieldName: "2014_06",
        name: "2014_06",
        type: "data",
        width: "44",
        header: {
            text: "Total"
        },
        styles: {
            background: "#FFF5F5F5"
        }
    }, {
        fieldName: "2014_06_01",
        name: "2014_06_01",
        type: "data",
        width: "44",
        header: {
            text: "06/01"
        }
    }, {
        fieldName: "2014_06_02",
        name: "2014_06_02",
        type: "data",
        width: "44",
        header: {
            text: "06/02"
        }
    }, {
        fieldName: "2014_06_06",
        name: "2014_06_06",
        type: "data",
        width: "44",
        header: {
            text: "06/03"
        }
    }, {
        fieldName: "2014_06_04",
        name: "2014_06_04",
        type: "data",
        width: "44",
        header: {
            text: "06/04"
        }
    }, {
        fieldName: "2014_06_05",
        name: "2014_06_05",
        type: "data",
        width: "44",
        header: {
            text: "06/05"
        }
    }, {
        fieldName: "2014_06_06",
        name: "2014_06_06",
        type: "data",
        width: "44",
        header: {
            text: "06/06"
        }
    }, {
        fieldName: "2014_06_07",
        name: "2014_06_07",
        type: "data",
        width: "44",
        header: {
            text: "06/07"
        }
    }, {
        fieldName: "2014_06_08",
        name: "2014_06_08",
        type: "data",
        width: "44",
        header: {
            text: "06/08"
        }
    }, {
        fieldName: "2014_06_09",
        name: "2014_06_09",
        type: "data",
        width: "44",
        header: {
            text: "06/09"
        }
    }, {
        fieldName: "2014_06_10",
        name: "2014_06_10",
        type: "data",
        width: "44",
        header: {
            text: "06/10"
        }
    }, {
        fieldName: "2014_07",
        name: "2014_07",
        type: "data",
        width: "44",
        header: {
            text: "Total"
        },
        styles: {
            background: "#FFF5F5F5"
        }
    }, {
        fieldName: "2014_07_01",
        name: "2014_07_01",
        type: "data",
        width: "44",
        header: {
            text: "07/01"
        }
    }, {
        fieldName: "2014_07_02",
        name: "2014_07_02",
        type: "data",
        width: "44",
        header: {
            text: "07/02"
        }
    }, {
        fieldName: "2014_07_07",
        name: "2014_07_07",
        type: "data",
        width: "44",
        header: {
            text: "07/03"
        }
    }, {
        fieldName: "2014_07_04",
        name: "2014_07_04",
        type: "data",
        width: "44",
        header: {
            text: "07/04"
        }
    }, {
        fieldName: "2014_07_05",
        name: "2014_07_05",
        type: "data",
        width: "44",
        header: {
            text: "07/05"
        }
    }, {
        fieldName: "2014_07_06",
        name: "2014_07_06",
        type: "data",
        width: "44",
        header: {
            text: "07/06"
        }
    }, {
        fieldName: "2014_07_07",
        name: "2014_07_07",
        type: "data",
        width: "44",
        header: {
            text: "07/07"
        }
    }, {
        fieldName: "2014_07_08",
        name: "2014_07_08",
        type: "data",
        width: "44",
        header: {
            text: "07/08"
        }
    }, {
        fieldName: "2014_07_09",
        name: "2014_07_09",
        type: "data",
        width: "44",
        header: {
            text: "07/09"
        }
    }, {
        fieldName: "2014_07_10",
        name: "2014_07_10",
        type: "data",
        width: "44",
        header: {
            text: "07/10"
        }
    }];

    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        header: {
            height: 40
        },
        panel: {
            visible: true
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
        indicator: {
            visible: true,
            displayValue: "row"
        },
        display: {
            rowResizable: true,
            rowHeight: 26
        },
        edit: {
            insertable : true,
            appendtable : true
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function setStyles() {
    grdMain.setStyles({
        selection: {
            background: "#18ff8800",
            border: "#ccff8800,2"
        }
    });
}

function setDataCellStyles(grid) {
    // register styels
    grid.addCellStyle("style01", {
        "foreground": "#ffffffff",
        "background": "#ff333333",
        "fontSize": 13,
        "fontBold": true,
        "editable": false
    });
    grid.addCellStyle("style02", {
        "foreground": "#ff000000",
        "background": "#ffcccccc",
        "fontSize": 13,
        "readOnly": true
    });

    // set styles
    grid.setCellStyles([1, 2, 3, 4, 5], ["2014_02_02", "2014_02_03", "2014_02_04", "2014_02_05"], "style01");
    grid.setCellStyles([1, 2, 3, 4, 5], ["2014_02_07", "2014_02_08", "2014_02_09"], "style02");
}
 
function loadData() {
    grdMain.showToast("Load data...", true);
    $.ajax({
        url: "data/CelloData.csv?__time__=" + new Date().getTime(),
        dataType: 'text',
        success: function (data) {
            grdMain.hideToast();
            dataProvider.fillCsvData(data, {
                count: 20
            });
            var count = dataProvider.getRowCount();
            $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
            setDataCellStyles(grdMain);
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
