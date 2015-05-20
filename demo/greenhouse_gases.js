var grdMain;
var dataProvider;
var datas;
RealGridJS.setRootContext("../lib");

$(document).ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
  setFields(dataProvider);

  grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);

	setColumns(grdMain);
	setOptions(grdMain);
  setStyles(grdMain);
  grdMain.onSelectionChanged = onSelectionChanged;

	loadData(dataProvider);
    
  setTests("actions", "ActualTargetRenderer");
});

function setFields(provider) {
    var fields = [{ fieldName: "구분" },
	              { fieldName: "조사년도" },
	              { fieldName: "소속기관명" },
	              { fieldName: "시설명" },
	              { fieldName: "계측가능여부" },
	              { fieldName: "임차여부" },
	              { fieldName: "연료명" },
	              { fieldName: "A01월", "dataType": "number" },
	              { fieldName: "A02월", "dataType": "number" },
	              { fieldName: "A03월", "dataType": "number" },
	              { fieldName: "A04월", "dataType": "number" },
	              { fieldName: "A05월", "dataType": "number" },
	              { fieldName: "A06월", "dataType": "number" },
	              { fieldName: "A07월", "dataType": "number" },
	              { fieldName: "A08월", "dataType": "number" },
	              { fieldName: "A09월", "dataType": "number" },
	              { fieldName: "A10월", "dataType": "number" },
	              { fieldName: "A11월", "dataType": "number" },
	              { fieldName: "A12월", "dataType": "number" },
	              { fieldName: "조직코드" },
	              { fieldName: "대상기관명" },
	              { fieldName: "시설일련번호" },
	              { fieldName: "단위" }
    ];

    provider.setFields(fields);

}

function setColumns(grid) {
    var numStyle = { "textAlignment": "far", "numberFormat": "#,##0.00" };
    var columns = [{ fieldName: "구분", "name": "구분", "width": 80 },
	               { fieldName: "조사년도", "name": "조사년도", "width": 80 },
	               { fieldName: "소속기관명", "name": "소속기관명", "width": 80 },
	               { fieldName: "시설명", "name": "시설명", "width": 80 },
	               {
	                   fieldName: "계측가능여부", "name": "계측가능여부", "width": 80, editable: false,
	                   "renderer": { "type": "check", falseValues: "N", trueValues: "Y" },
	                   "styles": {
	                       "textAlignment": "center",
	                       "figureBackground": "#ffff0000",
	                       "figureInactiveBackground": "#33ff0000",
	                       "figureSize": "130%"
	                   }
	               },
	               {
	                   fieldName: "임차여부", "name": "임차여부", "width": 80, editable: false,
	                   "renderer": { "type": "check", falseValues: "N", trueValues: "Y" },
	                   "styles": {
	                       "textAlignment": "center",
	                       "figureBackground": "#ff000088",
	                       "figureInactiveBackground": "#33000088",
	                       "figureSize": "130%"
	                   }
	               },
	               { fieldName: "연료명", "name": "연료명", "width": 80 },
	               {
	                   "name": "colLine", "type": "series", "fieldNames": "A01월..A12월", "width": 150,
	                   "renderer": {
	                       "type": "sparkColumn",
	                       "highFill": "#ff008800",
	                       "lowFill": "#ffff0000",
	                       "lastFill": "#ff888888"
	                   },
	                   header: { "text": "그래프" },
	                   styles: {
	                       background: "#080000ff",
	                       figureBackground: "#ff888888",
	                       paddingLeft: 4,
	                       paddingRight: 4,
	                       paddingTop: 4,
	                       paddingBottom: 4
	                   }
	               },
	               { fieldName: "A01월", "name": "01월", header: { text: "01월" }, "width": 80, "styles": numStyle, footer: { expression: "sum", styles: numStyle, groupExpression: "sum" } },
	               { fieldName: "A02월", "name": "02월", header: { text: "02월" }, "width": 80, "styles": numStyle, footer: { expression: "sum", styles: numStyle, groupExpression: "sum" } },
	               { fieldName: "A03월", "name": "03월", header: { text: "03월" }, "width": 80, "styles": numStyle, footer: { expression: "sum", styles: numStyle, groupExpression: "sum" } },
	               { fieldName: "A04월", "name": "04월", header: { text: "04월" }, "width": 80, "styles": numStyle, footer: { expression: "sum", styles: numStyle, groupExpression: "sum" } },
	               { fieldName: "A05월", "name": "05월", header: { text: "05월" }, "width": 80, "styles": numStyle, footer: { expression: "sum", styles: numStyle, groupExpression: "sum" } },
	               { fieldName: "A06월", "name": "06월", header: { text: "06월" }, "width": 80, "styles": numStyle, footer: { expression: "sum", styles: numStyle, groupExpression: "sum" } },
	               { fieldName: "A07월", "name": "07월", header: { text: "07월" }, "width": 80, "styles": numStyle, footer: { expression: "sum", styles: numStyle, groupExpression: "sum" } },
	               { fieldName: "A08월", "name": "08월", header: { text: "08월" }, "width": 80, "styles": numStyle, footer: { expression: "sum", styles: numStyle, groupExpression: "sum" } },
	               { fieldName: "A09월", "name": "09월", header: { text: "09월" }, "width": 80, "styles": numStyle, footer: { expression: "sum", styles: numStyle, groupExpression: "sum" } },
	               { fieldName: "A10월", "name": "10월", header: { text: "10월" }, "width": 80, "styles": numStyle, footer: { expression: "sum", styles: numStyle, groupExpression: "sum" } },
	               { fieldName: "A11월", "name": "11월", header: { text: "11월" }, "width": 80, "styles": numStyle, footer: { expression: "sum", styles: numStyle, groupExpression: "sum" } },
	               { fieldName: "A12월", "name": "12월", header: { text: "12월" }, "width": 80, "styles": numStyle, footer: { expression: "sum", styles: numStyle, groupExpression: "sum" } },
	               { fieldName: "조직코드", "name": "조직코드", "width": 80 },
	               { fieldName: "대상기관명", "name": "대상기관명", "width": 80 },
	               { fieldName: "시설일련번호", "name": "시설일련번호", "width": 80 },
	               { fieldName: "단위", "name": "단위", "width": 80 }
    ];
    grid.setColumns(columns);
}

