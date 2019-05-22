var grdMain, dataProvider;

window.onload = function () {
    console.log("==> RealGrid loaded.");

    var columns2 = [{
        "name": "group1",
        "type": "group",
        "width": 550,
        "header": { "visible": false },
        "orientation": "vertical",
        "columns": [{            
        "name": "group11",
        "type": "group",
        "width": 480,
        "header": { "visible": false },
        "columns": [{
            "fieldName": "userid",
            "name": "userid",
            "width": 80,
            "header": { "text": "사용자 Id" },
            "styles": { "textAlignment": "near", "font": "Tahoma" }
        }, {
            "fieldName": "company",
            "name": "company",
            "width": 80,
            "header": { "text": "회사" },
            "styles": { "textAlignment": "near", "font": "Tahoma" }
        }, {
            "fieldName": "first_name",
            "name": "first_name",
            "width": 80,
            "header": { "text": "이름" },
            "styles": { "textAlignment": "near", "font": "Tahoma" }
        }, {
            "fieldName": "last_name",
            "name": "last_name",
            "width": 80,
            "header": { "text": "성" },
            "styles": { "textAlignment": "near", "font": "Tahoma" }
        }, {
            "fieldName": "gender",
            "name": "gender",
            "width": 80,
            "header": { "text": "성별" },
            "styles": { "textAlignment": "center", "font": "Tahoma" }
        }, {
            "fieldName": "email",
            "name": "email",
            "width": 80,
            "header": { "text": "E-Mail" },
            "styles": { "textAlignment": "near", "font": "Tahoma" }
        }]
        }, {
            "name": "group12",
            "type": "group",
            "width": 480,
            "header": { "visible": false },
            "columns": [{
                "fieldName": "city",
                "name": "city",
                "width": 80,
                "header": { "text": "시" },
                "styles": { "textAlignment": "near", "font": "Tahoma" }             
            }, {
                "fieldName": "ip_address",
                "name": "ip_address",
                "width": 80,
                "header": { "text": "IP Address" },
                "styles": { "textAlignment": "near", "font": "Tahoma" }
            }, {
                "fieldName": "birthday",
                "name": "birthday",
                "width": 80,
                "header": { "text": "생년월일" },
                "styles": {
                    "textAlignment": "center",
                    "font": "Tahoma",
                    "datetimeFormat": "yyyy/MM/dd"
                }
            }, {
                "fieldName": "pay",
                "name": "pay",
                "width": 80,
                "header": { "text": "급여" },
                "editor": {
                    "type": "number"
                },
                "styles": {
                    "textAlignment": "far", 
                    "font": "Tahoma"
                }           
            }, {
                "fieldName": "card_number",
                "name": "card_number",
                "width": 80,
                "header": { "text": "신용카드" },
                "styles": { "textAlignment": "near", "font": "Tahoma" }
            }, {
                "fieldName": "card_type",
                "name": "card_type",
                "width": 80,
                "header": { "text": "카드종류" },
                "styles": { "textAlignment": "near", "font": "Tahoma" }
            }]
        }]
    }];

    var columns3 = [{
        "name": "group1",
        "type": "group",
        "width": 240,
        "header": { "visible": false },
        "orientation": "vertical",
        "columns": [{
            "name": "group21",
            "type": "group",
            "width": 240,
            "header": { "visible": false },
            "columns": [{
                "fieldName": "userid",
                "name": "userid",
                "width": 80,
                "header": { "text": "사용자 Id" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }, {
                "fieldName": "company",
                "name": "company",
                "width": 80,
                "header": { "text": "회사" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }, {
                "fieldName": "first_name",
                "name": "first_name",
                "width": 80,
                "header": { "text": "이름" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }],
        }, {
            "name": "group22",
            "type": "group",
            "width": 240,
            "header": { "visible": false },
            "columns": [{
                "fieldName": "last_name",
                "name": "last_name",
                "width": 80,
                "header": { "text": "성" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }, {
                "fieldName": "gender",
                "name": "gender",
                "width": 80,
                "header": { "text": "성별" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }, {
                "fieldName": "email",
                "name": "email",
                "width": 80,
                "header": { "text": "E-Mail" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }]
        }, {
            "name": "group23",
            "type": "group",
            "width": 480,
            "header": { "visible": false },
            "columns": [{
                "fieldName": "city",
                "name": "city",
                "width": 80,
                "header": { "text": "시" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }               
            }, {
                "fieldName": "ip_address",
                "name": "ip_address",
                "width": 80,
                "header": { "text": "IP Address" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }, {
                "fieldName": "birthday",
                "name": "birthday",
                "width": 80,
                "header": { "text": "생년월일" },
                "styles": {
                    "textAlignment": "center",
                    "font": "Tahoma",
                    "datetimeFormat": "yyyy/MM/dd"
                }
            }]
        }, {
            "name": "group24",
            "type": "group",
            "width": 480,
            "header": { "visible": false },
            "columns": [{
                "fieldName": "pay",
                "name": "pay",
                "width": 80,
                "header": { "text": "급여" },
                "editor": {
                    "type": "number"
                },
                "styles": {
                    "textAlignment": "center",  
                    "font": "Tahoma"
                }           
            }, {
                "fieldName": "card_number",
                "name": "card_number",
                "width": 80,
                "header": { "text": "신용카드" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }, {
                "fieldName": "card_type",
                "name": "card_type",
                "width": 80,    
                "header": { "text": "카드종류" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
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

    grdMain.linearizeColumns();
        
    loadData(dataProvider);

    var width = $("#realgrid").width();

    if (width > 1000) {
        grdMain.linearizeColumns();
    } else if (width > 600) { 
        grdMain.setColumns(columns2);
    } else {
        grdMain.setColumns(columns3);
    }

    $(window).resize(function () {
        var width = $("#realgrid").width();

        if (width > 1000) {
            grdMain.linearizeColumns();
        } else if (width > 600) { 
            grdMain.setColumns(columns2);
        } else {
            grdMain.setColumns(columns3);
        }
    });
};

function setFields(provider) {
    var fields = [{
        "fieldName": "id"
    }, {
        "fieldName": "userid"
    }, {
        "fieldName": "company"
    }, {
        "fieldName": "first_name"
    }, {
        "fieldName": "last_name"
    }, {
        "fieldName": "gender"
    }, {
        "fieldName": "email"
    }, {
        "fieldName": "city"
    }, {
        "fieldName": "ip_address"
    }, {
        "fieldName": "birthday"
    }, {
        "fieldName": "pay",
        "dataType": "number"
    }, {
        "fieldName": "card_number"
    }, {
        "fieldName": "card_type"
    }]      
    provider.setFields(fields);
};

function setColumns(grid) {

    var columns = [{
        "name": "group1",
        "type": "group",
        "width": 240,
        "header": { "visible": false },
        "orientation": "vertical",
        "columns": [{
            "name": "group21",
            "type": "group",
            "width": 240,
            "header": { "visible": false },
            "columns": [{
                "fieldName": "userid",
                "name": "userid",
                "width": 80,
                "header": { "text": "사용자 Id" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }, {
                "fieldName": "company",
                "name": "company",
                "width": 80,
                "header": { "text": "회사" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }, {
                "fieldName": "first_name",
                "name": "first_name",
                "width": 80,
                "header": { "text": "이름" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }],
        }, {
            "name": "group22",
            "type": "group",
            "width": 240,
            "header": { "visible": false },
            "columns": [{
                "fieldName": "last_name",
                "name": "last_name",
                "width": 80,
                "header": { "text": "성" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }, {
                "fieldName": "gender",
                "name": "gender",
                "width": 80,
                "header": { "text": "성별" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }, {
                "fieldName": "email",
                "name": "email",
                "width": 80,
                "header": { "text": "E-Mail" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }]
        }, {
            "name": "group23",
            "type": "group",
            "width": 480,
            "header": { "visible": false },
            "columns": [{
                "fieldName": "city",
                "name": "city",
                "width": 80,
                "header": { "text": "시" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }               
            }, {
                "fieldName": "ip_address",
                "name": "ip_address",
                "width": 80,
                "header": { "text": "IP Address" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }, {
                "fieldName": "birthday",
                "name": "birthday",
                "width": 80,
                "header": { "text": "생년월일" },
                "styles": {
                    "textAlignment": "center",
                    "font": "Tahoma",
                    "datetimeFormat": "yyyy/MM/dd"
                }
            }]
        }, {
            "name": "group24",
            "type": "group",
            "width": 480,
            "header": { "visible": false },
            "columns": [{
                "fieldName": "pay",
                "name": "pay",
                "width": 80,
                "header": { "text": "급여" },
                "editor": {
                    "type": "number"
                },
                "styles": {
                    "textAlignment": "center",  
                    "font": "Tahoma"
                }           
            }, {
                "fieldName": "card_number",
                "name": "card_number",
                "width": 80,
                "header": { "text": "신용카드" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
            }, {
                "fieldName": "card_type",
                "name": "card_type",
                "width": 80,
                "header": { "text": "카드종류" },
                "styles": { "textAlignment": "center", "font": "Tahoma" }
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
            visible: true
        },
        display: {
            fitStyle: "even"
        }
    });
}


function loadData(provider) {

    $.ajax({
        url: "/demo/data/regularExpressionData.json?__time__=" + new Date().getTime(),
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