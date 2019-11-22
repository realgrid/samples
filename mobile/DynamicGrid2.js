var grdMain, dataProvider;
var doit;

window.onload = function () {
    console.log("==> RealGrid loaded.");

    var columns2 = [{
        name: "group1",
        type: "group",
        width: 550,
        header: { visible: false},
        orientation: "vertical",
        columns: [{
            name: "column1",
            fieldName: "field1",
            header: {text: "조회기간"},
            width: 550,
            styles: {
                textAlignment: "near"
            }
        },{
            name: "group2",
            type: "group",
            header: {visible: false},
            orientation: "horizontal",
            columns: [{
                name: "group21",
                type: "group",
                width: 100,
                header: {text: "분류"},
                hideChildHeaders: true,
                orientation: "vertical",
                columns: [{
                    name: "column2",
                    fieldName: "field2",
                    styles: {
                        textAlignment: "center"
                    }
                },{
                    name: "column3",
                    fieldName: "field3",
                    styles: {
                        textAlignment: "center"
                    }
                }]
            },{
                name: "group22",
                type: "group",
                width: 100,
                header: {text: "총거래차수"},
                hideChildHeaders: true,
                orientation: "vertical",
                columns: [{
                    name: "column4",
                    fieldName: "field4",
                    styles: {
                        textAlignment: "far"
                    }
                },{
                    name: "column5",
                    fieldName: "field5",
                    styles: {
                        textAlignment: "far"
                    }
                }]
            },{
                name: "group23",
                type: "group",
                width: 100,
                header: {text: "총곱급가액"},
                hideChildHeaders: true,
                orientation: "vertical",
                columns: [{
                    name: "column6",
                    fieldName: "field6",
                    styles: {
                        textAlignment: "far"
                    }
                },{
                    name: "column7",
                    fieldName: "field7",
                    styles: {
                        textAlignment: "far"
                    }
                }]
            },{
                name: "group24",
                type: "group",
                width: 100,
                header: {text: "총매수"},
                hideChildHeaders: true,
                orientation: "vertical",
                columns: [{
                    name: "column8",
                    fieldName: "field8",
                    styles: {
                        textAlignment: "far"
                    }
                },{
                    name: "column9",
                    fieldName: "field9",
                    styles: {
                        textAlignment: "far"
                    }
                }]
            },{
                name: "group25",
                type: "group",
                width: 100,
                header: {text: "총세액"},
                hideChildHeaders: true,
                orientation: "vertical",
                columns: [{
                    name: "column10",
                    fieldName: "field10",
                    styles: {
                        textAlignment: "far"
                    }
                },{
                    name: "column11",
                    fieldName: "field11",
                    styles: {
                        textAlignment: "far"
                    }
                }]
            }]
        }]
    }];

    var columns3 = [{
        name: "group1",
        type: "group",
        width: 240,
        header: { visible: false},
        orientation: "vertical",
        columns: [{
            name: "column1",
            fieldName: "field1",
            header: {text: "조회기간"},
            width: 240,
            styles: {
                textAlignment: "near"
            }
        },{
            name: "group2",
            type: "group",
            header: {visible: false},
            orientation: "horizontal",
            columns: [{
                name: "group21",
                type: "group",
                width: 80,
                header: {text: "분류"},
                hideChildHeaders: true,
                orientation: "vertical",
                columns: [{
                    name: "column2",
                    fieldName: "field2",
                    styles: {
                        textAlignment: "center"
                    }
                },{
                    name: "column3",
                    fieldName: "field3",
                    styles: {
                        textAlignment: "center"
                    }
                }]
            },{
                name: "group2",
                type: "group",
                header: {visible: false},
                orientation: "vertical",
                columns: [{
                    name: "group22",
                    type: "group",
                    width: 80,
                    header: {text: "총거래차수"},
                    hideChildHeaders: true,
                    orientation: "vertical",
                    columns: [{
                        name: "column4",
                        fieldName: "field4",
                    styles: {
                        textAlignment: "far"
                    }
                    },{
                        name: "column8",
                        fieldName: "field8",
                    styles: {
                        textAlignment: "far"
                    }
                    }]
                },{
                    name: "group24",
                    type: "group",
                    width: 80,
                    header: {text: "총매수"},
                    hideChildHeaders: true,
                    orientation: "vertical",
                    columns: [{
                        name: "column5",
                        fieldName: "field5",
                    styles: {
                        textAlignment: "far"
                    }
                    },{
                        name: "column9",
                        fieldName: "field9",
                    styles: {
                        textAlignment: "far"
                    }
                    }]
                }]
            },{
                name: "group2",
                type: "group",
                header: {visible: false},
                orientation: "vertical",
                columns: [{
                    name: "group23",
                    type: "group",
                    width: 80,
                    header: {text: "총곱급가액"},
                    hideChildHeaders: true,
                    orientation: "vertical",
                    columns: [{
                        name: "column6",
                        fieldName: "field6",
                    styles: {
                        textAlignment: "far"
                    }
                    },{
                        name: "column10",
                        fieldName: "field10",
                    styles: {
                        textAlignment: "far"
                    }
                    }]
                },{
                    name: "group25",
                    type: "group",
                    width: 80,
                    header: {text: "총세액"},
                    hideChildHeaders: true,
                    orientation: "vertical",
                    columns: [{
                        name: "column7",
                        fieldName: "field7",
                    styles: {
                        textAlignment: "far"
                    }
                    },{
                        name: "column11",
                        fieldName: "field11",
                    styles: {
                        textAlignment: "far"
                    }
                    }]
                }]
            }]
        }]
    }];

    RealGridJS.setRootContext("../lib");
    dataProvider = new RealGridJS.LocalDataProvider();
    grdMain = new RealGridJS.GridView("realgrid");
    grdMain.setDataSource(dataProvider);

    setFields(dataProvider);
    setColumns(grdMain);
    setOptions(grdMain);

    //grdMain.linearizeColumns();
        
    loadData(dataProvider);

    var width = $("#realgrid").width();

    if (width > 1000) {
        //grdMain.linearizeColumns();
    } else if (width > 600) { 
        grdMain.setColumns(columns2);
    } else {
        grdMain.setColumns(columns3);
    }
/*
    $(window).resize(function () {
        var width = $("#realgrid").width();

        if (width > 1000) {
            //grdMain.linearizeColumns();
        } else if (width > 600) { 
            grdMain.setColumns(columns2);
        } else {
            grdMain.setColumns(columns3);
        }
    });
*/

    function resizedw(appwidth){
        var window_changed = $(window).width() != appwidth;
        if ($(window).width() != appwidth){
            ("body").append("did it"+appwidth+" ");
        }
        past_width = $(window).width();
    }

    var past_width = $(window).width();
    window.onresize = function() {
        clearTimeout(doit);
        doit = setTimeout(function() {
            resizedw(past_width);
            alert("브라우저 사이즈 변경");
            var width = $("#realgrid").width();

            if (width > 1000) {
                //grdMain.linearizeColumns();
            } else if (width > 600) { 
                //grdMain.setColumns(columns2);
            } else {
                //grdMain.setColumns(columns3);
            }
        }, 100);
    };
};