function StrToFloat(numText) {
    if (!numText) {
        return 0;
    };

    return parseFloat(numText.replace(/,/g, ""));
}

function loadData(provider) {
    $.ajax({
        type: "GET",
        url: "data/co2data.json",
        success: function (data) {
            data = JSON.parse(data);
            for (var i = 0; i <= data.records.length - 1; i++) {
                if (!data.records[i]["대상기관명"]) {
                    data.records[i]["단위"] = data.records[i]["A01월"];
                    data.records[i]["A01월"] = data.records[i]["A02월"];
                    data.records[i]["A02월"] = data.records[i]["A03월"];
                    data.records[i]["A03월"] = data.records[i]["A04월"];
                    data.records[i]["A04월"] = data.records[i]["A05월"];
                    data.records[i]["A05월"] = data.records[i]["A06월"];
                    data.records[i]["A06월"] = data.records[i]["A07월"];
                    data.records[i]["A07월"] = data.records[i]["A08월"];
                    data.records[i]["A08월"] = data.records[i]["A09월"];
                    data.records[i]["A09월"] = data.records[i]["A10월"];
                    data.records[i]["A10월"] = data.records[i]["A11월"];
                    data.records[i]["A11월"] = data.records[i]["A12월"];
                    data.records[i]["A12월"] = data.records[i]["조직코드"];
                    data.records[i]["조직코드"] = "";
                };
                data.records[i]["A01월"] = StrToFloat(data.records[i]["A01월"]);
                data.records[i]["A02월"] = StrToFloat(data.records[i]["A02월"]);
                data.records[i]["A03월"] = StrToFloat(data.records[i]["A03월"]);
                data.records[i]["A04월"] = StrToFloat(data.records[i]["A04월"]);
                data.records[i]["A05월"] = StrToFloat(data.records[i]["A05월"]);
                data.records[i]["A06월"] = StrToFloat(data.records[i]["A06월"]);
                data.records[i]["A07월"] = StrToFloat(data.records[i]["A07월"]);
                data.records[i]["A08월"] = StrToFloat(data.records[i]["A08월"]);
                data.records[i]["A09월"] = StrToFloat(data.records[i]["A09월"]);
                data.records[i]["A10월"] = StrToFloat(data.records[i]["A10월"]);
                data.records[i]["A11월"] = StrToFloat(data.records[i]["A11월"]);
                data.records[i]["A12월"] = StrToFloat(data.records[i]["A12월"]);
            };

            provider.fillJsonData(data.records)
            //dataProvider.setJsonRows(data.records);
            makeFilter();

        },
        error: function (xhr, status, error) {
            if (onFailed)
                onFailed(provider, xhr + ', ' + status + ', ' + error);
        },
        complete: function (data) {
        }
    });
}

function setOptions(grid) {
    grid.setOptions({
        panel: {
            visible: true
        },
        footer: {
            visible: true
        },
        stateBar: {
            visible: false
        },
        display: {
            heightMeasurer: "fixed",
            rowHeight: 24,
            rowResizable: true
        },
        header: {
        },
        sorting: {
            handleVisibility: "hidden"
        },
        sort: { 
            style: "inclusive" 
        },
        select: { 
            style: "block" 
        },
        edit: { 
            editable: false 
        }        
    });
}

