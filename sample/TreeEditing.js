var treeMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

$().ready(function () {
    dataProvider = new RealGridJS.LocalTreeDataProvider();
    setFields(dataProvider);

    treeMain = new RealGridJS.TreeView("container");
    treeMain.setDataSource(dataProvider);

    setImageList(treeMain);
    setColumns(treeMain);
    setOptions(treeMain);
    setSkin(49);
    setStyles(treeMain);

    loadData(dataProvider);

    dataProvider.onRowCountChanged = function (provider, count) {
        console.log("$$$$$$$$$$$$$$$ row count changed: " + count);
    };
    dataProvider.onRowAdding = function (provider, rowId, index) {
        console.log("$$$$$$$$$$$$$$$ row adding: " + rowId + ", " + index);
        return _getChecked("insertable");
    };
    dataProvider.onRowAdded = function (provider, rowId) {
        provider.setIconIndex(rowId, 2);
        console.log("$$$$$$$$$$$$$$$ row added: " + rowId);
    };
    dataProvider.onRowDeleting = function (provider, rowId) {
        console.log("$$$$$$$$$$$$$$$ row deleting: " + rowId);
        return _getChecked("deletable");
    };
    dataProvider.onRowsDeleting = function (provider, rowIds) {
        console.log("$$$$$$$$$$$$$$$ rows deleting: " + rowIds);
        return _getChecked("deletable");
    };
    dataProvider.onRowDeleted = function (provider, rowId) {
        console.log("$$$$$$$$$$$$$$$ row deleted: " + rowId);
    };
    dataProvider.onRowsDeleted = function (provider, rowIds) {
        console.log("$$$$$$$$$$$$$$$ rows deleted: " + rowIds);
    };
    dataProvider.onRowUpdating = function (provider, rowId) {
        console.log("$$$$$$$$$$$$$$$ row updating: " + rowId);
        return _getChecked("updatable");
    };
    dataProvider.onRowUpdated = function (provider, rowId) {
        console.log("$$$$$$$$$$$$$$$ row updated: " + rowId);
    };
    dataProvider.onValueChanged = function (provider, rowId, field) {
        console.log("$$$$$$$$$$$$$$$ value changed: " + rowId + ", " + field);
    };
    dataProvider.onRowStateChanged = function (provider, rowId) {
        console.log("$$$$$$$$$$$$$$$ state changed: " + rowId);
    };
    dataProvider.onRowStatesChanged = function (provider, rows) {
        console.log("$$$$$$$$$$$$$$$ staets changed: " + rows);
    };

    treeMain.onDataCellDblClicked = function (grid, index) {
        var row = index.dataRow;
        if (row >= 0) {
            var cnt = dataProvider.getDescendantCount(row);
            $("#message").css("color", "blue").text("child count: " + cnt).show();
        }
    };

    setTests("actions", "TreeEditing");
});

function setFields(provider) {
    var fields = [{
        "fieldName": "icon"
    }, {
        "fieldName": "tree"
    }, {
        "fieldName": "Col0"
    }, {
        "fieldName": "Col1"
    }, {
        "fieldName": "Col2"
    }, {
        "fieldName": "Col3",
        "dataType": "datetime"
    }, {
        "fieldName": "Col4"
    }, {
        "fieldName": "Col5"
    }, {
        "fieldName": "Col6"
    }, {
        "fieldName": "Col7"
    }];

    provider.setFields(fields);
    provider.setOptions({
        softDeleting: true
    })
}