function setFields(provider) {
    var fields = [{
        fieldName: "field1"
    },{
        fieldName: "field2"
    },{
        fieldName: "field3"
    },{
        fieldName: "field4"
    },{
        fieldName: "field5"
    },{
        fieldName: "field6"
    },{
        fieldName: "field7"
    },{
        fieldName: "field8"
    },{
        fieldName: "field9"
    },{
        fieldName: "field10"
    },{
        fieldName: "field11"
    }]      
    provider.setFields(fields);
};

function setColumns(grid) {

    var columns = [{
        name: "group1",
        type: "group",
        width: 550,
        header: { visible: false},
        orientation: "vertical",
        columns: [{
            name: "column1",
            fieldName: "field1",
            header: {text: "조회기간"},
            width: 550,
            styles: {
                textAlignment: "near"
            }
        },{
            name: "group2",
            type: "group",
            header: {visible: false},
            orientation: "horizontal",
            columns: [{
                name: "group21",
                type: "group",
                width: 100,
                header: {text: "분류"},
                hideChildHeaders: true,
                orientation: "vertical",
                columns: [{
                    name: "column2",
                    fieldName: "field2",
                    styles: {
                        textAlignment: "center"
                    }
                },{
                    name: "column3",
                    fieldName: "field3",
                    styles: {
                        textAlignment: "center"
                    }
                }]
            },{
                name: "group22",
                type: "group",
                width: 100,
                header: {text: "총거래차수"},
                hideChildHeaders: true,
                orientation: "vertical",
                columns: [{
                    name: "column4",
                    fieldName: "field4",
                    styles: {
                        textAlignment: "far"
                    }
                },{
                    name: "column5",
                    fieldName: "field5",
                    styles: {
                        textAlignment: "far"
                    }
                }]
            },{
                name: "group23",
                type: "group",
                width: 100,
                header: {text: "총곱급가액"},
                hideChildHeaders: true,
                orientation: "vertical",
                columns: [{
                    name: "column6",
                    fieldName: "field6",
                    styles: {
                        textAlignment: "far"
                    }
                },{
                    name: "column7",
                    fieldName: "field7",
                    styles: {
                        textAlignment: "far"
                    }
                }]
            },{
                name: "group24",
                type: "group",
                width: 100,
                header: {text: "총매수"},
                hideChildHeaders: true,
                orientation: "vertical",
                columns: [{
                    name: "column8",
                    fieldName: "field8",
                    styles: {
                        textAlignment: "far"
                    }
                },{
                    name: "column9",
                    fieldName: "field9",
                    styles: {
                        textAlignment: "far"
                    }
                }]
            },{
                name: "group25",
                type: "group",
                width: 100,
                header: {text: "총세액"},
                hideChildHeaders: true,
                orientation: "vertical",
                columns: [{
                    name: "column10",
                    fieldName: "field10",
                    styles: {
                        textAlignment: "far"
                    }
                },{
                    name: "column11",
                    fieldName: "field11",
                    styles: {
                        textAlignment: "far"
                    }
                }]
            }]
        }]
    }];

    grid.setColumns(columns);
}       
        

function setOptions(grid) {
    grid.setOptions({
        stateBar: {
            visible: false
        },
        checkBar: {
            visible: false
        },
        select: {
            style: RealGridJS.SelectionStyle.ROWS
        },
        footer: {
            visible: false
        },
        display: {
            fitStyle: "even"
        },
        resizeDelay:1000000
    });
}


function loadData(provider) {

    $.ajax({
        url: "/demo/data/dynamicGrid2_data.json?__time__=" + new Date().getTime(),
        success: function (data) {
            dataProvider.fillJsonData(data, {});
        },
        error: function (xhr, status, error) {
        },
        complete: function (data) {
            grdMain.setFocus();
        },
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            //Download progress
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    grdMain.setProgress(0, evt.total, evt.loaded);
                }
            }, false);
            return xhr;
        }
    });
}