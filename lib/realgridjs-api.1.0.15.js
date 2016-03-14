var RealGridJS = (function () {
    // "use strict";

    var UNDEFINED;
    var win = window;
    var doc = document;

    var $_debug = false;
    var setRootContext = Grids.setRootContext;
    var setAssetRoot = Grids.setAssetRoot;
    var getVersion = Grids.getVersion;
    var setTrace = Grids.setLogging;
    var getTimer = Grids.getTimer;
    var $_isMobile = Grids.realgrid.$_isMobile;
    var $_setMobile = Grids.realgrid.$_setMobile;
    var _progress = Grids.Progress;
    var _log = Grids._log;
    var toString = Object.prototype.toString;

    var _setDebug = function (v) {
        Grids.setDebug(v);
        $_debug = v;
    };

    var _enum = function (v) {
        return Object.freeze ? Object.freeze(v) : v;
    };
    var _extend = function (obj, source) {
        if (source) {
            obj = obj || {};
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
        return obj;
    };
    var _isArray = function (obj) {
        return Array.isArray ? Array.isArray(obj) : toString.call(obj) === '[object Array]';
    };
    var _pick = function () {
        var args = arguments;
        var len = args.length;
        
        for (var i = 0; i < len; i++) {
            v = args[i];
            if (v !== UNDEFINED && v !== null) {
                return v;
            }
        }
        return UNDEFINED;
    };
    var _realgrid = Grids.realgrid;

    /**
    * DataType.
    */
    var DataType = _enum({
        TEXT: "text",
        // @Deprecated
        NUMERIC: "numeric",
        NUMBER: "number",
        // @Deprecated
        BOOL: "bool",
        BOOLEAN: "boolean",
        DATETIME: "datetime"
    
    });

    /**
     * DataField.
     */
    var DataField = function (fieldName, dataType, subType) {
        this.fieldName      = fieldName;
        this.dataType       = dataType || DataType.TEXT;
        this.subType        = subType || null;
        this.subTypeEnabled = undefined;
        this.length         = 10;
        this.set            = undefined;
        this.minimum        = undefined;    // "min" or "minimum"
        this.maximum        = undefined;    // "max" or "maximum"
        this.required       = undefined;
        this.updatable      = undefined;
        this.defaultValue   = undefined;
        this.booleanFormat  = undefined;
        this.datetimeFormat = undefined;
        this.amText         = undefined;
        this.pmText         = undefined;
        this.baseYear       = undefined;
        this.header         = undefined;
        this.baseField      = undefined;
    };

    /**
     * DataProviderOptions.
     */
    var DataProviderOptions = function () {
        this.booleanFormat = undefined;     // null
        this.datetimeFormat = undefined;    // null
        this.amText = undefined;            // "AM"
        this.pmText = undefined;            // "PM"
        this.baseYear = undefined;          // 2000
        this.insertable = undefined;        // true
        this.updatable = undefined;         // true
        this.deletable = undefined;         // true
        this.softDeleting = undefined;      // false
        this.deleteCreated = undefined;     // false
        this.checkStates = undefined;       // true
        this.subtypeEnabled = undefined;    // true
        this.restoreMode = undefined;        // "none"
        this.strictRestore = undefined;     // false
    };

    var DataOutputOptions = function () {
        this.datetimeFormat = undefined;
        this.booleanFormat = undefined;
        this.datetimeCallback = undefined;
        this.booleanCallback = undefined;
        this.nullDateText = "";
    };

    /**
     * RestoreMode
     */
    var RestoreMode = _enum({
        NONE: "none",
        EXPLICIT: "explicit",
        AUTO: "auto"
    });

    /**
     * DataFillMode
     */
    var DataFillMode = _enum({
        SET: "set",
        APPEND: "append",
        INSERT: "insert",
        UPDATE: "update"
    });

    /**
     * DataFillOptions
     */
    var DataFillOptions = function () {
        this.fillMode = DataFillMode.SET;
        this.fillPos = 0;
        this.count = -1;
        // json
        this.rootArray = true;
        // json, xml
        this.rows = "row";
        // csv
        this.start = 0;
        this.delimiter = ",";
        this.quoted = false;
        // tree
        this.parentId = 0;;
        this.tree = null; // or treeField
        this.children = null; // or childrenField
        this.icon = null; // or iconField
        this.sorting = false; // or needSorting
    };

    /**
     * RowState
     */
    var RowState = _enum({
        NONE: "none",
        CREATED: "created",
        UPDATED: "updated",
        DELETED: "deleted",
        CREATE_AND_DELETED: "createAndDeleted"
    });

    /**
     * ColumnHeaderItemLocation
     */
    var ColumnHeaderItemLocation = _enum({
        NONE: "none",
        LEFT: "left",
        RIGHT: "right",
        TOP: "top",
        BOTTOM: "bottom",
        CENTER: "center"
    });

    /**
     * SubTextLocation
     */
    var SubTextLocation = _enum({
        DEFAULT: "default",
        NONE: "none",
        LEFT: "left",
        RIGHT: "right",
        UPPER: "upper",
        LOWER: "lower"
    });

    /**
     * CellButton
     */
    var CellButton = _enum({
        NONE: "none",
        ACTION: "action",
        POPUP: "popup"
    });

    /**
     * ButtonVisibility
     */
    var ButtonVisibility = _enum({
        ALWAYS: "always",
        DEFAULT: "default",
        VISIBLE: "visible",
        HIDDEN: "hidden"
    });

    /**
     * DropDownPosition
     */
    var DropDownPosition = _enum({
        BUTTON: "button",
        EDITOR: "editor"
    });

    /**
     * ItemSortStyle
     */
    var ItemSortStyle = _enum({
        NONE: "none",
        ASCENDING: "ascending",
        DESCENDING: "descending"
    });

    /**
     * HandleVisibility
     */
    var HandleVisibility = _enum({
        VISIBLE: "visible",
        HOVERED: "hovered",
        ALWAYS: "always",
        HIDDEN: "hidden"
    });


    /**
     * Cell index
     */
    var CellIndex = function () {
        this.itemIndex = -1;
        this.column = null;
        // setCurrent()로 설정할 때 위 두 값 대신 사용할 수 있음.
        this.dataRow = -1;
        this.fieldName = null;
    };

    /**
    * DynamicStyle.
    */
    var DynamicStyle = function (criteria, styles) {
        this.criteria = criteria;
        this.styles = styles;
    };

    /**
    * CellRenderer.
    */
    var CellRenderer = function () {
    };
    CellRenderer.TEXT = "text";
    CellRenderer.BAR = "bar";
    CellRenderer.CHECK = "check";
    CellRenderer.IMAGE = "image";
    CellRenderer.ICON = "icon";
    CellRenderer.SHAPE = "shape";
    CellRenderer.SIGNAL = "signal";
    CellRenderer.LINK = "link";
    CellRenderer.CODE128 = "code128"; // barcode
    CellRenderer.CODE39 = "code39"; // barcode

    /**
    * TextCellRender.
    */
    var TextCellRenderer = function () {
        this.showTooltip = undefined;    // false
    };
    TextCellRenderer.prototype.type = CellRenderer.TEXT;
        
    /**
    * BarCellRenderer.
    */
    var BarCellRenderer = function () {
        this.minimum = undefined;         // 0;
        this.maximum = undefined;         // 100;
        this.minimumWidth = undefined;    // 100;
        this.showLabel = undefined;       // false
        this.origin = undefined;          // BarCellRendererOrigin.DEFAULT
    };
    BarCellRenderer.prototype.type = CellRenderer.BAR;

    /**
    * CheckCellRenderer.
    */
    var CheckCellRenderer = function () {
        this.trueValues = undefined;        // null, "aaa,bbb,ccc"
        this.falseValues = undefined;       // null
        this.labelPosition = undefined;     // "hidden", "right", "left", "bottom", "top"
        this.labelGap = undefined;          // default 4
        this.spaceKey = undefined;          // true
        this.editable = undefined;          // false
        this.startEditOnClick = undefined;  // false
        this.shape = undefined;             // "default", "box"
    };
    CheckCellRenderer.prototype.type = CellRenderer.CHECK;
    CheckCellRenderer.HIDDEN = "hidden";
    CheckCellRenderer.RIGHT = "right";
    CheckCellRenderer.LEFT = "left";
    CheckCellRenderer.BOTTOM = "bottom";
    CheckCellRenderer.TOP = "top";
    CheckCellRenderer.SHAPE_DEFAULT = "default";
    CheckCellRenderer.SHAPE_BOX = "box";
    /**
    * ImageCellRenderer.
    */
    var ImageCellRenderer = function () {
        this.smoothing = undefined;     // false;
    };
    ImageCellRenderer.prototype.type = CellRenderer.IMAGE;

    /**
    * IconCellRenderer. 
    * 컬럼의 ImageList와 iconIndex 스타일 등으로 지정하는 이미지 아이콘과 텍스트를 같이 표시한다.
    */
    var IconCellRenderer = function () {
    };
    IconCellRenderer.prototype.type = CellRenderer.ICON;

    /**
    * ShapeCellRenderer.
    */
    var ShapeCellRenderer = function () {
    };
    ShapeCellRenderer.prototype.type = CellRenderer.SHAPE;
    ShapeCellRenderer.NULL = "null";
    ShapeCellRenderer.RECTANGLE = "rectangle";
    ShapeCellRenderer.TRIANLGE = "triangle";
    ShapeCellRenderer.INVERTED_TRIANGLE = "invertedtriangle";
    ShapeCellRenderer.DIAMOND = "diamond";
    ShapeCellRenderer.UP_ARROW = "uparrow";
    ShapeCellRenderer.DOWN_ARROW = "downarrow";
    ShapeCellRenderer.LEFT_ARROW = "leftarrow";
    ShapeCellRenderer.RIGHT_ARROW = "rightarrow";
    ShapeCellRenderer.PLUS = "plus";
    ShapeCellRenderer.MINUS = "minus";
    ShapeCellRenderer.EQUAL = "equal";
    ShapeCellRenderer.STAR = "star";

    /**
    * SignalCellRenderer.
    */
    var SignalCellRenderer = function () {
        this.barCount = undefined; // 4
    };
    SignalCellRenderer.prototype.type = CellRenderer.SIGNAL;
    
    /**
     * LinkCellRenderer
     */
    var LinkCellRenderer = function () {
        this.url = undefined;            // null - expression ("http://abc.com//${country}/")
        this.urlField = undefined;       // null
        this.showUrl = undefined;        // true - show tooltip
        this.requiredFields = undefined; // null, required field names in url expression ("fieldA,fieldB")
    };
    LinkCellRenderer.prototype.type = CellRenderer.LINK;

    /**
     * Code128CellRenderer 
     */
    var Code128CellRenderer = function() {
    };
    Code128CellRenderer.prototype.type = CellRenderer.CODE128;
     
    /**
     * Code39CellRenderer 
     */
    var Code39CellRenderer = function() {
    };
    Code39CellRenderer.prototype.type = CellRenderer.CODE39;

    /** 
     * SeriesCellRenderer
     */
    var SeriesCellRenderer = function () {
    };
    SeriesCellRenderer.ACTUAL_TARGET_BULLET = "actualTargetBullet";
    SeriesCellRenderer.ACTUAL_TARGET_TEXT = "actualTargetText";
    SeriesCellRenderer.SPARK_LINE = "sparkLine";
    SeriesCellRenderer.SPARK_COLUMN = "sparkColumn";
    SeriesCellRenderer.SPARK_WIN_LOSS = "sparkWinLoss";
    
    /**
     * ActualTargetBulletRenderer
     */
    var ActualTargetBulletRenderer = function () {
        this.minValue = undefined;              // 0
        this.maxValue = undefined;              // 1
        this.maximumBackground = undefined;     // null        
    };
    ActualTargetBulletRenderer.prototype.type = SeriesCellRenderer.ACTUAL_TARGET_BULLET;
    
    /**
     * ActualTargetTextRenderer
     */
    var ActualTargetTextRenderer = function () {
        this.separator = undefined;         // " / "
        this.actualForeground = undefined;  // null
        this.actualFont = undefined;        // null
        this.targetForeground = undefined;  // null
        this.targetFont = undefined;        // null
    };
    ActualTargetTextRenderer.prototype.type = SeriesCellRenderer.ACTUAL_TARGET_TEXT;
    
    /**
     * SparkLineRenderer
     */
    var SparkLineRenderer = function () {
        this.baseValue = undefined; // Number
        this.firstFill = undefined; // fill
        this.lastFill = undefined;  // fill
        this.highFill = undefined;  // fill
        this.lowFill = undefined;   // fill
        this.belowFill = undefined; // fill
    };
    SparkLineRenderer.prototype.type = SeriesCellRenderer.SPARK_LINE;
    
    /**
     * SparkColumnRenderer
     */
    var SparkColumnRenderer = function () {
        this.baseValue = undefined; // Number
        this.highFill = undefined;  // fill
        this.lowFill = undefined;   // fill
        this.belowFill = undefined; // fill
        this.barWidth = undefined;  // 0.8;
    };
    SparkColumnRenderer.prototype.type = SeriesCellRenderer.SPARK_COLUMN;
    
    /**
     * SparkWinLossRenderer
     */
    var SparkWinLossRenderer = function () {
        this.baseValue = undefined; // Number
        this.belowFill = undefined; // fill
        this.barWidth = undefined;      // 0.8;
        this.belowHeight = undefined;   // 0.4;
    };
    SparkWinLossRenderer.prototype.type = SeriesCellRenderer.SPARK_WIN_LOSS;

    /**
    * CellEditor.
    */
    var CellEditor = function () {
    };
    CellEditor.LINE = "line";
    CellEditor.MULTILINE = "multiLine";
    CellEditor.DROPDOWN = "dropDown";
    CellEditor.SEARCH = "search";
    CellEditor.NUMBER = "number";
    CellEditor.DATE = "date";

    /**
    * LineCellEditor.
    */
    var LineCellEditor = function () {
        this.maxLength = undefined;    // 0
        this.textCase = undefined;     // TextInputCase.NORMAL
    };
    LineCellEditor.prototype.type = CellEditor.LINE;

    /**
    * MultiLineCellEditor.
    */
    var MultiLineCellEditor = function () {
        this.maxLength = undefined;    // 0
        this.textCase = undefined;     // TextInputCase.NORMAL
    };
    MultiLineCellEditor.prototype.type = CellEditor.MULTILINE;

    /**
    * DropDownCellEditor.
    */
    var DropDownCellEditor = function () {
        this.maxLength = undefined;         // 0
        this.textReadOnly = undefined;      // false
        this.textCase = undefined;          // TextInputCase.NORMAL
        this.displayLabels = undefined;     // true
        this.values = undefined;            // null // []
        this.labels = undefined;            // null // []
        this.dropDownCount = undefined;     // 8
        this.itemSortStyle = undefined;     // ItemSortStyle.NONE
        this.caseSensitive = undefined;     // false;
        this.commitOnSelect = undefined;    // true
        this.domainOnly = undefined;        // false
        this.dropDownWidth = undefined;     // 8
        this.dropDownPosition = undefined;  // "button"


    };
    DropDownCellEditor.prototype.type = CellEditor.DROPDOWN;

    /**
    * SearchCellEditor.
    */
    var SearchCellEditor = function () {
        this.searchLength = undefined;      // 1
        this.searchDelay = undefined;       // 1000
        this.dropDownCount = undefined;     // 8
        this.useCtrlEnterKey = undefined;   // false
        this.useEnterKey = undefined;       // false
    }
    SearchCellEditor.prototype.type = CellEditor.SEARCH;
    
    /**
    * NumberCellEditor.
    */
    var NumberCellEditor = function () {
        this.maxLength = undefined;     // 0
        this.positiveOnly = undefined;  // false;
        this.integerOnly = undefined;   // false;
    };
    NumberCellEditor.prototype.type = CellEditor.NUMBER;

    /**
    * DateCellEditor.
    */
    var DateCellEditor = function () {
        this.textReadOnly = undefined;       // false
        this.yearNavigation = undefined;     // false
        this.commitOnSelect = undefined;     // true
        this.editFormat = undefined;         // null
        yearDisplayFormat = undefined;       // "{Y}년",
        monthDisplayFormat = undefined;      // "{M}월",
        months = undefined;                  // 미 지정시 monthDisplayFormat형태로 출력
        weekDays = undefined;                // ["일","월","화","수","목","금","토"]
    };
    DateCellEditor.prototype.type = CellEditor.DATE;

    /**
     * ColumnHeader.
     */
    var ColumnHeader = function () {
        this.text = undefined;              // null
        this.subText = undefined;           // null
        this.subTextGap = undefined;        // Header.subTextGap
        this.subTextLocation = undefined;   // Header.subTextLocation
        this.itemOffset = undefined;        // Header.itemOffset
        this.itemGap = undefined;           // Header.itemGap
        this.checkLocation = undefined;     // ColumnHeaderItemLocation.NONE
        this.imageLocation = undefined;     // ColumnHeaderItemLocation.NONE
        this.imageIndex = undefined;        // -1
        this.imageUrl = undefined;          // null
        this.checked = undefined;           // false
        this.styles = undefined;            // child of Header.styles
        this.subStyles = undefined;         // child of Header.subStyles
    };

    /**
     * ColumnFooter.
     */
    var ColumnFooter = function () {
        this.text = undefined;                // null
        this.groupText = undefined;           // null
        this.expression = undefined;          // null, SummaryExpressionType
        this.groupExpression = undefined;     // null, SummaryExpressionType
        this.styles = undefined;              // null, GridViewStyles
        this.groupStyles = undefined          // null, GridViewStyles
    };

    /**
     * Column
     */
    var Column = function () {
    };
    // column properties
    Column.NAME = "name";
    Column.TAG = "tag";
    Column.WIDTH = "width";
    Column.DISPLAY_WIDTH = "displayWidth";
    Column.FIELD_NAME = "fieldName";
    Column.VISIBLE = "visible";
    Column.EDITABLE = "editable";
    Column.READ_ONLY = "readOnly";
    Column.RESIZABLE = "resizable";
    Column.MOVABLE = "movable";
    Column.SORTABLE = "sortable";
    Column.BUTTON = "button";
    Column.POPUP_MENU = "popupMenu";
    Column.IMAGE_LIST = "imageList";
    Column.HEADER = "header";

    /**
     * ColumnGroupHeader.
     */
    var ColumnGroupHeader = function () {
        this.text = null;
        this.visible = true;
    };

    /**
     * ColumnGroup 명세. undefined로 지정된 속성은 플렉스 쪽에서 무시한다.
     */
    var ColumnGroup = function () {
        this.orientation = ColumnGroupOrientation.HORIZONTAL;
        this.header = undefined; // ColumnHeader
        this.name = undefined;
        this.width = 120;
        this.visible = true;
        this.resizable = true;
        this.movable = true;
        this.displayIndex = undefined;
        this.displayWidth = undefined;
        this.hideChildHeaders = false;
        this.styles = undefined;
    };
    ColumnGroup.prototype.type = "group";
    ColumnGroup.prototype.proxy = function () {
        return {
            type: this.type,
            refId: this.refId
        };
    };
    // properties
    ColumnGroup.ORIENTATION = "orientation";
    ColumnGroup.HIDE_CHILD_HEADERS = "hideChildHeaders";

    /**
     * DataColumn 명세. undefined로 지정된 속성은 플렉스 쪽에서 무시한다.
     */
    var DataColumn = function() {
        this.name = undefined;
        this.tag = undefined;
        this.width = undefined;                     // 100
        this.displayWidth = undefined;
        this.fillHeight = undefined;                // 0
        this.fillWidth = undefined;                 // 0
        this.fieldName = undefined;
        this.visible = undefined;                   // true
        this.editable = undefined;                  // true
        this.readOnly = undefined;                  // false
        this.resizable = undefined;                 // true
        this.movable = undefined;                   // true
        this.sortable = undefined;                  // true
        this.groupable = undefined;                 // true
        this.button = undefined;                    // CellButton.NONE
        this.popupMenu = undefined;                 // null
        this.alwaysShowButton = undefined;          // false
        this.alwaysShowEditButton = undefined;      // false
        this.buttonVisibility = undefined;          // ButtonVisibility.DEFAULT,
        this.editButtonVisibility = undefined;      // ButtonVisibility.DEFAULT,
        this.imageList = undefined;                 // null

        this.mergeRule = undefined;                 // Cell merging rule, ex) { criteria: "value" }
        this.equalBlank = undefined;                // false

        this.labelField = undefined;                // null
        this.labels = undefined;                    // Empty Array
        this.values = undefined;                    // Empty Array
        this.lookupDisplay = undefined;             // false
        this.lookupKeyFields = undefined;           // null
        this.lookupSourceId = undefined;            // null

        this.defaultValue = undefined;
        this.required = undefined;                  // false
        this.imeMode = undefined;                   // ImeMode.DontCare
        this.textInputCase = undefined;             // TextInputCase.NORMAL
        this.nanText = undefined;                   // null
        this.imageList = undefined;

        this.header = undefined;                     // ColumnHeader
        this.styles = undefined;                     // GridViewStyles
        this.dynamicStyles = undefined;              // DynamicStyle[]
        this.ignoreDefaultDynamicStyles = undefined; // false
        this.footer = undefined;                     // ColumnFooter
        this.editor = undefined;                     // CellEditor
        this.renderer = undefined;                   // CellRenderer
        this.filters = undefined;                    // ColumnFilter[]
        this.validations = undefined;                // EditValidation[]
    };
    DataColumn.prototype.type = "data";

    /**
     * ColumnFilter
     */
    var ColumnFilter = function () {
        this.name = null;
        this.criteria = null;        // filter 수식
        this.text = null;            // selector에 표시되는 문자열. null이면 name 표시
        this.description = null;
        this.active = true;
    };

    /**
     * ColumnFilterAction
     */
    var ColumnFilterAction = function () {
        this.name = null;
        this.text = null;
        this.description = null;
    };

    /**
     * Indicator display value.
     */
    var IndicatorValue = _enum({
        NONE: "none",
        INDEX: "index",
        ROW: "row"
    });

    /**
     * Sort style.
     */
    var SortStyle = _enum({
        NONE: "none",           // 정렬 불가
        EXCLUSIVE: "exclusive", // 최근 클릭한 컬럼으로 정렬
        INCLUSIVE: "inclusive", // 지정한 순서대로 모든 컬럼으로 정렬
        REVERS: "reverse"       // 나중에 지정한 컬럼을 우선 순위로 모든 컬럼 정렬
    });

    /**
    * Sort direction.
    */
    var SortDirection = _enum({
        ASCENDING: "ascending",
        DESCENDING: "descending"
    });

    /**
     * Sort case.
     */
    var SortCase = _enum({
        SENSITIVE: "sensitive",
        INSENSITIVE: "insensitive"
    });

    /**
    * SelectionStyle.
    */
    var SelectionStyle = _enum({
        BLOCK: "block",
        ROWS: "rows",
        COLUMNS: "columns",
        SINGLE_ROW: "singleRow",
        SINGLE_COLUMN: "singleColumn",
        NONE: "none"
    });

    /**
     * Menu item type
     */
    var MenuItemType = _enum({
        NORMAL: "normal",
        CHECK: "check",
        RADIO: "radio",
        SEPARATOR: "separator"
    });

    /**
     * MenuItem
     */
    var MenuItem = function (label) {
        this.label = label;
        this.type = MenuItemType.NORMAL;
        this.group = undefined;
        this.enabled = undefined; // true
        this.checked = false;
        this.tag = null;
        this.children = [];
        this.data = undefined;
        this.callback = undefined;
    };

    /**
     * ItemType
     */
    var ItemType = _enum({
        ROW: "row",
        GROUP: "group",
        FOOTER: "footer",
        TREE: "tree"
    });

    /**
     * Item state
     */
    var ItemState = _enum({
        NORMAL: "normal",
        FOCUSED: "focused",
        UPDATING: "updating",
        INSERTING: "inserting",
        APPENDING: "appending",
        isInserting: function (state) {
            return state == ItemState.INSERTING || state == ItemState.APPENDING;
        }
    });

    /**
     * SummaryMode
     */
    var SummaryMode = _enum({
        NONE: "none",
        AGGREGATE: "aggregate",
        STATISTICAL: "statistical"
    });

    /**
     * ValidationLevel
     */
    var ValidationLevel = _enum({
        ERROR: "error",
        WARNING: "warning",
        INFO: "info",
        IGNORE: "ignore"
    });

    /**
     * ItemRearrangeMode
     */
    var ItemRearrangeMode = _enum({
        AUTO: "auto",
        EXPLICIT: "explicit"
    });


    var VerticalMovingStep = _enum({
        ROW: "row",
        CELL: "cell",
        DEFAULT: "default"
    });

    /**
     * ValidationResult.
     */
    var ValidationResult = function (result) {
        this.level = result && result.level || ValidationLevel.ERROR;
        this.message = result && result.message || "Validation error.";
    };

    /**
     * EditValidation.
     */
    var EditValidation = function () {
        this.name = undefined;             // null
        this.active = undefined;           // true
        this.mode = undefined;             // ValidationMode.ALWAYS
        this.level = undefined;            // ValidationLevel.ERROR
        this.criteria = undefined;         // null
        this.message = undefined;          // null
        this.description = undefined;      //null
    };

    /**
     * Grid options.
     */
    var GridOptions = function () {
        this.summaryMode = undefined;      // SummaryMode.AGGREGATE;
        this.hideDeletedRows = undefined;  // false
        this.sortMode = undefined;         // ItemRearrangeMode.AUTO
        this.filterMode = undefined;       // ItemRearrangeMode.AUTO
    };

    /**
     * Check bar options.
     */
    var CheckBar = function () {
        this.width = undefined;                 // 20
        this.showAll = undefined;               // true
        this.showGroup = undefined;             // true
        this.visibleOnly = undefined;           // false
        this.checkableOnly = undefined;         // true
        this.visible = undefined;               // true
        this.exclusive = undefined;             // false
        this.checkableExpression = undefined;   // null
    };

    /**
     * State bar options.
     */
    var StateBar = function () {
        this.width = undefined;       // 20
        this.visible = undefined;     // tru
    };

    /**
     * Header options.
     */
    var Header = function () {
        this.height = undefined;            // 0
        this.minHeight = undefined;         // 23
        this.resizable = undefined;         // false
        this.visible = undefined;           // true
        this.filterable = undefined;        // true
        this.sortable = undefined;          // true
        this.subTextGap = undefined;        // 1
        this.subTextLocation = undefined;   // SubTextLocation.LOWER
        this.imageList = undefined;         // null
        this.itemOffset = undefined;        // 2
        this.itemGap = undefined;           // 2
        this.styles = undefined;            //
        this.subStyles = undefined;         //
    };

    /**
     * Footer options.
     */
    var Footer = function () {
        this.height = undefined;           // 0
        this.minHeight = undefined;        // 23
        this.resizable = undefined;        // false
        this.visible = undefined;          // true
    };

    /**
     * Grid panel options.
     */
    var Panel = function () {
        this.minHeight = undefined;   // 20
        this.visible = undefined;     // true
        this.height = undefined;      // 0
    };

    /**
     * Indicator options.
     */
    var Indicator = function () {
        this.displayValue = undefined;     // IndicatorValue.INDEX
        this.minWidth = undefined;         // 40
        this.maxWidth = undefined;         // 0
        this.width = undefined;            // 0
        this.selectable = undefined;       // true
        this.visible = undefined;          // true
        this.zeroBase = undefined;         // false
        this.indexOffset = undefined;      // 0
        this.rowOffset = undefined;        // 0
    };

    /**
    * GridView styles. 명시적으로 값이 지정되지 않은 속성은 조상 스타일 값을 계승한다. "자신의 명시적인 값 > 조상들의
    * 명시적인 값 > 기본값 > 조상들의 기본값 > 스타일 클래스 기본값" 순서대로 우선 순위를 갖는다. undefined로 값을
    * 지정하면 그 스타일의 명시적 설정값을 지운다. undefined가 아닌 값으로 지정하면 그 값이 이 스타일의 명시적인 값이 된다.
    */
    var GridViewStyles = function (styles) {
        if (styles) {
            for (var prop in styles) {
                this[prop] = styles[prop];
            };
        };

        // this.background = "#ffffffff";
        // this.selectedBackground = "#FF696969";
        // this.inactiveBackground = "#FFD3D3D3";
        // this.border = null;
        // this.borderLeft =
        // this.borderRight =
        // this.borderTop =
        // this.borderBottom =
        // this.line =
        // this.font =
        // this.foreground =
        // this.textAlignment =
        // this.lineAlignment =
        // this.numberFormat =
        // this.dateFormat =
        // this.prefix =
        // this.postfix =
        // this.textWrap =
        // this.paddingLeft =
        // this.paddingRight =
        // this.paddingTop =
        // this.paddingBottom =
        // this.buttonWidth =
        // this.iconIndex =
        // this.iconLocation =
        // this.iconAlignment =
        // this.iconOffset =
        // this.iconPadding =
        // this.contentFit =
        // this.selectionDisplay =
        // this.hoveredBackground =
        // this.hoveredForeground =
        // this.hoveredMaskBackground =
        // this.hoveredMaskBorder =
        // this.figureBackground =
        // this.figureInactiveBackground =
        // this.figureBorder =
        // this.figureSize =
        // this.figureName =
        // this.figureState =
    };
    // style regions
    GridViewStyles.DEFAULT = "grid";
    GridViewStyles.PANEL = "panel";
    GridViewStyles.BODY = "body";
    GridViewStyles.BODY_EMPTY = "body.empty";
    GridViewStyles.FIXED = "fixed";
    GridViewStyles.FIXED_COLBAR = "fixed.colBar";
    GridViewStyles.FIXED_ROWBAR = "fixed.rowBar";
    GridViewStyles.HEADER = "header";
    GridViewStyles.HEADER_GROUP = "header.group";
    GridViewStyles.FOOTER = "footer";
    GridViewStyles.ROWGROUP_HEADER = "rowGroup.header";
    GridViewStyles.ROWGROUP_FOOTER = "rowGroup.footer";
    GridViewStyles.ROWGROUP_HEAD = "rowGroup.head";
    GridViewStyles.ROWGROUP_FOOT = "rowGroup.foot";
    GridViewStyles.ROWGROUP_BAR = "rowGroup.bar";
    GridViewStyles.ROWGROUP_HEADER_BAR = "rowGroup.headerBar";
    GridViewStyles.ROWGROUP_FOOTER_BAR = "rowGroup.footerBar";
    GridViewStyles.ROWGROUP_PANEL = "rowGroup.panel";
    GridViewStyles.ROWGROUP_LEVELS = "rowGruop.levels";
    GridViewStyles.INDICATOR = "indicator";
    GridViewStyles.INDICATOR_HEAD = "indicator.head";
    GridViewStyles.INDICATOR_FOOT = "indicator.foot";
    GridViewStyles.CHECKBAR = "checkBar";
    GridViewStyles.CHECKBAR_HEAD = "checkBar.head";
    GridViewStyles.CHECKBAR_FOOT = "checkBar.foot";
    GridViewStyles.STATEBAR = "stateBar";
    GridViewStyles.STATEBAR_HEAD = "stateBar.head";
    GridViewStyles.STATEBAR_FOOT = "stateBar.foot";
    GridViewStyles.SELECTION = "selection";
    GridViewStyles.TREE_EXPANDER = "tree.expander";

    /**
     * RowGroup options
     */
    var RowGroupOptions = function () {
        this.expandedAdornments = undefined;      // RowGroupAdornments.BOTH
        this.collapsedAdornments = undefined;     // RowGroupAdornments.HEADER
        this.summaryMode = undefined;             // SummaryMode.AGGREGATE
        this.cellDisplay = undefined;             // RowGroupCellDisplay.MERGE
        this.headerStatement = undefined;         // "${groupField}: ${groupValue} - ${rowCount} rows"
        this.levelIndent = undefined;             // 20
        this.mergeExpander = undefined;           // true
        this.mergeMode = undefined;               // false
    };

    /**
    * Fixed options.
    */
    var FixedOptions = function () {
        this.colCount = undefined;                 // 0
        this.rowCount = undefined;                 // 0
        this.exceptFromFiltering = undefined;      // true
        this.exceptFromSorting = undefined;        // true
        this.editable = undefined;                 // true
        this.resizable = undefined;                // false
        this.rowResizable = undefined;             // false
        // 최상위 컬럼들에만 적용
        this.movable = undefined;                  // false
        this.colBarWidth = undefined;              // 3
        this.rowBarHeight = undefined;             // 3
        this.ignoreColumnStyles = undefined;       // true
        this.ignoreDynamicStyles = undefined;      // false
    };

    /**
     * Sorting options.
     */
    var SortingOptions = function () {
        this.enabled = undefined;                   // true
        this.style = undefined;                     // SortStyle.EXCLUSIVE
        this.keepFocusedRow = undefined;            // false
        this.handleVisibility = undefined;          // HandleVisibility.VISIBLE
        //this.commitBeforeSorting = undefined;     // true
        this.toast = undefined;                     // ToastOptions { visible: false, message: "Sorting..." }
        this.handleImages = undefined;
    };

    /**
     * FilterSelector options
     */
    var FilterSelectorOptions = function () {
        this.minWidth = undefined;            // undefined
        this.maxWidth = undefined;            // undefined
        this.minHeight = undefined;           // undefined
        this.maxHeight = undefined;           // undefined
        this.closeWhenClick = undefined;      // false
    };

    /**
     * Filtering options
     */
    var FilteringOptions = function () {
        this.enabled = undefined;              // true;
        this.handleVisibility = undefined;     // HandleVisibility.VISIBLE
        this.toast = undefined;                // ToastOptions { visible: false, message: "Filtering..." }
        this.selector = undefined;             // FilterSelectorOptions
        this.handleImages = undefined;         
    };

    /**
     * ColumnHeader options
     */
    var ColumnHeaderOptions = function () {
        this.checkVisibility = undefined;           // HandleVisibility.VISIBLE
        this.imageCheckHandle = undefined;          // false
        this.checkImages = undefined;        
        this.checkColor = undefined;                // GRAY
        this.checkNoneColor = undefined;            // WHITE
        this.hoveredCheckColor = undefined;
        this.hoveredCheckNoneColor = undefined;
        this.checkBorderColor = undefined;          // BLACK
    };


    /**
     * Row grouping options
     */
    var GroupingOptions = function () {
        this.enabled = undefined;               // true;
        this.prompt = undefined;                // "컬럼 헤더를 이 곳으로 끌어다 놓으면 그 컬럼으로 그룹핑합니다.";
        this.linear = undefined;                // false;
        this.expandWhenGrouping = undefined;    // true
        this.toast = undefined;                 // ToastOptions { visible: false, message: "Grouping..." }
    };

    /**
     * SearchOptions.
     */
    var SearchOptions = function () {
        this.fields = undefined;         // []
        this.values = undefined;         // []
        this.startIndex = undefined;     // 0
        this.wrap = undefined;           // true
        this.select = undefined;         // true
        this.caseSensitive = undefined;  // false
        this.partialMatch = undefined;   // false
        this.allFields = undefined;      // true
    };

    /**
     * Select options.
     */
    var SelectOptions = function () {
        this.style = undefined;             // SelectionStyle.BLOCK
        //this.rangeSelect = undefined;     // true
    };

    /**
     * Toast view options.
     */
    var ToastOptions = function () {
        this.visible = undefined;     // true
        this.message = undefined;     // null
    };

    /**
     * Display options.
     */
    var DisplayOptions = function () {
        this.columnResizable = undefined;       // true
        this.columnMovable = undefined;         // true
        this.parentChangable = undefined;       // false
        this.defaultColumnWidth = undefined;    // 120
        this.fitStyle = undefined;              // GridFitStyle.NONE
        this.rowResizable = undefined;          // false
        this.rowHeight = undefined;             // 0
        this.minRowHeight = undefined;          // 4
        this.maxRowHeight = undefined;          // 0
        this.hscrollBar = undefined;            // true
        this.vscrollBar = undefined;            // true
        this.horzScrollStep = undefined;        // 8
        this.emptyMessage = undefined;          // "Loading..."
        // defaultRowHeight가 0일 때 행 높이를 결정하는 방법, null이면 데이터에 따라 자동으로 결정
        this.heightMeasurer = undefined;        // null
        // Grid 크기가 변경될 때 가로 Scroll 위치를 계산하여 변경
        this.fitWhenResized = undefined;        // true, When grid is resized, diplay maximum data column
        // false이면 스크롤이 끝날때 표시되고 true이면 스크롤되는중에도 표시
        this.liveScroll = undefined;            // true

        this.focusVisible = undefined;          // true
        this.focusColor = undefined;            // 0x555555
        this.focusActiveColor = undefined;      // NaN
        this.rightClickable = undefined;        // true
        this.editItemMerging = undefined;       // false 
        this.showInnerFocus = undefined;        // true, mergedCell에서 개별 cell의 영역 표시 여부
    };

    /**
     * Editing options.
     */
    var EditOptions = function () {
        this.deletable = undefined;             // false
        this.deleteRowsConfirm = undefined;     // true
        this.deleteRowsMessage = undefined;     //
        this.readOnly = undefined;              // false
        this.editable = undefined;              // true
        this.appendable = undefined;            // false
        this.insertable = undefined;            // false
        this.updatable = undefined;             // true
        this.validateOnEdited = undefined;      // true
        this.validateOnExit = undefined;        // false
        this.hintOnError = undefined;           // true
        this.commitLevel = undefined;           // ValidationLevel.IGNORE
        this.useTabKey = undefined;             // true
        this.enterToTab = undefined;            // false
        this.enterToNextRow = undefined;        // false
        this.enterToEdit = undefined;           // false
        // 변경된 내용이 없어도 appending 상태에서 항상 commit
        this.forceAppend = undefined;           // false
        this.checkable = undefined;             // true
        // 사용자 수정 완료 시 실제 변경이 있었는 지를 검사한다.
        this.checkDiff = undefined;             // false
        this.checkCellDiff = undefined;         // false
        this.strictDiff = undefined;            // false
        this.deletableWhenEdit = undefined;     // true
        this.skipReadOnly = undefined;          // false
        this.skipReadOnlyCell = undefined;      // false
        this.verticalMovingStep = undefined;    // VerticalMovingStep.DEFAULT
        this.showCommitError = undefined;       // true
        this.fontName = undefined;              // null
        this.fontSize = undefined;              // NaN
    };

    /**
     * Editor options.
     */
    var EditorOptions = function () {
        // Date editor
        this.yearDisplayFormat = undefined;     // "{Y}년",
        this.monthDisplayFormat = undefined;    // "{M}월",
        this.months = undefined;                // null
        this.weekDays = undefined;              // null
    };

    /**
     * Copy options.
     */
    var CopyOptions = function () {
        this.singleMode = undefined;        // false
        this.datetimeFormat = undefined;    // null
        this.booleanFormat = undefined;     // null
    };

    /**
     * Paste options.
     */
    var PasteOptions = function () {
        this.singleMode = undefined;            // false;
        this.startEdit = undefined;             // true;
        this.commitEdit = undefined;            // true;
        this.enableAppend = undefined;          // true;
        this.fillFieldDefaults = undefined;     // false;
        this.fillColumnDefaults = undefined;    // false;
        this.forceRowValidation = undefined;    // false;
        this.forceColumnValidation = undefined; // false;
        this.datetimeFormats = undefined;       // null;
        this.booleanFormat = undefined;         // null;
        this.numberChars = undefined;           // null;
        this.selectionBase = undefined;         // false;
        this.stopOnError = undefined;           // true;
        this.noEditEvent = undefined;           // false;
        this.checkReadOnly = undefined;         // false
        this.eventEachRow = undefined;          // false
    };

    /**
     * Row grouping options
     */
    var GroupingOptions = function () {
        this.enabled = undefined;                 // true;
        this.prompt = undefined;                  // "컬럼 헤더를 이 곳으로 끌어다 놓으면 그 컬럼으로 그룹핑합니다.";
        this.linear = undefined;                  // false;
        this.expandWhenGrouping = undefined;      // true
        this.toast = undefined;                   // ToastOptions { visible: false, message: "Grouping..." }
    };

    /**
     * TreeOptions
     */
    var TreeOptions = function () {
        this.expanderWidth = undefined; // 17
        this.showCheckBox = undefined;  // false
        this.checkBoxSize = undefined;  // 17
        this.iconImages = undefined;
        // 크기를 지정하지 않거나 0이하로 지정하면 아이콘 크기대로 표시.
        this.iconWidth = undefined;      // 0
    };

    /**
     * GridExportOptions
     */
    var GridExportOptions = function () {
        this.type = undefined;              // "excel"
        this.target = undefined;            // "remote"        // "remote" | "local"
        this.url = undefined;               // server url
        this.fileName = undefined;          //
        this.linear = undefined;            // false
        this.allItems = undefined;          // 감춰진 모든 행을 출력할것인지의 여부
        this.indicator = undefined;         // "default"    // "default" | "visible" | "hidden"
        this.header = undefined;            // "default"    // "default" | "visible" | "hidden"
        this.footer = undefined;            // "default"    // "default" | "visible" | "hidden"
        this.indenting = undefined;             // true
        this.showConfirm = undefined;       // true
        this.confirmMessage = undefined;    // "Excel 문서로 저장하시겠습니까?"
        this.confirmTitle = undefined;      // "Excel 저장"
        this.lookupDisplay = undefined;     // column의 lookupDisplay가 true일 때 표시된 값으로 저장
        this.datetimeFormat = undefined;    // datetime 포맷 문자열
        this.datetimeCallback = undefined;  // datetime 포맷 Callback 함수
        this.nullDateText = undefined;      // null일 때 표시할 문자열
        this.booleanFormat = undefined;     // boolean 포맷 문자열
        this.booleanCallback = undefined;   // boolean 포맷 Callback 함수
        this.numberFormat = undefined;      // number 포맷 문자열
        this.compatibility = undefined;     // excel 2007 호환 여부 (기본 false)
    };

    /**
     * ImageList
     */
    var ImageList = function (name, rootUrl) {
        this._src = new Grids.ImageList(name, rootUrl);

        this.getName = function () {
            return this._src.name();
        };
        this.addUrl = function (url) {
            this._src.addUrl(url);
        };
        this.addUrls = function (urls) {
            this._src.addUrls(urls);
        };
        this.getImage = function (index) {
            return this._src.getImage(index);
        };
    };

    var DataProvider = function () {
        this._dp = null;
    };
    DataProvider.prototype = {
        getOptions: function () {
            return _realgrid.getDataOptions(this._dp);
        },
        setOptions: function (options) {
            _realgrid.setDataOptions(this._dp, options);
        },
        beginUpdate: function () {
            this._dp.beginUpdate();
        },
        endUpdate: function (refresh) {
            this._dp.endUpdate(arguments.length > 0 ? refresh : true);
        },
        getFields: function () {
            return _realgrid.getDataFields(this._dp);
        },
        setFields: function (fields) {
            _realgrid.setDataFields(this._dp, fields);
        },
        getFieldCount: function () {
            return this._dp.fieldCount();
        },
        fieldByName: function (name) {
            return _realgrid.fieldByName(this._dp, name);
            //return this._dp.fieldByName(name);
        },
        getFieldNames: function () {
            return this._dp.getFieldNames();
        },
        getOrgFieldNames: function () {
            return this._dp.getOrgFieldNames();
        },
        getFieldName: function (fieldIndex) {
            return this._dp.getFieldName(fieldIndex);
        },
        getOrgFieldName: function (fieldIndex) {
            return this._dp.getOrgFieldName(fieldIndex);
        },
        getFieldIndex: function (fieldName) {
            return this._dp.getFieldIndex(fieldName);
        },
        hasData: function (row) {
            return this._dp.hasData(row);
        },
        clearRows: function () {
            this._dp.clearRows();
        },
        getValues: function (row) {
            return _realgrid.getDataValues(this._dp, row);
        },
        getJsonRow: function (row) {
            return this._dp.getRowObject(row);
        },
        updateRow: function (row, values) {
            this._dp.updateRow(row, values);
        },
        updateStrictRow: function (row, values) {
            this._dp.updateStrictRow(row, values);
        },
        checkRowStates: function (value) {
            this._dp.setCheckStates(value);
        },
        getRowState: function (row) {
            return this._dp.getRowState(row);
        },
        getStateRows: function (rowState) {
            return this._dp.getStateRows(rowState || RowState.NONE);
        },
        getAllStateRows: function () {
            return this._dp.getAllStateRows();
        }, 
        clearRowStates: function (deleteRows, rowEvents) {
            rowEvents = arguments.length > 1 ? rowEvents : false;
            this._dp.clearRowStates(deleteRows, rowEvents);
        },
        setRowState: function (row, state, force) {
            state = arguments.length > 1 ? state : RowState.NONE;
            force = arguments.length > 2 ? force : false;
            this._dp.setRowState(row, state, force);
        },
        setRowStates: function (rows, state, force, rowEvents) {
            state = arguments.length > 1 ? state : RowState.NONE;
            force = arguments.length > 2 ? force : false;
            rowEvents = arguments.length > 3 ? rowEvents : false;
            this._dp.setRowStates(rows, state, force, rowEvents);
        },
        getRowStateCount: function (states) {
            if (states) {
                var sts = _isArray(states) ? states : null;
                if (!sts) {
                    sts = [];
                    if (states == "*" || states == "all") {
                        sts.push(Grids.RowState.CREATED, Grids.RowState.UPDATED, Grids.RowState.DELETED, Grids.RowState.CREATE_AND_DELETED);
                    } else {
                        sts.push(states);
                    }
                }
                if (sts.length > 0) {
                    return this._dp.getRowStateCount(sts);
                }
            }
            return 0;
        },
        restoreUpdatedStates: function (rows) {
            return this._dp.restoreUpdatedStates(rows);
        },
        restoreUpdatedRows: function (rows) {
            return this._dp.restoreUpdatedRows(rows);
        },
        getDistinctValues: function (field, maxCount) {
            maxCount = arguments.length > 1 ? maxCount : -1;
            field = typeof field == "string" ? this._dp.getFieldIndex(field) : field;
            return this._dp.getDistinctValues(field, maxCount);
        },
        // save point
        savePoint: function (saveStates) {
            saveStates = arguments.length > 0 ? saveStates : true;
            return this._dp.savePoint(saveStates);
        },
        rollback: function (savePoint) {
            savePoint = arguments.length > 0 ? savePoint : 0;
            this._dp.rollback(savePoint);
        },
        clearSavePoints: function () {
            this._dp.clearSavePoints();
        },
        getSavePoints: function () {
            return this._dp.getSavePoints();
        },
        // event handlers
        onRowCountChanged: $_debug ? function (provider, newCount) {
            _log("onRowCountChanged: " + newCount);
        } : null
    };
    
    var LocalDataProvider = function () {
        this.base = DataProvider;
        this.base();
        this._dp = new Grids.LocalDataProvider();
        _realgrid.setDataProviderHandler(this);
    };
    LocalDataProvider.prototype = _extend(new DataProvider(), {
        getRowCount: function () {
            return this._dp.rowCount();
        },
        setRowCount: function (newCount, fillFieldDefaults, defaultValues, rowState) {
            fillFieldDefaults = arguments.length > 1 ? fillFieldDefaults : false;
            defaultValues = arguments.length > 2 ? defaultValues : null;
            rowState = arguments.length > 3 ? rowState : "none";
            return this._dp.setRowCount(newCount, fillFieldDefaults, defaultValues, rowState);
        },
        setFilters: function (filters, filterMode) {
            this._dp.setFilters(filters, filterMode);
        },
        fillJsonData: function (data, options) {
            _realgrid.loadData(this._dp, "json", data, options);
        },
        fillXmlData: function (data, options) {
            _realgrid.loadData(this._dp, "xml", data, options);
        },
        fillCsvData: function (data, options) {
            _realgrid.loadData(this._dp, "csv", data, options);
        },
        setRows: function (rows, start, count) {
            start = arguments.length > 1 ? start : 0;
            count = arguments.length > 2 ? count : -1;
            this._dp.setRows(rows, start, count);
        },
        addRows: function (rows, start, count, rowEvents) {
            start = arguments.length > 1 ? start : 0;
            count = arguments.length > 2 ? count : -1;
            rowEvents = arguments.length > 3 ? rowEvents : false;
            this._dp.addRows(rows, start, count, rowEvents);
        },
        insertRows: function (row, rows, start, count, rowEvents) {
            start = arguments.length > 2 ? start : 0;
            count = arguments.length > 3 ? count : -1;
            rowEvents = arguments.length > 4 ? rowEvents : false;
            this._dp.insertRows(row, rows, start, count, rowEvents);
        },
        updateRows: function (row, rows, start, count, rowEvents) {
            start = arguments.length > 2 ? start : 0;
            count = arguments.length > 3 ? count : -1;
            rowEvents = arguments.length > 4 ? rowEvents : false;
            this._dp.updateRows(row, rows, start, count, rowEvents);
        },
        updateStrictRows: function (row, rows, start, count, rowEvents) {
            start = arguments.length > 2 ? start : 0;
            count = arguments.length > 3 ? count : -1;
            rowEvents = arguments.length > 4 ? rowEvents : false;
            this._dp.updateStrictRows(row, rows, start, count, rowEvents);
        },
        setData: function (data, options) {
            if (data && options && options.type) {
                if (options.type == "csv") {
                    var start = Math.max(0, options.start !== UNDEFINED ? options.start : 0);
                    var count = Math.max(-1, options.count !== UNDEFINED ? options.count : -1);
                    this._dp.setCsvRows(data, start, count, options.fieldCount, options.quoted);
                }
            }
        },
        addRow: function (values) {
            return this._dp.addRow(values);
        },
        insertRow: function (row, values) {
            return this._dp.insertRow(row, values);
        },
        removeRow: function (row) {
            this._dp.removeRow(row);
        },
        removeRows: function (rows, rowEvents) {
            this._dp.removeRows(rows, rowEvents);
        },
        moveRow: function (row, newRow) {
            this._dp.moveRow(row, newRow);
        },
        moveRows: function (row, count, newRow) {
            this._dp.moveRows(row, count, newRow);
        },
        getValue: function (row, field) {
            return _realgrid.getDataValue(this._dp, row, field);
        },
        setValue: function (row, field, newValue) {
            _realgrid.setDataValue(this._dp, row, field, newValue);
        },
        getRows: function (startRow, endRow) {
            startRow = arguments.length > 0 ? startRow : 0;
            endRow = arguments.length > 1 ? endRow : -1;
            return this._dp.getRows(startRow, endRow);
        },
        getJsonRows: function (startRow, endRow) {
            startRow = arguments.length > 0 ? startRow : 0;
            endRow = arguments.length > 1 ? endRow : -1;
            return this._dp.getRowObjects(startRow, endRow);
        },
        getOutputRows: function (options, startRow, endRow) {
            startRow = arguments.length > 1 ? startRow : 0;
            endRow = arguments.length > 2 ? endRow : -1;
            return this._dp.getOutputObjects(options, startRow, endRow);
        },
        getOutputRow: function (options, row) {
            return this._dp.getOutputObject(options, row);
        },
        getFieldValues: function (field, startRow, endRow) {
            startRow = arguments.length > 1 ? startRow : 0;
            endRow = arguments.length > 2 ? endRow : -1;
            if (typeof field == "string") {
                field = this._dp.getFieldIndex(field);
            }
            return this._dp.getColumn(field, startRow, endRow);
        },
        // event handlers -- 불필요한 handler른 설정하지 않는다.
        onRowUpdating: $_debug ? function (provider, row) {
            _log("onRowUpdating: " + row);
            return true;
        } : null,
        onRowUpdated: $_debug ? function (provider, row) {
            _log("onRowUpdated: " + row);
        } : null,
        onRowsUpdated: $_debug ? function (provider, row, count) {
            _log("onRowsUpdated: " + row + ", " + count);
        } : null,
        onRowInserting: $_debug ? function (provider, row, values) {
            _log("onRowInserting: " + row);
            return true;
        } : null,
        onRowInserted: $_debug ? function (provider, row) {
            _log("onRowInserted: " + row);
        } : null,
        onRowsInserted: $_debug ? function (provider, row, count) {
            _log("onRowsInserted: " + row + ", " + count);
        } : null,
        onRowDeleting: $_debug ? function (provider, row) {
            _log("onRowDeleting: " + row);
            return true;
        } : null,
        onRowDeleted: $_debug ? function (provider, row) {
            _log("onRowDeleted: " + row);
        } : null,
        onRowsDeleted: $_debug ? function (provider, rows) {
            _log("onRowsDeleted: " + rows);
        } : null,
        onRowMoving: $_debug ? function (provider, row, newRow) {
            _log("onRowMoving: " + row + " => " + newRow);
            return true;
        } : null,
        onRowMoved: $_debug ? function (provider, row, newRow) {
            _log("onRowMoved: " + row + " => " + newRow);
        } : null,
        onRowsMoving: $_debug ? function (provider, row, count, newRow) {
            _log("onRowsMoving: " + row + ", " + count + " => " + newRow);
            return true;
        } : null,
        onRowsMoved: $_debug ? function (provider, row, count, newRow) {
            _log("onRowsMoved: " + row + ", " + count + " => " + newRow);
        } : null,
        onValueChanged: $_debug ? function (provider, row, field) {
            _log("onValueChanged: " + row + ", " + field);
        } : null,
        onDataChanged: $_debug ? function (provider) {
            _log("onDataChanged");
        } : null,
        onRowStateChanged: $_debug ? function (provider, row) {
            _log("onRowStateChanged: " + row);
        } : null,
        onRowStatesChanged: $_debug ? function (provider, rows) {
            _log("onRowStatesChanged: " + rows);
        } : null,
        onRowStatesCleared: $_debug ? function (provider) {
            _log("onRowStatesCleared");
        } : null
    });

    Grids.GridBase.setGridMapper({
        column: {
            "lookupValues": "values",
            "lookupLabels": "labels"
        }
    });

    var GridBase = function () {
        this._gv = null;
        this._dataSource = null;
    };
    GridBase.prototype = {
        constructor: GridBase,    

        ping: function (message) {
            _realgrid.ping(this._gv, message);
        },
        beginUpdate: function () {
            this._gv.beginUpdate();
        },
        endUpdate: function (force) {
            this._gv.endUpdate(arguments.length > 0 ? force : true);
        },
        refresh: function () {
            _realgrid.refreshGrid(this._gv);
        },
        isVisible: function () {
            return _realgrid.isVisible(this._gv);
        },
        setVisible: function (value) {
            _realgrid.setVisible(this._gv, value);
        },
        getItemCount: function () {
            return this._gv.itemCount();
        },
        getDataRow: function (itemIndex) {
            return _realgrid.getDataRow(this._gv, itemIndex);
        },
        getRowsOfItems: function (items) {
            return _realgrid.getRowsOfItems(this._gv, items);
        },
        getItemIndex: function (dataRow) {
            return this._gv.getItemIndexOfRow(dataRow);
        },
        getItemsOfRows: function (rows) {
            return this._gv.getItemIndiciesOfRows(rows);
        },
        getColumns: function () {
            return _realgrid.getColumns(this._gv);
        },
        setColumns: function (columns) {
            var cols = _realgrid.createColumns(columns);
            this._gv.setColumns(cols);
        },
        getDataSource: function () {
            return this._dataSource;
        },
        setDataSource: function (dataProvider) {
            this._dataSource = dataProvider;
            this._gv.setDataSource(dataProvider ? dataProvider._dp: null);
        },
        getDataProvider: function () {
            return this.getDataSource();
        },
        setDataProvider: function (dataProvider) {
            this.setDataSource(dataProvider);
        },
        getOptions: function () {
            return this._gv.getOptions();
        },
        setOptions: function (options) {
            _realgrid.setOptions(this._gv, options);
        },
        setStyles: function (styles) {
            this._gv.loadStyles(styles);
        },
        getStyles: function (region, all) {
            all = arguments.length > 1 ? all : true;
            return _realgrid.getStyles(this._gv, region, all);
        },
        clearStyles: function (region) {
            this._gv.clearStyles(region);
        },
        // @Deprecated Use getColumnGroupNames instead.
        getGroupNames: function () {
            return _realgrid.getColumnGroupNames(this._gv);
        },
        getColumnGroupNames: function () {
            return _realgrid.getColumnGroupNames(this._gv);
        },
        orderBy: function (fieldNames, sortDirs, textCases) {
            _realgrid.orderBy(this._gv, fieldNames, sortDirs, textCases);
        },
        getSortedFields: function () {
            return _realgrid.getSortedFields(this._gv);
        },
        setFocus: function () {
            this._gv.setFocus();
        },
        getColumnNames: function (columnsOnly) {
            return this._gv.getColumnNames(columnsOnly);
        },
        columnByName: function (name) {
            return _realgrid.columnByName(this._gv, name);
        },
        columnByField: function (fieldName) {
            return _realgrid.columnByField(this._gv, fieldName);
        },
        columnsByField: function (fieldName) {
            return _realgrid.columnsByField(this._gv, fieldName);
        },
        columnByTag: function (tag) {
            return _realgrid.columnByTag(this._gv, tag);
        },
        columnsByTag: function (tag) {
            return _realgrid.columnsByTag(this._gv, tag);
        },
        getColumnProperty: function (column, prop) {
            return _realgrid.getColumnProperty(this._gv, column, prop);
        },
        setColumnProperty: function (column, prop, value) {
            _realgrid.setColumnProperty(this._gv, column, prop, value);
        },
        setColumn: function (value) {
            _realgrid.setColumn(this._gv, value);
        },
        getDisplayColumns: function () {
            return _realgrid.getDisplayColumns(this._gv);
        },
        // layouts
        registerColumnLayouts: function (layouts) {
            this._gv.setColumnLayouts(layouts);
        },
        setColumnLayout: function (layout) {
            this._gv.setColumnLayout(layout);
        },
        restoreColumns: function (restoreSize) {
            restoreSize = arguments.length > 0 ? restoreSize : true;
            return this._gv.restoreColumns(restoreSize);
        },
        linearizeColumns: function (sortProps) {
            return this._gv.linearizeColumns(sortProps);
        },
        saveColumnLayout: function () {
            return _realgrid.saveColumnLayout(this._gv);
        },
        fitColumnWidth: function (column, maxWidth, minWidth, visibleOnly) {
            maxWidth = arguments.length > 1 ? maxWidth : 0;
            minWidth = arguments.length > 2 ? minWidth : 0;
            return _realgrid.fitColumnWidth(this._gv, column, maxWidth, minWidth, visibleOnly);
        },
        // renderers
        addCellRenderers: function (renderers) {
            return this._gv.dataCellRenderers().addRenderers(renderers);
        },
        // index
        getCurrent: function () {
            return _realgrid.getCurrent(this._gv);
        },
        setCurrent: function (current, select) {
            select = arguments.length > 1 ? select : true;
            _realgrid.setCurrent(this._gv, current, select);
        },
        resetCurrent: function () {
            _realgrid.resetCurrent(this._gv);
        },
        mouseToIndex: function (x, y) {
            return _realgrid.mouseToIndex(this._gv, x, y);
        },
        // options
        getDisplayOptions: function () {
            return this._gv.displayOptions().proxy();
        },
        setDisplayOptions: function (value) {
            this._gv.setDisplayOptions(value);
        },
        getSelectOptions: function () {
            return this._gv.selectOptions().proxy();
        },
        setSelectOptions: function (options) {
            this._gv.setSelectOptions(options);
        },
        getFixedOptions: function () {
            return this._gv.fixedOptions().proxy();
        },
        setFixedOptions: function (options) {
            this._gv.setFixedOptions(options);
        },
        getSortingOptions: function () {
            return this._gv.sortingOptions().proxy();
        },
        setSortingOptions: function (options) {
            this._gv.setSortingOptions(options);
        },
        getFilteringOptions: function () {
            return this._gv.filteringOptions().proxy();
        },
        setFilteringOptions: function (options) {
            this._gv.setFilteringOptions(options);
        },
        getColumnHeaderOptions: function () {
            return this._gv.columnHeaderOptions().proxy();
        },
        setColumnHeaderOptions: function (options) {
            this._gv.setColumnHeaderOptions(options);
        },
        getEditOptions: function () {
            return this._gv.editOptions().proxy();
        },
        setEditOptions: function (options) {
            this._gv.setEditOptions(options);
        },
        getEditorOptions: function () {
            return this._gv.editorOptions().proxy();
        },
        setEditorOptions: function (options) {
            this._gv.setEditorOptions(options);
        },        
        getCopyOptions: function () {
            return this._gv.copyOptions().proxy();
        },
        setCopyOptions: function (options) {
            this._gv.setCopyOptions(options);
        },
        getPasteOptions: function () {
            return this._gv.pasteOptions().proxy();
        },
        setPasteOptions: function (options) {
            this._gv.setPasteOptions(options);
        },
        // components
        getPanel: function () {
            return this._gv.panel().proxy();
        },
        setPanel: function (value) {
            this._gv.panel().assign(value);
        },
        getIndicator: function () {
            return this._gv.indicator().proxy();
        },
        setIndicator: function (value) {
            this._gv.setIndicator(value);
        },
        getStateBar: function () {
            return this._gv.stateBar().proxy();
        },
        setStateBar: function (value) {
            this._gv.setStateBar(value);
        },
        getCheckBar: function () {
            return this._gv.checkBar().proxy();
        },
        setCheckBar: function (value) {
            this._gv.setCheckBar(value);
        },
        getHeader: function () {
            return this._gv.header().proxy();
        },
        setHeader: function (value) {
            this._gv.setHeader(value);
        },
        getFooter: function () {
            return this._gv.footer().proxy();
        },
        setFooter: function (value) {
            this._gv.setFooter(value);
        },
        /// column filters
        setColumnFilters: function (column, filters) {
            _realgrid.setColumnFilters(this._gv, column, filters);
        },
        clearColumnFilters: function (column) {
            _realgrid.clearColumnFilters(this._gv, column);
        },
        addColumnFilters: function (column, filters, overwrite) {
            overwrite = arguments.length > 2 ? overwrite : false;
            _realgrid.addColumnFilters(this._gv, column, filters, overwrite);
        },
        removeColumnFilters: function (column, filterNames) {
            _realgrid.removeColumnFilters(this._gv, column, filterNames);
        },
        activateColumnFilters: function (column, filterNames, active) {
            _realgrid.activateColumnFilters(this._gv, column, filterNames, active);
        },
        activateAllColumnFilters: function (column, active) {
            _realgrid.activateAllColumnFilters(this._gv, column, active);
        },
        toggleColumnFilters: function (column, filterNames) {
            _realgrid.toggleColumnFilters(this._gv, column, filterNames);
        },
        toggleAllColumnFilters: function (column) {
            _realgrid.toggleAllColumnFilters(this._gv, column);
        },
        getColumnFilter: function (column, filterName) {
            return _realgrid.getColumnFilter(this._gv, column, filterName);
        },
        getColumnFilters: function (column) {
            return _realgrid.getColumnFilters(this._gv, column);
        },
        getActiveColumnFilters: function (column, active) {
            active = arguments.length > 1 ? active : true;
            return _realgrid.getActiveColumnFilters(this._gv, column, active);
        },
        setColumnFilterActions: function (column, actions) {
            _realgrid.setFilterActions(this._gv, column, actions);
        },
        clearColumnFilterActions: function (column) {
            _realgrid.clearFilterActions(this._gv, column);
        },
        /// values
        setValues: function (itemIndex, values, strict) {
            strict = arguments.length > 2 ? strict : false;
            return _realgrid.setValues(this._gv, itemIndex, values, strict);
        },
        getValue: function (itemIndex, field) {
            return this._gv.getCellValue(itemIndex, field);
        },
        setValue: function (itemIndex, field, newValue) {
            return this._gv.setCellValue(itemIndex, field, newValue);
        },
        // imageList
        registerImageList: function (imageList) {
            imageList && this._gv.registerImageList(imageList._src);
        },
        // menu
        addPopupMenu: function (name, menuItems) {
            return _realgrid.addPopupMenu(this._gv, name, menuItems);
        },
        setContextMenu: function (menuItems) {
            this._gv.setContextMenu(menuItems);
        },
        // editing
        getSelection: function () {
            return _realgrid.getSelectionItem(this._gv, this._gv.getSelection());
        },
        setSelection: function (item) {
            _realgrid.setSelectionItem(this._gv, item);
        },
        clearSelection: function () {
            this._gv.clearSelection();
        },
        getSelectedItems: function () {
            return _realgrid.getSelectionItems(this._gv, this._gv.getSelection());
        },
        getSelectedRows: function () {
            return _realgrid.getSelectionRows(this._gv, this._gv.getSelection());
        },
        deleteSelection: function (force) {
            this._gv.deleteSelection(force);
        },
        getSelectionData: function (maxRows) {
            maxRows = arguments.length > 0 ? maxRows : -1;
            return _realgrid.getSelectionData(this._gv, maxRows);
        },
        commitEditor: function (hideEditor) {
            hideEditor = arguments.length > 0 ? hideEditor : true;
            this._gv.commitEditor(hideEditor);
        },
        commit: function (force) {
            force = arguments.length > 0 ? force : false;
            return this._gv.commit(force);
        },
        cancel: function () {
            return this._gv.cancel();
        },
        fillEditSearchItems: function (column, searchKey, values, labels) {
            var col = _realgrid.$_getColumn(this._gv, column);
            this._gv.fillEditSearchItems(col, searchKey, values, labels);
        },
        isItemEditing: function () {
            return this._gv.isItemEditing();
        },
        setValidations: function (value) {
            this._gv.setValidations(value);
        },
        showEditor: function () {
            this._gv.showEditor();
        },
        hideEditor: function() {
            this._gv.hideEditor();
        },
        cancelEditor: function () {
            this._gv.cancelEditor();
        },
        getEditingItem: function () {
            return _realgrid.getEditingItem(this._gv);
        },
        getItemState: function (itemIndex) {
            return _realgrid.getItemState(this._gv, itemIndex);
        },
        // toast
        showToast: function (options, force) {
            this._gv.showToast(options, force);
        },
        hideToast: function (action) {
            this._gv.hideToast(action);
        },
        // lookups
        setLookups: function (sources) {
            this._gv.setLookupProvider(sources);
        },
        addLookupSource: function (source) {
            this._gv.addLookupSource(source);
        },
        removeLookupSource: function (sourceId) {
            this._gv.removeLookupSource(sourceId);
        },
        existsLookupData: function (sourceId, keys) {
            return this._gv.existsLookupData(sourceId, keys);
        },
        fillLookupData: function (sourceId, data) {
            this._gv.fillLookupData(sourceId, data);
        },
        clearLookupData: function (sourceId) {
            this._gv.clearLookupData(sourceId);
        },
        // checked
        isCheckable: function (itemIndex) {
            return this._gv.isCheckable(itemIndex);
        },
        setCheckable: function (itemIndex, value) {
            this._gv.setCheckable(itemIndex, value);
        },
        isCheckedItem: function (itemIndex) {
            return this._gv.isCheckedItem(itemIndex);
        },
        isCheckedRow: function (dataRow) {
            return this._gv.isCheckedRow(dataRow);
        },
        checkItem: function (itemIndex, checked, exclusive) {
            checked = arguments.length > 1 ? checked : true;
            exclusive = arguments.length > 2 ? exclusive : false;
            this._gv.checkItem(itemIndex, checked, exclusive);
        },
        checkRow: function (dataRow, checked, exclusive) {
            checked = arguments.length > 1 ? checked : true;
            exclusive = arguments.length > 2 ? exclusive : false;
            this._gv.checkRow(dataRow, checked, exclusive);
        },
        checkItems: function (itemIndicies, checked) {
            checked = arguments.length > 1 ? checked : true;
            this._gv.checkItems(itemIndicies, checked);
        },
        checkRows: function (dataRows, checked) {
            checked = arguments.length > 1 ? checked : true;
            this._gv.checkRows(dataRows, checked);
        },
        checkAll: function (checked, visibleOnly, checkableOnly) {
            checked = arguments.length > 0 ? checked : true;
            this._gv.checkAll(checked, visibleOnly, checkableOnly);
        },
        setAllCheck: function (checked) {
            checked = arguments.length > 0 ? checked : true;
            this._gv.setAllCheck(checked);
        },
        isAllChecked: function () {
            return this._gv.isAllChecked();
        },
        resetCheckables: function (clearExpression) {
            _realgrid.resetCheckables(this._gv, clearExpression);
        },
        applyCheckables: function () {
            this._gv.applyCheckables();
        },
        setCheckableExpression: function (expression, apply) {
            apply = arguments.length > 1 ? apply : true;
            _realgrid.setCheckableExpression(this._gv, expression, apply)
        },
        // summary
        getSummary: function (field, summary) {
            return this._gv.getSummary(field, summary);
        },
        // item model
        getModel: function (itemIndex, extended) {
            return _realgrid.getModel(this._gv, itemIndex, extended);
        },
        getModelAs: function (itemIndex, itemType, extended) {
            return _realgrid.getModelAs(this._gv, itemIndex, itemType, extended);
        },
        getGroupModel: function (itemIndex, extended) {
            return _realgrid.getGroupModel(this._gv, itemIndex, extended);
        },
        getParentModel: function (model, extended) {
            return _realgrid.getParentModel(this._gv, model, extended);
        },
        getRootModel: function (model, extended) {
            return _realgrid.getRootModel(this._gv, model, extended)
        },
        getChildModels: function (model, extended) {
            return _realgrid.getChildModels(this._gv, model, extended);
        },
        getChildModel: function (model, index, extended) {
            return _realgrid.getChildModel(this._gv, model, index, extended);
        },
        getModels: function (itemIndices, extended) {
            return _realgrid.getModels(this._gv, itemIndices, extended);
        },
        getModelOfRow: function (dataRow, extended) {
            return _realgrid.getModelOfRow(this._gv, dataRow, extended);
        },
        getModelsOfRows: function (dataRows, extended) {
            return _realgrid.getModelsOfRows(this._gv, dataRows, extended);
        },
        expandModel: function (model, recursive, force) {
            recursive = arguments.length > 1 ? recursive : false;
            force = arguments.length > 2 ? force : false;
            _realgrid.expandModel(this._gv, model, recursive, force);
        },
        collapseModel: function (model, recursive) {
            recursive = arguments.length > 1 ? recursive : false;
            _realgrid.collapseModel(this._gv, model, recursive);
        },
        getGroupSummary: function (model, field, statistical) {
            return _realgrid.getGroupSummary(this._gv, model, field, statistical);
        },
        /// data cell styles
        hasCellStyle: function (id) {
            return _realgrid.hasCellStyle(this._gv, id);
        },
        addCellStyle: function (id, cellStyle, overwrite) {
            overwrite = arguments.length > 2 ? overwrite : false;
            _realgrid.addCellStyle(this._gv, id, cellStyle, overwrite);
        },
        addCellStyles: function (cellStyles, overwrite) {
            overwrite = arguments.length > 1 ? overwrite : false;
            _realgrid.addCellStyles(this._gv, cellStyles, overwrite);
        },
        removeCellStyles: function (ids) {
            _realgrid.removeCellStyles(this._gv, ids);
        },
        removeAllCellStyles: function () {
            _realgrid.removeAllCellStyles(this._gv);
        },

        setCellStyle: function (dataRow, field, styleId, updateNow) {
            updateNow = arguments.length > 3 ? updateNow : true;
            this._gv.setDataCellStyle(dataRow, field, styleId, updateNow);
        },
        setCellStyles: function (dataRows, fields, styleId) {
            this._gv.setDataCellStyles(dataRows, fields, styleId);
        },
        setCellStyleRows: function (rows, fieldMap) {
            this._gv.setDataCellStyleRows(rows, fieldMap);
        },
        clearCellStyles: function () {
            this._gv.clearDataCellStyles();
        },
        getCellStyle: function (dataRow, field) {
            return this._gv.getDataCellStyleId(dataRow, field);
        },
        // progress
        showProgress: function (modal) {
            this._gv.showProgress(modal);
        },
        setProgress: function (min, max, position, message) {
            this._gv.setProgress(min, max, position, message);
        },
        closeProgress: function () {
            this._gv.closeProgress();
        },
        // utils
        searchItem: function (options) {
            if (options) {
                var fields = options.fields;
                var values = options.values;
                var startIndex = options.startIndex !== undefined ? options.startIndex : 0;
                var wrap = options.wrap !== undefined ? options.wrap : true;
                var select = options.select !== undefined ? options.select : true;
                return this._gv.searchItem(fields, values, options, startIndex, wrap, select);
            }
            return -1;
        },
        searchCell: function (options) {
            if (options) {
                var fields = options.fields;
                var value = options.value;
                var startItemIndex = options.startItemIndex !== undefined ? options.startItemIndex : 0;
                var startFieldIndex = options.startFieldIndex !== undefined ? options.startFieldIndex : 0;
                var wrap = options.wrap !== undefined ? options.wrap : true;
                var select = options.select !== undefined ? options.select : true;
                return this._gv.searchCell(fields, value, options, startItemIndex, startFieldIndex, wrap, select);
            }
            return null;
        },
        resetSize: function () {
            _realgrid.resetSize(this._gv);
        },
        closeList: function () {
            this._gv.closePopups();
        },
        // excel
        exportGrid: function (options) {
            _realgrid.exportGrid(this._gv, options);
        },
        scrollPage: function (delta) {
            this._gv._vscrollBar._doScroll("pageDown",delta,0);
        },
        // event handlers -- 불필요한 handler는 설정하지 않는다.
        onCurrentChanging: $_debug ? function (grid, oldIndex, newIndex) {
            _log("onCurrentChanging: " + JSON.stringify(newIndex));
            return true;
        } : null,
        onCurrentChanged: $_debug ? function (grid, newIndex) {
            _log("onCurrentChanged: " + JSON.stringify(newIndex));
        } : null,
        onCurrentRowChanged: $_debug ? function (grid, oldRow, newRow) {
            _log("onCurrentRowChanged: " + oldRow + " => " + newRow);
        } : null,
        onColumnHeaderClicked: $_debug ? function (grid, column) {
            _log("onColumnHeaderClicked: " + "(" + column.name + ")");
        } : null,
        onColumnHeaderDblClicked: $_debug ? function (grid, column) {
            _log("onColumnHeaderDblClicked: " + "(" + column.name + ")");
        } : null,
        onColumnCheckedChanged: $_debug ? function (grid, column, checked) {
            _log("onColumnCheckedChanged: " + "(" + column.name + ", " + checked + ")");
        } : null,
        onFooterCellClicked: $_debug ? function (grid, column) {
            _log("onFooterCellClicked : " + "(" + column.name + ")");
        } : null,
        onFooterCellDblClicked : $_debug ? function (grid, column) {
            _log("onFooterCellDblClicked : " + "(" + column.name + ")");
        } : null,
        onCheckBarFootClicked : $_debug ? function (grid) {
            _log("onCheckBarFootClicked");
        } : null,
        onIndicatorCellClicked : $_debug ? function (grid, itemIndex) {
            _log("onIndicatorCellClicked : " + "(" + itemIndex + ")");
        } : null,
        onStateBarCellClicked : $_debug ? function (grid, itemIndex) {
            _log("onStateBarCellClicked : " + "(" + itemIndex + ")");
        } : null,
        onRowGroupHeadClicked : $_debug ? function (grid) {
            _log("onRowGroupHeadClicked");
        } : null,
        onRowGroupFootClicked : $_debug ? function (grid) {
            _log("onRowGroupFootClicked");
        } : null,
        onRowGroupHeaderFooterClicked : $_debug ?  function (grid, index) {
            _log("onRowGroupHeaderFooterClicked : " + "(" + index + ")");
        } : null,
        onRowGroupBarClicked : $_debug ?  function (grid, index) {
            _log("onRowGroupBarClicked : " + "(" + index + ")");
        } : null,
        onCheckBarFootDblClicked : $_debug ? function (grid) {
            _log("onCheckBarFootDblClicked");
        } : null,
        onIndicatorCellDblClicked : $_debug ? function (grid, itemIndex) {
            _log("onIndicatorCellDblClicked : " + "(" + itemIndex + ")");
        } : null,
        onStateBarCellDblClicked : $_debug ? function (grid, itemIndex) {
            _log("onStateBarCellDblClicked : " + "(" + itemIndex + ")");
        } : null,
        onRowGroupHeadDblClicked : $_debug ? function (grid) {
            _log("onRowGroupHeadDblClicked");
        } : null,
        onRowGroupFootDblClicked : $_debug ? function (grid) {
            _log("onRowGroupFootDblClicked");
        } : null,
        onRowGroupHeaderFooterDblClicked : $_debug ? function (grid, index) {
            _log("onRowGroupHeaderFooterDblClicked : " + "(" + index + ")");
        } : null,
        onRowGroupBarDblClicked : $_debug ? function (grid, index) {
            _log("onRowGroupBarDblClicked : " + "(" + index + ")");
        } : null,
        onPanelClicked : $_debug ? function (grid) {
            _log("onPanelClicked");
        } : null,
        onPanelDblClicked : $_debug ? function (grid) {
            _log("onPanelDblClicked");
        } : null,
        onRowGroupPanelClicked : $_debug ? function (grid, column) {
            _log("onRowGroupPanelClicked : " + "(" + column.name + ")");
        } : null,
        onRowGroupPanelDblClicked : $_debug ? function (grid, column) {
            _log("onRowGroupPanelDblClicked : " + "(" + column.name + ")");
        } : null,
        onValidateColumn: $_debug ? function (grid, column, inserting, value) {
            return null;
        } : null,
        onValidateRow: $_debug ? function (grid, itemIndex, dataRow, inserting, values) {
            return null;
        } : null,
        onMenuItemClicked: $_debug ? function (grid, data) {
            _log("onMenuItemClicked: " + data);
        } : null,
        onContextMenuPopup: $_debug ? function (grid, x, y) {
            _log("onContextMenuPopup: x = " + x + ", y = " + y);
        } : null,
        onContextMenuItemClicked: $_debug ? function (grid, data, index) {
            _log("onContextMenuItemClicked: " + data + ", " + index);
        } : null,
        onCellButtonClicked: $_debug ? function (grid, itemIndex, column) {
            _log("onCellButtonClicked: " + itemIndex + ", " + column.name);
        } : null,
        onLinkableCellClicked: $_debug ? function (grid, index, url) {
            _log("" + JSON.stringify(index) + ", " + url);
        } : null,
        onScrollToBottom: $_debug ? function (grid) {
            _log("scrolled to bottom!");
        } : null,
        onDataCellClicked: $_debug ? function (grid, index) {
            _log("onDataCellClicked: " + JSON.stringify(index));
        } : null,
        onDataCellDblClicked: $_debug ? function (grid, index) {
            _log("onDataCellDblClicked: " + JSON.stringify(index));
        } : null,
        onRowsDeleting: $_debug ? function (grid, rows) {
            _log("onRowsDeleting: " + rows);
        } : null,
        onRowInserting: $_debug ? function (grid, itemIndex, dataRow) {
            _log("onRowInserting: " + itemIndex + ", " + dataRow);
        } : null,
        onSelectionChanged: $_debug ? function (grid) {
            _log("onSelectionChanged");
        } : null,
        onSelectionAdded: $_debug ? function (grid, selection) {
            _log("onSelectionAdded: " + JSON.stringify(selection));
        } : null,
        onSelectionEnded: $_debug ? function (grid) {
            _log("onSelectionEnded");
        } : null,
        onShowEditor: $_debug ? function (grid, index) {
            _log("onShowEditor");
        } : null,
        onHideEditor: $_debug ? function (grid, index) {
            _log("onHideEditor");
        } : null,
        onEditChange: $_debug ? function (grid, index, value) {
            _log("onEditChange: " + value);
        } : null,
        onGetEditValue: $_debug ? function (grid, index, editResult) {
            _log("onGetEditValue: " + JSON.stringify(editResult));
        } : null,
        onEditCommit: $_debug ? function (grid, index, oldValue, newValue) {
            _log("onEditCommit: " + oldValue + " => " + newValue);
        } : null,
        onEditCanceled: $_debug ? function (grid, index) {
            _log("onEditCanceled");
        } : null,
        onEditSearch: $_debug ? function (grid, index, text) {
            _log("onEditSearch: " + text);
        } : null,
        onEditRowChanged: $_debug ? function (grid, itemIndex, dataRow, field, oldValue, newValue) {
            _log("onEditRowChanged: " + itemIndex + ", " + dataRow +  ", " + field, oldValue, newValue);
        } : null,
        onEditRowPasted: $_debug ? function (grid, itemIndex, dataRow, fields, oldValues, newValues) {
            _log("onEditRowPasted: " + itemIndex + ", " + dataRow +  ", " + fields, oldValues, newValues);
        } : null,
        onRowsPasted: $_debug ? function (grid, items) {
            _log("onRowsPasted: " + items);
        } : null,
        onCellEdited: $_debug ? function (grid, itemIndex, dataRow, field) {
            _log("onCellEdited: " + itemIndex + ", " + dataRow +  ", " + field);
        } : null,
        onItemChecked: $_debug ? function (grid, itemIndex, checked) {
            _log("onItemChecked: " + itemIndex + ", " + checked);
        } : null,
        onItemsChecked: $_debug ? function (grid, items, checked) {
            _log("onItemsChecked: " + items + ", " + checked);
        } : null,
        onItemAllChecked: $_debug ? function (grid, checked) {
            _log("onItemAllChecked: " + checked);
        } : null,
        onErrorClicked: $_debug ? function (grid, error) {
            _log("onErrorClicked: " + error);
        } : null,
        onSorting: $_debug ? function (grid, fields, directions) {
            _log("onSorting: " + JSON.stringify(fields) + ", " + JSON.stringify(directions));
        } : null,
        onSortingChanged: $_debug ? function (grid) {
            _log("onSortingChanged");
        } : null,
        onFiltering: $_debug ? function (grid) {
            _log("onFiltering");
        } : null,
        onFilteringChanged: $_debug ? function (grid) {
            _log("onFilteringChanged");
        } : null,
        onFilterActionClicked: $_debug ? function (grid, column, action, x, y) {
            _log("onFilterActionClicked: " + column + ", " + action + ", " + x + ", " + y);
        } : null,
        onKeyDown : $_debug ? function (grid, key, ctrl, shift, alt) {
            _log("onKeyDown: key = " + key);
            return true;
        } : null,
        onKeyPress : $_debug ? function (grid, key) {
            _log("onKeyPress: key = " + key);
        } : null,
        onKeyUp : $_debug ? function (grid, key, ctrl, shift, alt) {
            _log("onKeyUp: key = " + key);
        } : null
    };
    
    var GridView = function (container, readMode) {
        var readOnly = arguments.length > 1 ? readMode : false;
        this.base = GridBase;
        this.base();
        _realgrid.createGrid(container, this, readOnly);
    };
    GridView.prototype = _extend(new GridBase(null, true), {
        constructor: GridView,

        getValues: function (itemIndex) {
            return _realgrid.getValues(this._gv, itemIndex);
        },
        /// checked
        getCheckedItems: function (all) {
            all = arguments.length > 0 ? all : false;
            return this._gv.getCheckedItemIndices(all);
        },
        getCheckedRows: function (sort, visibleOnly) {
            sort = arguments.length > 0 ? sort : true;
            visibleOnly = arguments.length > 1 ? visibleOnly : false;
            return this._gv.getCheckedRows(sort, visibleOnly);
        },
        // row group
        getRowGroup: function () {
            return this._gv.rowGroup().proxy();
        },
        setRowGroup: function (value) {
            this._gv.setRowGroup(value);
        },
        groupBy: function (fieldNames) {
            this._gv.groupByFieldNames(fieldNames, true, SortDirection.ASCENDING);
        },
        isGrouped: function () {
            return this._gv.isRowGrouped();
        },
        isMergedGrouped: function () {
            return this._gv.isMergedRowGrouped();
        },
        getGroupFields: function () {
            return this._gv.rowGroupFields();
        },
        getGroupFieldNames: function (orgName) {
            return _realgrid.getGroupFieldNames(this._gv, orgName);
        },
        getGroupLevels: function () {
            return this._gv.rowGroupLevels();
        },
        getGroupLevel: function (field) {
            return _realgrid.getGroupLevel(this._gv, field);
        },
        getGroupIndex: function (itemIndex) {
            return _realgrid.getGroupIndex(this._gv, itemIndex);
        },
        isGroupItem: function (itemIndex) {
            return _realgrid.isGroupItem(this._gv, itemIndex);
        },
        isParentVisible: function (itemIndex) {
            return _realgrid.isParentVisible(this._gv, itemIndex);
        },
        expandGroup: function (itemIndex, recursive, force) {
            _realgrid.expandGroup(this._gv, itemIndex, recursive, force);
        },
        collapseGroup: function (itemIndex, recursive) {
            _realgrid.collapseGroup(this._gv, itemIndex, recursive);
        },
        expandParent: function (itemIndex, recursive, force) {
            _realgrid.expandParent(this._gv, itemIndex, recursive, force);
        },
        collapseParent: function (itemIndex, recursive) {
            _realgrid.collapseParent(this._gv, itemIndex, recursive);
        },
        // grouping
        getGroupingOptions: function () {
            return this._gv.groupingOptions().proxy();
        },
        setGroupingOptions: function (value) {
            this._gv.setGroupingOptions(value);
        },
        // editing
        beginInsertRow: function (itemIndex) {
            itemIndex = arguments.length > 0 ? itemIndex : -1;
            this._gv.insertAt(itemIndex);
        },
        beginAppendRow: function () {
            this._gv.append();
        },
        beginUpdateRow: function (itemIndex) {
            _realgrid.beginUpdateRow(this._gv, itemIndex);
        },
        // paging
        setPaging: function (paging, pageSize, pageCount, pageSource) {
            pageSize = arguments.length > 1 ? pageSize : 10;
            pageCount = arguments.length > 2 ? pageCount : -1;
            pageSource = arguments.length > 3 ? pageSource : "rows";
            this._gv.setPaging(paging, pageSize, pageCount, pageSource);
        },
        getPage: function () {
            return this._gv.page();
        },
        setPage: function (page, startItem) {
            startItem = arguments.length > 1 ? startItem : -1;
            this._gv.setPage(page, startItem);
        },
        getPageCount: function () {
            return this._gv.pageCount();
        },
        setPageCount: function (newCount) {
            this._gv.setPageCount(newCount);
        },
        // event handlers -- 불필요한 handler는 설정하지 않는다.
        onGrouping: $_debug ? function (grid, fields) {
            _log("onGrouping: " + JSON.stringify(fields));
        } : null,
        onGroupingChanged: $_debug ? function (grid) {
            _log("onGroupingChanged");
        } : null,
        onPageChanging: $_debug ? function (grid, newPage) {
            _log("onPageChanging:" + newPage);
        } : null,
        onPageChanged: $_debug ? function (grid, page) {
            _log("onPageChanged:" + page);
        } : null,
        onPageCountChanged: $_debug ? function (grid, pageCount) {
            _log("onPageCountChanged:" + pageCount);
        } : null
    });
    
    var LocalTreeDataProvider = function () {
        this.base = DataProvider;
        this.base();
        this._dp = new Grids.LocalTreeDataProvider();
        _realgrid.setTreeDataProviderHandler(this);
    };
    LocalTreeDataProvider.prototype = _extend(new DataProvider(), {
        constructor: LocalTreeDataProvider,

        getRowCount: function () {
            return this._dp.rowCount();
        },
        setRows: function (rows, treeField, needSorting, childrenField, iconField) {
            this._dp.setRows(rows, treeField, needSorting, childrenField, iconField);
        },
        setCsvRows: function (rows, treeField, needSorting, childrenField, iconField) {
            this._dp.setCsvRows(rows, treeField, needSorting, childrenField, iconField);
        },
        setXmlRows: function (xml, rowElement, childrenField, iconField) {
            this._dp.setXmlRows(xml, rowElement, childrenField, iconField);
        },
        setJsonRows: function (json, rowsProp, childrenProp, iconProp) {
            this._dp.setJsonRows(json, rowsProp, childrenProp, iconProp);
        },
        setJsonRows2: function (json, rowsProp, childRowsProp, childrenProp, iconProp) {
            this._dp.setJsonRows2(json, rowsProp, childRowsProp, childrenProp, iconProp);
        },
        fillJsonData: function (data, options) {
            _realgrid.loadTreeData(this._dp, "json", data, options);
        },
        fillXmlData: function (data, options) {
            _realgrid.loadTreeData(this._dp, "xml", data, options);
        },
        fillCsvData: function (data, options) {
            _realgrid.loadTreeData(this._dp, "csv", data, options);
        },
        getIconIndex: function (rowId) {
            return _realgrid.getTreeIconIndex(this._dp, rowId);
        },
        setIconIndex: function (rowId, iconIndex) {
            _realgrid.setTreeIconIndex(this._dp, rowId, iconIndex);
        },
        getParent: function (rowId) {
            return _realgrid.getTreeParentId(this._dp, rowId);
        },
        getLevel: function (rowId) {
            return _realgrid.getTreeLevel(this._dp, rowId);
        },
        getChildCount: function (rowId) {
            rowId = (rowId === null || isNaN(rowId)) ? -1 : rowId;
            return _realgrid.getTreeChildCount(this._dp, rowId);
        },
        getChildren: function (rowId) {
            rowId = (rowId === null || isNaN(rowId)) ? -1 : rowId;
            return _realgrid.getTreeChildren(this._dp, rowId);
        },
        getDescendantCount: function (rowId) {
            rowId = (rowId === null || isNaN(rowId)) ? -1 : rowId;
            return _realgrid.getTreeDescendantCount(this._dp, rowId);
        },
        getDescendants: function (rowId, maxLevel) {
            maxLevel = arguments.length > 1 ? maxLevel : 0;
            rowId = (rowId === null || isNaN(rowId)) ? -1 : rowId;
            return _realgrid.getTreeDescendants(this._dp, rowId, maxLevel);
        },
        getAncestors: function (rowId) {
            return _realgrid.getTreeAncestors(this._dp, rowId);
        },
        getJsonRow: function (rowId) {
            return _realgrid.getTreeJsonRow(this._dp, rowId);
        },
        getJsonRows: function (rowId, recursive, childRowsProp, iconProp) {
            childRowsProp = arguments.length > 2 ? childRowsProp : "rows";
            iconProp = arguments.length > 3 ? iconProp : "iconIndex";
            return _realgrid.getTreeJsonRows(this._dp, rowId, recursive, childRowsProp, iconProp);
        },
        getOutputRow: function (options, rowId, iconProp) {
            iconProp = arguments.length > 2 ? iconProp : "iconIndex";
            return _realgrid.getTreeOutuputRow(this._dp, options, rowId, iconProp);
        },
        getOutputRows: function (options, rowId, recursive, childRowsProp, iconProp) {
            childRowsProp = arguments.length > 3 ? childRowsProp : "rows";
            iconProp = arguments.length > 4 ? iconProp : "iconIndex";
            return _realgrid.getTreeOutputRows(this._dp, options, rowId, recursive, childRowsProp, iconProp);
        },
        addChildRow: function (rowId, values, iconIndex, hasChildren) {
            iconIndex = arguments.length > 2 ? iconIndex : -1;
            hasChildren = arguments.length > 3 ? hasChildren : false;
            rowId = (rowId === null || isNaN(rowId)) ? -1 : rowId;
            return _realgrid.addTreeRow(this._dp, rowId, values, iconIndex, hasChildren);
        },
        insertChildRow: function (rowId, index, values, iconIndex, hasChildren) {
            iconIndex = arguments.length > 3 ? iconIndex : -1;
            hasChildren = arguments.length > 4 ? hasChildren : false;
            rowId = (rowId === null || isNaN(rowId)) ? -1 : rowId;
            return _realgrid.insertTreeRow(this._dp, rowId, index, values, iconIndex, hasChildren);
        },
        /* TODO
        addChildRows: function (rowId, children) {
        },
        insertChildRows: function (rowId, index, children) {
        },
        */
        removeRow: function (rowId) {
            _realgrid.removeTreeRow(this._dp, rowId);
        },
        removeRows: function (rowIds) {
            _realgrid.removeTreeRows(this._dp, rowIds);
        },
        updateRow: function (rowId, values) {
            _realgrid.updateTreeRow(this._dp, rowId, values);
        },
        updateStrictRow: function (rowId, values) {
            _realgrid.updateStrictTreeRow(this._dp, rowId, values);
        },
        getValue: function (rowId, field) {
            return _realgrid.getTreeDataValue(this._dp, rowId, field);
        },
        setValue: function (rowId, field, newValue) {
            _realgrid.setTreeDataValue(this._dp, rowId, field, newValue);
        },
        // move
        moveRowSibling: function(rowId, delta) {
            return _realgrid.moveRowSibling(this._dp, rowId, delta);
        },
        changeRowParent: function(rowId, parentId, childIndex) {
            return _realgrid.changeRowParent(this._dp, rowId, parentId, childIndex);
        },
        // event handlers -- 불필요한 handler른 설정하지 않는다.
        checkParentProc: $_debug ? function (parent, child) {
            return false;
        } : null,
        onRowCountChanged: $_debug ? function (provider, count) {
            _log("onRowCountChanged: " + count);
        } : null,
        onRowAdding: $_debug ? function (provider, rowId, index) {
            _log("onRowAdding: " + rowId + ", " + index);
        } : null,
        onRowAdded: $_debug ? function (provider, rowId) {
            _log("onRowAdded: " + rowId);
        } : null,
        onRowsAdded: $_debug ? function (provider, parentId, rowIds) {
            _log("onRowsAdded: " + parentId + " : " + rowIds);
        } : null,
        onRowDeleting: $_debug ? function (provider, rowId) {
            _log("onRowDeleting: " + rowId);
        } : null,
        onRowDeleted: $_debug ? function (provider, rowId) {
            _log("onRowDeleted: " + rowId);
        } : null,
        onRowsDeleting: $_debug ? function (provider, rowIds) {
            _log("onRowsDeleting: " + rowIds);
        } : null,
        onRowsDeleted: $_debug ? function (provider, rowIds) {
            _log("onRowsDeleted: " + rowIds);
        } : null,
        onRowUpdating: $_debug ? function (provider, rowId) {
            _log("onRowUpdating: " + rowId);
        } : null,
        onRowUpdated: $_debug ? function (provider, rowId) {
            _log("onRowUpdated: " + rowId);
        } : null,
        onValueChanged: $_debug ? function (provider, rowId, field) {
            _log("onValueChanged: " + rowId + ", " + field);
        } : null,
        onRowStateChanged: $_debug ? function (provider, rowId) {
            _log("onRowStateChanged:" + rowId);
        } : null,
        onRowStatesChanged: $_debug ? function (provider, rowIds) {
            _log("onRowStatesChanged:" + rowIds);
        } : null,
        onRowStatesCleared: $_debug ? function (provider) {
            _log("onRowStatesCleared");
        } : null,
        onRowSiblingMoving: $_debug ? function (provider, rowId, delta) {
           _log("onRowSiblingMoving: " + rowId + ", " + delta);
           return true;
        } : null,
        onRowSiblingMoved: $_debug ? function (provider, rowId, delta) {
           _log("onRowSiblingMoved: " + rowId + ", " + delta);
        } : null,
        onRowParentChanging: $_debug ? function (provider, rowId, parentId, childIndex) {
           _log("onRowParentChanging: " + rowId + ", " + parentId + ", " + childIndex);
           return true;
        } : null,
        onRowParentChanged: $_debug ? function (provider, rowId, parentId, childIndex) {
           _log("onRowParentChanged: " + rowId + ", " + parentId + ", " + childIndex);
        } : null
    });
    
    var TreeView = function (container, readOnly) {
        var readOnly = arguments.length > 1 ? readOnly : false;
        this.base = GridBase;
        this.base();
        _realgrid.createTree(container, this, readOnly);
    };
    TreeView.prototype = _extend(new GridBase(null, true), {
        constructor: TreeView,

        getTreeOptions: function () {
            return _realgrid.getTreeOptions(this._gv);
        },
        setTreeOptions: function (options) {
            _realgrid.setTreeOptions(this._gv, options);
        },
        getParent: function (itemIndex) {
            return _realgrid.getTreeParentIndex(this._gv, itemIndex);
        },
        getChildren: function (itemIndex) {
            return _realgrid.getTreeChildIndices(this._gv, itemIndex);
        },
        getDescendants: function (itemIndex) {
            return _realgrid.getTreeDescendantIndices(this._gv, itemIndex);
        },
        getAncestors: function (itemIndex, includeRoot) {
            includeRoot = arguments.length > 1 ? includeRoot : true;
            return _realgrid.getTreeAncestorIndices(this._gv, itemIndex, includeRoot);
        },
        expand: function (itemIndex, recursive, force) {
            recursive = arguments.length > 1 ? recursive : false;
            force = arguments.length > 2 ? force : false;
            _realgrid.expandTreeItem(this._gv, itemIndex, recursive, force);
        },
        collapse: function (itemIndex, recursive) {
            recursive = arguments.length > 1 ? recursive : false;
            _realgrid.collapseTreeItem(this._gv, itemIndex, recursive);
        },
        expandAll: function (level) {
            level = arguments.length > 0 ? level : 0;
            this._gv.expandAll(level);
        },
        collapseAll: function () {
            this._gv.collapseAll();
        },
        getValues: function (itemIndex) {
            return _realgrid.getTreeValues(this._gv, itemIndex);
        },
        // checked
        getCheckedItems: function () {
            return this._gv.getCheckedItemIndices();
        },
        getCheckedRows: function (visibleOnly) {
            return this._gv.getCheckedRowIds(visibleOnly);
        },
        checkChildren: function(itemIndex, checked, recursive, visibleOnly, checkableOnly) {
            _realgrid.checkTreeChildren(this._gv, itemIndex, checked, recursive, visibleOnly, checkableOnly);
        },
        // event handlers
        onTreeItemExpanding: $_debug ? function (tree, itemIndex, rowId) {
            _log("TreeItem expanding: " + itemIndex);
        } : null,
        onTreeItemExpanded: $_debug ? function (tree, itemIndex, rowId) {
            _log("TreeItem expanded: " + itemIndex);
        } : null,
        onTreeItemCollapsing: $_debug ? function (tree, itemIndex, rowId) {
            _log("TreeItem collapsing: " + itemIndex);
        } : null,
        onTreeItemCollapsed: $_debug ? function (tree, itemIndex, rowId) {
            _log("TreeItem collapsed: " + itemIndex);
        } : null,
        onTreeItemChanged: $_debug ? function (tree, itemIndex, rowId) {
            _log("TreeItem item changed: " + itemIndex);
        } : null
    });
    
    return {
        getVersion: getVersion,
        setRootContext: setRootContext,
        setAssetRoot: setAssetRoot,
        setDebug: _setDebug,
        setTrace: setTrace,
        setLogging: setTrace,
        isMobile: $_isMobile,
        setMobile: $_setMobile,
        getTimer: getTimer,
        Progress: _progress,
        DataType: DataType,
        DataField: DataField,
        DataColumn: DataColumn,
        DataFillMode: DataFillMode,
        DataFillOptions: DataFillOptions,
        DataOutputOptions: DataOutputOptions,
        RowState: RowState,
        ColumnHeaderItemLocation: ColumnHeaderItemLocation,
        SubTextLocation: SubTextLocation,
        CellButton: CellButton,
        ButtonVisibility: ButtonVisibility,
        LocalDataProvider: LocalDataProvider,
        LocalTreeDataProvider: LocalTreeDataProvider,
        Column: Column,
        ColumnGroup: ColumnGroup,
        ColumnHeader: ColumnHeader,
        ColumnGroupHeader: ColumnGroupHeader,
        ColumnFooter: ColumnFooter,
        ColumnFilter: ColumnFilter,
        ColumnFilterAction: ColumnFilterAction,
        IndicatorValue: IndicatorValue,
        SortStyle: SortStyle,
        SortDirection: SortDirection,
        SortCase: SortCase,
        SelectionStyle: SelectionStyle,
        ItemType: ItemType,
        ItemState: ItemState,
        SummaryMode: SummaryMode,
        ValidationLevel: ValidationLevel,
        ItemRearrangeMode: ItemRearrangeMode,
        ValidationResult: ValidationResult,
        GridOptions: GridOptions,
        CellIndex: CellIndex,
        CellRenderer: CellRenderer,                   
        TextCellRenderer: TextCellRenderer,
        BarCellRenderer: BarCellRenderer,
        CheckCellRenderer: CheckCellRenderer,
        ImageCellRenderer: ImageCellRenderer,
        IconCellRenderer: IconCellRenderer,
        ShapeCellRenderer: ShapeCellRenderer,
        SignalCellRenderer: SignalCellRenderer,
        LinkCellRenderer: LinkCellRenderer,
        Code128CellRenderer: Code128CellRenderer,
        Code39CellRenderer: Code39CellRenderer,
        SeriesCellRenderer: SeriesCellRenderer,
        ActualTargetBulletRenderer: ActualTargetBulletRenderer,
        ActualTargetTextRenderer: ActualTargetTextRenderer,
        SparkLineRenderer: SparkLineRenderer,
        SparkColumnRenderer: SparkColumnRenderer,
        SparkWinLossRenderer: SparkWinLossRenderer,
        CellEditor: CellEditor,
        LineCellEditor: LineCellEditor,
        MultiLineCellEditor: MultiLineCellEditor,
        DropDownCellEditor: DropDownCellEditor,
        SearchCellEditor: SearchCellEditor,
        NumberCellEditor: NumberCellEditor,
        DateCellEditor: DateCellEditor,
        GridViewStyles: GridViewStyles,
        DynamicStyle: DynamicStyle,
        CheckBar: CheckBar,
        Header: Header,
        Footer: Footer,
        Indicator: Indicator,
        Panel: Panel,
        StateBar: StateBar,
        RowGroupOptions: RowGroupOptions,
        FixedOptions: FixedOptions,
        SelectOptions: SelectOptions,
        SortingOptions: SortingOptions,
        FilterSelectorOptions: FilterSelectorOptions,
        FilteringOptions: FilteringOptions,
        GroupingOptions: GroupingOptions,
        ColumnHeaderOptions: ColumnHeaderOptions,
        ToastOptions: ToastOptions,
        DisplayOptions: DisplayOptions,
        EditOptions: EditOptions,
        EditorOptions: EditorOptions,
        CopyOptions: CopyOptions,
        PasteOptions: PasteOptions,
        SearchOptions: SearchOptions,
        EditValidation: EditValidation,
        GridExportOptions: GridExportOptions,
        ImageList: ImageList,
        GridView: GridView,
        TreeView: TreeView
    };
})();