function setStyles(grid) {
    grid.setStyles({
        grid: {
            fontSize: "12",
            fontFamily: "맑은 고딕",
            foreground: "#FF272822",
            borderBottom: "#FFEFEFEF,1",
            borderRight: "#FFE2E2E2,1"
        },
        body: {
            dynamicStyles: [
				{
				    criteria: "row mod 2 = 0",
				    styles: "background=#D4F4FA"
				}
            ]
        },
        indicator: {
            background: "#FFFFFFFF",
            selectedBackground: "#8855606F"
        },
        selection: {
            background: "#8855606F",
            foreground: "#88000000",
            border: "#00000000,1"
        },
        header: {
            group: {
                "fontSize": "12", "fontFamily": "맑은 고딕", "fontBold": "true",
                foreground: "#FFFFFFFF",
                background: "#00A4DD",
                borderBottom: "#4092C8",
                borderRight: "#4092C8"
            },
            selectedBackground: "#00A4DD",
            fontSize: "12",
            fontFamily: "맑은 고딕",
            fontBold: "true",
            foreground: "#FFFFFFFF",
            background: "#00A4DD",
            borderBottom: "#4092C8",
            borderRight: "#4092C8",
            selectedBackground: "#FF006BC6",
            hoveredBackground: "#FF00BBC6"
        },
        checkBar: {
            figureBackground: "#ff555555",
            head: {
                figureBackground: "#ff555555"
            }
        },
        rowGroup: {
            header: {
                background: "#2274BF",
                foreground: "#FFFFFFFF",
                borderRight: "#2274BF,1",
                borderBottom: "#2274BF,1"
            }
        },
        fixed: {
            background: "#FFFFFFFF"
        }
    });
};

function addFilter(fldName) {
    var datas = dataProvider.getDistinctValues(fldName);
    var filters = [];
    for (var idx in datas) {
        filters.push({ criteria: "value = \"" + datas[idx] + "\"", name: datas[idx], text: datas[idx] });
    };
    grdMain.setColumnFilters(fldName, filters);

}

function makeFilter() {
    // 1 연료
    addFilter("연료명");
    addFilter("구분");

    var filters = [{
        criteria: "value = \"부산광역시\"", name: "부산광역시", text: "부산광역시"
    }, {
        criteria: "value <> \"부산광역시\"", name: "그외기관", text: "부산광역시 외"
    }];

    grdMain.setColumnFilters("소속기관명", filters)

    //	addFilter("소속기관명");
}

function btnFindClick(evt) {
    var srchText = $("#txtname").val();
    grdMain.searchItem({ fields: ["시설명"], values: [srchText], partialMatch: true })
}

function btnFindNextClick(evt) {
    var srchText = $("#txtname").val();
    var startIndex = grdMain.getCurrent().itemIndex + 1;
    grdMain.searchItem({ fields: ["시설명"], values: [srchText], startIndex: startIndex, partialMatch: true })
}



function btnExcelClick(evt) {

    grdMain.exportGrid({
        type: "excel",
        target: "local",
        showConfirm: true
    });
}

function btnFixedClick(evt) {
    var fixedOptions = { colCount: 0, rowCount: 0 };

    var colCnt = $("#txtColCnt").val();
    if (!isNaN(colCnt) && colCnt.trim() != "") {
        fixedOptions["colCount"] = parseInt(colCnt);
    };

    var rowCnt = $("#txtRowCnt").val();
    if (!isNaN(rowCnt) && rowCnt.trim() != "") {
        fixedOptions["rowCount"] = parseInt(rowCnt);
    };

    grdMain.setFixedOptions(fixedOptions);
}

function onSelectionChanged(grid) {
    var selInfo = grid.getSelection();
    if (!selInfo) {
        return;
    };
    if (isNaN(selInfo.startColumn.substr(0, 2)) || isNaN(selInfo.endColumn.substr(0, 2))) {
        $("#selectedcellavg").text("");
        $("#selectedcellcount").text("");
        $("#selectedcellsum").text("");
    } else {
        var datas = grid.getSelectionData();
        var cnt = 0;
        var sum = 0;
        for (var i = 0 ; i < datas.length; i++) {
            var keys = Object.keys(datas[i]);
            for (var j = 0; j < keys.length; j++) {
                sum += datas[i][keys[j]];
                cnt++;
            }
        };
        $("#selectedcellavg").text((sum / cnt).toLocaleString());
        $("#selectedcellcount").text(cnt.toLocaleString());
        $("#selectedcellsum").text(sum.toLocaleString());

    };
    // console
    //	console.log(selection);
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
