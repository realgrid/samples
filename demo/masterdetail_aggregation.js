RealGridJS.setRootContext("../lib");

var grdMain, grdSub;
var dpMain, dpSub;
var subRows = [];
var mainRows = [];
var inputNumStyle = {
	numberFormat:"#,##0",
	textAlignment:"far"
	,background:"#E5E0B1"
};
var numStyle = {
	numberFormat:"#,##0",
	textAlignment:"far"
};
var numStyle2 = {
	numberFormat:"#,##0.0",
	textAlignment:"far",
	suffix:" %"
};

window.onload = function () {
	RealGridJS.setTrace(false);
	RealGridJS.setDebug(false);

	dpMain = new RealGridJS.LocalDataProvider();
	setFields(dpMain);

	dpSub = new RealGridJS.LocalDataProvider();
	setSubFields(dpSub);

	grdMain = new RealGridJS.GridView("grdMain");
	setColumns(grdMain);
	grdMain.setDataSource(dpMain);

	grdSub = new RealGridJS.GridView("grdSub");
	setSubColumns(grdSub);
	grdSub.setDataSource(dpSub);

	grdMain.setOptions( {
		select:{
			 style:"rows"
		},
		copy: {
			datetimeFormat:"yyyy-MM-dd",
			booleanFormat:"F:T"
		},
		paste:{
			numberChars:[","],
			datetimeFormats:["yyyy-MM-dd HH:mm:ss"],
			startEdit:true,
			commitEdit:true,
			booleanFormat:"N,F,false:Y,T:1"
		},
		display: {
			rowResizable:true
		},
		edit:{
			editable:false
		},
		rowGroup:{
			mergeMode:true,
			collapsedAdornments:"footer",
			expandedAdornments:"footer"
		},
		header:{
			height:69
		},
		display:{
			rowHeight:30
		},
		indicator:{
			visible:false
		},
		checkBar:{
			visible:false
		},
		stateBar:{
			visible:false
		},
		panel:{
			visible:false
		},
		footer:{
  		height: 30
		}
	});

	dpMain.setOptions({
		checkStates:true
	})


	grdSub.setOptions({
	  body:{
	   rowStylesFirst: false
	  },
		header:{
			height:69
		},
		display:{
			rowHeight:30
		},
		filtering:{
			handleVisibility:"hidden"
		},
		indicator:{
			visible:false
		},
		checkBar:{
			visible:false
		},
		stateBar:{
			visible:false
		},
		panel:{
			visible:false
		},
		footer:{
  		height: 30
		},
		paste:{
		  enableAppend: false
		}
	})

	grdSub.onEditCommit = function (grid, index, oldValue, newValue) {
		if (index.column === "curplanqty") {
			var stdcost = grid.getValue(index.itemIndex, "stdcost");
			grid.setValue(index.itemIndex,"curplanamt", stdcost * newValue);
		}
	};

	grdSub.onEditRowChanged = function (grid, itemIndex, dataRow, field, oldValue, newValue) {
		if (field === dpSub.getFieldIndex("curplanqty") ){
			grid.commit();
		}
	};

  dpSub.onRowUpdated = function (provider, row) {
    if (provider.getRowCount() > 0) {    
      var curplanamt = provider.getValue(row,"curplanqty") * provider.getValue(row,"stdcost");
      provider.setValue(row, "curplanamt",curplanamt);
    
      setTimeout(function() {
        var amtsum = grdSub.getSummary("curplanamt","sum");
        var row = grdMain.getCurrent().dataRow;
        var datas = dpMain.getJsonRow(row);
      
        datas["curplanamt"] = amtsum;
      
        datas["planrate"] = ( (amtsum/ datas["befplanamt"] - 1 )*100).toFixed(1);
        datas["elongrate"] = ( (amtsum/ datas["saleamt"] - 1 )*100).toFixed(1);
        
        dpMain.updateRow(row, datas);
      },100);
    }
  }
	setData();

	grdMain.onCurrentRowChanged = function (grid, oldRow, newRow) {
		// 영업팀 + 고객인가. 또는 고객만인가?? 영업팀 + 고객으로 filter를 만들자.
		if ( newRow < 0) {
			return;
		}
		var saleteam = grid.getDataSource().getValue(newRow,"saleteam");
		var customcode = grid.getDataSource().getValue(newRow,"customcode");

		grdSub.beginUpdate();
		try {
			grdSub.clearColumnFilters("saleteam");
			grdSub.clearColumnFilters("customcode");
			grdSub.setColumnFilters("saleteam",[{criteria:"value='"+saleteam+"'", name:"stfilter1",text:"영업팀",active:true}]);
			grdSub.setColumnFilters("customcode",[{criteria:"value='"+customcode+"'", name:"stfilter2",text:"고객코드",active:true}]);

			if (dpSub.getRowCount() <= 0) {
				dpSub.setRows(subRows);
			}
		}
		finally {
			grdSub.endUpdate();
		}
	};
	setStyles(grdMain);
	setStyles(grdSub);

	grdMain.resetCurrent();
	
};

