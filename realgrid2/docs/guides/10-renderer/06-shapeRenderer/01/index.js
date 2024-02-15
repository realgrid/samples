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
      width: "80",
      renderer: {
        type: "shape",
        shape: "star"
      },
      header: {
        text: "도형의 종류",
        styleName: "orange-column"
      }
    },
    {
      name: "Gender",
      fieldName: "Gender",
      width: "100",
      renderer: {
          type: "shape",
          shapeMap: {
              "남": "plus",
              "여": "minus"
          },
          shapeHeight: 15,
          shapeWidth: 15
      },
      header: {
        text: "Shape Map",
        styleName: "orange-column"
      }
    },
    {
      name: "Month",
      fieldName: "Month",
      width: "70",
      renderer: {
        type: "shape",
        shapeCallback: function (grid, cell) {
            var value = cell.value;
            var retValue;

            if (value < 10) {
              retValue = 'downarrow';
            } else if (value < 20) {
              retValue = 'itriangle';
            } else if (value < 30) {
              retValue = 'triangle';  
            } else {
              retValue = 'uparrow';  
            }

            return retValue;
        },
        shapeHeight: 15,
        shapeWidth: 15
      },
      header: {
        text: "Shape Callback",
        styleName: "orange-column"
      },
      styleName: "right-column"
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
      styleName: "right-column",
      header: {
        text: "전화번호"
      }
    },
    {
      name: "ProductId",
      fieldName: "ProductId",
      width: "120",
      styleName: "right-column",
      header: {
        text: "제품번호"
      }
    },
    {
      name: "KorCountry",
      fieldName: "KorCountry",
      width: "100",
      styleName: "right-column",
      header: {
        text: "투자국가"
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
      width: "70",
      header: {
        text: "납입 횟수"
      },
      styleName: "right-column"
    },
    {
      name: "InterestRate",
      fieldName: "InterestRate",
      width: "50",
      header: {
        text: "이율"
      },
      styleName: "right-column"
    },
    {
      name: "SaveCost",
      fieldName: "SaveCost",
      width: "70",
      header: {
        text: "납입금"
      },
      styleName: "right-column"
    },
    {
      name: "SaveMaturity",
      fieldName: "SaveMaturity",
      width: "120",
      header: {
        text: "만기금액"
      },
      styleName: "right-column"
    },
    {
      name: "CurrentSave",
      fieldName: "CurrentSave",
      width: "80",
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
    httpRequest.open("GET", "https://cdn.wooritech.com/realgrid/data/" + filename);
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
    dataProvider = new RealGrid.LocalDataProvider();
    gridView = new RealGrid.GridView(container);
  
    gridView.setDataSource(dataProvider);
    dataProvider.setFields(fields);
    gridView.setColumns(columns);
  
    gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    gridView.displayOptions.rowHeight = 50;
    gridView.header.height = 40;
    gridView.footer.height = 40;
    gridView.stateBar.width = 16;
    gridView.editOptions.insertable = true;
    gridView.editOptions.appendable = true;
  


    gridView.columnByName("Gender").styleCallback = function (column, cell) {
      if (cell.value == '남') return "rgsample-shape-blue";
    };

    gridView.columnByName("Month").styleCallback = function (column, cell) {
        if (cell.value < 20) return "right-column rgsample-shape-blue";
    };
  
    setProvider("simple_data200.json");
  }

  function createListBox(parentId, label, items, handler, selectedItem) {
    var parent = document.getElementById(parentId);
    if (parent) {
        var lab = document.createElement("label");
        lab.textContent = label;
        lab.style.marginLeft = "10px";
		    lab.style.fontSize = "12px";
        lab.style.textDecoration = "underline";
        parent.appendChild(lab);

        var list = document.createElement("select");
        list.id = "_listbox_" + label;
        list.style.marginLeft = "3px";
        list.onchange = handler;
        parent.appendChild(list);

        if (items) {
            for (var i = 0; i < items.length; i++) {
                var opt = document.createElement("option");
                opt.value = items[i];
                opt.text = items[i];
                if (opt.value == selectedItem) {
                    opt.selected = true;
                }
                list.add(opt, null);
            }
        }

        lab.htmlFor = list.id;
    }
    return null;
  }
  
  function start() {
    createGrid("realgrid");
    createListBox("action", "SHAPE", ["ellipse","star", "rectangle", "triangle", "itriangle", "diamond", "uparrow", "downarrow", "leftarrow", "rightarrow", "plus", "minus"], function (e) {
        const renderer = gridView.columnByName("KorName").renderer;
        renderer.shape = e.currentTarget.value;
        gridView.columnByName("KorName").renderer = renderer;
    }, "left")
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