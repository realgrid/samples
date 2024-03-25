/*eslint-disable*/

var fields = [
  {
      fieldName: "Datetime1",
      dataType: "datetime",
      datetimeFormat: "yyyyMMdd"
  },
  {
      fieldName: "Datetime2",
      dataType: "datetime",
      datetimeFormat: "yyyyMMddahhmmss",
      amText: "AM",
      pmText: "PM"
  },
  {
      fieldName: "Datetime3",
      dataType: "datetime",
      datetimeFormat: "yyyyMMddHHmmssSSS"
  },
  {
      fieldName: "Datetime4",
      dataType: "datetime",
      datetimeFormat: "platform"
  },
  {
      fieldName: "Datetime5",
      dataType: "datetime",
      datetimeFormat: "iso"
  }
];

var columns = [
  {
      name: "Datetime1",
      fieldName: "Datetime1",
      width: "110",
      header: "YYYYMMDD",
      editor: {
          datetimeFormat: "yyyy-MM-dd"
      },
      datetimeFormat: "yyyy/MM/dd"
  },
  {
      name: "Datetime2",
      fieldName: "Datetime2",
      width: "150",
      header: "yyyyMMddahhmmss",
      editor: {
        datetimeFormat: "yyyy-MM-dd HH:mm:ss"
      },
      datetimeFormat: "yyyy/MM/dd HH:mm:ss.SSS"
  },
  {
      name: "Datetime3",
      fieldName: "Datetime3",
      width: "160",
      header: "yyyy/MM/dd HH:mm:ss",
      editor: {
        datetimeFormat: "yyyy.MM.dd HH:mm:ss;2000;AM,PM"
      },
      datetimeFormat: "yyyy/MM/dd HH:mm:ss"
  },
  {
      name: "Datetime4",
      fieldName: "Datetime4",
      width: "180",
      header: "flash",
      editor: {
        datetimeFormat: "yyyy.MM.dd a hh:mm;2000;AM,PM"
      },
      datetimeFormat: "yyyy년 M월 d일 a h시m분"
  },
  {
      name: "Datetime5",
      fieldName: "Datetime5",
      width: "180",
      header: "iso",
      editor: {
        datetimeFormat: "yyyy.MM.dd HH:mm;2000;AM,PM"
      },
      datetimeFormat: "yyyy년 M월 d일 a h시m분"
  }
];

var httpRequest;

function setProvider(filename) {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = loadData;
  httpRequest.open("GET", "/public/data/en/" + filename);
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

var dataProvider, gridContainer, grid;

function createGrid(container) {
  RealGrid.setLocale('en');
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  gridView.displayOptions.emptyMessage = "There is no data to display.";
  gridView.displayOptions.rowHeight = 36;
  gridView.header.height = 40;
  gridView.footer.height = 40;
  gridView.stateBar.width = 16;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  var data = [
    [
      "20141114",
      "20141114PM051215008",
      "20141114171215008",
      "2014/11/14 17:12",
      "2014-11-14T17:12:15+09:00"
    ],
    [
      "20141115",
      "20140304AM040805556",
      "20140304040805556",
      "2014/03/04 04:08",
      "2014-03-04T04:08:05+09:00"
    ],
    [
      "20010215",
      "20010215PM124236721",
      "20010215124236721",
      "2001/02/15 12:42",
      "2001-02-15T12:42:36+09:00"
    ],
    [
      "20111025",
      "20111025AM103637426",
      "20111025103637426",
      "2011/10/25 10:36",
      "2011-10-25T10:36:37+09:00"
    ],
    [
      "20070626",
      "20070626PM030456962",
      "20070626150456962",
      "2007/06/26 15:04",
      "2007-06-26T15:04:56+09:00"
    ],
    [
      "20040807",
      "20040807AM013302430",
      "20040807013302430",
      "2004/08/07 01:33",
      "2004-08-07T01:33:02+09:00"
    ],
    [
      "20050530",
      "20050530AM105829932",
      "20050530105829932",
      "2005/05/30 10:58",
      "2005-05-30T10:58:29+09:00"
    ],
    [
      "20071030",
      "20071030AM083042626",
      "20071030083042626",
      "2007/10/30 08:30",
      "2007-10-30T08:30:42+09:00"
    ],
    [
      "20030629",
      "20030629PM063304071",
      "20030629183304071",
      "2003/06/29 18:33",
      "2003-06-29T18:33:04+09:00"
    ],
    [
      "20130807",
      "20130807PM082825025",
      "20130807202825025",
      "2013/08/07 20:28",
      "2013-08-07T20:28:25+09:00"
    ]
  ];
  
  dataProvider.setRows(data);
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
