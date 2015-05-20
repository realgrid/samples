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
  createImageList(grdMain);
    
	loadData(dataProvider);

  grdMain.onLinkableCellClicked = function (grid, index, url) {
      console.log("onLinkableCellClicked: " + JSON.stringify(index) + " => " + url);
      window.open(url, '_newtab');
  };
  
  setTests("actions", "LinkCellRenderer");
});
 
function setFields(provider) {
    var fields = [{
        "fieldName": "OrderID",
        "dataType": "text"
    }, {
        "fieldName": "CustomerID"
    }, {
        "fieldName": "EmployeeID"
    }, {
        "fieldName": "OrderDate",
        "dataType": "datetime",
        "dateFormat": "yyyy-MM-dd a hh:mm:ss",
        "amText": "오전",
        "pmText": "오후"
    }, {
        "fieldName": "CompanyName"
    }, {
        "fieldName": "Country"
    }, {
        "fieldName": "Phone"
    }, {
        "fieldName": "NormalFlag"
    }, {
        "fieldName": "SmallFlag"
    }, {
        "fieldName": "ProductName"
    }, {
        "fieldName": "QuantityPerUnit"
    }, {
        "fieldName": "Quantity",
        "dataType": "number"
    }, {
        "fieldName": "UnitPrice",
        "dataType": "number"
    }];
 
    provider.setFields(fields);
}
 
