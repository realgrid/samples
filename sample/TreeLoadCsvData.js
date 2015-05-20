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

    setTests("actions", "TreeLoadCsvData");
});

function setFields(provider) {
    var fields = [{
        fieldName: "icon",
        dataType: "number"
    }, {
        fieldName: "tree",
        dataType: "text"
    }, {
        fieldName: "Col0",
        dataType: "text"
    }, {
        fieldName: "Col1",
        dataType: "text"
    }, {
        fieldName: "Col2",
        dataType: "text"
    }, {
        fieldName: "Col3",
        dataType: "text"
    }, {
        fieldName: "Col4",
        dataType: "text"
    }, {
        fieldName: "Col5",
        dataType: "text"
    }, {
        fieldName: "Col6",
        dataType: "text"
    }, {
        fieldName: "Col7",
        dataType: "text"
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
        expanderWithCellStyles: true,
        iconImages: images.getName(),
        iconWidth: 20
    });
};

function setOptions(tree) {
}

function setStyles() {
}

function setSkin(skinId) {
    treeMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    treeMain.showToast("Load data...");
    $.ajax({
        url: "data/TreeViewCsvData.txt?__time__=" + new Date().getTime(),
        success: function (data) {
            treeMain.hideToast();
            provider.fillCsvData(data, {
                tree: "tree",
                icon: "icon",
                quoted: true,
                start: 1
            });
        }
    });
}

var tests = {
};

function setTests(container, title) {
    if (title) document.title = "TreeGrid - " + title;
    createButtons(container, tests);
}