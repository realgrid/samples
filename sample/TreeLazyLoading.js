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

    treeMain.setIndicator({
        displayValue: "row"
    });

    dataProvider.onRowCountChanged = function (provider, count) {
        $("#loadResult").css("color", "green").text(count + " rows loaded.").show();
    };
    treeMain.onTreeItemExpanding = function (tree, itemIndex, rowId) {
        // false를 리턴하면 펼쳐지지 않는다.
        // return false;

        // expanding 중인 행이 자식이 하나도 없다면 hasChildren이 설정된 행이다.
        // 자식들을 가져와 그 행에 추가한다.
        if (dataProvider.getChildCount(rowId) <= 0) {
            var values = dataProvider.getValues(rowId);
            var iconIndex = dataProvider.getIconIndex(rowId);

            for (var i = 0; i < 5; i++) {
                var childId = dataProvider.addChildRow(rowId, values, iconIndex, true);
                console.log(childId);
            }
        }

        return true;
    };

    setTests("actions", "TreeLazyLoading");
});

function setFields(provider) {
    var fields = [{
        "fieldName": "icon",
        "dataType": "text"
    }, {
        "fieldName": "hasChild",
        "dataType": "number"
    }, {
        "fieldName": "tree"
    }, {
        "fieldName": "Col0"
    }, {
        "fieldName": "Col1"
    }, {
        "fieldName": "Col2"
    }, {
        "fieldName": "Col3"
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
        "width": "60",
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
        "imageList": "images01",
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
}

function setStyles() {
}

function setSkin() {
    treeMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    var rows = [
        [0, 1, "1", "Argentina", "CACTU", "(1) 135-5555", "28", "Argentina", "Head", "001-0000-0000", "user1@naver.com"],
        [0, 1, "1.1", "Buenos Aires", "OCEAN", "(1) 135-5333", "25", "Argentina", "Middle", "001-0001-0000", "user3@googlei.com"],
        [1, 1, "2", "Brazil", "HANAR", "(21) 555-0091", "25", "Brazil", "Head", "002-0000-0000", "user2@naver.com"],
        [1, 1, "2.1", "Rio de Janeiro", "QUEDE", "(21) 555-4252", "38", "Brazil", "Middle", "002-0001-0000", "user4@google.com"],
        [1, 1, "2.2", "Sao Paulo", "FAMIA", "(11) 555-9857", "38", "Brazil", "Middle", "002-0002-0001", "user4@change.com"],
        [2, 1, "3", "France", "DUMON", "40.67.88.88", "38", "France", "Head", "003-0000-0000", "user4@naver.com"],
        [2, 1, "3.1", "Nantes", "FRANR", "40.32.21.21", "38", "France", "Middle", "003-0001-0000", "user4@pvick.com"],
        [2, 1, "3.2", "Paris", "PARIS", "(1) 42.34.22.66", "38", "France", "Middle", "003-0002-0000", "user64@naver.com"],
    ];

    provider.setRows(rows, "tree", true, "hasChild", "icon");

    var count = dataProvider.getRowCount();
    $("#loadResult").css("color", "green").text(count + " rows loaded.").show();
    treeMain.setFocus();
}

var tests = {
};

function setTests(container, title) {
    if (title) document.title = "TreeGrid - " + title;
    createButtons(container, tests);
}
