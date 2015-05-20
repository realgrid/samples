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

    setTests("actions", "TreeDataModel");

    treeMain.onTreeItemExpanding = function (tree, itemIndex, rowId) {
        return _getChecked("expandable");
    }
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
        "dataType": "number"
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
}

function setColumns(tree) {
    var columns = [{
        "name": "col0",
        "fieldName": "col0",
        "width": "200",
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
        "width": "60",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Year"
        },
        "footer": {
            "expression": "sum",
            "styles": {
                "textAlignment": "far"
            }
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
        expanderWithCellStyles: true,
        iconImages: images.getName(),
        iconWidth: 20
    });
};

function setOptions(tree) {
    tree.setOptions({
        summaryMode: "aggregate",
        stateBar: {
            visible: false
        }
    });

    tree.addCellStyle("style01", {
        background: "#cc6600",
        foreground: "#ffffff"
    });
}

function setStyles() {
}

function setSkin() {
    treeMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    var rows = [
        [0, "1", "Argentina", "CACTU", "(1) 135-5555", "28", "Argentina", "Head", "001-0000-0000", "user1@naver.com"],
        [0, "1.1", "Buenos Aires", "OCEAN", "(1) 135-5333", "25", "Argentina", "Middle", "001-0001-0000", "user3@googlei.com"],
        [0, "1.1.1", "Rancho grande", "RANCH", "(1) 123-5555", "21", "Argentina", "Local", "001-0001-0001", "user6@yahoo.com"],
        [0, "1.1.2", "Atheha grande", "PTNCH", "(1) 123-4578", "28", "Argentina", "Local", "001-0001-0002", "user6@korea.com"],
        [0, "1.2", "Buenos Aires 2", "OCEAN", "(1) 135-5333", "25", "Argentina", "Middle", "001-0001-0000", "user3@googlei.com"],
        [0, "1.2.1", "Rancho grande 2", "RANCH", "(1) 123-5555", "21", "Argentina", "Local", "001-0001-0001", "user6@yahoo.com"],
        [0, "1.2.2", "Atheha grande 2", "PTNCH", "(1) 123-4578", "28", "Argentina", "Local", "001-0001-0002", "user6@korea.com"],
        [1, "2", "Brazil", "HANAR", "(21) 555-0091", "25", "Brazil", "Head", "002-0000-0000", "user2@naver.com"],
        [1, "2.1", "Rio de Janeiro", "QUEDE", "(21) 555-4252", "38", "Brazil", "Middle", "002-0001-0000", "user4@google.com"],
        [1, "2.2", "Sao Paulo", "FAMIA", "(11) 555-9857", "38", "Brazil", "Middle", "002-0002-0001", "user4@change.com"],
        [1, "2.2.1", "Queen Cozinha", "QUEEN", "(11) 555-1189", "38", "Brazil", "Local", "001-0002-0002", "user4@paulo.com"],
        [2, "3", "France", "DUMON", "40.67.88.88", "38", "France", "Head", "003-0000-0000", "user4@naver.com"],
        [2, "3.1", "Nantes", "FRANR", "40.32.21.21", "38", "France", "Middle", "003-0001-0000", "user4@pvick.com"],
        [2, "3.2", "Paris", "PARIS", "(1) 42.34.22.66", "38", "France", "Middle", "003-0002-0000", "user64@naver.com"],
        [2, "3.2.1", "du monde", "SPECD", "(1) 47.55.60.10", "38", "France", "Local", "003-0002-0001", "user4@google.com"],
        [3, "4", "Mexico", "ANTON", "(5) 555-3932", "38", "Mexico", "Head", "004-0000-0000", "user24@naver.com"],
        [3, "4.1", "Mexico D.F", "CENTC", "(5) 555-3392", "38", "Mexico", "Middle", "004-0001-0000", "user14@naver.com"],
        [3, "4.1.1", "Pericles Comidas", "PERIC", "(5) 552-3745", "38", "Mexico", "Local", "004-0001-0001", "user334@ekpas.com"],
        [4, "5", "Portugal", "FURIB", "(1) 354-2534", "38", "Portugal", "Head", "005-0000-0000", "user4@naver.com"],
        [4, "5.1", "Lisboa", "PRINI", "(11) (1) 356-5634", "38", "Portugal", "Middle", "005-0001-0000", "ersuser@naver.com"],
        [5, "6", "Spain", "BOLID", "(91) 555 22 82", "38", "Spain", "Head", "006-0000-0000", "987user4@google.com"],
        [5, "6.1", "Madrid", "FISSA", "(91) 555 94 44", "38", "Spain", "Middle", "006-0001-0000", "user4dy4@naver.com"],
        [5, "6.1.1", "Romero tomillo", "ROMEY", "(91) 745 6200", "38", "Spain", "Local", "006-0001-0001", "user4587@korea.com"],
        [6, "7", "UK", "AROUT", "(171) 555-7788", "38", "UK", "Head", "007-0000-0000", "user664@naver.com"],
        [6, "7.1", "London", "BSBEV", "(171) 555-1212", "38", "UK", "Middle", "007-0001-0000", "user789@gmail.com"],
        [6, "7.1.1", "Eastern Connection", "EASTC", "(171) 555-0297", "38", "UK", "Local", "007-0001-0001", "udfeser4@naver.com"],
        [7, "8", "USA", "LONEP", "(503) 555-9573", "38", "USA", "Head", "008-0000-0000", "user4@naver.com"],
        [7, "8.1", "Portland", "THEBI", "(503) 555-3612", "38", "USA", "Middle", "008-0001-0000", "usfdaer4@naver.com"],
        [8, "9", "Venezuela", "HILAA", "(5) 555-1340", "38", "Venezuela", "Head", "009-0000-0000", "usgderer4@naver.com"],
        [8, "9.1", "I.de Margarita", "LINOD", "(8) 34-56-12", "38", "Venezuela", "Middle", "009-0001-0000", "usedsafr4@naver.com"]
    ];

    dataProvider.setRows(rows, "tree", true, "", "icon");

    var count = dataProvider.getRowCount();
    $("#loadResult").css("color", "green").text(count + " rows loaded.").show();
    treeMain.setFocus();
}

