/*eslint-disable*/

var fields = [
  {
      fieldName: "Year",
      dataType: "text",
  },
  {
      fieldName: "GDP",
      dataType: "number",
  },
  {
      fieldName: "GNI",
      dataType: "number",
  },
  {
      fieldName: "PGNI",
      dataType: "number",
  },
  {
      fieldName: "DIncome",
      dataType: "number",
  },
  {
      fieldName: "GDPName",
  },
  {
      fieldName: "GNIName",
  },
  {
      fieldName: "PGNIName",
  },
  {
      fieldName: "DIncomeName",
  },
];

var columns = [
  {
      name: "realchart",
      header: {
          text: "차트(리얼차트)",
      },
      renderer: {
          type: "renderer01",
      },
      editable: false,
      width: 428,
  },
  {
      name: "Year",
      fieldName: "Year",
      width: 70,
      header: {
          text: "년도",
      },
  },
  {
      name: "GDP",
      fieldName: "GDP",
      width: 150,
      header: {
          text: "GDP ($100 milion)",
      },
      styleName: "column-background1",
  },
  {
      name: "GNI",
      fieldName: "GNI",
      width: 150,
      header: {
          text: "GNI ($100 milion)",
      },
      styleName: "column-background2",
  },
  {
      name: "PGNI",
      fieldName: "PGNI",
      width: 150,
      header: {
          text: "PGNI ($)",
      },
      styleName: "column-background3",
  },
  {
      name: "DIncome",
      fieldName: "DIncome",
      width: 150,
      header: {
          text: "DIncome ($)",
      },
      styleName: "column-background4",
  },
  {
      name: "GDPName",
      fieldName: "GDPName",
      width: 150,
      header: {
          text: "GDP ($100 milion)",
      },
      styleName: "column-background1",
  },
  {
      name: "GNIName",
      fieldName: "GNIName",
      width: 150,
      header: {
          text: "GNI ($100 milion)",
      },
      styleName: "column-background2",
  },
  {
      name: "PGNIName",
      fieldName: "PGNIName",
      width: 150,
      header: {
          text: "PGNI ($)",
      },
      styleName: "column-background3",
  },
  {
      name: "DIncomeName",
      fieldName: "DIncomeName",
      width: 150,
      header: {
          text: "DIncome ($)",
      },
      styleName: "column-background4",
  },
];

var layout = [
  "Year",
  "realchart",
  {
      name: "g0",
      items: [
          {
              name: "g1",
              direction: "vertical",
              header: "이름",
              hideChildHeaders: true,
              items: ["GDPName", "GNIName", "PGNIName", "DIncomeName"],
          },
          {
              name: "g2",
              direction: "vertical",
              header: "비율(값)",
              hideChildHeaders: true,
              items: ["GDP", "GNI", "PGNI", "DIncome"],
          },
      ],
      header: { visible: false },
  },
];