function setColumns(tree) {
    var columns = [{
        "name": "col0",
        "fieldName": "col0",
        "width": "160",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Location"
        }
    }, {
        "name": "col1",
        "fieldName": "col1",
        "width": "60",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Id"
        }
    }, {
        "name": "col2",
        "fieldName": "col2",
        "width": "90",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Phone"
        }
    }, {
        "name": "col3",
        "fieldName": "col3",
        "width": "80",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Year"
        }
    }, {
        "name": "col4",
        "fieldName": "col4",
        "width": "100",
        "imageList": "images",
        "renderer": {
            "type": "icon"
        },
        "dynamicStyles": [{
            "criteria": "value='Argentina'",
            "styles": "iconIndex=0"
        }, {
            "criteria": "value='Brazil'",
            "styles": "iconIndex=1"
        }, {
            "criteria": "value='France'",
            "styles": "iconIndex=2"
        }, {
            "criteria": "value='Mexico'",
            "styles": "iconIndex=3"
        }, {
            "criteria": "value='Portugal'",
            "styles": "iconIndex=4"
        }, {
            "criteria": "value='Spain'",
            "styles": "iconIndex=5"
        }, {
            "criteria": "value='UK'",
            "styles": "iconIndex=6"
        }, {
            "criteria": "value='USA'",
            "styles": "iconIndex=7"
        }, {
            "criteria": "value='Venezuela'",
            "styles": "iconIndex=8"
        }],
        "styles": {
            "textAlignment": "near",
            "iconIndex": 0,
            "iconLocation": "left",
            "iconAlignment": "center",
            "iconOffset": 0,
            "iconPadding": 2
        },
        "header": {
            "text": "Country"
        }
    }, {
        "type": "group",
        "width": "300",
        "header": {
            "text": "Detail Info"
        },
        "columns": [{
            "name": "col5",
            "fieldName": "col5",
            "width": "60",
            "styles": {
                "textAlignment": "center"
            },
            "header": {
                "text": "Spot"
            }
        }, {
            "name": "col6",
            "fieldName": "col6",
            "width": "100",
            "styles": {
                "textAlignment": "center"
            },
            "header": {
                "text": "Serial"
            }
        }, {
            "name": "col7",
            "fieldName": "col7",
            "width": "120",
            "styles": {
                "textAlignment": "center"
            },
            "header": {
                "text": "Mail"
            }
        }]
    }];

    tree.setColumns(columns);
}

function setImageList(tree) {
    var images = new RealGridJS.ImageList("images01", "img/demo/smallflag/");
    images.addUrls(["ar.png", "at.png", "be.png", "br.png", "ca.png", "dk.png", "fi.png", "fr.png", "de.png"]);
    tree.registerImageList(images);

    tree.setTreeOptions({
        iconImages: images.getName(),
        iconWidth: 20
    });
};

function setOptions(tree) {
    tree.setOptions({
        summaryMode: "aggregate",
        edit: {
            updatable: true,
            insertable: true,
            appendable: true,
            deletable: true
        },
        display: {
            focusColor: 0x5292f7
        },
        stateBar: {
            visible: true
        }
    });
}

function setStyles(tree) {
    treeMain.setStyles({
        body: {
            dynamicStyles: [{
                criteria: "state = 'd'",
                styles: "background=#11000000;foreground=#ffaaaaaa"
            }, {
                criteria: "state = 'u'",
                styles: "background=#11ffff00"
            }, {
                criteria: "state = 'c'",
                styles: "background=#11ff00ff"
            }, {
                criteria: "state = 'x'",
                styles: "background=#1100ffff;foreground=#ffaaaaaa"
            }]
        }
    });

    treeMain.addCellStyle("style01", {
        background: "#cc6600",
        foreground: "#ffffff"
    });}

