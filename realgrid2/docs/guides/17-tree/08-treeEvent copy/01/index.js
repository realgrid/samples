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
  {fieldName:"iconControl", dataType:"text"}
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
  {fieldName:"iconControl", name:"iconControl"}
];

var httpRequest;

function setProvider(filename) {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = loadData;
  httpRequest.open("GET", "/public/data/" + filename);
  httpRequest.send();
}

function loadData() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var data = JSON.parse(httpRequest.responseText);
      treeProvider.setRows(data, 'treeId', false, null, "iconControl");
      treeView.refresh();
    }
  }
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

  treeView.treeOptions.iconImagesRoot = "../../../../../public/images/treeImage/";
  treeView.treeOptions.iconImages = [
      "grd_tree_close.png", "grd_tree_open.png", "grd_treeicon_leaf.png"
  ]
  treeView.treeOptions.defaultIcon = 2;
  
  // 노드를 펼칠때 아이콘 인덱스를 1으로 변경
  treeView.onTreeItemExpanded = function (tree, itemIndex, rowId) {
    console.log("expanded");
      var prod = tree.getDataSource();
      prod.setIconIndex(rowId, 0);
  }

  // 노드를 접을때 아이콘 인덱스를 0로 변경
  treeView.onTreeItemCollapsed = function (tree, itemIndex, rowId) {
    console.log("collpased");
      var prod = tree.getDataSource();
      prod.setIconIndex(rowId, 1);
  }



  setProvider("areatree.json");
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

//조회 후, 일괄 펼침, 닫음인 경우 icon셋팅
function setIcon(tree, expand) {
  tree.beginUpdate();
  try {
      expand ? tree.expandAll() : tree.collapseAll();

      var provider = tree.getDataSource();
      var count = provider.getRowCount();

      var iconIndex = expand ? 0 : 1;

      for (var i = 1 ; i < count+1; i++) {
          provider.getChildCount(i) > 0 ? provider.setIconIndex(i, iconIndex) : provider.setIconIndex(i, 2);
      }
  } finally {
      tree.endUpdate();
  };
};