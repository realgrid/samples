/*eslint-disable*/

var fields = [
  {
      "fieldName": "ItemId"
  },
  {
      "fieldName": "ItemName"
  },
  {
      "fieldName": "RequestType"
  },
  {
      "fieldName": "ServiceName"
  },
  {
      "fieldName": "ServiceCode"
  },
  {
      "fieldName": "Standard"
  },
  {
      "fieldName": "LowBounds"
  },
  {
      "fieldName": "LowSign"
  },
  {
      "fieldName": "HighSign"
  },
  {
      "fieldName": "HighBounds"
  },
  {
      "fieldName": "CheckUnit"
  },
  {
      "fieldName": "CheckPrice",
      "dataType": "number"
  }
];

var columns = [
  {
      "fieldName": "ItemId",
      "width": 80,
      "header": {
          "text": "ItemId"
      }
  },
  {
      "fieldName": "ItemName",
      "width": 100,
      "header": {
          "text": "항목명"
      }
  },
  {
      "fieldName": "RequestType",
      "width": 80,
      "header": {
          "text": "분야"
      }
  },
  {
      "fieldName": "ServiceName",
      "width": 150,
      "header": {
          "text": "유형명"
      }
  },
  {
      "fieldName": "ServiceCode",
      "width": 150,
      "header": {
          "text": "서비스코드"
      }
  },
  {
      "fieldName": "Standard",
      "width": 150,
      "header": {
          "text": "표준"
      }
  },
  {
      "fieldName": "LowBounds",
      "width": 120,
      "header": {
          "text": "하위 값"
      }
  },
  {
      "fieldName": "HighBounds",
      "width": 80,
      "header": {
          "text": "상위 값"
      }
  },
  {
      "fieldName": "CheckUnit",
      "width": 80,
      "header": {
          "text": "단위"
      }
  },
  {
      "fieldName": "CheckPrice",
      "width": 90,
      "header": {
          "text": "수수료"
      }
  }
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
      dataProvider.setRows(data);
      gridView.refresh();
    }
  }
}

var dataProvider, gridContainer, gridView;

function createGrid(container) {
  dataProvider = new RealGrid.LocalDataProvider();
  dataProvider.setFields(fields);

  gridView = new RealGrid.GridView(container);
  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.header.height = 40;
  gridView.displayOptions.rowHeight = 36;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;

  gridView.setDataSource(dataProvider);
  gridView.setColumns(columns);

  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;


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

function btnLargeLoadData(grid, provider, count, pageCount) {  
  document.getElementById("btnLargeLoadData").disabled = true;
  if(document.getElementById("showLoading").checked){
    gridView.showLoading();
  }

  var now = new Date();
  $.ajax({
      url: "/public/data/TooLargeDataSet.csv",
      success: function (data) {
          dataProvider.fillCsvData(data, {});
          gridView.closeLoading();

          var endDate = new Date();
          var dataTime = endDate.getTime() - now.getTime();
          document.getElementById("ellapse").innerHTML = dataProvider.getRowCount() + "개 출력 소요 시간 : " + dataTime + " ms"; 
      },
      error: function (xhr, status, error) {
      },
      complete: function (data) {

      },
      xhr: function () {
          var xhr = new window.XMLHttpRequest();
          return xhr;
      }
  });
}