var tests = {
    getChildCount: function () {
        var rowId;
        var isRoot = _getChecked("root");

        if (isRoot) {
            rowId = -1;
        } else {
            var curr = treeMain.getCurrent();
            if (curr.itemIndex < 0) {
                alert('자식들을 가져올 부모 행을 선택하십시오.');
                return;
            }

            rowId = curr.dataRow;
        }
        var rows = dataProvider.getChildCount(rowId);
        alert(rows + " Childs");
    },
    getChildren: function () {
        var rowId, curr;
        var isRoot = _getChecked("root");

        if (isRoot) {
            rowId = -1;
        } else {
            curr = treeMain.getCurrent();
            if (curr.itemIndex < 0) {
                alert('자식들을 가져올 부모 행을 선택하십시오.');
                return;
            }

            rowId = curr.dataRow;
        }
        var rows = dataProvider.getChildren(rowId);

        // 자식 행들을 구분해서 표시한다.
        treeMain.clearCellStyles();
        treeMain.setCellStyles(rows, -1, "style01");
        if (!isRoot) {
            treeMain.expand(curr.itemIndex);
        }
    },
    getDescendantCount: function () {
        var rowId;
        var isRoot = _getChecked("root");

        if (isRoot) {
            rowId = -1;
        } else {
            var curr = treeMain.getCurrent();
            if (curr.itemIndex < 0) {
                alert('자식들을 가져올 부모 행을 선택하십시오.');
                return;
            }

            rowId = curr.dataRow;
        }
        var rows = dataProvider.getDescendantCount(rowId);
        alert(rows + " Childs");
    },
    getDescendants: function () {
        var rowId, curr;
        var isRoot = _getChecked("root");

        if (isRoot) {
            rowId = -1;
        } else {
            curr = treeMain.getCurrent();
            if (curr.itemIndex < 0) {
                alert('자식들을 가져올 부모 행을 선택하십시오.');
                return;
            }

            rowId = curr.dataRow;
        }
        var rows = dataProvider.getDescendants(rowId);

        // 자식 행들을 구분해서 표시한다.
        treeMain.clearCellStyles();
        treeMain.setCellStyles(rows, -1, "style01");
        if (isRoot) {
            treeMain.expandAll();
        } else {
            treeMain.expand(curr.itemIndex, true);
        }
    },
    getAncestors: function () {
        var curr = treeMain.getCurrent();
        if (curr.itemIndex < 0) {
            alert('조상들을 가져올 행을 선택하십시오.');
            return;
        }

        var rowId = curr.dataRow;
        var rows = dataProvider.getAncestors(rowId);

        console.log("Ancestors: " + rows);

        // 자손 행들을 구분해서 표시한다.
        treeMain.clearCellStyles();
        treeMain.setCellStyles(rows, -1, "style01");
    },
    expand: function () {
        var curr = treeMain.getCurrent();
        if (curr.itemIndex < 0) {
            alert('행을 선택하십시오.');
            return;
        }

        var itemIndex = curr.itemIndex;
        var recursive = _getChecked("recursive");
        treeMain.expand(itemIndex, recursive);
    },
    collapse: function () {
        var curr = treeMain.getCurrent();
        if (curr.itemIndex < 0) {
            alert('행을 선택하십시오.');
            return;
        }

        var itemIndex = curr.itemIndex;
        var recursive = _getChecked("recursive");
        treeMain.collapse(itemIndex, recursive);
    },
    expandAll: function () {
        treeMain.expandAll(1);
    },
    collapseAll: function () {
        treeMain.collapseAll();
    },
    clearRows: function () {
        dataProvider.clearRows();
    },
    getValues: function () {
        var curr = treeMain.getCurrent();
        if (curr.dataRow >= 0) {
            var values = dataProvider.getValues(curr.dataRow);
            console.log(JSON.stringify(values));
            alert(JSON.stringify(values));
        }
    },
    getJsonRow: function () {
        var curr = treeMain.getCurrent();
        if (curr.dataRow >= 0) {
            var row = dataProvider.getJsonRow(curr.dataRow);
            console.log(JSON.stringify(row));
            alert(JSON.stringify(row));
        }
    }
};

function setTests(container, title) {
    if (title) document.title = "TreeGrid - " + title;
    createButtons(container, tests);
    createCheckBox(container, "root", null, false);
    createListBox(container, "indicatorValue", ["none", "index", "row"], function (e) {
        treeMain.setIndicator({ displayValue: _getSelected(e) });
    }, "index");
    createCheckBox(container, "recursive", null, false);
    createCheckBox(container, "expandable", null, true);
}