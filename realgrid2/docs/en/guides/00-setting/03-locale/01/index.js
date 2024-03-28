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
      text: "name"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "Gender",
    fieldName: "Gender",
    width: "40",
    header: {
      text: "Gender"
    },  
    renderer: {
      type: "text"
    }
  },
  {
    name: "KorCountry",
    fieldName: "KorCountry",
    width: "100",
    header: {
      text: "Investment country"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "OrderDate",
    fieldName: "OrderDate",
    width: "100",
    editButtonVisibility: "always",
    editor: {
      type: "date"
    },
    header: {
      text: "date editor",
      styleName: "orange-color"
    }
  },
  {
    name: "Age",
    fieldName: "Age",
    width: "110",
    header: {
      text: "currency",
      styleName: "orange-color"
    },    
    numberFormat: "currency"
  },
  {
    name: "SaveCost",
    fieldName: "SaveCost",
    width: "110",
    header: {
      text: "number",
      styleName: "orange-color"
    },    
    numberFormat: "number"
  },
  {
    name: "SaveMaturity",
    fieldName: "SaveMaturity",
    width: "110",
    header: {
      text: "accounting",
      styleName: "orange-color"
    },
    numberFormat: "accounting"
  },
  {
    name: "CurrentSave",
    fieldName: "CurrentSave",
    width: "120",
    header: {
      text: "USD",
      styleName: "orange-color"
    },
    numberFormat: "USD"
  },
  {
    name: "CardNumber",
    fieldName: "CardNumber",
    width: "140",
    header: {
      text: "Card number"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "StartDate",
    fieldName: "StartDate",
    width: "100",
    header: {
      text: "First payment date"
    }
  },
  {
    name: "EndDate",
    fieldName: "EndDate",
    width: "100",
    header: {
      text: "End date"
    }
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

var dataProvider, gridContainer, gridView;

const message = {
  "en" : {
      dateEditorWeekDays: ['sun','mon','tue','wed','thu','fri','sat'],
      dateEditorMonths: ['Jun','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      dateEditorSaveLabel: 'Save',
      dateEditorCancelLabel: 'Cancel',
      dateEditorDeleteLabel: 'Delete',
      dateEditorTodayLabel: 'Today',
      dateEditorHourLabel: 'Ho',
      dateEditorMinuteLabel: 'Mi',
      dateEditorSecondLabel: 'Se',
      dateEditorYearDisplayFormat: '{Y}',
  //    dateEditorMonthDisplayFormat: '{M}월',
  
      searchEditorMoreText: "more",
  
      checkListAcceptText: "Accept",
      checkListCancelText: "Cancel",
      checkListAllCheckText: "Check All",
  
      filterSelectorAcceptText: "Accept",
      filterSelectorAllCheckText: "(All Select)",
      filterSelectorCancelText: "Cancel",
      filterSelectorEmptyFilterText: "(Empty Value)",
      filterSelectorFilterResetText: "Reset",
      filterSelectorFiltersResetText: "Reset All",
      filterSelectorSearchPlaceholder: "Search...",
      filterSelectorSearchedCheckText: "(Search All Selected)",
  
      filterSelectorDateYearFormat: '{YYYY}',
      filterSelectorDateQuarterFormat: 'Q{Q}',
      filterSelectorDateMonthFormat: '{M}',
      filterSelectorDateDayFormat: 'YYYY-MM-DD',
  
      dataDropProxyLabel: "${rows} rows ${mode}",
      dataDropModeCopy: "Move",
      dataDropModeMove: "Copy",
  
      groupingPrompt: "Drag a column header and drop it here to group by that column.",
  
      displayEmptyMessage: "There is no data to display.",
  
      filterOperatorContains: "contains",
      filterOperatorNotContains: "not contains",
      filterOperatorStartsWith: "starts with",
      filterOperatorEndsWith: "ends width",
      filterOperatorEqual: "equal",
      filterOperatorNotEqual: "not Equal",
      filterOperatorEmpty: "empty Value",
      filterOperatorReset: "reset",
      filterOperatorGreater: "greater then",
      filterOperatorGreaterEqual: "greater then or equal",
      filterOperatorLower: "less then",
      filterOperatorLowerEqual: "less then or equal",
      filterOperatorBetween: "between"    
  },
  "ko": {
      dateEditorCancelLabel: "취소",
      dateEditorDeleteLabel: "삭제",
      dateEditorHourLabel: "시",
      dateEditorMinuteLabel: "분",
      dateEditorSecondLabel: "초",
      dateEditorMonths: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
      dateEditorSaveLabel: "저장",
      dateEditorTodayLabel: "오늘",
      dateEditorWeekDays: ['일','월','화','수','목','금','토'],
      dateEditorYearDisplayFormat: '{Y}년',
      dateEditorMonthDisplayFormat: '{M}월',
  
      searchEditorMoreText: "더보기",
  
      checkListAcceptText: "확인",
      checkListCancelText: "취소",
      checkListAllCheckText: "전체 선택",
  
      filterSelectorAcceptText: "확인",
      filterSelectorAllCheckText: "(전체 선택)",
      filterSelectorCancelText: "취소",
      filterSelectorEmptyFilterText: "(값 없음)",
      filterSelectorFilterResetText: "초기화",
      filterSelectorFiltersResetText: "전체 초기화",
      filterSelectorSearchPlaceholder: "검색...",
      filterSelectorSearchedCheckText: "(조회 전체 선택)",
  
      filterSelectorDateYearFormat: '{YYYY}년도',
      filterSelectorDateQuarterFormat: '{Q}사분기',
      filterSelectorDateMonthFormat: '{M}월',
      filterSelectorDateDayFormat: 'YYYY-MM-DD',
      filterToastMessage:  "필터링 중입니다...",
  
      dataDropProxyLabel: "${rows} 행 ${mode}",
      dataDropModeCopy: "이동",
      dataDropModeMove: "복사",
  
      groupingPrompt: "컬럼 헤더를 이 곳으로 끌어다 놓으면 그 컬럼으로 그룹핑합니다.",
      groupingToastMessage: "행 그룹핑 중입니다...",
  
      displayEmptyMessage: "표시할 데이타가 없습니다.",
  
      filterOperatorContains: "포함",
      filterOperatorNotContains: "포함하지 않음",
      filterOperatorStartsWith: "시작 문자",
      filterOperatorEndsWith: "끝 문자",
      filterOperatorEqual: "같음",
      filterOperatorNotEqual: "같지 않음",
      filterOperatorEmpty: "값 없음",
      filterOperatorReset: "초기화",
      filterOperatorGreater: "보다 큼",
      filterOperatorGreaterEqual: "크거나 같음",
      filterOperatorLower: "보다 작음",
      filterOperatorLowerEqual: "작거나 같음",
      filterOperatorBetween: "범위",
      
      invalidDatetimeFormat1: "잘못된 날짜 형식입니다. - 'H'와 'a'가 같이 존재할 수 없습니다: ",
      invalidDatetimeFormat2: "잘못된 날짜 형식입니다 - 'h'가 있으면 'a'가 반드시 있어야 합니다: ",
      commitEditingMessage: "먼저 편집을 완료 하십시오.",
      deleteRowsMessage: "선택된 행(들)을 삭제하시겠습니까?",
      invalidFormatMessage: "잘못된 입력 유형입니다.",
  
      decimalSeparator: ".",
      thousandsSeparator: ",",
  
      sortingToastMessage: "정렬 중입니다...",
  
      rowIndicatorHeadText: "No.",
      rowIndicatorFootText: "Σ",
      rowIndicatorSumText: "Σ",
  
      stateTextCreateAndDeleted: "X",
      stateTextCreated: "C",
      stateTextDeleted: "D",
      stateTextUpdated: "U",
  
      rowOutOfBounds: "row is out of bounds: ",
      fieldIndexOutOfBounds: "fieldIndex is out of bounds: ",
      fieldNameMustExists: "fieldName must be exists.",
      fieldNameAlreadyExists: "fieldName is already exists: ",
      clientEditingError: "Client is editing (call grid.commit() or grid.cancel() first)"    
  },
  "ja": {
      dateEditorWeekDays: ['日','月','火','水','木','金','土'],
      displayEmptyMessage: '表示するデータはありません。',
      groupingPrompt: '列ヘッダーをこの位置にドラッグ＆ドロップすると,その列にグループ化されます。',
      dateEditorYearDisplayFormat: '{Y}年',
      dateEditorMonthDisplayFormat: '{M}月',
      dateEditorTodayLabel: '今日',
      dateEditorMonths: ['いちがつ', 'にがつ', 'さがつ', 'しがつ', 'ごがつ', 'ろくがつ', 'しちがつ', 'はちがつ', 'くがつ', 'じゅうがつ', 'じゅういちがつ', 'じゅうにがつ'],
      dateEditorSaveLabel: "セーブ",
      dateEditorCancelLabel: "取消",
      dateEditorDeleteLabel: "デリート",

      checkListAcceptText: "適用する",
      checkListCancelText: "取消",
      checkListAllCheckText: "全選択",
  },
  "fr": {
        dateEditorWeekDays: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
        dateEditorMonths: ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'],
        displayEmptyMessage: "Il n'y a aucune donnée à afficher"
  },
  "hi": {
      displayEmptyMessage: 'प्रदर्शित करने के लिए कोई डेटा नहीं है.',
      dateEditorWeekDays: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
      dateEditorMonths: ['जन॰', 'फ़र॰', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुल॰', 'अग॰', 'सित॰', 'अक्तू॰', 'नव॰', 'दिस॰'],
      groupingPrompt: "किसी कॉलम हेडर को खींचें और उसे उस कॉलम के आधार पर समूहित करने के लिए यहां छोड़ें।",
      dateEditorYearDisplayFormat: "{Y}वर्ष"
  }
}
const gridLocale = {
  "en-US": {
      locale: "en-US",
      currency: "USD",
      messages: message.en,
      numberFormats: {
          currency: {
              style: "currency",
              currency: "USD"
          },
          USD: {
              style: "currency",
              currency: "USD"
          }
      }
  },
  "en-CA": {
      locale: "en-CA",
      currency: "CAD",
      messages: message.en,
      numberFormats: {
          USD: {
              style: "currency",
              currency: "USD"
          }
      }
  },
  "fr-CA": {
      locale: "fr-CA",
      currency: "CAD",
      messages: message.fr,
      numberFormats: {
          USD: {
              style: "currency",
              currency: "USD"
          }
      }        
  },
  "hi-IN": {
      locale: "hi-IN",
      currency: "INR",
      messages: message.hi,
      numberFormats: {
          USD: {
              style: "currency",
              currency: "USD"
          }
      }
  },
  "ko-KR": {
      locale: "ko-KR",
      currency: "KRW",
      messages: message.ko,
      numberFormats: {
          currency: {
              style: "currency",
              currency: "KRW",
              excelFormat: "₩#,##0"
          },
          accounting: {
              style: "currency",
              currency: "KRW",
              currencySign: "accounting",
              // excelFormat: "₩#,##0_);[빨강](₩#,##0)"
              excelFormat:"\"₩\"#,##0_);[Red](\"₩\"#,##0)"
          },
          USD: {
              style: "currency",
              currency: "USD"
          }
      }
  }, 
  "ja-JP": {
      locale: "ja-JP",
      currency: "JPY",
      messages: message.ja,
      numberFormats: {
          USD: {
              style: "currency",
              currency: "USD"
          }
      }
  },
  "fr-FR": {
      locale: "fr-FR",
      currency: "EUR",
      messages: message.fr,
      numberFormats: {
        USD: {
            style: "currency",
            currency: "USD"
        }
    }
  }
}

function createGrid(container) {

  
  RealGrid.setLicenseKey('upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYm9cY8amGDkiMnVeQKUHJDjW2y71jtk+wteqHQ1mRMIXzEcGIrzZpzzNTakk0yR9UcO/hzNodVsIiqQNVtxmmYt');
  
  RealGrid.setLocale(gridLocale["en-US"]);

  RealGrid.setDefault({
    display: {
      showEmptyMessage: true,
      rowHeight: 36
    },
    header: {
      height: 40
    }
  });
  
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView(container);
  gridView.setDataSource(dataProvider);
  
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  setProvider("simple_data.json");
}

function start() {
  createGrid("realgrid");
}

function setLocale(e, t) {
  RealGrid.setLocale(gridLocale[e.target.innerText]);
}

function clearRows() {
  dataProvider.clearRows();
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
