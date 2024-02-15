/*eslint-disable*/

var fields = [
  {fieldName:"area1code", dataType:"text"},
  {fieldName:"area1name", dataType:"text"},
  {fieldName:"area2code", dataType:"text"},
  {fieldName:"area2name", dataType:"text"},
  {fieldName:"area3code", dataType:"text"},
  {fieldName:"area3name", dataType:"text"},
  {fieldName:"treeId", dataType:"text"},
  {fieldName:"treeName", dataType:"text"},
  {fieldName:"hasChild", dataType:"text"},
  {fieldName:"iconField", dataType:"text"}
]

var columns = [
  {fieldName:"treeName", name:"treeName", width: 150, header:{text:"지역명"}},
  {fieldName:"treeId", name:"treeId", header:{text:"TreeID"}},
  {fieldName:"area1code", name:"area1code", header:{text:"시도코드"}},
  {fieldName:"area1name", name:"area1name", header:{text:"시도명"}},
  {fieldName:"area2code", name:"area2code", header:{text:"시군구코드"}},
  {fieldName:"area2name", name:"area2name", header:{text:"시군구명"}},
  {fieldName:"area3code", name:"area3code", header:{text:"읍면동코드"}},
  {fieldName:"area3name", name:"area3name", header:{text:"읍면동명"}},
  {fieldName:"iconField", name:"iconField"}
];


function loadData() {
  var data = [
    {
      "treeId": "11",
      "treeName": "서울특별시",
      "area1code": "11",
      "area1name": "서울특별시",
      "hasChild": 1,   //앞에 + 표시
      "iconField": 0
    },
    {
      "treeId": "20",
      "treeName": "제주도",
      "area1code": "22",
      "area1name": "제주도",
      "hasChild": 0,  //자식 데이터가 없다고 지정했기 때문에 앞에 아무 표시가 없음 
      "iconField": 8
    }
  ];

  treeProvider.setRows(data, "treeId", true, "hasChild", "iconField")
}

var treeProvider, treeView;

function createGrid(container) {
  treeProvider = new RealGrid.LocalTreeDataProvider();
  treeView = new RealGrid.TreeView(container);

  treeView.setDataSource(treeProvider);
  treeProvider.setFields(fields);
  treeView.setColumns(columns);

  treeView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  treeView.displayOptions.rowHeight = 36;
  treeView.header.height = 40;
  treeView.footer.height = 40;
  treeView.stateBar.width = 16;

  treeView.treeOptions.iconImagesRoot = "../../../../../public/images/flags/";
  treeView.treeOptions.iconImages = [
      "kr.png", "de.png", "es.png", "fr.png", "grd_treeicon_leaf.png", "hu.png", "is.png",
      "kr.png", "mx.png", "pt.png", "us.png", "ve.png"
  ]
  treeView.treeOptions.defaultIcon = 4;

  treeView.onTreeItemExpanding = function (tree, itemIndex, rowId) {
    // false를 리턴하면 펼쳐지지 않는다.
    // return false;

    // expanding 중인 행이 자식이 하나도 없다면 hasChildren이 설정된 행이다.
    // 자식들을 가져와 그 행에 추가한다.
    if (treeProvider.getChildCount(rowId) <= 0) {
      //펼치려는 행의 키 값을 가져와서 db에서 해당 행의 자식들을 가져온 후 addChildRow()를 사용해서 추가한다.
      //var key = treeProivder.getValue(rowId, "treeId");

      var datas = [{
        "treeId": "11.010",
        "treeName": "종로구",
        "area1code": "11",
        "area1name": "서울특별시",
        "area2code": "11010",
        "area2name": "종로구",
        "iconField": 1
      },
      {
        "treeId": "11.020",
        "treeName": "중구",
        "area1code": "11",
        "area1name": "서울특별시",
        "area2code": "11020",
        "area2name": "중구",
        "iconField": 2
      },
      {
        "treeId": "11.030",
        "treeName": "용산구",
        "area1code": "11",
        "area1name": "서울특별시",
        "area2code": "11030",
        "area2name": "용산구",
        "iconField": 3
      } ];
      
      datas.forEach(function(el) {
        var childId = treeProvider.addChildRow(rowId, el, el.iconField, true);
      })
    }

    return true;
  }

  loadData();
}

function start() {
  createGrid("realgrid");
}

// $.document.ready(start);
window.onload = start;
// domloaded를 대신 써도 됩니다.

window.onunload = function() {
  treeProvider.clearRows();

  treeView.destroy();
  treeProvider.destroy();

  treeView = null;
  treeProvider = null;
}