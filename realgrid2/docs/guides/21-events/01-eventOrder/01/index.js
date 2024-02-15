/*eslint-disable*/

var fields = [
  {
      "fieldName": "OrderID",
      "dataType": "text"
  },
  {
      "fieldName": "CustomerID"
  },
  {
      "fieldName": "EmployeeID"
  },
  {
      "fieldName": "OrderDate",
      "dataType": "datetime",
      "datetimeFormat":"yyyy-MM-dd"
  },
  {
      "fieldName": "CompanyName"
  },
  {
      "fieldName": "Country"
  },
  {
      "fieldName": "CountryKor"
  },
  {
      "fieldName": "Phone"
  },
  {
      "fieldName": "ProductName"
  },
  {
      "fieldName": "QuantityPerUnit"
  },
  {
      "fieldName": "Quantity",
      "dataType": "number"
  },
  {
      "fieldName": "UnitPrice",
      "dataType": "number"
  }
];

var columns = [
  {
      "name": "OrderID",
      "fieldName": "OrderID",
      "editor": {
          "maxLength": 5
      },
      "width": "90",
      "textInputCase": "upper",
      "header": {
          "text": "Text editor"
      }
  },
  {
      "name": "CompanyName",
      "fieldName": "CompanyName",
      "width": "200",
      "editor": {
          "type": "multiline",
          "textCase": "upper"
      },
      "header": {
          "text": "Multiline Edit"
      }
  },
  {
      "name": "Quantity",
      "fieldName": "Quantity",
      "width": "100",
      "sortable": false,
      "editor": {
          "type": "number",
          "textAlignment": "far",
          "editFormat": "#,##0.##",
          "multipleChar": "+"
      },
      "header": {
          "text": "Number Edit",
      }
  },
  {
      "name": "CustomerID",
      "fieldName": "CustomerID",
      "width": "150",
      "sortable": false,
      "lookupDisplay": true,
      "values": [
          "VINET",
          "HANAR",
          "SUPRD",
          "VICTE",
          "THREE",
          "SEVEN"
      ],
      "labels": [
          "<VINET>",
          "<HANAR>",
          "<SUPRD>",
          "<VICTE>",
          "<THREE>",
          "<SEVEN>"
      ],
      "editor": {
          "type": "dropdown",
          "dropDownCount": 4
      },
      "header": {
          "text": "DropDown Edit"
      }
  },
  {
      "name": "CustomerID2",
      "fieldName": "CustomerID",
      "width": "150",
      "sortable": false,
      "editor": {
          "type": "dropdown",
          "dropDownCount": 4,
          "domainOnly": true,
          "textReadOnly": true,
          "values": [
              "VINET",
              "HANAR",
              "SUPRD",
              "VICTE",
              "THREE",
              "SEVEN"
          ],
          "labels": [
              "<VINET>",
              "<HANAR>",
              "<SUPRD>",
              "<VICTE>",
              "<THREE>",
              "<SEVEN>"
          ]
      },
      "header": {
          "text": "Domain Only"
      }
  },
  {
      "name": "CustomerID3",
      "fieldName": "CustomerID",
      "width": "150",
      "sortable": false,
      "editor": {
          "type": "search",
          "searchLength": 1,
          "searchDelay": 1000,
          "useCtrlEnterKey": true,
          "useEnterKey": true
      },
      "header": {
          "text": "Search Editor "
      }
  },
  {
      "name": "CountryKor",
      "fieldName": "Country",
      "width": "150",
      "sortable": false,
      "lookupDisplay": true,
      "values": [
          "Austria",
          "Belgium",
          "Brazil",
          "Finland",
          "France",
          "Germany",
          "Ireland",
          "Italy",
          "Mexico",
          "Spain",
          "Sweden",
          "Switzerland",
          "UK",
          "USA",
          "Venezuela"
      ],
      "labels": [
          "오스트리아",
          "벨기에",
          "브라질",
          "핀란드",
          "프랑스",
          "독일",
          "아일랜드",
          "이탈리아",
          "멕시코",
          "스페인",
          "스웨덴",
          "스위스",
          "영국",
          "미국",
          "베네수엘라"
      ],
      "editor": {
          "type": "dropDown",
          "dropDownCount": 5,
          "partialMatch": true
      },
      "header": {
          "text": "partialMatch"
      }
  },
  {
      "name": "OrderDate",
      "fieldName": "OrderDate",
      "width": "180",
      "sortable": false,
      "editor": {
          "type": "date",
          "datetimeFormat": "yyyy.MM.dd"
      },
      "header": {
          "text": "Date Edit"
      }
  },
  {
      "name": "Country",
      "fieldName": "Country",
      "width": "100",
      "header": {
          "text": "Country"
      }
  },
  {
      "name": "Phone",
      "fieldName": "Phone",
      "width": "100",
      "header": {
          "text": "Phone"
      }
  },
  {
      "name": "ProductName",
      "fieldName": "ProductName",
      "width": "200",
      "header": {
          "text": "Product Name"
      }
  }
];

