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

    setTests("actions", "TreeLoadXmlData");
});

function setFields(provider) {
    var fields = [{
        "fieldName": "icon",
        "dataType": "number"
    }, {
        "fieldName": "Col0",
        "dataType": "text",
        "length": "50"
    }, {
        "fieldName": "Col1",
        "dataType": "number"
    }, {
        "fieldName": "Col2",
        "dataType": "number"
    }, {
        "fieldName": "Col3",
        "dataType": "number"
    }, {
        "fieldName": "Col4",
        "dataType": "number"
    }, {
        "fieldName": "Col5",
        "dataType": "number"
    }, {
        "fieldName": "Col6",
        "dataType": "number"
    }, {
        "fieldName": "Col7",
        "dataType": "number"
    }];

    provider.setFields(fields);
}

function setColumns(tree) {
    var columns = [{
        "name": "col0",
        "fieldName": "col0",
        "type": "data",
        "width": "150",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "구분"
        }
    }, {
        "name": "col1",
        "fieldName": "col1",
        "type": "data",
        "width": "80",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "0,000"
        },
        "header": {
            "text": "전문가"
        }
    }, {
        "name": "col2",
        "fieldName": "col2",
        "type": "data",
        "width": "120",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "0,000"
        },
        "header": {
            "text": "기술공·준전문가"
        }
    }, {
        "name": "col3",
        "fieldName": "col3",
        "type": "data",
        "width": "70",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "0,000"
        },
        "header": {
            "text": "사무직"
        }
    }, {
        "name": "col4",
        "fieldName": "col4",
        "type": "data",
        "width": "100",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "0,000"
        },
        "header": {
            "text": "서비스판매"
        }
    }, {
        "name": "col5",
        "fieldName": "col5",
        "type": "data",
        "width": "100",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "0,000"
        },
        "header": {
            "text": "농림·어업직"
        }
    }, {
        "name": "col6",
        "fieldName": "col6",
        "type": "data",
        "width": "70",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "0,000"
        },
        "header": {
            "text": "기능원"
        }
    }, {
        "name": "col7",
        "fieldName": "col7",
        "type": "data",
        "width": "120",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "0,000"
        },
        "header": {
            "text": "장치기계조작원"
        }
    }];

    tree.setColumns(columns);
}

function setImageList(tree) {
    var images = new RealGridJS.ImageList("images01", "img/demo/smallflag/");
    images.addUrls(["icon_male.png", "icon_female.png", "ar.png", "at.png", "be.png", "br.png", "ca.png", "dk.png", "fi.png", "fr.png", "de.png"]);
    tree.registerImageList(images);

    tree.setTreeOptions({
        expanderWithCellStyles: true,
        iconImages: images.getName()//,
        //iconWidth: 20
    });
};

function setOptions(tree) {
    tree.setDisplayOptions({
        rowResizable: true
    });
}

function setStyles() {
}

function setSkin(skinId) {
    treeMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    treeMain.showToast("Load data...");
    $.ajax({
        url: "data/TreeViewXmlData.xml?__time__=" + new Date().getTime(),
        success: function (data) {
            treeMain.hideToast();
            provider.fillXmlData(data, {
                rows: "row",
                icon: "icon"
            });

            var count = provider.getRowCount();
            $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
            treeMain.setFocus();
        }
    });
}

var tests = {
};

function setTests(container, title) {
    if (title) document.title = "TreeGrid - " + title;
    createButtons(container, tests);
}