function setStyles(grid) {
	grid.setStyles({
	  grid: {
	    fontSize:14, 
	    fontFamily:"맑은 고딕"
	  },
		body:{
			borderBottom:"#FF808080,1px",
			borderRight:"#FF808080,1px"
		},
		header:{background:"#70ad47", foreground:"#FFFFFFFF", fontBold:true, fontSize:14, fontFamily:"맑은 고딕", hoveredBackground:"#a070ad47", selectedBackground:"#769636",
				group:{background:"#70ad47", foreground:"#FFFFFFFF", fontBold:true, fontSize:14, fontFamily:"맑은 고딕"},
				renderer:{type:"shape"},
				"figureBackground": "#ff0000ff","figureName": "diamond"
		},		
		selection:{border:"#00000000,0"},
		footer:{
		  background:"#DBDBDB"
		}
	});
}

function setFields(provider) {
	var fields = [	{"fieldName":"saleteam"},
					{fieldName:"customcode", dataType:"text"},
					{fieldName:"customname", dataType:"text"},
					{fieldName:"befplanamt", dataType:"number"},
					{fieldName:"curplanamt", dataType:"number"},
					{fieldName:"planrate", dataType:"number"},
					{fieldName:"saleamt", dataType:"number"},
					{fieldName:"elongrate", dataType:"number"}
	             ];
	provider.setFields(fields);
};

function setSubFields(provider) {
	var fields = [	{"fieldName":"saleteam"},
					{fieldName:"customcode", dataType:"text"},
					{fieldName:"customname", dataType:"text"},
					{fieldName:"prodcode"},
					{fieldName:"prodname"},
					{fieldName:"stdcost", dataType:"number"},
					{fieldName:"befplanqty", dataType:"number"},
					{fieldName:"befplanamt", dataType:"number"},
					{fieldName:"curplanqty", dataType:"number"},
					{fieldName:"curplanamt", dataType:"number"},
					{fieldName:"planrate", dataType:"number"},
					{fieldName:"saleamt", dataType:"number"},
					{fieldName:"elongrate", dataType:"number"},
					{fieldName:"plankg", dataType:"number"}
	             ];
	provider.setFields(fields);
};

function setColumns(grid) {
	var columns = [{fieldName:"saleteam", header:{text:"영업팀"}, mergeRule:{ criteria: "value" }, styles:{lineAlignment: "near"}},
					{fieldName:"customcode", header:{text:"고객코드"}},
					{fieldName:"customname", header:{text:"고객명"}},
					{
						type:"group",
						width:650,
						header:{text:"2014-M11"},
						columns:[
							{fieldName:"befplanamt",name:"befplanamt",width:130,header:{text:"15년 사업계획(Amt)"},styles:numStyle,footer:{expression:"sum", groupExpression:"sum", styles:numStyle}},
							{fieldName:"curplanamt",name:"curplanamt",width:130,header:{text:"사업계획(Amt)"},styles:numStyle,footer:{expression:"sum", groupExpression:"sum", styles:numStyle}},
							{fieldName:"planrate",name:"planrate",width:130,header:{text:"전년 사업계획대비 신장율"},styles:numStyle2,footer:{expression:"avg", groupExpression:"avg", styles:numStyle2}},
							{fieldName:"saleamt",name:"saleamt",width:130,header:{text:"전년 NR 실적(Amt)"},styles:numStyle,footer:{expression:"sum", groupExpression:"sum", styles:numStyle}},
							{fieldName:"elongrate",name:"elongrate",width:130,header:{text:"전년대비 신장율"},styles:numStyle2,footer:{expression:"avg", groupExpression:"avg", styles:numStyle2}}
						]
					}
	             ];
	grid.setColumns(columns);
};

