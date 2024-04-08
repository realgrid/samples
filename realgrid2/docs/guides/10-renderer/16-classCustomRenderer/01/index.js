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
      width: "100",
      header: {
        text: "성별"
      },
      values:["남", "여"],
      labels:["남", "여"],
      renderer: {
        type: "radio_renderer"
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
      name: "ProductId",
      fieldName: "ProductId",
      width: "120",
      header: {
        text: "제품번호"
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
  
  class CustomRadioRenderer extends RealGrid.CustomCellRendererImpl {
    get styleName() {
        return 'rg-renderer custom-radio-renderer';
    }
    _checks = [];
    createInput(parent, value, label) {
        const span = document.createElement("label");
        const check = document.createElement("input");
        check.type = "radio";
        check.value = value;
        span.appendChild(check);
        span.appendChild(document.createTextNode(` ${label} `));
        parent.appendChild(span);
        return {check, label: span};
    }
  
    _doInitContent(parent) {
      
        const column = this.index.column;
        this._checks = new Array(column.values.length).fill(null);
          this._checks.forEach((v, i, array) => {
              array[i] = this.createInput(parent, column.values[i], column.labels[i]);
          });
    }
  
    _doClearContent(parent) {
        this._checks.forEach(v => {
            v.check.parentElement?.removeChild(v.check);
            v.label.parentElement?.removeChild(v.label);
        })
        this._checks = [];
        parent.innerHTML = "";
    }
    
    render(grid, model, w, h) {
        this._checks.forEach(v => {
            v.check.checked = model.value === v.check.value;
        });
    }
  
    canEditClickAt(event) {
        // HTMLInputElement가 클릭되었을때만 편집상태로 들어갈수 있도록 한다.
        return (event.target instanceof HTMLInputElement);
        
    }
  
    canClick(event) {
        return true;
    }
  
    canEdit(){
        return true;
    }
  
    canClickSpaceKey(event){
        if (['1','2','3'].includes(event.key)) {
            return true;
        }
        return false;
    }
  
    itemClick(event) {
        if ([49, 50, 51].includes(event.keyCode)) {
            const idx = event.keyCode - 49;
            this._checks[idx] && this._checks[idx].check.click();
        }
    }
    _doEditClick(index, event, result) {
        const target = event.target
        result.value = target.value;
        return target instanceof HTMLInputElement;
    }
  
    get showTooltip() {
        return true
    }
  
    tooltip(model, index) {
        if (!model.value) {
            return '값을 선택하세요'
        }
        return ""
    }
  }
  
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
  
  var dataProvider, gridContainer, grid;
  
  function createGrid(container) {
    dataProvider = new RealGrid.LocalDataProvider();
    gridView = new RealGrid.GridView(container);
    RealGrid.registerCustomRenderer("radio_renderer", CustomRadioRenderer);
  
    gridView.setDataSource(dataProvider);
    dataProvider.setFields(fields);
  
    gridView.setColumns(columns);
  
    gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    gridView.displayOptions.rowHeight = 30;
    gridView.header.height = 40;
    gridView.footer.height = 40;
    gridView.stateBar.width = 16;
    gridView.editOptions.editable = false;
    gridView.editOptions.commitByCell = true;
  
    setProvider("simple_data.json");
  }
  
  function start() {
    createGrid("realgrid");
  }

  window.onload = start;