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

  setDataCellStyles(grdMain);
	loadData(dataProvider);

  grdMain.onCurrentChanged = function (grid, newIndex) {
      console.log("### C U R: " + JSON.stringify(newIndex));
  };

  setTests("actions", "DataCellStyle Rows");
});
 
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
    }];
    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        "fieldName": "id",
        "width": 40,
        "header": { "text": "No" },
        "styles": { "textAlignment": "center", "font": "Tahoma" }
    }, {
        "fieldName": "userid",
        "width": 80,
        "header": { "text": "사용자 Id" },
        "styles": { "textAlignment": "near", "font": "Tahoma" }
    }, {
        "fieldName": "company",
        "width": 100,
        "header": { "text": "회사" },
        "styles": { "textAlignment": "near", "font": "Tahoma" }
    }, {
        "fieldName": "first_name",
        "width": 80,
        "header": { "text": "이름" },
        "styles": { "textAlignment": "near", "font": "Tahoma" }
    }, {
        "fieldName": "last_name",
        "width": 80,
        "header": { "text": "성" },
        "styles": { "textAlignment": "near", "font": "Tahoma" }
    }, {
        "fieldName": "gender",
        "width": 80,
        "header": { "text": "성별" },
        "styles": { "textAlignment": "center", "font": "Tahoma" }
    }, {
        "fieldName": "email",
        "width": 150,
        "header": { "text": "E-Mail" },
        "styles": { "textAlignment": "near", "font": "Tahoma" }
    }, {
        "fieldName": "city",
        "width": 150,
        "header": { "text": "시" },
        "styles": { "textAlignment": "near", "font": "Tahoma" }
    }, {
        "fieldName": "ip_address",
        "width": 100,
        "header": { "text": "IP Address" },
        "styles": { "textAlignment": "near", "font": "Tahoma" }
    }, {
        "fieldName": "birthday",
        "width": 90,
        "header": { "text": "생년월일" },
        "editor": {
            "datetimeFormat": "yyyy-MM-dd"
        },
        "styles": {
            "textAlignment": "center",
            "font": "Tahoma",
            "datetimeFormat": "yyyy/MM/dd"
        }
    }, {
        "fieldName": "pay",
        "width": 90,
        "header": { "text": "급여" },
        "editor": {
            "type": "number"
        },
        "styles": {
            "textAlignment": "far",
            "font": "Tahoma",
            "numberFormat": "#,##0"
        }
    }, {
        "fieldName": "card_number",
        "width": 110,
        "header": { "text": "신용카드" },
        "styles": { "textAlignment": "near", "font": "Tahoma" }
    }, {
        "fieldName": "card_type",
        "width": 90,
        "header": { "text": "카드종류" },
        "styles": { "textAlignment": "near", "font": "Tahoma" }
    }];

    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        header: {
            height: 40
        },
        panel: {
            visible: true
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
        indicator: {
            visible: true,
            displayValue: "row"
        },
        display: {
            rowResizable: true,
            rowHeight: 26
        },
        edit: {
            insertable: true,
            appendable: true
        }
    });
}

function setSkin() {
    grdMain.setStyles(skin49.SkinSource);
}

function setStyles() {
    grdMain.setStyles({
        selection: {
            background: "#18ff8800",
            border: "#ccff8800,2"
        }
    });
}

function setDataCellStyles(grid) {
    // register styels
    grid.addCellStyle("style01", {
        "foreground": "#ffffffff",
        "background": "#ff333333",
        "fontSize": 13,
        "fontBold": true,
        "editable": false
    });
    grid.addCellStyle("style02", {
        "foreground": "#ff000000",
        "background": "#ffcccccc",
        "fontSize": 13,
        "readOnly": true
    });
    grid.addCellStyle("style03", {
        "foreground": "#ffffffff",
        "background": "#fffc5555",
        "fontSize": 13,
        "readOnly": true
    });
}
 