function setSkin() {
    treeMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    var rows = [
        [0, "1", "Argentina", "CACTU", "(1) 135-5555", "1998/01/01", "Argentina", "Head", "001-0000-0000", "user1@naver.com"],
        [0, "1.1", "Buenos Aires", "OCEAN", "(1) 135-5333", "2014/02/05", "Argentina", "Middle", "001-0001-0000", "user3@googlei.com"],
        [0, "1.1.1", "Rancho grande", "RANCH", "(1) 123-5555", "2010/01/16", "Argentina", "Local", "001-0001-0001", "user6@yahoo.com"],
        [0, "1.1.2", "Atheha grande", "PTNCH", "(1) 123-4578", "2012/04/14", "Argentina", "Local", "001-0001-0002", "user6@korea.com"],
        [1, "2", "Brazil", "HANAR", "(21) 555-0091", "1999/02/05", "Brazil", "Head", "002-0000-0000", "user2@naver.com"],
        [1, "2.1", "Rio de Janeiro", "QUEDE", "(21) 555-4252", "1997/03/08", "Brazil", "Middle", "002-0001-0000", "user4@google.com"],
        [1, "2.2", "Sao Paulo", "FAMIA", "(11) 555-9857", "2001/03/08", "Brazil", "Middle", "002-0002-0001", "user4@change.com"],
        [1, "2.2.1", "Queen Cozinha", "QUEEN", "(11) 555-1189", "2003/07/08", "Brazil", "Local", "001-0002-0002", "user4@paulo.com"],
        [2, "3", "France", "DUMON", "40.67.88.88", "2003/07/08", "France", "Head", "003-0000-0000", "user4@naver.com"],
        [2, "3.1", "Nantes", "FRANR", "40.32.21.21", "2003/07/08", "France", "Middle", "003-0001-0000", "user4@pvick.com"],
        [2, "3.2", "Paris", "PARIS", "(1) 42.34.22.66", "2003/07/08", "France", "Middle", "003-0002-0000", "user64@naver.com"],
        [2, "3.2.1", "du monde", "SPECD", "(1) 47.55.60.10", "2003/07/08", "France", "Local", "003-0002-0001", "user4@google.com"],
        [3, "4", "Mexico", "ANTON", "(5) 555-3932", "2001/04/08", "Mexico", "Head", "004-0000-0000", "user24@naver.com"],
        [3, "4.1", "Mexico D.F", "CENTC", "(5) 555-3392", "2001/04/08", "Mexico", "Middle", "004-0001-0000", "user14@naver.com"],
        [3, "4.1.1", "Pericles Comidas", "PERIC", "(5) 552-3745", "2003/07/08", "Mexico", "Local", "004-0001-0001", "user334@ekpas.com"],
        [4, "5", "Portugal", "FURIB", "(1) 354-2534", "2013/06/28", "Portugal", "Head", "005-0000-0000", "user4@naver.com"],
        [4, "5.1", "Lisboa", "PRINI", "(11) (1) 356-5634", "2003/07/08", "Portugal", "Middle", "005-0001-0000", "ersuser@naver.com"],
        [5, "6", "Spain", "BOLID", "(91) 555 22 82", "2011/06/11", "Spain", "Head", "006-0000-0000", "987user4@google.com"],
        [5, "6.1", "Madrid", "FISSA", "(91) 555 94 44", "2003/07/08", "Spain", "Middle", "006-0001-0000", "user4dy4@naver.com"],
        [5, "6.1.1", "Romero tomillo", "ROMEY", "(91) 745 6200", "2003/07/08", "Spain", "Local", "006-0001-0001", "user4587@korea.com"],
        [6, "7", "UK", "AROUT", "(171) 555-7788", "2009/01/01", "UK", "Head", "007-0000-0000", "user664@naver.com"],
        [6, "7.1", "London", "BSBEV", "(171) 555-1212", "2003/07/08", "UK", "Middle", "007-0001-0000", "user789@gmail.com"],
        [6, "7.1.1", "Eastern Connection", "EASTC", "(171) 555-0297", "38", "UK", "Local", "007-0001-0001", "udfeser4@naver.com"],
        [7, "8", "USA", "LONEP", "(503) 555-9573", "1993/08/08", "USA", "Head", "008-0000-0000", "user4@naver.com"],
        [7, "8.1", "Portland", "THEBI", "(503) 555-3612", "2003/07/08", "USA", "Middle", "008-0001-0000", "usfdaer4@naver.com"],
        [8, "9", "Venezuela", "HILAA", "(5) 555-1340", "2013/12/08", "Venezuela", "Head", "009-0000-0000", "usgderer4@naver.com"],
        [8, "9.1", "I.de Margarita", "LINOD", "(8) 34-56-12", "2003/07/08", "Venezuela", "Middle", "009-0001-0000", "usedsafr4@naver.com"]
    ];

    provider.setRows(rows, "tree", true, "", "icon");

    var count = provider.getRowCount();
    $("#loadResult").css("color", "green").text(count + " rows loaded.").show();
    treeMain.setFocus();
}

