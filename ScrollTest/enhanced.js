
var fields = [
  {fieldName: "category"},
  {fieldName: "partNo"},
  {fieldName: "demandSite"},
  {fieldName: "revision"},
  {fieldName: "measure"},
  {fieldName: "workInProcess"},
  {fieldName: "onHand"},
  {fieldName: "boolean1"},
  {fieldName: "intransitQty", dataType: "number"}
];

var columns = [
  {name: "category", fieldName: "category", header: "Category", width: 60, mergeRule: "value + values['partNo']"},
  {name: "partNo", fieldName: "partNo", header: "Part No", width: 90, styleName: "white-column", equalBlank: true},
  {name: "demandSite", fieldName: "demandSite", header: "Demand Site", width: 60, mergeRule: "value + values['partNo']"},
  {name: "revision", fieldName: "revision", header: "Revision", width: 60, editor:{type:"dropdown", values:["1","2"], labels:["일","이"]}},
  {name: "measure", fieldName: "measure", header: "Measure", width: 90, styleName: "measure-column"},
  {name: "workInProcess", fieldName: "workInProcess", header: "Work In Process", width: 60, editor:{type:"date"}},
  {name: "onHand", fieldName: "onHand", header: "On Hand", width: 60, editor: {type:"multiline"}},
  {name: "boolean1", fieldName: "boolean1", renderer: {type: "check"}},
  {name: "intransitQty", fieldName: "intransitQty", header: "Intransit Qty", width: 60, styleName: "number-column"}
];


var ds, grid;
var changeTimer;
var callCnt = 0;


function createGrid(container) {
  window.ds = ds = new RealGrid.LocalDataProvider(true);
  ds.setFields(fields);
  
  window.grid = grid = new RealGrid.GridView(container);
  grid.displayOptions.refreshMode = "recycle";
  grid.setDataSource(ds);

  grid.setHeader({resizable:true, height:40});
  // grid.headerSummaries.visible = true; 

  grid.setColumns(columns);

  // return;
  grid.displayOptions.minTableRowHeight = grid.displayOptions.rowHeight = 20;
  grid.displayOptions.useAlternateRowStyle = false;

  grid.formatOptions.numberFormat = null;
  grid.rowIndicator.width = 40;

  grid.setCellStyleCallback(cellStyleCallback);

  ds.restoreMode = "explicit";
   
}

function start() {
  createGrid("realgrid");
  window.addEventListener("resize", resizeHandler, false);
  setActions && setActions("actions");
  resizeHandler(null);
}

function resizeHandler(e) {

  var h1 = document.getElementById("actions").offsetHeight;
  var h2 = document.body.offsetHeight;
  document.getElementById("realgrid").style.height = (h2 - h1 - 10)+"px";

}

const cellStyleCallback = (grid, dataCell) => {
  // console.log(dataCell.index.itemIndex, callCnt++);
  const measure = grid.getValue(dataCell.index.itemIndex, "measure")
  const vindex = dataCell.dataColumn.layout.vindex;
  // if (dataCell.index.itemIndex === 3 && dataCell.dataColumn.name === "category") {
  //     debugger;
  // }
  // if (dataCell.index.itemIndex === 3 && dataCell.dataColumn.name === "intransitQty") {
  //     debugger;
  // }

  if (dataCell.dataColumn.fieldName === "intransitQty") {
      return "";
  }
  if ( vindex < 4 || vindex === 7) {
      return;
  }
  const num_col = vindex < 7 ? "left-column" : "number-column"
  if ( measure === "MSP") {
      return num_col + " msp-data";
  } else if (measure === "Bal(P-R)") {
      return num_col + " bal-data"
  } else if (measure === "TEST") {
      return "small-font"
  }
};

