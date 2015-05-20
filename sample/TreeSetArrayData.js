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
    setStyles(treeMain);

    loadData(dataProvider);

    setTests("actions", "TreeSetArrayData");
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
        edit: {
            deletable: true
        }
    })
}

function setStyles(tree) {
    tree.setStyles({
        body: {
            dynamicStyles: [{
                criteria: "count = 0",
                styles: "background=#1100ff00"
            }]
        }
    });
}

function setSkin() {
    treeMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    var rows2 = [
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

    var rows = [{
        icon: 0, tree: "1", Col0: "Argentina", Col1: "CACTU", Col2: "(1) 135-5555", Col3: "1998/01/01", Col4: "Argentina", Col5: "Head", Col6: "001-0000-0000", Col7: "user1@naver.com"
    }, {
        icon: 0, tree: "1.1", Col0: "Buenos Aires", Col1: "OCEAN", Col2: "(1) 135-5333", Col3: "2014/02/05", Col4: "Argentina", Col5: "Middle", Col6: "001-0001-0000", Col7: "user3@googlei.com"
    }, {
        icon: 0, tree: "2", Col0: "Brazil", Col1: "HANAR", Col2: "(21) 555-0091", Col3: "1999/02/05", Col4: "Brazil", Col5: "Head", Col6: "002-0000-0000", Col7: "user2@naver.com"
    }];

    provider.setRows(rows, "tree", true, "", "icon");

    var count = provider.getRowCount();
    $("#loadResult").css("color", "green").text(count + " rows loaded.").show();
    treeMain.setFocus();
}

var tests = {
    removeRow: function () {
        var curr = treeMain.getCurrent();
        if (curr.dataRow >= 0) {
            dataProvider.removeRow(curr.dataRow);
        }
    },
    deleteSelection: function () {
        treeMain.deleteSelection(true);
    }
};

function setTests(container, title) {
    if (title) document.title = "TreeGrid - " + title;
    createButtons(container, tests);
    /*
    createCheckBox(container, "root", null, false);
    createListBox(container, "indicatorValue", ["none", "index", "row"], function (e) {
        treeMain.setIndicator({ displayValue: _getSelected(e) });
    }, "index");
    createCheckBox(container, "recursive", null, false);
    */
}