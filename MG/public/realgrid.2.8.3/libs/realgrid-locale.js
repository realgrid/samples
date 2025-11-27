/**
 * RealGrid2 Locale 설정
 *
 *
 */
var message = {
    ko: {
        dateEditorCancelLabel: "Cancel",
        dateEditorDeleteLabel: "Delete",
        dateEditorHourLabel: "시",
        dateEditorMinuteLabel: "분",
        dateEditorMonths: undefined,
        dateEditorSaveLabel: "Save",
        dateEditorSecondLabel: "초",
        dateEditorTodayLabel: "Today",
        dateEditorWeekDays: ["일", "월", "화", "수", "목", "금", "토"],
        dateEditorYearDisplayFormat: "{Y}년",
        dateEditorMonthDisplayFormat: "{M}월",

        searchEditorMoreText: "더보기",

        checkListAcceptText: "Accept",
        checkListCancelText: "Cancel",
        checkListAllCheckText: "Check All",

        filterSelectorAcceptText: "확인",
        filterSelectorAllCheckText: "(전체 선택)",
        filterSelectorCancelText: "취소",
        filterSelectorEmptyFilterText: "(값 없음)",
        filterSelectorFilterResetText: "초기화",
        filterSelectorFiltersResetText: "전체 초기화",
        filterSelectorSearchPlaceholder: "검색...",
        filterSelectorSearchedCheckText: "(조회 전체 선택)",

        filterSelectorDateYearFormat: "{YYYY}년도",
        filterSelectorDateQuarterFormat: "{Q}사분기",
        filterSelectorDateMonthFormat: "{M}월",
        filterSelectorDateDayFormat: "YYYY-MM-DD",
        filterToastMessage: "Filtering...",

        dataDropProxyLabel: "${rows}행 ${mode}",
        dataDropModeMove: "이동",
        dataDropModeCopy: "복사",

        groupingPrompt: "컬럼 헤더를 이 곳으로 끌어다 놓으면 그 컬럼으로 그룹핑합니다.",
        groupingToastMessage: "Grouping...",

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

        invalidDatetimeFormat1:
            "Invalid datetime read format - 'H'와 'a'가 같이 존재할 수 없습니다: ",
        invalidDatetimeFormat2:
            "Invalid datetime read format - 'h'가 있으면 'a'가 반드시 있어야 합니다: ",
        commitEditingMessage: "먼저 편집을 완료 하십시오.",
        deleteRowsMessage: "선택된 행(들)을 삭제하시겠습니까?",
        invalidFormatMessage: "잘못된 입력 유형입니다.",

        decimalSeparator: ".",
        thousandsSeparator: ",",

        sortingToastMessage: "Sorting...",

        exportProgressMessage: "Exporting...",

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
        clientEditingError: "Client is editing (call grid.commit() or grid.cancel() first)",
        gridElementAttachFail: "Grid is already contained ContainerDiv",
        gridContainerNotFind: "Invalid grid container element: ",
    },
    en: {
        dateEditorCancelLabel: "Cancel",
        dateEditorDeleteLabel: "Delete",
        dateEditorHourLabel: "Hour",
        dateEditorMinuteLabel: "Minute",
        dateEditorSecondLabel: "Second",
        dateEditorMonths: [
            "Jun",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        dateEditorSaveLabel: "Save",
        dateEditorTodayLabel: "Today",
        dateEditorWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dateEditorYearDisplayFormat: "{Y}",
        dateEditorMonthDisplayFormat: undefined,

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

        filterSelectorDateYearFormat: "{YYYY}",
        filterSelectorDateQuarterFormat: "Q{Q}",
        filterSelectorDateMonthFormat: "{M}",
        filterSelectorDateDayFormat: "YYYY-MM-DD",
        filterToastMessage: "Filtering...",

        dataDropProxyLabel: "${rows} rows ${mode}",
        dataDropModeCopy: "Move",
        dataDropModeMove: "Copy",

        groupingPrompt: "Drag a column header and drop it here to group by that column.",
        groupingToastMessage: "Grouping rows...",

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
        filterOperatorBetween: "between",

        invalidDatetimeFormat1: "Invalid date format - 'H' and 'a' cannot exist together: ",
        invalidDatetimeFormat2:
            "Invalid date format - If 'h' is present, 'a' must be present as well: ",
        commitEditingMessage: "Please complete editing first.",
        deleteRowsMessage: "Do you want to delete the selected row(s)?",
        invalidFormatMessage: "Invalid input type.",

        decimalSeparator: ".",
        thousandsSeparator: ",",

        sortingToastMessage: "Sorting...",
        exportProgressMessage: "Exporting...",

        rowIndicatorHeadText: "No.",
        rowIndicatorFootText: "Σ",
        rowIndicatorSumText: "Σ",

        stateTextCreateAndDeleted: "X",
        stateTextCreated: "C",
        stateTextDeleted: "D",
        stateTextUpdated: "U",

        rowOutOfBounds: "Row is out of bounds: ",
        fieldIndexOutOfBounds: "Field index is out of bounds: ",
        fieldNameMustExists: "Field name must exist.",
        fieldNameAlreadyExists: "Field name already exists: ",
        clientEditingError: "Client is editing (call grid.commit() or grid.cancel() first)",
        gridElementAttachFail: "Grid is already contained ContainerDiv",
        gridContainerNotFind: "Invalid grid container element: ",
    },
};

var gridLocale = {
    ko: {
        locale: "ko-KR",
        currency: "KRW",
        messages: message.ko,
        numberFormats: {
            currency: {
                style: "currency",
                currency: "KRW",
                excelFormat: "₩#,##0",
            },
            accounting: {
                style: "currency",
                currency: "KRW",
                currencySign: "accounting",
                excelFormat: '"₩"#,##0_);[Red]("₩"#,##0)',
            },
            USD: {
                style: "currency",
                currency: "USD",
            },
        },
    },
    "en-US": {
        locale: "en-US",
        currency: "USD",
        messages: message.en,
        numberFormats: {
            currency: {
                style: "currency",
                currency: "USD",
            },
            accounting: {
                style: "currency",
                currency: "USD",
                currencySign: "accounting",
            },
            USD: {
                style: "currency",
                currency: "USD",
            },
        },
    },
};


// html에서 script태그를 사용하는 경우 아래 코드를 주석처리해주세요.
export { gridLocale }