var tests = {
    expandAll: function () {
        treeMain.expandAll();
    },
    addChild: function () {
        var current = treeMain.getCurrent();
        var row = current.dataRow;

        //if (row >= 0) {
        var child = dataProvider.addChildRow(row, {
            col0: "col0",
            col1: "col1"
        }, 0);

        if (child >= 0) {
            treeMain.expand(treeMain.getItemIndex(row));
            current.itemIndex = treeMain.getItemIndex(child);
            treeMain.setCurrent(current);
            treeMain.setFocus();
        }
        //}
    },
    insertChild: function () {
        var current = treeMain.getCurrent();
        var row = current.dataRow;
        var child;

        if (row >= 0) {
            var parent = dataProvider.getParent(row);
            child = dataProvider.insertChildRow(parent, 0, {
                col0: "col0",
                col1: "col1"
            }, 0);
            if (child >= 0) {
                treeMain.expand(treeMain.getItemIndex(parent));
                current.itemIndex = treeMain.getItemIndex(child);
            }
        } else {
            child = dataProvider.insertChildRow(-1, 0, {
                col0: "col0",
                col1: "col1"
            }, 0);
            if (child >= 0) {
                treeMain.expand(treeMain.getItemIndex(row));
                current.itemIndex = treeMain.getItemIndex(child);
            }
        }

        treeMain.setCurrent(current);
        treeMain.setFocus();
    },
    addRows: function () {
        var current = treeMain.getCurrent();
        var row = current.dataRow;

        //if (row >= 0) {
        var child = dataProvider.addChildRow(row, {
            col0: "col0",
            col1: "col1"
        }, 0);
    },
    clearRows: function () {
        dataProvider.clearRows();
    },
    deleteRows: function () {
        treeMain.deleteSelection();
    },
    removeRow: function () {
        var current = treeMain.getCurrent();
        var row = current.dataRow;

        if (row >= 0) {
            dataProvider.removeRow(row);
        }
    },
    updateRow: function () {
        var current = treeMain.getCurrent();
        var row = current.dataRow;

        if (row >= 0) {
            var vals = dataProvider.getJsonRow(row);
            for (var p in vals) {
                if (p != "Col3" || p != "Col5") {
                    vals[p] = vals[p] + "_X";
                }
            }
            dataProvider.updateRow(row, vals);
        }
    },
    updateStrictRow: function () {
        var current = treeMain.getCurrent();
        var row = current.dataRow;

        if (row >= 0) {
            var vals = dataProvider.getJsonRow(row);
            vals["Col1"] = "XXX";
            vals["Col4"] = "YYY";
            vals["Col5"] = "ZZZ";
            dataProvider.updateStrictRow(row, vals);
        }
    },
    setValue: function () {
        var cur = treeMain.getCurrent();
        if (cur.dataRow >= 0) {
            dataProvider.setValue(cur.dataRow, 'col0', "XXXX");
        }
    },
    update: function () {
        dataProvider.beginUpdate();
        dataProvider.endUpdate();
    },
    setValues: function () {
        var cur = treeMain.getCurrent();
        treeMain.setValues(cur.itemIndex, {
            Col0: "1",
            Col1: "2",
            Col2: "3"
        });
    },
    getStateRows: function () {
        var rows = dataProvider.getStateRows("none");
        alert(rows);
        console.log(rows);
    },
    deleteSelection: function () {
        treeMain.deleteSelection(true);
    },
    setRowState: function () {
        var cur = treeMain.getCurrent();
        if (cur.dataRow >= 0) {
            dataProvider.setRowState(cur.dataRow, "updated");
        }
    }
};

function setTests(container, title) {
    if (title) document.title = "TreeGrid - " + title;
    createButtons(container, tests);
    createCheckBox(container, "insertable", null, true);
    createCheckBox(container, "deletable", null, true);
    createCheckBox(container, "updatable", null, true);
    createCheckBox(container, "checkBarVisible", function (e) {
        treeMain.setTreeOptions({
            checkBar: {
                visible: _getChecked(e)
            }
        })
    }, true);
    createCheckBox(container, "stateBarVisible", function (e) {
        treeMain.setTreeOptions({
            stateBar: {
                visible: _getChecked(e)
            }
        })
    }, true);
    /*
     createCheckBox(container, "visible", function (e) {
     treeMain.setCheckBar({ visible: _getChecked(e) });
     }, true);
    createListBox(container, "indicatorValue", ["none", "index", "row"], function (e) {
        treeMain.setIndicator({ displayValue: _getSelected(e) });
    }, "index");
    */
}