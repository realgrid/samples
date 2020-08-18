var grdMain, dataProvider;
var realGridJsLic = 'upVcPE+wPOksRHztag2HLt+UVTCvO3is+83EYTz6U/sTXJR8Yw8Y0WXyjOMqbrgvr3+iyFPC2UvIbpdiuDhvbSHjHCDcCwXA0aVPjzT4Z9Q5MpDMyxlokKh7O7IL45Q/NQv5eRtXoqpb/8h86IWwapmQNXlT5dB6SpvdvcqGtl9Y4XlPo9n8Dqy98bE0bgIZ+6ZGVxDxR7Q=';

$(document).ready(function() {
    $("html, body").css({
        width : "100%",
        height : "100%"
    });
    $("#grdMain").css({
        width : "98%",
        height : "95%"
    });
    RealGridJS.setRootContext("../lib");
    
    dataProvider = new RealGridJS.LocalDataProvider();
    grdMain = new RealGridJS.GridView("grdMain");
    grdMain.setDataSource(dataProvider);

    setFields(dataProvider);
    loadData(dataProvider);
    setColumns(grdMain);
    setOptions(grdMain, dataProvider);
    
    grdMain.setStyles(generalBlueSkin);
    
    //cfnOrientationGrid(grdMain);
    grdMain.setEditorOptions({applyCellFont:true})
    
    setMobileOptions();
});

function setFields(provider) {
    var fields = [{
        fieldName : "OrderID"
    }, {
        fieldName : "CustomerID"
    }, {
        fieldName : "EmployeeID"
    }, {
        fieldName : "OrderDate",
        dataType : "datetime",
        datetimeFormat: "yyyy.MM.dd"
    }, {
        fieldName : "CompanyName"
    }, {
        fieldName: "Quantity",
        dataType: "number"
    }, {
        fieldName: "field1",
        dataType: "number"
    }, {
        fieldName: "field2",
        dataType: "number"
    }];

    provider.setFields(fields);
}

function setColumns(grid) {
    var values = dataProvider.getDistinctValues("CustomerID");
    var labels = [];
    for(var i = 0; i < values.length; i++){
        labels.push("<" + values[i] + ">")
    }

    var columns = [{
        name : "OrderID",
        fieldName : "OrderID",
        type : "data",
        width : 90*2,
        editable: true,
        styles : {
            textAlignment : "text",
            font: "Consolas"
        },
        header : {
            text : "Text editor"
        }
    }, {
        name : "OrderID1",
        fieldName : "OrderID",
        type : "data",
        width : 90*2,
        editable: false,
        styles : {
            textAlignment : "text",
            font: "Consolas"
        },
        header : {
            text : "Text editor 1"
        }
    }, {
        name : "CustomerID",
        fieldName : "CustomerID",
        width : 130*2,
        lookupDisplay: true,
        values: values,
        labels: labels,
        editor: {
            type: "dropDown",
            dropDownCount: 4
        },
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "DropDown Edit"
        }
    }, {
        name : "OrderDate",
        fieldName : "OrderDate",
        width : 130*2,
        editor: {
            type: "date",
            datetimeFormat: "yyyy.MM.dd"
        },
        styles: {
            textAlignment: "center",
            datetimeFormat: "yyyy.MM.dd"
        },
        header : {
            text : "Date Edit"
        }
    }, {
        name : "CompanyName",
        fieldName : "CompanyName",
        width : 100*2,
        editor: {
            type: "multiline",
            textCase: "upper"
        },
        styles: {
            textAlignment: "near",
            textWrap: "normal"
        },
        header: {
            text: "Multiline Edit"
        }
    }, {
        fieldName: "field1",
        name: "column1",
        editor: { editFormat: "#,##0.00;.;,;f" },
        styles: { numberFormat: "#,##0.00;.;,;f" },

    }, {
        fieldName: "field2",
        name: "column2",
        editor: { editFormat: "#,##0.00;.;,;f" },
        styles: { numberFormat: "#,##0.00;.;,;f" },
        editable: false
    }, {
        nam: "Quantity",
        fieldName: "Quantity",
        width: 100*2,
        editor: {
            type: "number",
            textAlignment: "far",
            editFormat: "#,##0.##",
            multipleChar: "+"
        },
        styles: {
            textAlignment: "far",
            numberFormat: "#,##0.##"
        },
        header: {
            text: "Number Edit"
        }

    }];

    grid.setColumns(columns);
}

function setOptions(grid, provider) {
    grid.setOptions({
        display: {
            fitStyle : "even"
        }
    });
    provider.setOptions({
        datetimeFormat : "yyyy-MM-dd a hh:mm:ss",
        amText : "오전",
        pmText : "오후"
    });
}

function loadData(provider) {
    provider.fillJsonData(mobileData);
}

function fnRdoChange(e){
    var style = this.value;
    grdMain.orderBy([]);
    grdMain.setSortingOptions({style : style});
}

function setMobileOptions() {   
    grdMain.setEditOptions({editable: true})
    grdMain.setMobileOptions({
        longTapDuration: 300,
        doubleTapInterval: 300
    })
}