var httpRequest;
var events = 0;

function setProvider(filename) {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = loadData;
  httpRequest.open("GET", "https://cdn.wooritech.com/realgrid/data/" + filename);
  httpRequest.send();
}

function loadData() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var data = JSON.parse(httpRequest.responseText);
      dataProvider.setRows(data);
      gridView.setFocus();
    }
  }
}

var dataProvider, gridContainer, grid;

function createGrid(container) {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  var CustomerNames = ["ALFKI", "ANATR", "ANTON", "AROUT", "BERGS", "BLAUS", "BLONP", "BOLID", "BONAP", "BOTTM", "BSBEV", "CACTU", "CENTC", "CHOPS", "COMMI", "CONSH", "DRACD", "DUMON", "EASTC", "ERNSH", "FAMIA", "FISSA", "FOLIG", "FOLKO", "FRANK", "FRANR", "FRANS", "FURIB", "GALED", "GODOS", "GOURL", "GREAL", "GROSR", "HANAR", "HILAA", "HUNGC", "HUNGO", "ISLAT", "KOENE", "LACOR", "LAMAI", "LAUGB", "LAZYK", "LEHMS", "LETSS", "LILAS", "LINOD", "LONEP", "MAGAA", "MAISD", "MEREP", "MORGK", "NORTS", "OCEAN", "OLDWO", "OTTIK", "PARIS", "PERIC", "PICCO", "PRINI", "QUEDE", "QUEEN", "QUICK", "RANCH", "RATTC", "REGGC", "RICAR", "RICSU", "ROMEY", "SANTG", "SAVEA", "SEVES", "SIMOB", "SPECD", "SPLIR", "SUPRD", "THEBI", "THECR", "TOMSP", "TORTU", "TRADH", "TRAIH", "VAFFE", "VICTE", "VINET", "WANDK", "WARTH", "WELLI", "WHITC", "WILMK", "WOLZA"];

  gridView.onEditSearch = function (grid, index, text) {
      addLog("onEditSearch:" + index.itemIndex + "," + index.column + ", " + text);
      var items = CustomerNames.filter(function (str) {
          return str.indexOf(text) == 0;
      });
      addLog(items);
      grid.fillEditSearchItems(index.column, text, items);
  };

  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.displayOptions.rowHeight = 36;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;

  initCheckBox();
  setCheckBoxEvent();
  registerCallback();


  setProvider("editor_demoData.json");

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

function initCheckBox() {
    const editOp = gridView.getEditOptions();
    const gridOp = gridView.getOptions();
    const prodOp = dataProvider.getOptions();

    $('.edit').map(function(){
        this.checked = editOp[this.id];
    })
    $('.grid').map(function(){
        this.checked = gridOp[this.id];
    })
    $('.prod').map(function(){
        this.checked = prodOp[this.id];
    })
}

function setCheckBoxEvent() {
    $('.edit').change(function(){
        gridView.editOptions[this.id] = this.checked;
    })
    $('.grid').change(function(){
        gridView[this.id] = this.checked;
    })
    $('.prod').change(function(){
        dataProvider[this.id] = this.checked;
    })
}

function insertEmptyRow() {
    var row = gridView.getCurrent().dataRow;
    var dataRow = dataProvider.insertRow(Math.max(0, row), {});
}

function addEmptyRow() {
    var dataRow = dataProvider.addRow({});
}

function beginInsertRow() {
    if (!gridView.editOptions.insertable) {
        alert("insertable 속성이 false 입니다.");
        return;
    }

    var curr = gridView.getCurrent();
    gridView.beginInsertRow(Math.max(0, curr.itemIndex));
}
  
function beginAppendRow() {
    if (!gridView.editOptions.appendable) {
        alert("appendable 속성이 false 입니다.");
        return;
    }
    gridView.beginAppendRow();
}

function btnBeginUpdateRow() {
    var curr = gridView.getCurrent();
    gridView.beginUpdateRow(curr.itemIndex);
    gridView.showEditor();
    gridView.setFocus();
  }
  
function btnUpdateRow() {
    gridView.commit(true);
    var curr = gridView.getCurrent();
    dataProvider.updateRow(
        curr.dataRow, 
        {OrderID: "수정이름", CompanyName: "수정", Quantity: 0, Phone: "수정전화번호", CustomerID: "수정ID", Country: "수정국가"}
    );
}
  
function btnUpdateRows() {
    gridView.commit(true);
    var curr = gridView.getCurrent();
    var datas = [
        {OrderID: "수정이름1", CompanyName: "수정1", Quantity: 1, Phone: "수정전화번호1", CustomerID: "수정ID1", Country: "수정국가1"},
        {OrderID: "수정이름2", CompanyName: "수정2", Quantity: 2, Phone: "수정전화번호2", CustomerID: "수정ID2", Country: "수정국가2"},
        {OrderID: "수정이름3", CompanyName: "수정3", Quantity: 3, Phone: "수정전화번호3", CustomerID: "수정ID3", Country: "수정국가3"},
        {OrderID: "수정이름4", CompanyName: "수정4", Quantity: 4, Phone: "수정전화번호4", CustomerID: "수정ID4", Country: "수정국가4"}
    ]
  
    dataProvider.updateRows(curr.dataRow, datas, 0);
}
  
function btnUpdateRowsByDataRow() {
    gridView.commit(true);
    var curr = gridView.getCurrent();
    var datas = {
      5: {OrderID: "수정이름6", CompanyName: "수정6", Quantity: 0, Phone: "수정전화번호6", CustomerID: "수정ID6", Country: "수정국가6"},
      7: {OrderID: "수정이름8", CompanyName: "수정8", Quantity: 0, Phone: "수정전화번호8", CustomerID: "수정ID8", Country: "수정국가8"}
    }
  
    dataProvider.updateRowsByDataRow(datas);
}

function deleteSelection() {
    if (!gridView.editOptions.deletable) {
        alert("deletable 속성이 false 입니다.");
        return;
    }

    gridView.deleteSelection(true);
}
  
function removeRow() {
    var curr = gridView.getCurrent();
    dataProvider.removeRow(curr.dataRow);
}

function DPsetValue() {
    var current = gridView.getCurrent();
    var dataRow = current.dataRow;
    var fieldName = current.fieldName;
  
    var value = "Cell (" + fieldName + ", " + dataRow + ")";
    dataProvider.setValue(dataRow, fieldName, value);
}
  
function GVsetValue() {
    var current = gridView.getCurrent();
    var itemIndex = current.itemIndex;
    var fieldName = current.fieldName;
  
    var value = "Cell (" + fieldName + ", " + itemIndex + ")";
    gridView.setValue(itemIndex, fieldName, value);
}
  


function addLog(log) {   
    var prevLog = $("#eventLog").val();
    $("#eventLog").val(prevLog + "[" + events++ + "] " + log + "\n");
    $("#eventLog").scrollTop($("#eventLog")[0].scrollHeight);
};  

function btnClearTextarea() {
    events = 0;
    $("#eventLog").val('');
}

function registerCallback() {

    gridView.onCopy = function(grid, selection, event) {
        addLog("grid.onCopy");
    };

    gridView.onCurrentChanging = function (grid, oldIndex, newIndex) {
        addLog("grid.onCurrentChanging: " + "(" + oldIndex.itemIndex + ", " + oldIndex.column + ") => (" + newIndex.itemIndex + ", " + newIndex.column + ")");
 
        // return false; 를 하는 경우 위치 변경이 되지 않는다.
    };
 
    gridView.onCurrentChanged = function (grid, newIndex) {
        addLog("grid.onCurrentChanged: " + "(" + newIndex.itemIndex + ", " + newIndex.column + ")");
    };
 
    gridView.onCurrentRowChanged = function (grid, oldRow, newRow) {
        addLog("grid.onCurrentRowChanged: " + "(" + oldRow + " => " + newRow + ")");
    };

    gridView.onEditCanceled = function (grid, index) {
        addLog("grid.onEditCanceled driven, edit index=" + JSON.stringify(index));
    };

    gridView.onEditChange = function (grid, index, value) {
        addLog("grid.onEditChange driven, " + index.column + ' at ' + index.dataRow + ' was replaced by value: ' + value);
    };

    gridView.onEditCommit = function (grid, index, oldValue, newValue) {
        addLog("grid.onEditCommit driven, " + oldValue + " => " + newValue);
    };

    gridView.onEditRowChanged = function (grid, itemIndex, dataRow, field, oldValue, newValue) {
        var v = grid.getValue(itemIndex, field);
        addLog("grid.onEditRowChanged: " + oldValue + " => " + newValue);
    };

    gridView.onGetEditValue = function (grid, index, editResult) {
        addLog("grid.onGetEditValue: " + JSON.stringify(editResult));
    };

    gridView.onCellEdited = function (grid, itemIndex, row, field) {
        addLog("grid.onCellEdited: " + itemIndex + ', ' + field);
    }

    gridView.onHideEditor = function (grid, index) {
        addLog("grid.onHideEditor: " + index.itemIndex + "," + index.column);
    };

    gridView.onItemEditCancel = function (grid, itemIndex, state) {
        addLog("grid.onItemEditCancel: " + state);
        
        //return false; 를 하는 경우 취소 되지 않는다.
    };
     
    gridView.onItemEditCanceled = function (grid, itemIndex, state) {
        addLog("grid.onItemEditCanceled: " + state);
    };

    gridView.onPaste = function (grid, index, event){
        addLog("grid.Paste");
    };

    gridView.onPasted = function (grid){
        addLog("grid.Pasted");
    }

    gridView.onEditRowPasted = function (grid, itemIndex, row, fields, oldValues, newValues) {
        addLog('grid.onEditRowPasted: {' + newValues.join() + '}');
    };

    gridView.onRowInserting = function (grid, itemIndex, dataRow) {
        addLog("grid.onRowInserting: " + itemIndex);

        //추가하지 못하게 하려면 string 메시지나 boolean false를 리턴한다.
        return null;
    };

    gridView.onRowsDeleting = function (grid, rows) {
        addLog("grid.onRowsDeleting: " + rows);

        //null이 아닌 값을 반환하면 지정 텍스트를 표시하고 삭제를 취소한다.
        return null;
    };

    gridView.onRowsPasted =  function (grid, items) {
        addLog("grid.onRowsPasted" + items);
    };

    gridView.onShowEditor = function (grid, index, props, attrs) {
        addLog("grid.onShowEditor: " + index.itemIndex + "," + index.column);
    };

    dataProvider.onDataChanged = function (provider) {
        addLog("provider.onDataChanged");
    };

    dataProvider.onRestoreRows = function (provider, rows) {
        addLog('provider.onRestoreRows: ' + rows.join(', '));
    };

    dataProvider.onRowCountChanged = function (provider, newCount) {
        addLog("provider.onRowCountChanged: " + newCount);   
    };

    dataProvider.onRowDeleted = function (provider, row) {
        addLog('provider.onRowDeleted: ' + row);
    };

    dataProvider.onRowDeleting = function (provider, row) {
        addLog('provider.onRowDeleting: ' + row);
        return true;
    };

    dataProvider.onRowInserted = function (provider, row) {
        addLog("provider.onRowInserted");
    };

    dataProvider.onRowInserting = function (provider, row, values) {
        addLog('provider.onRowInserting: ' + row);
        return true;
    };

    dataProvider.onRowListUpdated = function (provider, rows) {
        addLog("provider.onRowListUpdated: " + rows.join(', '));
    };

    dataProvider.onRowMoved = function (provider, row) {
        addLog("provider.onRowMoved: " + row + ' to ' + newRow);
    };

    dataProvider.onRowMoving = function (provider, row, newRow) {
        addLog("provider.onRowMoving: " + row + ' to ' + newRow);

        return true;
    };

    dataProvider.onRowsDeleted = function (provider, rows) {
        addLog("provider.onRowsDeleted: " + rows.join(', '));
    };

    dataProvider.onRowsInserted = function (provider, row, count) {
        addLog("provider.onRowsInserted: " + count + " rows inserted!");
    };

    dataProvider.onRowsMoved = function (provider, row, count, newRow) {
        addLog('provider.onRowsMoved: ' + count + ' rows moved');
    };

    dataProvider.onRowStateChanged = function (provider, row) {
        addLog('provider.onRowStateChanged: ' + row);
    };

    dataProvider.onRowStatesChanged = function (provider, rows) {
        addLog('provider.onRowStatesChanged: ' + rows.join(','));
    };

    dataProvider.onRowStatesCleared = function (provider) {
        addLog('provider.onRowStatesCleared');
    };

    dataProvider.onRowsUpdated = function (provider, row, count) {
        addLog('provider.onRowsUpdated');
    };

    dataProvider.onRowUpdated = function (provider, row) {
        addLog("provider.onRowUpdated: " + row);
    };

    dataProvider.onRowUpdating = function (provider, row) {
        addLog("provider.onRowUpdating: " + row);
        return true;
    };

    dataProvider.onValueChanged = function (provider, row, field) {
        addLog('provider.onValueChanged: ' + row + ' row, ' + field + ' fieldIndex');
    };
}