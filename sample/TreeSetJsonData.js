var treeMain;
var dataProvider;
var _rows;
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

    setTests("actions", "TreeSetJsonData");

    treeMain.onEditCommit = function (grid, id, index, oldValue, newValue) {
        treeMain.commit(true);
    };
});

function setFields(provider) {
    provider.setOptions({
        restoreMode: "auto"
    });

    var fields = [{
        "fieldName": "icon",
        "dataType": "numeric"
    }, {
        "fieldName": "Col0",
        "dataType": "text",
        "length": "50"
    }, {
        "fieldName": "Col1",
        "dataType": "numeric"
    }, {
        "fieldName": "Col2",
        "dataType": "numeric"
    }, {
        "fieldName": "Col3",
        "dataType": "numeric"
    }, {
        "fieldName": "Col4",
        "dataType": "numeric"
    }, {
        "fieldName": "Col5",
        "dataType": "numeric"
    }, {
        "fieldName": "Col6",
        "dataType": "numeric"
    }, {
        "fieldName": "Col7",
        "dataType": "numeric"
    }];

    provider.setFields(fields);
}

function setColumns(tree) {
    var columns = [{
        "name": "col0",
        "fieldName": "col0",
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
        iconImages: images.getName()//,
        //iconWidth: 20
    });
};

function setOptions(tree) {
    tree.setTreeOptions({
        showCheckBox: true,
        stateBar: {
            visible: true
        },
        checkBar: {
            visible: false
        },
        indicator: {
            displayValue: "row"
        }
    });
}

function setStyles() {
    treeMain.setStyles({
        selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
}

function setSkin(skinId) {
    treeMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    $.ajaxSetup({ cache: false });

    $.getJSON("data/TreeViewJsonData.json", null, function (data) {
        provider.setJsonRows(data, "rows", "", "icon");
    })
    .done(function () {
        var count = dataProvider.getRowCount();
        $("#loadResult").css("color", "green").text(count + " rows loaded.").show();
        treeMain.setFocus();
    })
    .fail(function (jqxhr, textStatus, error) {
        var err = "TreeViewJsonData request failed: " + textStatus + ', ' + error;
        $("#loadResult").css("color", "red").text("Load failed: " + err).show();
        console.log(err);
        alert(err);
    });
}

var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    },
    getDistincts: function () {
        var values = dataProvider.getDistinctValues("col0");
        console.log("########### DISTINCT VALS: " + values.length);
        console.log(values);
    },
    getValue: function () {
        var curr = treeMain.getCurrent();
        var val = dataProvider.getValue(curr.dataRow, curr.fieldIndex);
        alert(JSON.stringify(val));
    },
    setValue: function () {
        var curr = treeMain.getCurrent();
        var val = dataProvider.getValue(curr.dataRow, curr.fieldIndex);
        dataProvider.setValue(curr.dataRow, curr.fieldIndex, val + "_2");
    },
    getValues: function () {
        var curr = treeMain.getCurrent();
        var values = treeMain.getValues(curr.itemIndex);
        alert(JSON.stringify(values));
    },
    getParent: function () {
        var curr = treeMain.getCurrent();
        alert(treeMain.getParent(curr.itemIndex));
    },
    getParentRow: function () {
        var curr = treeMain.getCurrent();
        alert(dataProvider.getParent(curr.dataRow));
    },
    getChildren: function () {
        var curr = treeMain.getCurrent();
        alert(treeMain.getChildren(curr.itemIndex));
    },
    getDescendants:function () {
        var curr = treeMain.getCurrent();
        alert(treeMain.getDescendants(curr.itemIndex));
    },
    getAncestors:function () {
        var curr = treeMain.getCurrent();
        alert(treeMain.getAncestors(curr.itemIndex));
    },
    getDescendantRows: function () {
        var curr = treeMain.getCurrent();
        alert(dataProvider.getDescendants(curr.dataRow, 2));
    },
    removeRows: function () {
        var rows = [4, 5, 6];
        dataProvider.removeRows(rows);
    },
    getJsonRows: function () {
        _rows = dataProvider.getJsonRows(-1, true, "", "icon");
        console.log(JSON.stringify(_rows));
    },
    getJsonChildRows: function () {
        var curr = treeMain.getCurrent();
        if (curr.dataRow >= 0) {
            var rows = dataProvider.getJsonRows(curr.dataRow, true);
            console.log(JSON.stringify(rows));
        } else {
            console.log(null);
        }
    },
    clearRows: function () {
        dataProvider.clearRows();
    },
    setJsonRows: function () {
        //dataProvider.setJsonRows(_rows);
        dataProvider.setJsonRows2(_rows, "", "rows", "", "icon");
    },
    cancel: function () {
        treeMain.cancel();
    },
    commit: function () {
        treeMain.commit();
    },
    save2: function () {
        var curr = treeMain.getCurrent();
        if (curr.dataRow >= 0) {
            var val = dataProvider.getValue(curr.dataRow, curr.fieldIndex);
            dataProvider.setValue(curr.dataRow, curr.fieldIndex, val + 100);
        }
    },
    save3: function () {
        var curr = treeMain.getCurrent();
        if (curr.dataRow >= 0) {
            var val = dataProvider.getValue(curr.dataRow, curr.fieldIndex);
            dataProvider.setValue(curr.dataRow, curr.fieldIndex, val - 100);
        }
    },
    restoreUpdates: function () {
        dataProvider.restoreUpdatedRows();
    },
    restoreUpdate: function () {
        var curr = treeMain.getCurrent();
        if (curr.dataRow >= 0) {
            dataProvider.restoreUpdatedRows(curr.dataRow);
        }
    },
    clearRowStates: function () {
        dataProvider.clearRowStates();
    }
};

function setTests(container, title) {
    if (title) document.title = "TreeGrid - " + title;
    createButtons(container, tests);
}
