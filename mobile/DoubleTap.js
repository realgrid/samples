var grdMain, dataProvider, grdMain2, dataProvider2;

$(window).bind("orientationchange", function(event) {
	$(document).ready(function(){
		dWidth = $(window).width() * 0.8;
		dheight = $(window).height() * 0.8;
	});
	setDialog();
});

$(document).ready(function() {
	dWidth = $(window).width() * 0.8;
	dheight = $(window).height() * 0.8;
	setupJS("grdMain", "100%", "95%");
	setupJS("grdMain2", "100%", "95%");
	setDialog();
});

function setupJS(id, width, hegiht) {
	$("html, body").css({
		width : "100%",
		height : "100%"
	});
	$("#grdMain").css({
		width : "100%",
		height : "95%"
	});
	RealGridJS.setRootContext("../lib");
	if (id == "grdMain") {
		dataProvider = new RealGridJS.LocalDataProvider();
		grdMain = new RealGridJS.GridView(id);
		grdMain.setDataSource(dataProvider);

		setFields(dataProvider);
		setColumns(grdMain);
		setOptions(grdMain, dataProvider);
		setStyles(grdMain);

		loadData(dataProvider);

		cfnOrientationGrid(grdMain);
		
		grdMain.onDataCellDblClicked = function(grid, index){
			dataProvider2.setRows([ dataProvider.getJsonRow(index.dataRow) ]);
			$("#grdMain2").dialog("open");
		}
	} else {
		dataProvider2 = new RealGridJS.LocalDataProvider();
		grdMain2 = new RealGridJS.GridView(id);
		grdMain2.setDataSource(dataProvider2);

		setFields(dataProvider2);
		setColumns2(grdMain2);
		setOptions(grdMain2, dataProvider2);
		setStyles(grdMain2);
	}
}


function setFields(provider) {
	var fields = [ {
		fieldName : "OrderID"
	}, {
		fieldName : "CustomerID"
	}, {
		fieldName : "EmployeeID"
	}, {
		fieldName : "OrderDate",
		dataType : "datetime"
	}, {
		fieldName : "CompanyName"
	}, {
		fieldName : "Country"
	}, {
		fieldName : "Phone"
	}, {
		fieldName : "ProductName"
	}, {
		fieldName : "QuantityPerUnit"
	}, {
		fieldName : "Quantity",
		dataType : "number"
	}, {
		fieldName : "UnitPrice",
		dataType : "number"
	} ];

	provider.setFields(fields);
}

function setColumns(grid) {
	var columns = [ {
		name : "OrderID",
		fieldName : "OrderID",
		type : "data",
		width : 90*2,
		styles : {
			textAlignment : "center"
		},
		header : {
			text : "Order"
		}
	}, {
		name : "CustomerID",
		fieldName : "CustomerID",
		width : 130*2,
		styles : {
			textAlignment : "center"
		},
		header : {
			text : "Customer ID"
		}
	}, {
		name : "OrderDate",
		fieldName : "OrderDate",
		width : 130*2,
		styles : {
			textAlignment : "center"
		},
		header : {
			text : "Order Date"
		}
	}, {
		name : "Phone",
		fieldName : "Phone",
		width : 300,
		styles : {
			textAlignment : "near"
		},
		header : {
			text : "Phone"
		}
	} ];

	grid.setColumns(columns);
}

