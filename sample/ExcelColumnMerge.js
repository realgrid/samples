var grdMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

$(document).ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
  dataProvider.setOptions({
      dateFormat: "yyyy-MM-dd a hh:mm:ss",
      amText: "오전",
      pmText: "오후"
  });
  setFields(dataProvider);

  grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);
	
	setColumns(grdMain);
	setOptions(grdMain);
  setSkin();
  setStyles(grdMain);

	loadData(dataProvider);
    
  setTests("actions", "Export - ColumnMerge");
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
        fieldName: "State",
        width: 60,
        mergeRule: { criteria: "value" },
        styles: {
            textAlignment: "center",
            background: "#11ff0000"
        }
    }, {
        fieldName: "County",
        width: 120,
        mergeRule: { criteria: "value" },
        styles: {
            textAlignment: "near",
            background: "#1100ff00"
        }
    }, {
        fieldName: "City",
        width: 120,
        mergeRule: { criteria: "value" },
        styles: {
            textAlignment: "near",
            background: "#110000ff"
        }
    }, {
        fieldName: "FirstName",
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
        styles: { textAlignment: "center" }
    }, {
        fieldName: "Web",
        width: 200,
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
            style: RealGridJS.SelectionStyle.ROWS
        }
    });

    grid.orderBy(["State", "County", "City"]);
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}
 
function setStyles() {
    grdMain.setStyles({
        selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
}
 
function loadData(provider) {
    grdMain.showToast("Load data...", true);
    console.log("############ START: " + RealGridJS.getTimer());
    $.ajax({
        type: "GET",
        url: "data/sample-500.csv?__time__=" + new Date().getTime(),
        dataType: 'text',
        success: function (data) {
            console.log("############ LOADED: " + RealGridJS.getTimer());
            grdMain.hideToast();
            dataProvider.fillCsvData(data, {
                quoted: true,
                start: 1
            });
            console.log("############ FINISHED: " + RealGridJS.getTimer());
            var count = provider.getRowCount();
            $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
        },
        error: function(xhr, status, error) {
            var err = xhr + ', ' + status + ', ' + error;
            console.log("jQuery getJSON() Failed: " + err);
            $("#loadResult").css("color", "red").text("jQuery getJSON() Failed: " + err).show();
            alert("jQuery getJSON() Failed: " + err);
        },
        complete: function (data) {
            grdMain.hideToast();
        }
    });
}
 
var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    },
    "Save to Local": function () {
        grdMain.exportGrid({
            target: "local"
        });
    },
    "Upload to Server": function () {
        grdMain.exportGrid({
            url:  "http://demo.realgrid.net/Demo/ExcelXBin?__time__=" + new Date().getTime()
        });
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
    createButtons(container, tests);
    /*
	createCheckBox(container, "allItems", function (e) {
	}, true);
	*/

}