function setColumns(grid) {
    var iconStyles = [{
        "criteria": "value='France'",
        "styles": "iconIndex=7"
    }, {
        "criteria": "value='USA'",
        "styles": "iconIndex=19"
    }, {
        "criteria": "value='Germany'",
        "styles": "iconIndex=8"
    }, {
        "criteria": "value='Brazil'",
        "styles": "iconIndex=3"
    }, {
        "criteria": "value='Belgium'",
        "styles": "iconIndex=2"
    }];

    var iconStyles2 = [{
        "criteria": "value='France'",
        "styles": {
            "iconIndex": 7,
            "iconLocation": "left"
        }
    }, {
        "styles": {
            "iconIndex": 19,
            "iconLocation": "right"
        }
    }, {
        "criteria": "value='Germany'",
        "styles": {
            "iconIndex": 8,
            "iconLocation": "left"
        }
    }, {
        "criteria": "value='Brazil'",
        "styles": {
            "iconIndex": 3,
            "iconLocation": "right"
        }
    }, {
        "criteria": "value='Belgium'",
        "styles": {
            "iconIndex": 2,
            "iconLocation": "left"
        }
    }];

    var columns = [{
        "name": "OrderID",
        "fieldName": "OrderID",
        "width": "40",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "ID"
        }
    }, {
        "name": "Country",
        "fieldName": "Country",
        "width": "100",
        "imageList": "images1",
        "renderer": {
            "type": "link",
            "url": "http://www.countryreports.org/country/${Country}.htm",
            "requiredFields": "Country",
            "showUrl": false
        },
        "dynamicStyles": iconStyles,
        "styles": {
            "textAlignment": "near",
            "iconIndex": 0,
            "iconLocation": "left",
            "iconAlignment": "center",
            "iconOffset": 4,
            "iconPadding": 4
        },
        "editor": {
            "type": "dropdown",
            "values": ["France", "USA", "Germany", "Brazil", "Belgium"]//,
            //"labels": ["France", "USA", "Germany", "Brazil", "Belgium"]
        },
        "header": {
            "text": "IconLocation.LEFT"
        }
    }, {
        "name": "Country",
        "fieldName": "Country",
        "width": "100",
        "imageList": "images1",
        "renderer": {
            "type": "link",
            "requiredFields": "Country",
            "url": "http://www.countryreports.org/country/${Country}.htm"
        },
        "dynamicStyles": iconStyles,
        "styles": {
            "textAlignment": "near",
            "iconIndex": 0,
            "iconLocation": "right",
            "iconAlignment": "center",
            "iconOffset": 4,
            "iconPadding": 4
        },
        "header": {
            "text": "IconLocation.\r\nRIGHT"
        }
    }, {
        "name": "Country",
        "fieldName": "Country",
        "width": "100",
        "imageList": "images1",
        "renderer": {
            "type": "link",
            "requiredFields": "Country",
            "url": "http://www.countryreports.org/country/${Country}.htm"
        },
        "dynamicStyles": iconStyles,
        "styles": {
            "textAlignment": "center",
            "iconIndex": 0,
            "iconLocation": "top",
            "iconAlignment": "center",
            "iconOffset": 2,
            "iconPadding": 1
        },
        "header": {
            "text": "IconLocation.\r\nTOP"
        }
    }, {
        "name": "Country",
        "fieldName": "Country",
        "width": "100",
        "imageList": "images1",
        "renderer": {
            "type": "link",
            "requiredFields": "Country",
            "url": "http://www.countryreports.org/country/${Country}.htm"
        },
        "dynamicStyles": iconStyles,
        "styles": {
            "textAlignment": "center",
            "iconIndex": 0,
            "iconLocation": "bottom",
            "iconAlignment": "center",
            "iconOffset": 2,
            "iconPadding": 1
        },
        "header": {
            "text": "IconLocation.\r\nBOTTOM"
        }
    }, {
        "name": "Country",
        "fieldName": "Country",
        "width": "100",
        "imageList": "images1",
        "renderer": {
            "type": "link",
            "requiredFields": "Country",
            "url": "http://www.countryreports.org/country/${Country}.htm"
        },
        "dynamicStyles": iconStyles,
        "styles": {
            "iconIndex": 0,
            "iconLocation": "center"
        },
        "header": {
            "text": "IconLocation.\r\nCENTER"
        }
    }, {
        "name": "Country",
        "fieldName": "Country",
        "width": "120",
        "imageList": "images1",
        "renderer": {
            "type": "link",
            "requiredFields": "Country",
            "url": "http://www.countryreports.org/country/${Country}.htm",
            "textVisible": false
        },
        "dynamicStyles": iconStyles2,
        "styles": {
            "iconIndex": 0,
            "iconLocation": "left",
            "iconAlignment": "center",
            "iconOffset": 2
        },
        "header": {
            "text": "textVisible = false"
        }
    }, {
        "name": "CustomerID",
        "fieldName": "CustomerID",
        "width": "100",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Customer ID"
        }
    }, {
        "name": "CompanyName",
        "fieldName": "CompanyName",
        "width": "200",
        "styles": {
            "textAlignment": "far"
        },
        "renderer": {
            "type": "link",
            "showUrl": false,
            "requiredFields": "CompanyName",
            "url": "https://www.google.co.kr/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#newwindow=1&q=${CompanyName}"
        },
        "header": {
            "text": "Company Name"
        }
    }, {
        "name": "EmployeeID",
        "fieldName": "EmployeeID",
        "width": "100",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Employee ID"
        }
    }, {
        "name": "OrderDate",
        "fieldName": "OrderDate",
        "width": "130",
        "styles": {
            "textAlignment": "center"
        },
        "header": {
            "text": "Order Date"
        }
    }, {
        "name": "Quantity",
        "fieldName": "Quantity",
        "width": "100",
        "styles": {
            "textAlignment": "far"
        },
        "header": {
            "text": "Quantity"
        }
    }, {
        "name": "UnitPrice",
        "fieldName": "UnitPrice",
        "width": "100",
        "styles": {
            "textAlignment": "far"
        },
        "header": {
            "text": "Unit Price"
        }
    }];
 
    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        display: {
            rowHeight: 40
        },
        header: {
            minHeight: 30
        },
        footer: {
            visible: false
        },
        checkBar: {
            visible: false
        },
        stateBar: {
            visible: false
        }
    });
}
 
function createImageList(grid) {
    var imgs = new RealGridJS.ImageList("images1", "img/demo/smallflag/");
    imgs.addUrls([
        "ar.png",
        "at.png",
        "be.png",
        "br.png",
        "ca.png",
        "dk.png",
        "fi.png",
        "fr.png",
        "de.png",
        "ie.png",
        "it.png",
        "mx.png",
        "no.png",
        "pl.png",
        "pt.png",
        "es.png",
        "se.png",
        "ch.png",
        "gb.png",
        "us.png",
        "ve.png"
    ]);
 
    grid.registerImageList(imgs);
};
 
function setStyles() {
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
    provider.setRows(CustomerOrders);
    var count = provider.getRowCount();
    $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
/*  
    $.ajaxSetup({ cache: false });
 
    var params = {
        CustomerId: ""
    };
 
    $.getJSON("http://demo.realgrid.net/Demo/GetCustomOrders", params, function (data) {
        provider.setRows(data);
        var count = provider.getRowCount();
        $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
    })
    .done(function () {
        grdMain.setFocus();
    })
    .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console && console.log("jQuery getJSON() Failed: " + err);
        alert("jQuery getJSON() Failed: " + err);
    });
*/    
}

var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