function setColumns2(grid) {
	var columns = [ {
		type : "group",
		orientation : "vertical",
		header : {
			visible : false
		},
		name : "rootGroup",
		width : 300*2,
		columns : [ {
			type : "group",
			name : "node1_1",
			width : 300*2,
			header : {
				visible : false
			},
			columns : [ {
				type : "group",
				orientation : "vertical",
				header : {
					visible : false
				},
				name : "node1_1_1",
				columns : [ {
					width : 90*2,
					name : "OrderID_col",
					styles : {
						background : "#ff1679b2",
						foreground : "#ffffffff",
						textAlignment : "center"
					},
					lookupDisplay : true,
					values : [ undefined ],
					labels : [ "OrderID" ]
				}, {
					name : "OrderID",
					fieldName : "OrderID",
					type : "data",
					width : 90*2,
					fillwidth : 1,
					styles : {
						textAlignment : "center"
					},
					header : {
						text : "Order"
					}
				} ]
			}, {
				type : "group",
				orientation : "vertical",
				header : {
					visible : false
				},
				name : "node1_1_2",
				columns : [ {
					width : 90*2,
					styles : {
						background : "#ff1679b2",
						foreground : "#ffffffff",
						textAlignment : "center"
					},
					lookupDisplay : true,
					values : [ undefined ],
					labels : [ "CustomerID" ]
				}, {
					name : "CustomerID",
					fieldName : "CustomerID",
					width : 130*2,
					fillwidth : 1,
					styles : {
						textAlignment : "center"
					},
					header : {
						text : "Customer ID"
					}
				} ]
			} ]
		}, {
			type : "group",
			name : "node1_2",
			width : 300*2,
			header : {
				visible : false
			},
			columns : [ {
				type : "group",
				orientation : "vertical",
				header : {
					visible : false
				},
				name : "node1_2_1",
				columns : [ {
					width : 90*2,
					styles : {
						background : "#ff1679b2",
						foreground : "#ffffffff",
						textAlignment : "center"
					},
					lookupDisplay : true,
					values : [ undefined ],
					labels : [ "EmployeeID" ]
				}, {
					name : "EmployeeID",
					fieldName : "EmployeeID",
					width : 100*2,
					fillwidth : 1,
					styles : {
						textAlignment : "center"
					},
					header : {
						text : "Employee ID"
					}
				} ]
			}, {
				type : "group",
				orientation : "vertical",
				header : {
					visible : false
				},
				name : "node1_2_2",
				columns : [ {
					width : 90*2,
					styles : {
						background : "#ff1679b2",
						foreground : "#ffffffff",
						textAlignment : "center"
					},
					lookupDisplay : true,
					values : [ undefined ],
					labels : [ "Order Date" ]
				}, {
					name : "OrderDate",
					fieldName : "OrderDate",
					width : 130*2,
					fillwidth : 1,
					styles : {
						textAlignment : "center"
					},
					header : {
						text : "Order Date"
					}
				} ]
			} ]
		}, {
			type : "group",
			orientation : "vertical",
			header : {
				visible : false
			},
			name : "node2_1",
			width : 300*2,
			columns : [ {
				width : 90*2,
				styles : {
					background : "#ff1679b2",
					foreground : "#ffffffff",
					textAlignment : "center"
				},
				lookupDisplay : true,
				values : [ undefined ],
				labels : [ "Company Name" ]
			}, {
				name : "CompanyName",
				fieldName : "CompanyName",
				width : 100*2,
				fillwidth : 1,
				styles : {
					textAlignment : "center"
				},
				header : {
					text : "Company Name"
				}
			} ]
		}, {
			type : "group",
			name : "node1_3",
			width : 300*2,
			header : {
				visible : false
			},
			columns : [ {
				type : "group",
				orientation : "vertical",
				header : {
					visible : false
				},
				name : "node1_3_1",
				columns : [ {
					width : 90*2,
					styles : {
						background : "#ff1679b2",
						foreground : "#ffffffff",
						textAlignment : "center"
					},
					lookupDisplay : true,
					values : [ undefined ],
					labels : [ "Country" ]
				}, {
					name : "Country",
					fieldName : "Country",
					width : 70*2,
					fillwidth : 1,
					styles : {
						textAlignment : "center"
					},
					header : {
						text : "Country"
					}
				} ]
			}, {
				type : "group",
				orientation : "vertical",
				header : {
					visible : false
				},
				name : "node1_3_2",
				columns : [ {
					width : 90*2,
					styles : {
						background : "#ff1679b2",
						foreground : "#ffffffff",
						textAlignment : "center"
					},
					lookupDisplay : true,
					values : [ undefined ],
					labels : [ "Phone" ]
				}, {
					name : "Phone",
					fieldName : "Phone",
					width : 80*2,
					fillwidth : 1,
					styles : {
						textAlignment : "center"
					},
					header : {
						text : "Phone"
					}
				} ]
			} ]
		}, {
			type : "group",
			orientation : "vertical",
			header : {
				visible : false
			},
			name : "node2_2",
			columns : [ {
				width : 90*2,
				styles : {
					background : "#ff1679b2",
					foreground : "#ffffffff",
					textAlignment : "center"
				},
				lookupDisplay : true,
				values : [ undefined ],
				labels : [ "Product Name" ]
			}, {
				name : "ProductName",
				fieldName : "ProductName",
				width : 200*2,
				fillwidth : 1,
				styles : {
					textAlignment : "center"
				},
				header : {
					text : "Product Name"
				}
			} ]
		}, {
			type : "group",
			orientation : "vertical",
			header : {
				visible : false
			},
			name : "node2_3",
			columns : [ {
				width : 90*2,
				styles : {
					background : "#ff1679b2",
					foreground : "#ffffffff",
					textAlignment : "center"
				},
				lookupDisplay : true,
				values : [ undefined ],
				labels : [ "Quantity / Unit" ]
			}, {
				name : "QuantityPerUnit",
				fieldName : "QuantityPerUnit",
				width : 100*2,
				fillwidth : 1,
				styles : {
					textAlignment : "center"
				},
				header : {
					text : "Quantity / Unit"
				}
			} ]
		}, {
			type : "group",
			name : "node1_4",
			width : 300*2,
			header : {
				visible : false
			},
			columns : [ {
				type : "group",
				orientation : "vertical",
				header : {
					visible : false
				},
				name : "node1_4_1",
				columns : [ {
					width : 90*2,
					styles : {
						background : "#ff1679b2",
						foreground : "#ffffffff",
						textAlignment : "center"
					},
					lookupDisplay : true,
					values : [ undefined ],
					labels : [ "Quantity" ]
				}, {
					name : "Quantity",
					fieldName : "Quantity",
					width : 100*2,
					fillwidth : 1,
					styles : {
						textAlignment : "center"
					},
					header : {
						text : "Quantity"
					}
				} ]
			}, {
				type : "group",
				orientation : "vertical",
				header : {
					visible : false
				},
				name : "node1_4_2",
				columns : [ {
					width : 90*2,
					styles : {
						background : "#ff1679b2",
						foreground : "#ffffffff",
						textAlignment : "center"
					},
					lookupDisplay : true,
					values : [ undefined ],
					labels : [ "Unit Price" ]
				}, {
					name : "UnitPrice",
					fieldName : "UnitPrice",
					width : 100*2,
					fillwidth : 1,
					styles : {
						textAlignment : "center"
					},
					header : {
						text : "Unit Price"
					}
				} ]
			} ]
		} ]
	} ];

	grid.setColumns(columns);
}

