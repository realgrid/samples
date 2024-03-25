/*eslint-disable*/

var fields = [
    {
        "fieldName": "icon"
    },
    {
        "fieldName": "tree"
    },
    {
        "fieldName": "do"
    },
    {
        "fieldName": "si"
    },
    {
        "fieldName": "gu"
    }
];
  
  var columns = [
    {
        "name": "do",
        "fieldName": "do",
        "width": "150",
        "header": {
            "text": "도"
        }
    },
    {
        "name": "si",
        "fieldName": "si",
        "width": "100",
        "header": {
            "text": "시"
        }
    },
    {
        "name": "gu",
        "fieldName": "gu",
        "width": "100",
        "header": {
            "text": "구"
        }
    }
];

var data =
  "<rows>"+
  "  <row icon='0' do='경기도'>"+
  "    <row icon='0' do='경기도' si='성남시'>"+
  "      <row icon='0' do='경기도' si='성남시' gu='분당구' />"+
  "      <row icon='0' do='경기도' si='성남시' gu='수정구'/>"+
  "    </row>"+
  "    <row icon='0' do='경기도' si='수원시'>"+
  "      <row icon='0' do='경기도' si='수원시' gu='팔달구' />"+
  "      <row icon='0' do='경기도' si='수원시' gu='영통구' />"+
  "    </row>"+
  "    <row icon='0' do='경기도' si='안양시' />"+
  "    <row icon='0' do='경기도' si='의정부시' />"+
  "    <row icon='0' do='경기도' si='김포시' />"+
  "  </row>"+
  "</rows>";

var httpRequest;

var treeProvider, treeView;

function createGrid(container) {
  treeProvider = new RealGrid.LocalTreeDataProvider();
  treeView = new RealGrid.TreeView(container);

  treeView.setDataSource(treeProvider);
  treeProvider.setFields(fields);
  treeView.setColumns(columns);

  treeView.displayOptions.emptyMessage = "There is no data to display.";
  treeView.displayOptions.rowHeight = 36;
  treeView.header.height = 40;
  treeView.footer.height = 40;
  treeView.stateBar.width = 16;

  treeProvider.fillXmlData(data, "rows", "", "");
  treeView.expandAll();
}

function start() {
  createGrid("realgrid");
}

function btnClearRows() {
    treeProvider.clearRows();
}

function btnSetXmlRows() {
    treeProvider.setXmlRows(data, "row", "", "icon");
    treeView.expandAll();
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