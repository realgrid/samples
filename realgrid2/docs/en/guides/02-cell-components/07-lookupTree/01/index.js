/*eslint-disable*/

var area1codes = {id:"area1codeId", levels:1, keys: [], values: []};
var area2codes = {id:"area2codeId", levels:2, tags: [], keys: [], values: []};
var area3codes = {id:"area3codeId", levels:3, tags: [], keys: [], values: []};

var fields = [
    {fieldName:"area1code", dataType:"text"},
    {fieldName:"area2code", dataType:"text"},
    {fieldName:"area3code", dataType:"text"}
]

var columns = [
    {
        name:"area1lookup", 
        fieldName:"area1code", 
        header:{
            text:"시 도"
        }, 
        width:200,
        sortByLabel:true, 
        lookupDisplay:true, 
        values:area1codes.keys, 
        labels:area1codes.values,
        editor:{
            type:"dropdown"
        }
    },
    {
        name:"area2lookup", 
        fieldName:"area2code", 
        header:{
            text:"시 군 구"
        }, 
        width:200,
        lookupDisplay:true, 
        lookupSourceId:"area2codeId", 
        lookupKeyFields:["area1code","area2code"],
        editor:{
            type:"dropdown"
        }
    },
    {
        name:"area3lookup", 
        fieldName:"area3code", 
        header:{
            text:"읍 면 동"
        }, 
        width:200,
        lookupDisplay:true, 
        lookupSourceId:"area3codeId", 
        lookupKeyFields:["area1code","area2code","area3code"],
        editor:{
            type:"dropdown"
        }
    }
]

//이해를 돕기위한 데이터 샘플입니다.
/*
var areacodesDatas = 
[{"area1code":"11","area1name":"서울특별시","area2code":"11010","area2name":"종로구","area3code":"1101053","area3name":"사직동"}
,{"area1code":"11","area1name":"서울특별시","area2code":"11010","area2name":"종로구","area3code":"1101054","area3name":"삼청동"}
,{"area1code":"11","area1name":"서울특별시","area2code":"11010","area2name":"종로구","area3code":"1101055","area3name":"부암동"}
,{"area1code":"11","area1name":"서울특별시","area2code":"11010","area2name":"종로구","area3code":"1101056","area3name":"평창동"}
,{"area1code":"11","area1name":"서울특별시","area2code":"11010","area2name":"종로구","area3code":"1101057","area3name":"무악동"}
,{"area1code":"11","area1name":"서울특별시","area2code":"11010","area2name":"종로구","area3code":"1101058","area3name":"교남동"}
,{"area1code":"11","area1name":"서울특별시","area2code":"11010","area2name":"종로구","area3code":"1101060","area3name":"가회동"}
,{"area1code":"11","area1name":"서울특별시","area2code":"11010","area2name":"종로구","area3code":"1101061","area3name":"종로1.2.3.4가동"}
,{"area1code":"11","area1name":"서울특별시","area2code":"11010","area2name":"종로구","area3code":"1101063","area3name":"종로5.6가동"}
,{"area1code":"21","area1name":"부산광역시","area2code":"21110","area2name":"금정구","area3code":"2111063","area3name":"장전3동"}
,{"area1code":"21","area1name":"부산광역시","area2code":"21110","area2name":"금정구","area3code":"2111064","area3name":"선두구동"}
,{"area1code":"21","area1name":"부산광역시","area2code":"21110","area2name":"금정구","area3code":"2111067","area3name":"청룡노포동"}
,{"area1code":"21","area1name":"부산광역시","area2code":"21110","area2name":"금정구","area3code":"2111068","area3name":"남산동"}
,{"area1code":"21","area1name":"부산광역시","area2code":"21110","area2name":"금정구","area3code":"2111069","area3name":"구서1동"}
,{"area1code":"21","area1name":"부산광역시","area2code":"21110","area2name":"금정구","area3code":"2111070","area3name":"구서2동"}
,{"area1code":"21","area1name":"부산광역시","area2code":"21110","area2name":"금정구","area3code":"2111071","area3name":"금성동"}
,{"area1code":"21","area1name":"부산광역시","area2code":"21110","area2name":"금정구","area3code":"2111072","area3name":"서3동"}
,{"area1code":"21","area1name":"부산광역시","area2code":"21120","area2name":"강서구","area3code":"2112051","area3name":"대저1동"}
,{"area1code":"21","area1name":"부산광역시","area2code":"21120","area2name":"강서구","area3code":"2112052","area3name":"대저2동"}
,{"area1code":"21","area1name":"부산광역시","area2code":"21120","area2name":"강서구","area3code":"2112053","area3name":"강동동"}
,{"area1code":"21","area1name":"부산광역시","area2code":"21120","area2name":"강서구","area3code":"2112054","area3name":"명지동"}]
*/

var httpRequest;

var dataProvider, gridContainer, grid;

function createGrid(container) {
    dataProvider = new RealGrid.LocalDataProvider();
    gridView = new RealGrid.GridView(container);
    gridView.setDataSource(dataProvider);

    makeLookupSource();

    dataProvider.setFields(fields);
    gridView.setColumns(columns);

    gridView.displayOptions.emptyMessage = "There is no data to display.";
    gridView.header.height = 40;
    gridView.displayOptions.rowHeight = 36;
    gridView.footer.height = 40;
    gridView.stateBar.width = 16;
    gridView.editOptions.insertable = true;
    gridView.editOptions.appendable = true;

    setGridEvent(gridView, dataProvider);
    dataProvider.fillJsonData(areacodes,{count:20});

    gridView.addLookupSource(area2codes);
    gridView.addLookupSource(area3codes);
}

function start() {
  createGrid("realgrid");
}

// $.document.ready(start);
window.onload = start;
// domloaded를 대신 써도 됩니다.

window.onunload = function() {
  dataProvider.clearRows();

  gridView.destroy();
  dataProvider.destroy();

  gridView = null;
  dataProvider = null;
}

function makeLookupSource() {
    for (var i = 0, cnt = areacodes.length; i < cnt ; i++) {
        var codes = areacodes[i];
        if (area1codes.keys.indexOf(codes.area1code) < 0) {
            area1codes.keys.push(codes.area1code);
            area1codes.values.push(codes.area1name);
        }
        if (area2codes.tags.indexOf(codes.area2code) < 0) {
            area2codes.tags.push(codes.area2code);
            area2codes.keys.push([codes.area1code, codes.area2code]);
            area2codes.values.push(codes.area2name);
        }
        if (area3codes.tags.indexOf(codes.area3code) < 0) {
            area3codes.tags.push(codes.area3code);
            area3codes.keys.push([codes.area1code, codes.area2code, codes.area3code]);
            area3codes.values.push(codes.area3name);
        }
    }
}

function setGridEvent(grid, provider){
    grid.onEditCommit = function (grid, index, oldValue, newValue) {
        if (index.fieldName === "area1code") {
            if (oldValue !== newValue) {
                grid.setValue(index.itemIndex, "area2code", "");
                grid.setValue(index.itemIndex, "area3code", "");
            }
        } else if (index.fieldName === "area2code") {
            if (oldValue !== newValue) {
                grid.setValue(index.itemIndex, "area3code", "");
            }
        };
    };
}