function setSubColumns(grid) {
	var columns = [{"fieldName":"saleteam", name:"saleteam",header:{text:"영업팀"}, mergeRule:{ criteria: "value" }, styles:{lineAlignment: "near"}, editable:false},
					{fieldName:"customcode", name:"customcode", header:{text:"고객코드"}, visible:false},
					{fieldName:"customname", name:"customname", header:{text:"고객명"}, visible:false},
					{fieldName:"prodcode", name:"prodcode", width:80, nameheader:{text:"제품코드"}, editable:false},
					{fieldName:"prodname",name:"prodname", header:{text:"제품명"}, editable:false},
					{fieldName:"stdcost", name:"stdcost", header:{text:"표준출고가"},styles:numStyle, editable:false},
					{
						type:"group",
						header:{text:"2016-01"},
						width:600,
						columns:[
							{fieldName:"befplanqty",name:"befplanqty", header:{text:"15년 사업계획\n(Qty)"},styles:numStyle, editable:false, footer:{expression:"sum", styles:numStyle}},
							{fieldName:"befplanamt",name:"befplanamt", header:{text:"15년 사업계획\n(Amt)"},styles:numStyle, editable:false, footer:{expression:"sum", styles:numStyle}},
							{fieldName:"curplanqty",name:"curplanqty", header:{text:"사업계획\n(Qty)"},styles:inputNumStyle, footer:{expression:"sum", styles:numStyle}},
							{fieldName:"curplanamt",name:"curplanamt", header:{text:"사업계획\n(Amt)"},styles:numStyle, editable:false,footer:{expression:"sum", styles:numStyle}},
							{fieldName:"plankg",name:"plankg", header:{text:"사업계획(KG)"}, styles:numStyle, editable:false, footer:{expression:"sum", styles:numStyle}}
						]
					}
	             ];
	grid.setColumns(columns);
};

function setData() {
	subRows = [];
	var so = ["종로구","중구","용산구","성동구","광진구",
	          "동대문구","중랑구","성북구","강북구","노원구",
	          "도봉구","은평구","서대문구","마포구","양천구",
	          "강서구","구로구","금천구","영등포구","동작구",
	          "관악구","서초구","강남구","송파구","강동구"];

	var custombefamt = 0;
	var customcuramt = 0;
	for (var s in so) {
		for (var i = 1001; i <= 1010; i++) {
			for (var p = 1 ; p <= 25; p++) {
				subRows.push({
					"saleteam":so[s],
					"customcode":i,
					"customname":"고객"+i.toString(),
					"prodcode":p,
					"prodname":"제품"+p.toString(),
					"stdcost":i*p,
					"befplanqty":i,
					"befplanamt":i*p*i,
					"curplanqty":i+100,
					"curplanamt":i*p*(i+100),
					"plankg":i*p*(i+100),
				});
				custombefamt += i*p*i;
				customcuramt += i*p*(i+100);
			};
			// 고객별 제품합계

			var saleamt = Math.round(custombefamt*0.91);
			mainRows.push({
				"saleteam":so[s],
				"customcode":i,
				"customname":"고객"+i.toString(),
				"befplanamt":custombefamt,
				"curplanamt":customcuramt,
				"planrate": ((customcuramt/custombefamt-1)* 100).toFixed(1),
				"saleamt":saleamt,
				"elongrate":((customcuramt/saleamt-1)* 100).toFixed(1),
			});

			customcuramt = 0;
			custombefamt = 0;

		}
	};

	dpMain.setRows(mainRows);

};
