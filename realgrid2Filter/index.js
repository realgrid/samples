/*eslint-disable*/

var fields = [{
  fieldName: "column1"
}, {
  fieldName: "column2"
}, {
  fieldName: "column3"
}, {
  fieldName: "column4"
}, {
  fieldName: "column5"
}];

var columns = [{
  name: "column1",
  fieldName: "column1",
  width: "100",
  header: {
    text: "컬럼1"
  },
  autoFilter: true
}, {
  name: "column2",
  fieldName: "column2",
  width: "100",
  header: {
    text: "컬럼2"
  },
  autoFilter: true
}, {
  name: "column3",
  fieldName: "column3",
  width: "100",
  header: {
    text: "컬럼3"
  },
  autoFilter: true
}, {
  name: "column4",
  fieldName: "column4",
  width: "100",
  header: {
    text: "컬럼4"
  },
  autoFilter: true
}, {
  name: "column5",
  fieldName: "column5",
  width: "100",
  header: {
    text: "컬럼5"
  },
  autoFilter: true
}];


var datas = [
{ "column1": "전자", "column2": "컴퓨터", "column3": "노트북", "column4": "게이밍", "column5": "고급형" },
{ "column1": "전자", "column2": "컴퓨터", "column3": "노트북", "column4": "게이밍", "column5": "보급형" },
{ "column1": "전자", "column2": "컴퓨터", "column3": "노트북", "column4": "사무용", "column5": "고급형" },
{ "column1": "전자", "column2": "컴퓨터", "column3": "노트북", "column4": "사무용", "column5": "보급형" },
{ "column1": "전자", "column2": "컴퓨터", "column3": "데스크탑", "column4": "게이밍", "column5": "고급형" },
{ "column1": "전자", "column2": "컴퓨터", "column3": "데스크탑", "column4": "게이밍", "column5": "보급형" },
{ "column1": "전자", "column2": "컴퓨터", "column3": "데스크탑", "column4": "사무용", "column5": "슬림형" },
{ "column1": "전자", "column2": "컴퓨터", "column3": "데스크탑", "column4": "사무용", "column5": "타워형" },

{ "column1": "전자", "column2": "모바일", "column3": "스마트폰", "column4": "안드로이드", "column5": "프리미엄" },
{ "column1": "전자", "column2": "모바일", "column3": "스마트폰", "column4": "안드로이드", "column5": "중저가" },
{ "column1": "전자", "column2": "모바일", "column3": "스마트폰", "column4": "iOS", "column5": "프로" },
{ "column1": "전자", "column2": "모바일", "column3": "스마트폰", "column4": "iOS", "column5": "일반형" },
{ "column1": "전자", "column2": "모바일", "column3": "태블릿", "column4": "WiFi", "column5": "64GB" },
{ "column1": "전자", "column2": "모바일", "column3": "태블릿", "column4": "WiFi", "column5": "128GB" },
{ "column1": "전자", "column2": "모바일", "column3": "태블릿", "column4": "LTE", "column5": "64GB" },
{ "column1": "전자", "column2": "모바일", "column3": "태블릿", "column4": "LTE", "column5": "128GB" },

{ "column1": "전자", "column2": "가전", "column3": "냉장고", "column4": "양문형", "column5": "대형" },
{ "column1": "전자", "column2": "가전", "column3": "냉장고", "column4": "일반형", "column5": "중형" },
{ "column1": "전자", "column2": "가전", "column3": "세탁기", "column4": "드럼", "column5": "건조겸용" },
{ "column1": "전자", "column2": "가전", "column3": "세탁기", "column4": "통돌이", "column5": "일반형" },

{ "column1": "가구", "column2": "거실", "column3": "소파", "column4": "가죽", "column5": "4인용" },
{ "column1": "가구", "column2": "거실", "column3": "소파", "column4": "가죽", "column5": "3인용" },
{ "column1": "가구", "column2": "거실", "column3": "소파", "column4": "패브릭", "column5": "4인용" },
{ "column1": "가구", "column2": "거실", "column3": "소파", "column4": "패브릭", "column5": "3인용" },
{ "column1": "가구", "column2": "거실", "column3": "테이블", "column4": "원형", "column5": "대형" },
{ "column1": "가구", "column2": "거실", "column3": "테이블", "column4": "원형", "column5": "중형" },
{ "column1": "가구", "column2": "거실", "column3": "테이블", "column4": "사각", "column5": "대형" },
{ "column1": "가구", "column2": "거실", "column3": "테이블", "column4": "사각", "column5": "중형" },

{ "column1": "가구", "column2": "침실", "column3": "침대", "column4": "퀸", "column5": "수납형" },
{ "column1": "가구", "column2": "침실", "column3": "침대", "column4": "킹", "column5": "프레임형" },
{ "column1": "가구", "column2": "침실", "column3": "옷장", "column4": "슬라이딩", "column5": "화이트" },
{ "column1": "가구", "column2": "침실", "column3": "옷장", "column4": "여닫이", "column5": "브라운" },

{ "column1": "식품", "column2": "과일", "column3": "사과", "column4": "국산", "column5": "10kg" },
{ "column1": "식품", "column2": "과일", "column3": "사과", "column4": "수입", "column5": "5kg" },
{ "column1": "식품", "column2": "과일", "column3": "바나나", "column4": "수입", "column5": "5kg" },
{ "column1": "식품", "column2": "과일", "column3": "바나나", "column4": "유기농", "column5": "3kg" },
{ "column1": "식품", "column2": "음료", "column3": "커피", "column4": "원두", "column5": "1kg" },
{ "column1": "식품", "column2": "음료", "column3": "커피", "column4": "인스턴트", "column5": "500g" },
{ "column1": "식품", "column2": "음료", "column3": "차", "column4": "녹차", "column5": "500g" },
{ "column1": "식품", "column2": "음료", "column3": "차", "column4": "홍차", "column5": "1kg" }

]




var gridView, dataProvider

function createGrid(container) {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);
  gridView.setDataSource(dataProvider);

  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.header.height = 40;
  gridView.displayOptions.rowHeight = 30;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  gridView.filteringOptions.automating.filteredDataOnly = true
  gridView.filteringOptions.automating.selectorDataOrder = "order";

  dataProvider.fillJsonData(datas);
}


function start() {
  createGrid("realgrid");
  //createDetailGrid();

  //gridView.setFocus();
}

// $.document.ready(start);
window.onload = start;
// domloaded를 대신 써도 됩니다.

window.onunload = function() {

}

function getVersions() {
  alert(RealGrid.getVersion())
}