function loadData() {
// with json objects
    var rows = [
        { "id": 1, "userid": "jwagner", "company": "Mynte", "first_name": "Theresa", "last_name": "Reynolds", "gender": "Female", "city": "Sutter Creek", "ip_address": "167.206.87.187", "birthday": "1990/01/30", "pay": 18461.49, "card_number": "4017956479311942", "card_type": "visa", "email": "treynolds@gabspot.net", "style": "style01", "style2": "style02" },
        { "id": 2, "userid": "tphillips", "company": "Zazio", "first_name": "Raymond", "last_name": "Tucker", "gender": "Female", "city": "Visalia", "ip_address": "171.102.222.145", "birthday": "1978/08/05", "pay": 31811.66, "card_number": "3537454864902429", "card_type": "jcb", "email": "rtucker@meejo.mil", "style": "style02", "style2": "style02" },
        { "id": 3, "userid": "bmendoza", "company": "Edgeify", "first_name": "Emily", "last_name": "Flores", "gender": "Female", "city": "Gonzales", "ip_address": "32.149.138.138", "birthday": "1962/06/10", "pay": 23145.71, "card_number": "3574848246092110", "card_type": "jcb", "email": "eflores@mynte.org", "style": "style03", "style2": "style02" },
        { "id": 4, "userid": "phicks", "company": "Nlounge", "first_name": "Johnny", "last_name": "Reed", "gender": "Female", "city": "Soledad", "ip_address": "247.130.92.101", "birthday": "1967/08/11", "pay": 10032.74, "card_number": "3571523163079340", "card_type": "jcb", "email": "jreed@blogspan.com", "style": "style01", "style2": "style02" },
        { "id": 5, "userid": "tbanks", "company": "Yodoo", "first_name": "David", "last_name": "Miller", "gender": "Female", "city": "Stockton", "ip_address": "48.31.72.6", "birthday": "1972/06/30", "pay": 50777.05, "card_number": "374622785310243", "card_type": "americanexpress", "email": "dmiller@quatz.info", "style": "style03", "style2": "style02" },
        { "id": 6, "userid": "jwagner", "company": "Mynte", "first_name": "Theresa", "last_name": "Reynolds", "gender": "Female", "city": "Sutter Creek", "ip_address": "167.206.87.187", "birthday": "1990/01/30", "pay": 18461.49, "card_number": "4017956479311942", "card_type": "visa", "email": "treynolds@gabspot.net", "style": "style01", "style2": "style02" },
        { "id": 7, "userid": "tphillips", "company": "Zazio", "first_name": "Raymond", "last_name": "Tucker", "gender": "Female", "city": "Visalia", "ip_address": "171.102.222.145", "birthday": "1978/08/05", "pay": 31811.66, "card_number": "3537454864902429", "card_type": "jcb", "email": "rtucker@meejo.mil", "style": "style02", "style2": "style02" },
        { "id": 8, "userid": "bmendoza", "company": "Edgeify", "first_name": "Emily", "last_name": "Flores", "gender": "Female", "city": "Gonzales", "ip_address": "32.149.138.138", "birthday": "1962/06/10", "pay": 23145.71, "card_number": "3574848246092110", "card_type": "jcb", "email": "eflores@mynte.org", "style": "style03", "style2": "style02" },
        { "id": 9, "userid": "phicks", "company": "Nlounge", "first_name": "Johnny", "last_name": "Reed", "gender": "Female", "city": "Soledad", "ip_address": "247.130.92.101", "birthday": "1967/08/11", "pay": 10032.74, "card_number": "3571523163079340", "card_type": "jcb", "email": "jreed@blogspan.com", "style": "style01", "style2": "style02" },
        { "id": 10, "userid": "tbanks", "company": "Yodoo", "first_name": "David", "last_name": "Miller", "gender": "Female", "city": "Stockton", "ip_address": "48.31.72.6", "birthday": "1972/06/30", "pay": 50777.05, "card_number": "374622785310243", "card_type": "americanexpress", "email": "dmiller@quatz.info", "style": "style03", "style2": "style02" },
        { "id": 11, "userid": "jwagner", "company": "Mynte", "first_name": "Theresa", "last_name": "Reynolds", "gender": "Female", "city": "Sutter Creek", "ip_address": "167.206.87.187", "birthday": "1990/01/30", "pay": 18461.49, "card_number": "4017956479311942", "card_type": "visa", "email": "treynolds@gabspot.net", "style": "style01", "style2": "style02" },
        { "id": 12, "userid": "tphillips", "company": "Zazio", "first_name": "Raymond", "last_name": "Tucker", "gender": "Female", "city": "Visalia", "ip_address": "171.102.222.145", "birthday": "1978/08/05", "pay": 31811.66, "card_number": "3537454864902429", "card_type": "jcb", "email": "rtucker@meejo.mil", "style": "style02", "style2": "style02" },
        { "id": 13, "userid": "bmendoza", "company": "Edgeify", "first_name": "Emily", "last_name": "Flores", "gender": "Female", "city": "Gonzales", "ip_address": "32.149.138.138", "birthday": "1962/06/10", "pay": 23145.71, "card_number": "3574848246092110", "card_type": "jcb", "email": "eflores@mynte.org", "style": "style03", "style2": "style02" },
        { "id": 14, "userid": "phicks", "company": "Nlounge", "first_name": "Johnny", "last_name": "Reed", "gender": "Female", "city": "Soledad", "ip_address": "247.130.92.101", "birthday": "1967/08/11", "pay": 10032.74, "card_number": "3571523163079340", "card_type": "jcb", "email": "jreed@blogspan.com", "style": "style01", "style2": "style02" },
        { "id": 15, "userid": "tbanks", "company": "Yodoo", "first_name": "David", "last_name": "Miller", "gender": "Female", "city": "Stockton", "ip_address": "48.31.72.6", "birthday": "1972/06/30", "pay": 50777.05, "card_number": "374622785310243", "card_type": "americanexpress", "email": "dmiller@quatz.info", "style": "style03", "style2": "style02" }
    ];

    dataProvider.setRows(rows);
    grdMain.setCellStyleRows(rows, { "style": 2, "style2": "id" });

    // with array
    var rows2 = [
        [1, "style01", "style02"],
        [2, "style02", "style03"]
    ];
    grdMain.setCellStyleRows(rows2, [null, null, null, null, 1, 2]);
    grdMain.setFocus();}

var tests = {
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
    //$("#txtSub").show();
    //$("#txtMin").show();
	createButtons(container, tests);
    /*
    createCheckBox(container, "visible", function (e) {
        grdMain.setIndicator({ visible: e.target.checked });
    }, true);
    createCheckBox(container, "selectable", function (e) {
        grdMain.setIndicator({ selectable: e.target.checked });
    }, true);
    createCheckBox(container, "zeroBase", function (e) {
        grdMain.setIndicator({ zeroBase: _getChecked(e) });
    }, false);
    createListBox(container, "displayValue", ["none", "index", "row"], function (e) {
        grdMain.setIndicator( { displayValue: _getSelected(e) } );
    }, "index")
    createListBox(container, "textAlign", ["near", "center", "far"], function (e) {
        grdMain.setStyles( { indicator: { textAlignment: _getSelected(e) } } );
    }, "center");
    */
}
