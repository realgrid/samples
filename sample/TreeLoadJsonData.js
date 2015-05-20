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

    setTests("actions", "TreeLoadJsonData");
});

function setFields(provider) {
    var fields = [{
        fieldName: "icon",
        dataType: "number"
    }, {
        fieldName: "Col0",
        dataType: "text"
    }, {
        fieldName: "Col1",
        dataType: "number"
    }, {
        fieldName: "Col2",
        dataType: "number"
    }, {
        fieldName: "Col3",
        dataType: "number"
    }, {
        fieldName: "Col4",
        dataType: "number"
    }, {
        fieldName: "Col5",
        dataType: "number"
    }, {
        fieldName: "Col6",
        dataType: "number"
    }, {
        fieldName: "Col7",
        dataType: "number"
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
            "text": "농림어업"
        }
    }, {
        "name": "col2",
        "fieldName": "col2",
        "type": "data",
        "width": "75",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "0,000"
        },
        "header": {
            "text": "광업"
        }
    }, {
        "name": "col3",
        "fieldName": "col3",
        "type": "data",
        "width": "75",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "0,000"
        },
        "header": {
            "text": "제조업"
        }
    }, {
        "name": "col4",
        "fieldName": "col4",
        "type": "data",
        "width": "80",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "0,000"
        },
        "header": {
            "text": "건설업"
        }
    }, {
        "name": "col5",
        "fieldName": "col5",
        "type": "data",
        "width": "130",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "0,000"
        },
        "header": {
            "text": "도소매, 소비자용품"
        }
    }, {
        "name": "col6",
        "fieldName": "col6",
        "type": "data",
        "width": "90",
        "styles": {
            "textAlignment": "far",
            "numberFormat": "0,000"
        },
        "header": {
            "text": "음식숙박업"
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
            "text": "운수,창고 통신업"
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
    tree.setTreeOptions({
        showCheckBox: true,
        stateBar: {
            visible: false
        },
        checkBar: {
            visible: false
        }
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
        url: "data/TreeViewJsonData.json?__time__=" + new Date().getTime(),
        success: function (data) {
            treeMain.hideToast();
            provider.fillJsonData(data, {
                rows: "rows",
                icon: "icon"
            });
        }
    });
}

var tests = {
    expandAll: function () {
        treeMain.expandAll();
    }
};

function setTests(container, title) {
    if (title) document.title = "TreeGrid - " + title;
    createButtons(container, tests);
    createCheckBox(container, "rowResizable", function (e) {
        treeMain.setDisplayOptions({rowResizable: _getChecked(e)});
    }, false);
}