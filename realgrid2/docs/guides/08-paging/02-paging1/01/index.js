/*eslint-disable*/

var fields = [
  {
    fieldName: "KorName",
    dataType: "text"
  },
  {
    fieldName: "Gender",
    dataType: "text"
  },
  {
    fieldName: "Age",
    dataType: "number"
  },
  {
    fieldName: "Phone",
    dataType: "text"
  },
  {
    fieldName: "ProductId",
    dataType: "text"
  },
  {
    fieldName: "KorCountry",
    dataType: "text"
  },
  {
    fieldName: "OrderDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후"
  },
  {
    fieldName: "CardNumber",
    dataType: "text"
  },
  {
    fieldName: "Monetary",
    dataType: "text"
  },
  {
    fieldName: "StartDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후"
  },
  {
    fieldName: "EndDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후"
  },
  {
    fieldName: "ToMonth",
    dataType: "number"
  },
  {
    fieldName: "Month",
    dataType: "number"
  },
  {
    fieldName: "Year",
    dataType: "number"
  },
  {
    fieldName: "InterestRate",
    dataType: "number"
  },
  {
    fieldName: "SaveCost",
    dataType: "number"
  },
  {
    fieldName: "SaveMaturity",
    dataType: "number"
  },
  {
    fieldName: "CurrentSave",
    dataType: "number"
  }
];

var columns = [
  {
    name: "KorName",
    fieldName: "KorName",
    width: "60",
    header: {
      text: "이름"
    }
  },
  {
    name: "Gender",
    fieldName: "Gender",
    width: "40",
    header: {
      text: "성별"
    }
  },
  {
    name: "Age",
    fieldName: "Age",
    width: "40",
    header: {
      text: "나이"
    },
    styleName: "right-column"
  },
  {
    name: "Phone",
    fieldName: "Phone",
    width: "100",
    header: {
      text: "전화번호"
    }
  },
  {
    name: "KorCountry",
    fieldName: "KorCountry",
    width: "100",
    header: {
      text: "투자국가"
    }
  },
  {
    name: "OrderDate",
    fieldName: "OrderDate",
    width: "100",
    header: {
      text: "주문일자"
    }
  },
  {
    name: "CardNumber",
    fieldName: "CardNumber",
    width: "140",
    header: {
      text: "카드번호"
    }
  },
  {
    name: "Monetary",
    fieldName: "Monetary",
    width: "40",
    header: {
      text: "통화"
    }
  },
  {
    name: "StartDate",
    fieldName: "StartDate",
    width: "100",
    header: {
      text: "최초납입일"
    }
  },
  {
    name: "EndDate",
    fieldName: "EndDate",
    width: "100",
    header: {
      text: "종료일"
    }
  },
  {
    name: "ToMonth",
    fieldName: "ToMonth",
    width: "50",
    header: {
      text: "납입 횟수"
    },
    styleName: "right-column"
  },
  {
    name: "Month",
    fieldName: "Month",
    width: "50",
    header: {
      text: "남은 횟수"
    },
    styleName: "right-column"
  },
  {
    name: "InterestRate",
    fieldName: "InterestRate",
    width: "50",
    numberFormat: "0.00",
    header: {
      text: "이율"
    },
    styleName: "right-column"
  },
  {
    name: "SaveCost",
    fieldName: "SaveCost",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "납입금"
    },
    styleName: "right-column"
  },
  {
    name: "SaveMaturity",
    fieldName: "SaveMaturity",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "만기금액"
    },
    styleName: "right-column"
  },
  {
    name: "CurrentSave",
    fieldName: "CurrentSave",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "현재잔액"
    },
    styleName: "right-column"
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
      setPaging();
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

  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  gridView.displayOptions.rowHeight = 36;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;



  setProvider("simple_data300.json");
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
};

function setPaging(){
  var totalData = dataProvider.getRowCount();    // 총 데이터 수
  var dataPerPage = 8;    // 한 페이지에 나타낼 데이터 수
  var pageCount = 3;        // 한 화면에 나타낼 페이지 수

  setPageSelbox(totalData, dataPerPage);
  gridView.setPaging(true, dataPerPage);
  paging(totalData, dataPerPage, pageCount, 1);
}

function paging(totalData, dataPerPage, pageCount, currentPage){
  console.log("currentPage : " + currentPage);
  
  var totalPage = Math.ceil(totalData/dataPerPage);    // 총 페이지 수
  var pageGroup = Math.ceil(currentPage/pageCount);    // 페이지 그룹
  
  console.log("pageGroup : " + pageGroup);
  
  var last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호
  if(last > totalPage)
      last = totalPage;
  var first = last - (pageCount - 1) < 1 ? 1 : last - (pageCount - 1)   // 화면에 보여질 첫번째 페이지 번호
  var next = last+1;
  var prev = first-1;
  
  console.log("last : " + last);
  console.log("first : " + first);
  console.log("next : " + next);
  console.log("prev : " + prev);

  var $pingingView = $("#paging");
  
  var html = "";

  if(prev == 0) {
      html += "<a href=# id='first' class='disabled'>|<</a> ";
      html += "<a href=# id='prev' class='disabled'><</a> ";
  } else {
      html += "<a href=# id='first'>|<</a> ";
      html += "<a href=# id='prev'><</a> ";         
  }
  
  
  for(var i=first; i <= last; i++){
      html += "<a href='#' style='width: 50px' id=" + i + ">" + i + "</a> ";
  }
  
  if(last < totalPage) {
      html += "<a href=# id='next'>></a>";
      html += "<a href=# id='last'>>|</a>";
  } else {
      html += "<a href=# id='next' class='disabled'>></a>";
      html += "<a href=# id='last' class='disabled'>>|</a>";
  }
  
  $("#paging").html(html);    // 페이지 목록 생성
  
  $("#paging a").css({"color": "black",
                      "padding-left": "10px"});
                      
  $("#paging a#" + currentPage).css({"text-decoration":"none", 
                                     "color":"red", 
                                     "font-weight":"bold"});    // 현재 페이지 표시
                                     
  $("#paging a").click(function(event){
      event.preventDefault();
      
      var $item = $(this);
      var $id = $item.attr("id");
      var selectedPage = $item.text();
      

      if($id == "first")   selectedPage = 1;
      if($id == "next")    selectedPage = next;
      if($id == "prev")    selectedPage = prev < 1 ? 1 : prev
      if($id == "last")    selectedPage = totalPage;
      
      gridView.setPage(selectedPage-1);
      paging(totalData, dataPerPage, pageCount, selectedPage);
  });
                                     
}

function setPageSelbox(totalData, dataPerPage){
  var totalPage = Math.ceil(totalData/dataPerPage);    // 총 페이지 수

  for (var i=1; i <= totalPage; i++) {
      var optStr = "<option value=" + i + ">" + i + "</option>";
      console.log(optStr);
      $("#selBox").append(optStr);
  }

  $("#selBox").change(function() {
      var totalData = dataProvider.getRowCount();    // 총 데이터 수
      var dataPerPage = 8;    // 한 페이지에 나타낼 데이터 수
      var pageCount = 3;        // 한 화면에 나타낼 페이지 수
      var selectedPage = $(this).val();

      gridView.setPage(selectedPage-1);
      paging(totalData, dataPerPage, pageCount, selectedPage);
  });
}