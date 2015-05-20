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
  setStyles(grdMain);

	loadData(dataProvider);
    
  setTests("actions", "ColumnCellMerging");
});

function setFields(provider) {
    var fields = [{
        fieldName: "FirstName"
    }, {
        fieldName: "LastName"
    }, {
        fieldName: "Company"
    }, {
        fieldName: "Address"
    }, {
        fieldName: "City"
    }, {
        fieldName: "County"
    }, {
        fieldName: "State"
    }, {
        fieldName: "ZIP"
    }, {
        fieldName: "Phone"
    }, {
        fieldName: "Fax"
    }, {
        fieldName: "Web"
    }];

    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        name: "colState",
        fieldName: "State",
        width: 60,
        mergeRule: { criteria: "value" },
        styles: { textAlignment: "center", background:"#08000000" }
    }, {
        fieldName: "County",
        width: 120,
        mergeRule: { criteria: "values['State'] + value" },
        styles: { textAlignment: "near", background: "#0800ff00" }
    }, {
        fieldName: "City",
        width: 120,
        mergeRule: { criteria: "values['State'] + values['County'] + value" },
        styles: { textAlignment: "near", background: "#080000ff" }
    }, {
        name: "colState",
        fieldName: "State",
        width: 60
    }, {
        fieldName: "County",
        width: 120
    }, {
        fieldName: "City",
        width: 120
    }, {
        fieldName: "FirstName",
        name: "colFirst",
        width: 100,
        header: { text: "First" },
        styles: { textAlignment: "near" }
    }, {
        fieldName: "LastName",
        width: 100,
        header: { text: "Last Name" },
        styles: { textAlignment: "near" }
    }, {
        fieldName: "Company",
        width: 150,
        header: { text: "Company" },
        styles: { textAlignment: "near" }
    }, {
        fieldName: "Address",
        width: 200,
        styles: { textAlignment: "near" }
    }, {
        fieldName: "Zip",
        width: 60,
        styles: { textAlignment: "near" }
    }, {
        fieldName: "Web",
        width: 100,
        styles: { textAlignment: "near" }
    }];

    grid.setColumns(columns);
}

function setOptions(grid) {
    grid.setOptions({
        panel: {
            visible: false
        },
        header: {
            height: 32
        },
        footer: {
            visible: false
        },
        checkBar: {
            visible: false
        },
        stateBar: {
            visible: false
        },
        sorting: {
            enabled: false,
            style: RealGridJS.SortStyle.INCLUSIVE,
            handleVisibility: "hidden"
        },
        select: {
            style: RealGridJS.SelectionStyle.BLOCK
        },
        fixed: {
            colCount: 0
        }
    });

    grid.orderBy(["State", "County", "City"]);
}

function setStyles() {
    grdMain.setStyles({
        selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    provider.setRows(Customers);
    var count = provider.getRowCount();
    $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
}

function lastNameCriteriaChange(e) {
    var column = grdMain.columnByField("LastName");
    var criteria = $(':radio[name="lastName"]:checked').val();
    column.mergeRule = {
        criteria: criteria
    };
    column.styles = {
        background:  criteria.indexOf("7") >= 0 ? "#11ff0000" : "#1100ff00"
    };
    grdMain.setColumn(column);
}

function btnRuleHandler(e) {
	var column = grdMain.columnByField("LastName");
	var criteria = "row div 7";
	  column.mergeRule = {
	  criteria: criteria
	};
	grdMain.setColumn(column);
}

var tests = {
	setFixed: function () {
		grdMain.setFixedOptions({
			colCount: 2
		});
	},
    excel: function () {
        grdMain.exportGrid({
            type:'excel',
            target:'local'
        });
    },
    getStyles: function () {
        var styles = grdMain.getColumnProperty("colState", "styles");
        console && console.log(JSON.stringify(styles));
        alert(JSON.stringify(styles));
    },
    setStyles: function () {
        grdMain.setColumnProperty("colState", "styles", { lineAlignment:"far" });
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
