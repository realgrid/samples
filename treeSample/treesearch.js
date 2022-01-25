/*eslint-disable*/

var fields = [
  {fieldName:"treeId", dataType:"text"},
  {fieldName:"treeName", dataType:"text"},
  {fieldName:"iconControl", dataType:"text"}
]

var columns = [
  {fieldName:"treeName", name:"treeName", width: 150, header:{text:"지역명"}}
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
      treeProvider.setRows(data, 'treeId', false, null, "iconControl");
      treeView.refresh();
      //treeView.expandAll();
    }
  }
}

var treeProvider, treeView;
var rows, searchElt;

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

  setProvider("areatree.json");
  setIcon();

  document.getElementById("searchTxt").addEventListener("keydown", function(e) {
            if (e.keyCode === 13) {
                searchElt = document.getElementById("searchTxt").value;
                searchData(searchElt, -1);
            }
        })
}

function start() {
  createGrid("realgrid1");
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

function setIcon() {
  treeView.treeOptions.iconImagesRoot = "./public/treeImage/";
  treeView.treeOptions.iconImages = [
      "grd_tree_open.png", "grd_tree_close.png", "grd_treeicon_leaf.png"
  ]
  treeView.treeOptions.expandedIcon = 0;
  treeView.treeOptions.collapsedIcon = 1;
  treeView.treeOptions.defaultIcon = 2;
}

function searchData(elt, startIndex) {
    var txt = elt;
    do {
        startIndex = treeProvider.searchDataRow({fields:["treeName"], values:[txt], startIndex: startIndex, wrap: false, partialMatch : true});
        if (startIndex >= 0) {
            var model = treeView.getModelOfRow(startIndex);
            var pModel = [];
            while(model) {
                model = treeView.getParentModel(model);
                model && pModel.unshift(model);
            };
            for (var i =0; i < pModel.length; i++) {
                treeView.expandModel(pModel[i]);
            }
        }
        startIndex += (startIndex < 0 ? 0 : 1);
    } while (startIndex > -1)

    treeView.columnByName("treeName").styleCallback = function(tree, dataCell) {
        return txt && dataCell.value && dataCell.value.indexOf(txt) >= 0 ? "bold-cell" : ""
    };

    treeView.setCurrent({itemIndex: 0})
}