function setStyles(grid) {
	grid.setStyles(generalBlueSkin);
	grid.setStyles({
		body : {
			dynamicStyles : [ {
				criteria : "checked",
				styles : "background=#3300ff00"
			} ]
		}
	});
}

function setOptions(grid, provider) {
	if (grid == grdMain) {
		grid.setOptions({
			display : {
				fitStyle : "even"
			},
			statesBar : {
				visible : false
			},
			edit : {
				editable : false
			}
		});
	} else {
		grid.setOptions({
			display : {
				fitStyle : "fill",
				rowHeight : 230
			},
			panel : {
				visible : false
			},
			indicator : {
				visible : false
			},
			stateBar : {
				visible : false
			},
			checkBar : {
				visible : false
			},
			edit : {
				editable : false
			},
			header : {
				visible : false
			},
			footer : {
				visible : false
			},
			select : {
				style : "none"
			}
		});

		grid.setDisplayOptions({
			rowHeight : 330
		});
	}

	provider.setOptions({
		datetimeFormat : "yyyy-MM-dd a hh:mm:ss",
		amText : "오전",
		pmText : "오후"
	});
}

function loadData(provider) {
	provider.fillJsonData(mobileData);
}

function setDialog() {
	var osAnd = isMobile.Android();
	if(osAnd){
		$("#grdMain2").dialog({
			autoOpen : false,
			height : dheight,
			width : dWidth,
			show : {
				effect : "blind",
				duration : 500,
			},
			open : function() {
				if (grdMain2){
					grdMain2.resetSize();
					grdMain2.setDisplayOptions({rowHeight : 430});
				}
			},
			hide : {
				effect : "blind",
				duration : 500
			}
		});
	}else{
		$("#grdMain2").dialog({
			autoOpen : false,
			height : dheight,
			width : dWidth,
			show : {
				effect : "blind",
				duration : 500,
			},
			open : function() {
				if (grdMain2){
					grdMain2.resetSize();
					grdMain2.setDisplayOptions({rowHeight : 430});
				}
			},
			hide : {
				effect : "blind",
				duration : 500
			}
		});
	}
}