var datas = [
  {
      Year: "1979",
      GDP: 640,
      GNI: 636,
      PGNI: 1693,
      DIncome: 1249,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1980",
      GDP: 643,
      GNI: 633,
      PGNI: 1660,
      DIncome: 1187,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1981",
      GDP: 724,
      GNI: 707,
      PGNI: 1826,
      DIncome: 1317,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1982",
      GDP: 775,
      GNI: 758,
      PGNI: 1927,
      DIncome: 1391,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1983",
      GDP: 859,
      GNI: 843,
      PGNI: 2113,
      DIncome: 1472,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1984",
      GDP: 949,
      GNI: 929,
      PGNI: 2300,
      DIncome: 1619,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1985",
      GDP: 984,
      GNI: 961,
      PGNI: 2355,
      DIncome: 1666,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1986",
      GDP: 1137,
      GNI: 1114,
      PGNI: 2702,
      DIncome: 1900,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1987",
      GDP: 1434,
      GNI: 1416,
      PGNI: 3402,
      DIncome: 2373,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1988",
      GDP: 1923,
      GNI: 1911,
      PGNI: 4548,
      DIncome: 3106,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1989",
      GDP: 2363,
      GNI: 2358,
      PGNI: 5556,
      DIncome: 3835,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1990",
      GDP: 2703,
      GNI: 2702,
      PGNI: 6303,
      DIncome: 4303,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1991",
      GDP: 3155,
      GNI: 3150,
      PGNI: 7276,
      DIncome: 5094,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1992",
      GDP: 3381,
      GNI: 3375,
      PGNI: 7714,
      DIncome: 5377,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1993",
      GDP: 3722,
      GNI: 3713,
      PGNI: 8402,
      DIncome: 5809,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1994",
      GDP: 4355,
      GNI: 4342,
      PGNI: 9727,
      DIncome: 6687,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1995",
      GDP: 5313,
      GNI: 5292,
      PGNI: 11735,
      DIncome: 7803,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1996",
      GDP: 5728,
      GNI: 5699,
      PGNI: 12518,
      DIncome: 8439,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1997",
      GDP: 5323,
      GNI: 5287,
      PGNI: 11505,
      DIncome: 7640,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1998",
      GDP: 3582,
      GNI: 3521,
      PGNI: 7607,
      DIncome: 5336,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "1999",
      GDP: 4616,
      GNI: 4558,
      PGNI: 9778,
      DIncome: 6549,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2000",
      GDP: 5335,
      GNI: 5308,
      PGNI: 11292,
      DIncome: 7187,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2001",
      GDP: 5046,
      GNI: 5035,
      PGNI: 10631,
      DIncome: 6583,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2002",
      GDP: 5759,
      GNI: 5762,
      PGNI: 12100,
      DIncome: 7197,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2003",
      GDP: 6436,
      GNI: 6442,
      PGNI: 13460,
      DIncome: 8137,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2004",
      GDP: 7224,
      GNI: 7245,
      PGNI: 15082,
      DIncome: 9107,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2005",
      GDP: 8447,
      GNI: 8439,
      PGNI: 17531,
      DIncome: 10621,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2006",
      GDP: 9511,
      GNI: 9525,
      PGNI: 19691,
      DIncome: 11810,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2007",
      GDP: 10493,
      GNI: 10512,
      PGNI: 21632,
      DIncome: 12666,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2008",
      GDP: 9309,
      GNI: 9379,
      PGNI: 19161,
      DIncome: 11240,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2009",
      GDP: 8344,
      GNI: 8381,
      PGNI: 17041,
      DIncome: 10057,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2010",
      GDP: 10147,
      GNI: 10160,
      PGNI: 20562,
      DIncome: 11796,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2011",
      GDP: 11147,
      GNI: 11176,
      PGNI: 22451,
      DIncome: 12906,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
  {
      Year: "2012",
      GDP: 11292,
      GNI: 11355,
      PGNI: 22708,
      DIncome: 13150,
      GDPName: "GDP ($100 milion)",
      GNIName: "GNI ($100 milion)",
      PGNIName: "DIncome ($)",
      DIncomeName: "GDP ($100 milion)",
  },
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
let config;

function createGrid(container) {
  RealGrid.setLocale('en');
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);

  gridView.displayOptions.emptyMessage = "There is no data to display.";
  gridView.displayOptions.rowHeight = 200;
  gridView.header.height = 40;
  gridView.footers.visible = false;
  gridView.stateBar.visible = false;
  gridView.checkBar.visible = false;
  gridView.editOptions.insertable = true;
  gridView.editOptions.appendable = true;

  gridView.registerCustomRenderer("renderer01", {
      initContent: function (parent) {
          var div = (this._div = document.createElement("div"));
          div.className = "custom_render_div";
          parent.appendChild(div);

          config = {
              title: {
                  visible:false
              },
              series: [
                  {
                      type: "pie",
                      pointLabel: {
                          visible: true,
                          position: "outside",
                          text: "${name}",
                      },
                      data: [
                          { name: "GDP", y: 10 },
                          { name: "GNI", y: 20 },
                          { name: "PGNI", y: 20 },
                          { name: "DIncome", y: 20 },
                      ],
                  },
              ],
          };
          this._rChart = RealChart.createChart(document, div, config);
      },

      clearContent: function (parent) {
          this._rChart = null;
      },

      render: function (grid, model, width, height, info) {
          var data = grid.getValues(model.index.itemIndex);
          var d = [];
          d[0] = [data.GDPName, data.GDP, "#7cb5ec"];
          d[1] = [data.GNIName, data.GNI, "#434348"];
          d[2] = [data.PGNIName, data.PGNI, "#90ed7d"];
          d[3] = [data.DIncomeName, data.DIncome, "#f7a35c"];

          config.series[0].data = d.map(([name, value, color]) => ({
              name,
              y: value,
              color: color,
          }));
          this._rChart.load(config);
      },
  });

  gridView.setColumns(columns);
  gridView.setColumnLayout(layout);
  dataProvider.fillJsonData(datas);
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
