var dataProvider;
var grdMain;
RealGridJS.setRootContext("../lib");

$(document).ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
  setFields(dataProvider);

  grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);
	prepareResources(grdMain);
	setColumns(grdMain);
	setOptions(grdMain);
  setSkin();
  setStyles(grdMain);

	loadData(dataProvider);
    
  setTests("actions", "BooleanField");
});

function setFields(provider) {
    var fields = [{
        "fieldName": "Values"
    }, {
        "fieldName": "Boolean1",
        "dataType": "boolean",
        "booleanFormat": "False,N,0:True,Y,1:0",
        "nullValue": undefined
    }, {
        "fieldName": "Boolean2",
        "dataType": "boolean",
        "booleanFormat": "True,N,0:False,Y,1:1"
    }, {
        "fieldName": "Boolean3",
        "dataType": "boolean",
        "booleanFormat": "False,0:True,1:0"
    }, {
        "fieldName": "Boolean4",
        "dataType": "boolean",
        "booleanFormat": "True,Y,1:False,N,0:0"
    }, {
        "fieldName": "Boolean5",
        "dataType": "boolean",
        "booleanFormat": "False,N,1:True,Y,0:1"
    }];

    provider.setFields(fields);
}

function loadData(provider) {
	var rows = [
        ["False, False, False, False, False, False", "False", "False", "False", "False", "False"],
        ["True, True, True, True, True, True", "True", "True", "True", "True", "True"],
        ["N, N, N, N, N, N", "N", "N", "N", "N", "N"],
        ["Y, Y, Y, Y, Y, Y", "Y", "Y", "Y", "Y", "Y"],
        ["false, false, false, false, false, false", "false", "false", "false", "false", "false"],
        ["true, true, true, true, true, true", "true", "true", "true", "true", "true"],
        ["n, N, n, n, n, n", "n", "N", "n", "n", "n"],
        ["y, Y, y, y, y, y", "y", "Y", "y", "y", "y"],
        ["1, 1, 1, 1, 0, 1", "1", "1", "1", "1", "1"],
        ["'', 'false', false, 'f', 0", "", "false", false, "f", 0]
    ];
	provider.setRows(rows);
}

function prepareResources(grid) {
}

function setColumns(grid) {
    var columns = [{
        "name": "Values",
        "fieldName": "Values",
        "width": "200",
        "ignoreDefaultDynamicStyles": true,
        "header": {
            "text": "Values"
        },
        "styles": {
            "textAlignment": "near"
        }
    }, {
        "fieldName": "Boolean1",
        "width": "120",
        "header": {
            "text": "Boolean 1"
        },
        "editor": {
            "booleanFormat": "거짓,f,false:참,t,true:0",
            "emptyValue": false
        },
        "styles": {
            "booleanFormat": "거짓:참"
        }
   }, {
        "name": "FieldLoadCase",
        "fieldName": "Boolean2",
        "width": "100",
        "header": {
            "text": "Boolean 2"
        },
        "editor": {
            "booleanFormat": "Falsity,False,f,false:Truth,True,t,true:1"
        },
        "styles": {
            "booleanFormat": "Falsity:Truth:False"
        }
    }, {
        "name": "RenderingTest",
        "fieldName": "Boolean3",
        "width": "120",
        "header": {
            "text": "Boolenan 3"
        },
        "editor": {
            "booleanFormat": "0,f,false:1,t,true:0"
        },
        "styles": {
            "booleanFormat": "0:1"
        }
    }, {
        "name": "EditorTest",
        "fieldName": "Boolean4",
        "width": "120",
        "header": {
            "text": "Boolean 4"
        },
        "editor": {
            "booleanFormat": "No,f,false:Yes,t,true:0"
        },
        "styles": {
            "booleanFormat": "No:Yes"
        }
    }, {
        "name": "Boolean5",
        "fieldName": "Boolean5",
        "width": "100",
        "header": {
            "text": "Boolean 5"
        },
        "editor": {
            "booleanFormat": "Male,f,false:Female,t,true:0"
        },
        "styles": {
            "booleanFormat": "Male:Female"
        }
    }];

	grid.setColumns(columns);
}

function setOptions(grid) {
	grid.setOptions({
		display: {
			rowResizable: true,
			rowHeight: 25
		}
	});
	grid.setFixedOptions({
		colCount: 0
	});
}

function setStyles() {
    grdMain.setStyles({
    	body: {
            cellDynamicStyles: [{
                "criteria": "value",
                "styles": "background=#228991ff"
            }]
        },
    	selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

var tests = {
    setTrue: function () {
        var curr = grdMain.getCurrent();
        if (curr.dataRow >= 0 && curr.fieldIndex >= 0) {
            dataProvider.setValue(curr.dataRow, curr.fieldIndex, true);
        }
    },
    setFalse: function () {
        var curr = grdMain.getCurrent();
        if (curr.dataRow >= 0 && curr.fieldIndex >= 0) {
            dataProvider.setValue(curr.dataRow, curr.fieldIndex, false);
        }
    },
    setUndefined: function () {
        var curr = grdMain.getCurrent();
        if (curr.dataRow >= 0 && curr.fieldIndex >= 0) {
            dataProvider.setValue(curr.dataRow, curr.fieldIndex, undefined);
        }
    },
    copyOptions: function () {
        //var opts = grdMain.getCopyOptions();
        //grdMain.setCopyOptions(opts);
        grdMain.setCopyOptions({
            singleMode: true
        });
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}

