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
  setStyles();

	loadData(dataProvider);

    /*
    grdMain.onCellEdited = function (grid, itemIndex, dataRow, field) {
        if (field == 2) { // 2 == "Age"
            var v = grid.getValue(itemIndex, field);
            grid.setValue(itemIndex, 6, "<" + v + ">"); // 6 == "AgeLabel"
        }
    };
    dataProvider.onRowInserting = function (provider, row) {
        var itemIndex = grdMain.getItemIndex(row);
        var v = grdMain.getValue(itemIndex, 2); // 2 == "Age"
        grdMain.setValue(itemIndex, 6, "<" + v + ">"); // 6 == "AgeLabel"
    };
    */

  setTests("actions", "ColumnLookup");
});
 
function setFields(provider) {
    var fields = [{
        "fieldName": "UserId"
    }, {
        "fieldName": "UserName"
    }, {
        "fieldName": "Age"
    }, {
        "fieldName": "Gender"
    }, {
        "fieldName": "MobilePhone"
    }, {
        "fieldName": "Email"
    }, {
        "fieldName": "AgeLabel"
    }];
 
    provider.setFields(fields);
}
 
function setColumns(grid) {
    var columns = [{
        "name": "UserId",
        "fieldName": "UserId",
        "width": "90",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "User ID"
        }
    }, {
        "name": "UserName",
        "fieldName": "UserName",
        "type": "data",
        "width": "150",
        "sortable": false,
        "lookupDisplay": true,
        "values": ["VINET", "HANAR", "SUPRD", "VICTE", "THREE", "SEVEN"],
        "labels": ["<VINET>", "<HANAR>", "<SUPRD>", "<VICTE>", "<THREE>", "<SEVEN>"],
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Values/Labels",
            "styles": {
                "background": "linear,#22ffd500,#ffffd500,90"
            }
        }
    }, {
        "name": "Age",
        "fieldName": "Age",
        "type": "data",
        "width": "180",
        "lookupDisplay": true,
        "labelField": "AgeLabel",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Label Field",
            "styles": {
                "background": "linear,#22ffd500,#ffffd500,90"
            }
        }
    }, {
        "name": "Gender",
        "fieldName": "Gender",
        "type": "data",
        "width": "100",
        "sortable": false,
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Gender"
        }
    }, {
        "name": "MobilePhone",
        "fieldName": "MobilePhone",
        "width": "200",
        "styles": {
            "textAlignment": "near"
        },
        "header": {
            "text": "Mobile Phone"
        }
    }, {
        "name": "Email",
        "fieldName": "Email",
        "type": "data",
        "width": "100",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Email"
        }
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        edit: {
            insertable: true,
            appendable: true,
            updatable: true,
            checkDiff: true
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function setStyles() {
    grdMain.setStyles({
        body: {
            "font-size": "12"
        }
    });
}

function loadData(provider) {
    var rows = [
        ["user1", "HANAR", "28", "Male", "001-0002-0001", "user1@gmail.com", "<28>"],
        ["user3", "HANAR", "25", "Male", "001-0002-0003", "user3@gmail.com", "<25>"],
        ["user6", "HANAR", "21", "Female", "001-0002-0006", "user6@gmail.com", "<21>"],
        ["user2", "VICTE", "25", "Male", "001-0002-0002", "user2@gmail.com", "<25>"],
        ["user4", "VICTE", "38", "Male", "001-0002-0004", "user4@gmail.com", "<38>"],
        ["user5", "THREE", "55", "Male", "001-0002-0005", "user5@gmail.com", "<55>"],
        ["user7", "SEVEN", "44", "Female", "001-0002-0007", "user7@gmail.com", "<44>"],
        ["user8", "SEVEN", "33", "Female", "001-0002-0008", "user8@gmail.com", "<33>"],
        ["user9", "SEVEN", "55", "Male", "001-0002-0009", "user9@gmail.com", "<55>"],
        ["user10", "VINET", "65", "Male", "001-0002-0010", "user10@gmail.com", "<65>"],
        ["user11", "VINET", "29", "Female", "001-0002-0011", "user11@gmail.com", "<29>"],
        ["user12", "HANAR", "18", "Female", "001-0002-0012", "user12@gmail.com", "<18>"],
        ["user13", "SUPRD", "52", "Male", "001-0002-0013", "user13@gmail.com", "<52>"],
        ["user14", "SUPRD", "61", "Male", "001-0002-0014", "user14@gmail.com", "<61>"],
        ["user15", "SUPRD", "26", "Female", "001-0002-0015", "user15@gmail.com", "<26>"],
        ["user16", "THREE", "46", "Male", "001-0002-0016", "user16@gmail.com", "<46>"],
        ["user17", "THREE", "26", "Female", "001-0002-0015", "user15@gmail.com", "<26>"],
        ["user18", "THREE", "46", "Male", "001-0002-0016", "user16@gmail.com", "<46>"],
        ["user19", "VINET", "26", "Female", "001-0002-0015", "user15@gmail.com", "<26>"],
        ["user20", "VINET", "46", "Male", "001-0002-0016", "user16@gmail.com", "<46>"],
        ["user21", "VINET", "64", "Male", "001-0002-0017", "user17@gmail.com", "<64>"]
    ];
    dataProvider.setRows(rows);
    //$("#loadResult").css("color", "green").text(rows.length + " rows loaded.").show();
    grdMain.setFocus();
}

var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    },
    setLabelValues: function () {
        var col = grdMain.columnByName("UserName");
        if (col) {
            var values = ["VINET", "HANAR", "SUPRD", "VICTE", "THREE", "SEVEN"];
            var labels = ["1", "2", "3", "4", "5", "6"]
            col.values = values;
            col.labels = labels;
            grdMain.setColumn(col);
        }
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