function setActions(actionContainer) {
  const dateToStr = (indate, seperator="", ymd="YMD") => {
      const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      if (!indate || !(indate instanceof Date)) {
          return "";
      }

      const year = `${indate.getFullYear()}`;
      const month = `${("00"+(indate.getMonth()+1)).substr(-2)}`;
      const date = `${("00"+(indate.getDate())).substr(-2)}`;
      switch (ymd.toUpperCase()) {
          case "Y":
              return year;
          case "YM": 
              return `${year}${seperator}${month}`;
          case "MD":
              return `${month}${seperator}${date}`;
          case "MDW":
              return `${month}${seperator}${date} ${weeks[indate.getDay()]}`;
          case "W": 
              return `${weeks[indate.getDay()]}`
          case "YMD":
          default:
              return `${year}${seperator}${month}${seperator}${date}`;
      }
  }

  const initDate = () => {
      const now = new Date();
      const d1 = new Date(now.getFullYear(), now.getMonth(), 0);
      const d2 = new Date(now.getFullYear(), now.getMonth() + 6, 0);

      const date1 = document.getElementById("date1");
      const date2 = document.getElementById("date2");
      date1.value = dateToStr(d1, "-");
      date2.value = dateToStr(d2, "-");
  }

  initDate();


  function addColumns() {
      const d1 = new Date(document.getElementById("date1").value);
      const d2 = new Date(document.getElementById("date2").value);
      let date = new Date(d1);
      
      const cols = columns.slice();
      const flds = fields.slice();

      let preMonth = null;
      while(date.getTime() < d2.getTime()) {
          const fName = `${dateToStr(date)}`
          flds.push({
              fieldName: fName,
              dataType: "number"
          });
          cols.push({fieldName: fName, name: fName, width: 45, 
              styleName: "number-column",
              header:{text: dateToStr(date, "/", "MDW"), styleName:`${dateToStr(date, "", "W")}-header`},
          });
          
          date = new Date(date.getTime() + ( 24 * 60 * 60 * 1000));
          if (date.getMonth() !== preMonth) {

              const month = dateToStr(new Date(date.getFullYear(), date.getMonth(), 0), "", "YM");
              const fieldName = month+"-tot"
              flds.push({fieldName, dataType: "number"});
              cols.push({fieldName, name:month, width: 50, styleName: "number-column", header: {text: month+" Sum", styleName:"tot-header"}})
              preMonth = date.getMonth();
          }
      }
      ds.setFields(flds);
      grid.setColumns(cols);
  };

  const setData = () => {
      const sites = ["Remained PO", "Forecast", "MSP", "ERP Delivery", "Bal(P-R)", "Inv.Balance", "TEST"];
      const vals = [];
      const _partNo = "6870C-";
      const fieldNames = ds.getOrgFieldNames();
      for (let i = 0; i < 3500; i++) {
          let partNo = _partNo + ("00000" + i.toString(16).toUpperCase()).substr(-5);
          for (let j = 0; j < sites.length; j++) {
              const val = {
                  category: "PCB",
                  demandSite: "S1",
                  intransitQty: i*10+j,
                  measure: sites[j],
                  partNo
              }
              
              fieldNames.forEach((name, index) => {
                  if (index >= fields.length) {
                      val[name] = sites[j] === "TEST" ? name.substr(-4) : Math.round(Math.random()* 1000);
                  }
              })
              vals.push(val);
          }
      }
      ds.setRows(vals);
  }
  

  createButton(actionContainer, "addColumns",function(e) {
      grid.rowIndicator.width = 40;
      addColumns();
      setData();
  });

  /*
  createCheckBox(actionContainer, "Fixed Columns", function (e) {
      grid.setFixedOptions({colCount: e.currentTarget.checked ? 8 : 0})
  });

  // test
  createCheckBox(actionContainer, "Right Columns", function (e) {
      grid.setFixedOptions({rightCount: e.currentTarget.checked ? 2 : 0})
  });

  // test
  createCheckBox(actionContainer, "fixed Row", function (e) {
      grid.setFixedOptions({rowCount: e.currentTarget.checked ? 2 : 0})
  });

  createListBox(actionContainer, "refreshMode", [ "all", "visibleOnly", "recycle"], function(e) {
      grid.displayOptions.refreshMode = e.target.value
  }, "recycle");

  createListBox(actionContainer, "fitStyle", ["fill", "even", "evenFill", "none"], function(e) {
      var fill = e.target.value;
      grid.displayOptions.fitStyle = fill;
  }, "none")

  createCheckBox(actionContainer, "groupPanel", function(e) {
      grid.groupPanel.visible = e.target.checked;
  }, true)

  createCheckBox(actionContainer, "rowBarContainer", function(e) {
      grid.rowIndicator.visible = grid.stateBar.visible = grid.checkBar.visible = e.target.checked;
  }, true);

  createCheckBox(actionContainer, "topChangeTimer", function(e) {
      if (e.target.checked) {
          grid.onTopIndexChanged = () => {
              if (changeTimer) {
                  clearTimeout(changeTimer);
                  changeTimer = null;
              }
              changeTimer = setTimeout(() => {
                  console.log("refresh Timer")
                  grid.refresh(true);
              }, 500);
          }
      } else {
          clearTimeout(changeTimer);
          grid.onTopIndexChanged = undefined;
      }   
  })

  createCheckBox(actionContainer, "viewGridInside", function(e) {
      grid.editorOptions.viewGridInside = e.target.checked;
  });

  createCheckBox(actionContainer, "cellStyleCallback", function(e) {
      grid.setCellStyleCallback(e.target.checked ? cellStyleCallback : undefined);
  }, true)

  createCheckBox(actionContainer, "liveScroll", function(e) {
      grid.displayOptions.liveScroll = e.target.checked;
  }, true)
  */
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