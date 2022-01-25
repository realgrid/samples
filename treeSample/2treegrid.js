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

var httpRequest;

function setProvider(filename) {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = loadData;
  httpRequest.open("GET", "./public/data/" + filename);
  httpRequest.send();
}

function loadData() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var data = JSON.parse(httpRequest.responseText);
      treeProvider.setRows(data, 'treeId', false, null, "iconField");
      treeProvider2.setRows(data, 'treeId', false, null, "iconField");
      treeView.expandAll();
      treeView2.expandAll();
    }
  }
}
var treeProvider, treeView;
var treeProvider2, treeView2;

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

  treeView.treeOptions.iconVisible = false
  treeView.editOptions.movable = true;

  treeView.setContextMenu([
    {
      label: "모두 펼치기",
      tag: "expandAll"
    },
    {
      label: "모두 접기",
      tag: "collapseAll"
    },
    {
      label: "현재 노드 펼치기",
      tag: "expand"
    },    
    {
      label: "현재 노드 접기",
      tag: "collapse"
    },
    {
      label: "-" // menu separator를 삽입합니다.
    },
    {
      label: "아이템 복사 설정",
      tag: "itemCopy"
    },
    {
      label: "아이템 이동 설정",
      tag: "itemMove"
    }
  ]);

  treeView.onContextMenuItemClicked = function (grid, item, clickData) { 
    console.log(clickData);
    switch(item.tag) {
      case "expandAll" :
        grid.expandAll();
        break;
      case "collapseAll" :
        grid.collapseAll();
        break;
      case "expand":
        grid.expand(clickData.itemIndex, true, true);
        break;
      case "collapse":
        grid.collapse(clickData.itemIndex, true);
        break;
      case "itemCopy":
        treeView.dataDropOptions.dropMode = "copy";
        treeView2.dataDropOptions.dropMode = "copy";
        alert("복사하려는 행들을 범위 선택하고 마우스 포인터를 선택영역의 앞쪽에 위치하면 +로 변경됩니다. \r\n 드래그 앤 드롭 하세요.")
        break;
      case "itemMove":
        treeView.dataDropOptions.dropMode = "move";
        treeView2.dataDropOptions.dropMode = "move";
        alert("이동하려는 행들을 범위 선택하고 마우스 포인터를 선택영역의 앞쪽에 위치하면 +로 변경됩니다. \r\n 드래그 앤 드롭 하세요.")
      break;
    }
  }

  //setProvider("areatree.json");
}

function createGrid2(container) {
  treeProvider2 = new RealGrid.LocalTreeDataProvider();
  treeView2 = new RealGrid.TreeView(container);

  treeView2.setDataSource(treeProvider2);
  treeProvider2.setFields(fields);
  treeView2.setColumns(columns);

  treeView2.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  treeView2.displayOptions.rowHeight = 36;
  treeView2.header.height = 40;
  treeView2.footer.height = 40;
  treeView2.stateBar.width = 16;

  treeView2.treeOptions.iconImagesRoot = "../../../../../public/images/flags/";
  treeView2.treeOptions.iconImages = [
      "kr.png", "de.png", "es.png", "fr.png", "grd_treeicon_leaf.png", "hu.png", "is.png",
      "kr.png", "mx.png", "pt.png", "us.png", "ve.png"
  ]
  treeView2.treeOptions.defaultIcon = 4;

  treeView2.treeOptions.iconVisible = false
  treeView2.editOptions.movable = true;

  treeView2.setContextMenu([
    {
      label: "모두 펼치기",
      tag: "expandAll"
    },
    {
      label: "모두 접기",
      tag: "collapseAll"
    },
    {
      label: "현재 노드 펼치기",
      tag: "expand"
    },    
    {
      label: "현재 노드 접기",
      tag: "collapse"
    },
    {
      label: "-" // menu separator를 삽입합니다.
    },
    {
      label: "item 등록",
      tag: "itemAdd"
    },
    {
      label: "item 삭제",
      tag: "itemDel"
    }
  ]);

  treeView2.onContextMenuItemClicked = function (grid, item, clickData) { 
    switch(item.tag) {
      case "expandAll" :
        grid.expandAll();
        break;
      case "collapseAll" :
        grid.collapseAll();
        break;
      case "expand":
        grid.expand(clickData.itemIndex, true, true);
        break;
      case "collapse":
        grid.collapse(clickData.itemIndex, true);
        break;
      case "itemAdd":
        var ds = grid.getDataSource();
        var parent = ds.getParent(clickData.dataRow);
        ds.insertChildRow(parent, 0, {})
        break;
      case "itemDel":
        var ds = grid.getDataSource();
        ds.removeRow(clickData.dataRow);
        break;
    }
  }

  setProvider("areatree.json");
}

function start() {
  createGrid("realgrid");
  createGrid2("realgrid2");

  treeView.dataDropOptions.dropMode = "copy";
  treeView2.dataDropOptions.dropMode = "copy";
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

  treeProvider2.clearRows();

  treeView2.destroy();
  treeProvider2.destroy();

  treeView2 = null;
  treeProvider2 = null;
}
