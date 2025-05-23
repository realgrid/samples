/*eslint-disable*/

var fields = [
  { fieldName: "id", dataType: "number" },
  { fieldName: "title", dataType: "text" },
  { fieldName: "body", dataType: "text" },
  { fieldName: "userId", dataType: "number" },
  { fieldName: "tags", dataType: "text" },
  { fieldName: "reactions", dataType: "number" },
];

var columns = [
  {
    name: "id",
    fieldName: "id",
    width: "40",
    header: { text: "ID" },
    sortable: true,
  },
  {
    name: "title",
    fieldName: "title",
    width: "200",
    header: { text: "제목" },
    sortable: true,
  },
  {
    name: "body",
    fieldName: "body",
    width: "300",
    header: { text: "본문" },
    sortable: true,
  },
  {
    name: "userId",
    fieldName: "userId",
    width: "60",
    header: { text: "UserID" },
    sortable: true,
  },
  {
    name: "tags",
    fieldName: "tags",
    width: "120",
    header: { text: "태그" },
    sortable: true,
  },
  {
    name: "reactions",
    fieldName: "reactions",
    width: "60",
    header: { text: "반응수" },
    sortable: true,
  },
];

var dataProvider, gridView;
var currentPage = 1;
var dataPerPage = 8;
var currentSortBy = "id";
var currentOrder = "desc";
var totalRows = 0;
var isServerSorting = false;

// 서버에서 데이터 받아오기
function fetchData({ page = 1, limit = 8 }, callback) {
  var skip = (page - 1) * limit;
  var url = `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;
  if (currentSortBy && currentOrder) {
    url += `&sortBy=${currentSortBy}&order=${currentOrder}`;
  }

  console.log("fetchData url", url);

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      var rows = json.posts.map((post) => ({
        ...post,
        tags: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags,
      }));
      if (callback) callback(rows, json.total);
    });
}

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
  gridView.editOptions.insertable = false;
  gridView.editOptions.appendable = false;
  gridView.sortingOptions.enabled = true;

  // 첫 페이지 데이터 로딩
  fetchData(
    {
      page: currentPage,
      limit: dataPerPage,
    },
    function (rows, total) {
      dataProvider.setRows(rows);
      totalRows = total;
      setPaging();
    }
  );

  // onSorting 이벤트를 활용한 서버 정렬
  gridView.onSorting = function (grid, fields, dirs) {
    if (!fields || !dirs || fields.length === 0 || dirs.length === 0) {
      currentSortBy = "id";
      currentOrder = "desc";
    } else {
      var sortIndex = fields[0];
      currentSortBy =
        typeof sortIndex === "number"
          ? columns[sortIndex].fieldName
          : sortIndex;
      currentOrder = dirs[0] === "ascending" ? "asc" : "desc";
    }

    // 반드시 플러그인 메서드로 1페이지 이동
    console.log("== onSorting currentPage", currentPage);
    if (currentPage !== 1) {
      $("#page").pagination("go", 1);
    } else {
      // 1페이지로 강제 콜백 실행
      onPageChange([], { pageNumber: 1 });
    }
  };
}

function start() {
  createGrid("realgrid");
}

// $.document.ready(start);
window.onload = start;
// domloaded를 대신 써도 됩니다.

window.onunload = function () {
  dataProvider.clearRows();

  gridView.destroy();
  dataProvider.destroy();

  gridView = null;
  dataProvider = null;
};

function pagination() {
  let container = $("#page");
  container.pagination({
    dataSource: function (done) {
      done(new Array(totalRows));
    },
    pageSize: dataPerPage,
    pageNumber: currentPage,
    callback: function (data, pagination) {
      if (pagination.pageNumber !== currentPage) {
        currentPage = pagination.pageNumber;
        fetchData(
          {
            page: currentPage,
            limit: dataPerPage,
          },
          function (rows, total) {
            dataProvider.setRows(rows);
            totalRows = total;
          }
        );
      }
    },
  });
}

function setPaging() {
  pagination();
}

function onPageChange(data, pagination) {
  fetchData(
    {
      page: pagination.pageNumber,
      limit: dataPerPage,
    },
    function (rows, total) {
      dataProvider.setRows(rows);
      totalRows = total;
    }
  );
}
