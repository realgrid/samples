var grdMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

var myStyles = {
    "grid": {
        "hoveredMaskBorder": "#335292f7,1",
        "iconLocation": "left",
        "figureBackground": "#ff1e84c9",
        "iconAlignment": "center",
        "borderBottom": "#ffe8e8e8,1",
        "iconOffset": "0",
        "background": "#ffffffff",
        "foreground": "#ff000000",
        "border": "#88888888,1",
        "iconPadding": "0",
        "textAlignment": "near",
        "inactiveBackground": "#ffd3d3d3",
        "paddingRight": "2",
        "paddingTop": "2",
        "selectedBackground": "#ff696969",
        "paddingBottom": "2",
        "lineAlignment": "center",
        "line": "#ffced3d7,1",
        "selectedForeground": "#ffffffff",
        "inactiveForeground": "#ff808080",
        "font": "맑은 고딕,12",
        "selectionDisplay": "mask",
        "contentFit": "auto",
        "hoveredMaskBackground": "#1f5292f7",
        "iconIndex": "0"
    },
    "panel": {
        "hoveredMaskBorder": "#335292f7,1",
        "iconLocation": "left",
        "figureBackground": "#ff000000",
        "borderRight": "#ff777777,0",
        "borderBottom": "#ff349cde,0",
        "iconOffset": "0",
        "iconAlignment": "center",
        "background": "#ff349cde",
        "foreground": "#ffc0e5fc",
        "border": "#88888888,1",
        "iconPadding": "0",
        "textAlignment": "near",
        "inactiveBackground": "#ffd3d3d3",
        "paddingRight": "2",
        "paddingTop": "4",
        "selectedBackground": "#ff696969",
        "paddingBottom": "5",
        "lineAlignment": "center",
        "selectedForeground": "#ffffffff",
        "inactiveForeground": "#ff808080",
        "font": "돋움,11",
        "selectionDisplay": "mask",
        "contentFit": "auto",
        "hoveredMaskBackground": "#1f5292f7",
        "iconIndex": "0"
    },
    "body": {
        "hoveredMaskBorder": "#335292f7,1",
        "iconLocation": "left",
        "figureBackground": "#ff5d5d5d",
        "borderRight": "#ffc6c6c6,1",
        "borderBottom": "#ffc6c6c6,1",
        "iconOffset": "0",
        "iconAlignment": "center",
        "background": "#ffffffff",
        "foreground": "#ff000000",
        "border": "#88888888,1",
        "selectedBackground": "#ff696969",
        "textAlignment": "far",
        "inactiveBackground": "#ffd3d3d3",
        "paddingRight": "2",
        "paddingTop": "2",
        "iconPadding": "0",
        "paddingBottom": "2",
        "lineAlignment": "center",
        "line": "#ff808080,1",
        "selectedForeground": "#ffffffff",
        "inactiveForeground": "#ff808080",
        "font": "맑은 고딕,11",
        "selectionDisplay": "mask",
        "contentFit": "auto",
        "hoveredMaskBackground": "#1f5292f7",
        "iconIndex": "0"
    },
    "fixed": {
        "hoveredMaskBorder": "#335292f7,1",
        "iconLocation": "left",
        "figureBackground": "#ff000000",
        "textAlignment": "far",
        "borderRight": "#ff999999,1",
        "borderBottom": "#ff999999,1",
        "iconOffset": "0",
        "iconAlignment": "center",
        "background": "#ffd3d3d3",
        "foreground": "#ff000000",
        "border": "#88888888,1",
        "iconPadding": "0",
        "inactiveBackground": "#ffd3d3d3",
        "paddingRight": "2",
        "paddingTop": "2",
        "selectedBackground": "#ff696969",
        "paddingBottom": "2",
        "lineAlignment": "center",
        "selectedForeground": "#ffffffff",
        "inactiveForeground": "#ff808080",
        "font": ",12",
        "selectionDisplay": "mask",
        "contentFit": "auto",
        "hoveredMaskBackground": "#1f5292f7",
        "iconIndex": "0",
    },
    "colBar": {
        "hoveredMaskBorder": "#335292f7,1",
        "iconLocation": "left",
        "figureBackground": "#ff000000",
        "borderRight": "#ff999999,1",
        "borderBottom": "#ff999999,1",
        "iconOffset": "0",
        "iconAlignment": "center",
        "background": "#ffd3d3d3",
        "foreground": "#ff000000",
        "border": "#88888888,1",
        "iconPadding": "0",
        "textAlignment": "near",
        "inactiveBackground": "#ffd3d3d3",
        "paddingRight": "2",
        "paddingTop": "2",
        "selectedBackground": "#ff696969",
        "paddingBottom": "2",
        "lineAlignment": "center",
        "selectedForeground": "#ffffffff",
        "inactiveForeground": "#ff808080",
        "font": ",12",
        "selectionDisplay": "mask",
        "contentFit": "auto",
        "hoveredMaskBackground": "#1f5292f7",
        "iconIndex": "0"
    },
    "rowBar": {
        "hoveredMaskBorder": "#335292f7,1",
        "iconLocation": "left",
        "figureBackground": "#ff000000",
        "borderRight": "#ff999999,1",
        "borderBottom": "#ff999999,1",
        "iconOffset": "0",
        "iconAlignment": "center",
        "background": "#ffd3d3d3",
        "foreground": "#ff000000",
        "border": "#88888888,1",
        "iconPadding": "0",
        "textAlignment": "near",
        "inactiveBackground": "#ffd3d3d3",
        "paddingRight": "2",
        "paddingTop": "2",
        "selectedBackground": "#ff696969",
        "paddingBottom": "2",
        "lineAlignment": "center",
        "selectedForeground": "#ffffffff",
        "inactiveForeground": "#ff808080",
        "font": ",12",
        "selectionDisplay": "mask",
        "contentFit": "auto",
        "hoveredMaskBackground": "#1f5292f7",
        "iconIndex": "0"
    },
    "header": {
        "hoveredMaskBorder": "#ffff0000,1",
        "iconLocation": "left",
        "figureBackground": "#ff008800",
        "borderRight": "#ff979ca6,1",
        "borderBottom": "#ff767b87,1",
        "iconOffset": "0",
        "borderTop": "#ffffffff,0",
        "iconAlignment": "center",
        "background": "linear,#ffffffff,#ffe7e8eb,90",
        "foreground": "#ff222530",
        "border": "#ffffffff,0",
        "selectedBackground": "linear,#ffcad0d7,#ffb7bec7,90",
        "textAlignment": "near",
        "inactiveBackground": "#ffd3d3d3",
        "paddingRight": "2",
        "paddingTop": "2",
        "iconPadding": "0",
        "paddingBottom": "2",
        "lineAlignment": "center",
        "selectedForeground": "#ff000000",
        "inactiveForeground": "#ff808080",
        "borderLeft": "#ffffffff,0",
        "font": "맑은 고딕,11,bold",
        "selectionDisplay": "mask",
        "contentFit": "auto",
        "hoveredMaskBackground": "#22002b5b",
        "iconIndex": "0",
        "group": {
            "hoveredMaskBorder": "#ffff0000,1",
            "iconLocation": "left",
            "figureBackground": "#ff008800",
            "borderRight": "#ff808080,1",
            "borderBottom": "#ff808080,1",
            "iconOffset": "0",
            "borderTop": "#ffffffff,0",
            "iconAlignment": "center",
            "background": "linear,#ffffffff,#ffe7e8eb,90",
            "foreground": "#ff222530",
            "border": "#ffffffff,0",
            "selectedBackground": "#ff696969",
            "textAlignment": "center",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "4",
            "iconPadding": "0",
            "paddingBottom": "2",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "borderLeft": "#ffffffff,0",
            "font": "맑은 고딕,11,bold",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#22002b5b",
            "iconIndex": "0"
        }
    },
    "footer": {
        "hoveredMaskBorder": "#335292f7,1",
        "iconLocation": "left",
        "figureBackground": "#ff000000",
        "borderRight": "#ffc6c6c6,0",
        "iconOffset": "0",
        "borderTop": "#ffc6c6c6,1",
        "iconAlignment": "center",
        "background": "#ffeeeeee",
        "foreground": "#ff000000",
        "border": "#88888888,1",
        "iconPadding": "0",
        "textAlignment": "near",
        "inactiveBackground": "#ffd3d3d3",
        "paddingRight": "2",
        "paddingTop": "2",
        "selectedBackground": "#ff696969",
        "paddingBottom": "1",
        "lineAlignment": "center",
        "selectedForeground": "#ffffffff",
        "inactiveForeground": "#ff808080",
        "font": ",12",
        "selectionDisplay": "mask",
        "contentFit": "auto",
        "hoveredMaskBackground": "#1f5292f7",
        "iconIndex": "0"
    },
    "rowGroup": {
        "header": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#fffeff81",
            "borderRight": "#ff097ac1,1",
            "borderBottom": "#ff097ac1,1",
            "iconOffset": "0",
            "borderTop": "#ffffffff,0",
            "iconAlignment": "center",
            "background": "#ff349cde",
            "foreground": "#ffffffff",
            "border": "#ffffffff,0",
            "selectedBackground": "#ff696969",
            "textAlignment": "near",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "2",
            "iconPadding": "0",
            "paddingBottom": "2",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "borderLeft": "#ffffffff,0",
            "font": "맑은 고딕,11",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#fff0f9ff",
            "iconIndex": "0"
        },
        "footer": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#ff808080",
            "borderRight": "#ffc7c4b0,1",
            "borderBottom": "#ffc7c4b0,1",
            "iconOffset": "0",
            "borderTop": "#ffffffff,0",
            "iconAlignment": "center",
            "background": "#fffff9d4",
            "foreground": "#ff535353",
            "border": "#ffffffff,0",
            "selectedBackground": "#ff696969",
            "textAlignment": "far",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "4",
            "paddingTop": "2",
            "iconPadding": "0",
            "paddingBottom": "2",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "borderLeft": "#ffffffff,0",
            "font": "맑은 고딕,11,bold",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#1f5292f7",
            "iconIndex": "0"
        },
        "head": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#ff000000",
            "borderRight": "#ffbedef3,1",
            "borderBottom": "#ff349cde,1",
            "iconOffset": "0",
            "borderTop": "#ffffffff,0",
            "iconAlignment": "center",
            "background": "#ffdcf1ff",
            "foreground": "#ff000000",
            "border": "#ffffffff,0",
            "selectedBackground": "#ff696969",
            "textAlignment": "center",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "2",
            "iconPadding": "0",
            "paddingBottom": "2",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "borderLeft": "#ffffffff,0",
            "font": ",12",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#1f5292f7",
            "iconIndex": "0"
        },
        "foot": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#ff000000",
            "borderRight": "#ffffffff,0",
            "borderBottom": "#ffffffff,0",
            "iconOffset": "0",
            "borderTop": "#ffc6c6c6,1",
            "iconAlignment": "center",
            "background": "#ffeeeeee",
            "foreground": "#ff000000",
            "border": "#ffffffff,0",
            "selectedBackground": "#ff696969",
            "textAlignment": "near",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "2",
            "iconPadding": "0",
            "paddingBottom": "1",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "borderLeft": "#ffffffff,0",
            "font": ",12",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#1f5292f7",
            "iconIndex": "0"
        },
        "headerBar": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#fffeff81",
            "borderRight": "#ffffffff,0",
            "borderBottom": "#ffffffff,0",
            "iconOffset": "0",
            "borderTop": "#ffffffff,0",
            "iconAlignment": "center",
            "background": "#ff349cde",
            "foreground": "#ffffffff",
            "border": "#ffffffff,0",
            "selectedBackground": "#ff696969",
            "textAlignment": "near",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "2",
            "iconPadding": "0",
            "paddingBottom": "2",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "borderLeft": "#ffffffff,0",
            "font": ",12",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#1f5292f7",
            "iconIndex": "0"
        },
        "footerBar": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#ff808080",
            "borderRight": "#ffffffff,0",
            "borderBottom": "#ffc7c4b0,1",
            "iconOffset": "0",
            "borderTop": "#ffffffff,0",
            "iconAlignment": "center",
            "background": "#fffff9d4",
            "foreground": "#ff000000",
            "border": "#ffffffff,0",
            "selectedBackground": "#ff696969",
            "textAlignment": "near",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "2",
            "iconPadding": "0",
            "paddingBottom": "2",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "borderLeft": "#ffffffff,0",
            "font": ",12",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#1f5292f7",
            "iconIndex": "0"
        },
        "bar": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#ffffffff",
            "borderRight": "#ff097ac1,1",
            "borderBottom": "#ff097ac1,1",
            "iconOffset": "0",
            "borderTop": "#ffffffff,0",
            "iconAlignment": "center",
            "background": "#ff349cde",
            "foreground": "#ffffffff",
            "border": "#88888888,1",
            "selectedBackground": "#ff696969",
            "textAlignment": "near",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "2",
            "iconPadding": "0",
            "paddingBottom": "2",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "borderLeft": "#ffffffff,0",
            "font": ",12",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#1f5292f7",
            "iconIndex": "0"
        },
        "panel": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#ff000000",
            "borderRight": "#ff808080,1",
            "borderBottom": "#ff808080,1",
            "iconOffset": "0",
            "iconAlignment": "center",
            "background": "#ffc9e9ff",
            "foreground": "#ff000000",
            "border": "#ff2788c5,1",
            "selectedBackground": "#ff696969",
            "textAlignment": "center",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "1",
            "paddingTop": "1",
            "iconPadding": "0",
            "paddingBottom": "1",
            "lineAlignment": "center",
            "line": "#ffc9e9ff,1",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "font": "맑은 고딕,11",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#ff8ad2ff",
            "iconIndex": "0"
        }
    },
    "indicator": {
        "hoveredMaskBorder": "#ff000000,1",
        "iconLocation": "left",
        "figureBackground": "#ff0000ff",
        "borderRight": "#ff979ca6,1",
        "borderBottom": "#ff979ca6,1",
        "iconOffset": "0",
        "iconAlignment": "center",
        "background": "linear,#ffffffff,#ffedeef0,360",
        "foreground": "#ff222530",
        "border": "#ff464b58,1",
        "iconPadding": "0",
        "textAlignment": "center",
        "inactiveBackground": "#ffd3d3d3",
        "paddingRight": "2",
        "paddingTop": "2",
        "selectedBackground": "linear,#ffffffff,#ffedeef0,360",
        "paddingBottom": "2",
        "lineAlignment": "center",
        "selectedForeground": "#ffffffff",
        "inactiveForeground": "#ff808080",
        "font": "맑은 고딕,11",
        "selectionDisplay": "mask",
        "contentFit": "auto",
        "hoveredMaskBackground": "#ffd1d5db",
        "iconIndex": "0",
        "head": {
            "hoveredMaskBorder": "#ffff0000,1",
            "iconLocation": "left",
            "figureBackground": "#ff008800",
            "borderRight": "#ff979ca6,1",
            "borderBottom": "#ff767b87,1",
            "iconOffset": "0",
            "borderTop": "#ffffffff,0",
            "iconAlignment": "center",
            "background": "linear,#ffffffff,#ffe7e8eb,90",
            "foreground": "#ff222530",
            "border": "#ffffffff,0",
            "selectedBackground": "linear,#ffcad0d7,#ffb7bec7,90",
            "textAlignment": "center",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "2",
            "iconPadding": "0",
            "paddingBottom": "2",
            "lineAlignment": "center",
            "selectedForeground": "#ff000000",
            "inactiveForeground": "#ff808080",
            "borderLeft": "#ffffffff,0",
            "font": "돋움,11,bold",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#22002b5b",
            "iconIndex": "0"
        },
        "foot": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#ff000000",
            "borderRight": "#ffc6c6c6,1",
            "iconOffset": "0",
            "borderTop": "#ff349cde,1",
            "iconAlignment": "center",
            "background": "#ffeeeeee",
            "foreground": "#ff000000",
            "border": "#88888888,1",
            "iconPadding": "0",
            "textAlignment": "near",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "2",
            "selectedBackground": "#ff696969",
            "paddingBottom": "1",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "font": ",12",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#1f5292f7",
            "iconIndex": "0"
        }
    },
    "checkBar": {
        "hoveredMaskBorder": "#335292f7,1",
        "iconLocation": "left",
        "figureBackground": "#ff1e84c9",
        "borderRight": "#ffd4d4d4,1",
        "borderBottom": "#ffd4d4d4,1",
        "iconOffset": "0",
        "iconAlignment": "center",
        "background": "#fff8f8f8",
        "foreground": "#ff555555",
        "border": "#88888888,1",
        "iconPadding": "0",
        "textAlignment": "center",
        "inactiveBackground": "#ffd3d3d3",
        "paddingRight": "2",
        "paddingTop": "2",
        "selectedBackground": "#ff696969",
        "paddingBottom": "2",
        "lineAlignment": "center",
        "selectedForeground": "#ffffffff",
        "inactiveForeground": "#ff808080",
        "font": "맑은 고딕,11",
        "selectionDisplay": "mask",
        "contentFit": "auto",
        "hoveredMaskBackground": "#1f5292f7",
        "iconIndex": "0",
        "head": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#ff1e84c9",
            "borderRight": "#ffbedef3,1",
            "borderBottom": "#ff349cde,1",
            "iconOffset": "0",
            "iconAlignment": "center",
            "background": "#ffdcf1ff",
            "foreground": "#ff000000",
            "border": "#88888888,1",
            "iconPadding": "0",
            "textAlignment": "center",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "2",
            "selectedBackground": "#ff696969",
            "paddingBottom": "2",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "font": ",12",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#1f5292f7",
            "iconIndex": "0"
        },
        "foot": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#ff000000",
            "borderRight": "#ffc6c6c6,1",
            "iconOffset": "0",
            "borderTop": "#ffc6c6c6,1",
            "iconAlignment": "center",
            "background": "#ffeeeeee",
            "foreground": "#ff000000",
            "border": "#88888888,1",
            "iconPadding": "0",
            "textAlignment": "near",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "2",
            "selectedBackground": "#ff696969",
            "paddingBottom": "1",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "font": ",12",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#1f5292f7",
            "iconIndex": "0"
        }
    },
    "stateBar": {
        "hoveredMaskBorder": "#335292f7,1",
        "iconLocation": "left",
        "figureBackground": "#ff000000",
        "borderRight": "#ffd4d4d4,1",
        "borderBottom": "#ffd4d4d4,1",
        "iconOffset": "0",
        "iconAlignment": "center",
        "background": "#fff8f8f8",
        "foreground": "#ff000000",
        "border": "#88888888,1",
        "iconPadding": "0",
        "textAlignment": "center",
        "inactiveBackground": "#ffd3d3d3",
        "paddingRight": "2",
        "paddingTop": "2",
        "selectedBackground": "#ff696969",
        "paddingBottom": "2",
        "lineAlignment": "center",
        "selectedForeground": "#ffffffff",
        "inactiveForeground": "#ff808080",
        "font": ",12",
        "selectionDisplay": "mask",
        "contentFit": "auto",
        "hoveredMaskBackground": "#1f5292f7",
        "iconIndex": "0",
        "head": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#ff000000",
            "borderRight": "#ffbedef3,1",
            "borderBottom": "#ff349cde,1",
            "iconOffset": "0",
            "iconAlignment": "center",
            "background": "#ffdcf1ff",
            "foreground": "#ff000000",
            "border": "#88888888,1",
            "iconPadding": "0",
            "textAlignment": "center",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "2",
            "selectedBackground": "#ff696969",
            "paddingBottom": "2",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "font": ",12",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#1f5292f7",
            "iconIndex": "0"
        },
        "foot": {
            "hoveredMaskBorder": "#335292f7,1",
            "iconLocation": "left",
            "figureBackground": "#ff000000",
            "borderRight": "#ffc6c6c6,1",
            "iconOffset": "0",
            "borderTop": "#ffc6c6c6,1",
            "iconAlignment": "center",
            "background": "#ffeeeeee",
            "foreground": "#ff000000",
            "border": "#88888888,1",
            "iconPadding": "0",
            "textAlignment": "near",
            "inactiveBackground": "#ffd3d3d3",
            "paddingRight": "2",
            "paddingTop": "2",
            "selectedBackground": "#ff696969",
            "paddingBottom": "1",
            "lineAlignment": "center",
            "selectedForeground": "#ffffffff",
            "inactiveForeground": "#ff808080",
            "font": ",12",
            "selectionDisplay": "mask",
            "contentFit": "auto",
            "hoveredMaskBackground": "#1f5292f7",
            "iconIndex": "0"
        }
    },
    "selection": {
        "hoveredMaskBorder": "#335292f7,1",
        "font": ",12",
        "figureBackground": "#ff008800",
        "iconAlignment": "center",
        "iconPadding": "0",
        "iconOffset": "0",
        "paddingRight": "0",
        "selectedForeground": "#ffffffff",
        "inactiveForeground": "#ff808080",
        "background": "#2f1e90ff",
        "foreground": "#ff000000",
        "border": "#5f1e90ff,2",
        "selectedBackground": "#ff696969",
        "textAlignment": "center",
        "inactiveBackground": "#ffd3d3d3",
        "lineAlignment": "center",
        "paddingTop": "0",
        "selectionDisplay": "mask",
        "contentFit": "auto",
        "iconLocation": "left",
        "hoveredMaskBackground": "#1f5292f7",
        "iconIndex": "0",
        "paddingBottom": "0"
    }
};

$(document).ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
  setFields(dataProvider);

  grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);
  grdMain.setStyles(myStyles);
	setColumns(grdMain);
	setOptions(grdMain);

	loadData(dataProvider);

  setTests("actions", "ScrollTest2");
});
 
function setFields(provider) {
    var fields = [{
        fieldName: "Prod_Lv",
        dataType: "text"
    }, {
        fieldName: "DC_Lv",
        dataType: "text"
    }, {
        fieldName: "Sales_Lv",
        dataType: "text"
    }, {
        fieldName: "Category",
        dataType: "text"
    }, {
        fieldName: "2014_02",
        dataType: "number"
    }, {
        fieldName: "2014_02_01",
        dataType: "number"
    }, {
        fieldName: "2014_02_02",
        dataType: "number"
    }, {
        fieldName: "2014_02_03",
        dataType: "number"
    }, {
        fieldName: "2014_02_04",
        dataType: "number"
    }, {
        fieldName: "2014_02_05",
        dataType: "number"
    }, {
        fieldName: "2014_02_06",
        dataType: "number"
    }, {
        fieldName: "2014_02_07",
        dataType: "number"
    }, {
        fieldName: "2014_02_08",
        dataType: "number"
    }, {
        fieldName: "2014_02_09",
        dataType: "number"
    }, {
        fieldName: "2014_02_10",
        dataType: "number"
    }, {
        fieldName: "2014_03",
        dataType: "number"
    }, {
        fieldName: "2014_03_01",
        dataType: "number"
    }, {
        fieldName: "2014_03_02",
        dataType: "number"
    }, {
        fieldName: "2014_03_03",
        dataType: "number"
    }, {
        fieldName: "2014_03_04",
        dataType: "number"
    }, {
        fieldName: "2014_03_05",
        dataType: "number"
    }, {
        fieldName: "2014_03_06",
        dataType: "number"
    }, {
        fieldName: "2014_03_07",
        dataType: "number"
    }, {
        fieldName: "2014_03_08",
        dataType: "number"
    }, {
        fieldName: "2014_03_09",
        dataType: "number"
    }, {
        fieldName: "2014_03_10",
        dataType: "number"
    }, {
        fieldName: "2014_04",
        dataType: "number"
    }, {
        fieldName: "2014_04_01",
        dataType: "number"
    }, {
        fieldName: "2014_04_02",
        dataType: "number"
    }, {
        fieldName: "2014_04_03",
        dataType: "number"
    }, {
        fieldName: "2014_04_04",
        dataType: "number"
    }, {
        fieldName: "2014_04_05",
        dataType: "number"
    }, {
        fieldName: "2014_04_06",
        dataType: "number"
    }, {
        fieldName: "2014_04_07",
        dataType: "number"
    }, {
        fieldName: "2014_04_08",
        dataType: "number"
    }, {
        fieldName: "2014_04_09",
        dataType: "number"
    }, {
        fieldName: "2014_04_10",
        dataType: "number"
    }, {
        fieldName: "2014_05",
        dataType: "number"
    }, {
        fieldName: "2014_05_01",
        dataType: "number"
    }, {
        fieldName: "2014_05_02",
        dataType: "number"
    }, {
        fieldName: "2014_05_03",
        dataType: "number"
    }, {
        fieldName: "2014_05_04",
        dataType: "number"
    }, {
        fieldName: "2014_05_05",
        dataType: "number"
    }, {
        fieldName: "2014_05_06",
        dataType: "number"
    }, {
        fieldName: "2014_05_07",
        dataType: "number"
    }, {
        fieldName: "2014_05_08",
        dataType: "number"
    }, {
        fieldName: "2014_05_09",
        dataType: "number"
    }, {
        fieldName: "2014_05_10",
        dataType: "number"
    }, {
        fieldName: "2014_06",
        dataType: "number"
    }, {
        fieldName: "2014_06_01",
        dataType: "number"
    }, {
        fieldName: "2014_06_02",
        dataType: "number"
    }, {
        fieldName: "2014_06_03",
        dataType: "number"
    }, {
        fieldName: "2014_06_04",
        dataType: "number"
    }, {
        fieldName: "2014_06_05",
        dataType: "number"
    }, {
        fieldName: "2014_06_06",
        dataType: "number"
    }, {
        fieldName: "2014_06_07",
        dataType: "number"
    }, {
        fieldName: "2014_06_08",
        dataType: "number"
    }, {
        fieldName: "2014_06_09",
        dataType: "number"
    }, {
        fieldName: "2014_06_10",
        dataType: "number"
    }, {
        fieldName: "2014_07",
        dataType: "number"
    }, {
        fieldName: "2014_07_01",
        dataType: "number"
    }, {
        fieldName: "2014_07_02",
        dataType: "number"
    }, {
        fieldName: "2014_07_03",
        dataType: "number"
    }, {
        fieldName: "2014_07_04",
        dataType: "number"
    }, {
        fieldName: "2014_07_05",
        dataType: "number"
    }, {
        fieldName: "2014_07_06",
        dataType: "number"
    }, {
        fieldName: "2014_07_07",
        dataType: "number"
    }, {
        fieldName: "2014_07_08",
        dataType: "number"
    }, {
        fieldName: "2014_07_09",
        dataType: "number"
    }, {
        fieldName: "2014_07_10",
        dataType: "number"
    }];
 
    provider.setFields(fields);
}

function setColumns(grid) {
    var columns = [{
        fieldName: "Prod_Lv",
        type: "data",
        width: "70",
        header: {
            text: "Prod_Lv"
        },
        styles: {
            background:"#FFE6F5FE",
            borderRight:"#FFC6C6C6, 1",
            textAlignment: "near"
        },
        mergeRule: {
            criteria: "row div 6"
        }
    }, {
        fieldName: "DC_Lv",
        type: "data",
        width: "55",
        header: {
            text: "DC_Lv"
        },
        styles: {
            background:"#FFE6F5FE",
            borderRight:"#FFC6C6C6, 1",
            textAlignment: "near"
        },
        mergeRule: {
            criteria: "row div 6"
        }
    }, {
        fieldName: "Sales_Lv",
        type: "data",
        width: "80",
        header: {
            text: "Sales_Lv"
        },
        styles: {
            background:"#FFE6F5FE",
            borderRight:"#FFC6C6C6, 1",
            textAlignment: "near"
        },
        mergeRule: {
            criteria: "row div 3"
        }
    }, {
        fieldName: "Category",
        type: "data",
        width: "70",
        header: {
            text: "Category"
        },
        styles: {
            background:"#FFE6F5FE",
            borderRight:"#FFC6C6C6, 1",
            textAlignment: "near"
        }
    }, {
        fieldName: "2014_02",
        type: "data",
        width: "55",
        header: {
            text: "2014/02"
        },
        styles: {
            background:"#FFF5F5F5"
        },
        dynamicStyles: [{
            criteria: "value mod 10 = 0",
            styles: "fontBold=true;background=#FFFCF99B;foreground=#FFFF0000"
        }]
    }, {
        fieldName: "2014_02_01",
        type: "data",
        width: "55",
        header: {
            text: "02/01"
        },
        dynamicStyles: [{
            criteria: "value mod 5 > 0",
            styles: "background=#e0eff9"
        }]
    }, {
        fieldName: "2014_02_02",
        type: "data",
        width: "55",
        header: {
            text: "02/02"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }, {
            criteria: "(row > 10) and ((value mod 17 = 0) or (row mod 18 = 0) or (row mod 19 = 0))",
            styles: "background=#FFE9C9FA"
        }]
    }, {
        fieldName: "2014_02_03",
        type: "data",
        width: "55",
        header: {
            text: "02/03"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }, {
            criteria: "(row > 10) and ((value mod 17 = 0) or (row mod 18 = 0) or (row mod 19 = 0))",
            styles: "background=#FFE9C9FA"
        }]
    }, {
        fieldName: "2014_02_04",
        type: "data",
        width: "55",
        header: {
            text: "02/04"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }, {
            criteria: "(row > 10) and ((value mod 17 = 0) or (row mod 18 = 0) or (row mod 19 = 0))",
            styles: "background=#FFE9C9FA"
        }]
    }, {
        fieldName: "2014_02_05",
        type: "data",
        width: "55",
        header: {
            text: "02/05"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }, {
            criteria: "(row > 10) and ((value mod 17 = 0) or (row mod 18 = 0) or (row mod 19 = 0))",
            styles: "background=#FFE9C9FA"
        }]
    }, {
        fieldName: "2014_02_06",
        type: "data",
        width: "55",
        header: {
            text: "02/06"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }, {
            criteria: "(row > 20) and ((value mod 15 = 0) or (row mod 16 = 0) or (row mod 17 = 0) or (row mod 20 = 0))",
            styles: "background=#FFC0D79E"
        }, {
            criteria: "(row > 20) and ((value mod 18 = 0) or (row mod 19 = 0))",
            styles: "foreground=#FFFF0000"
        }]
    }, {
        fieldName: "2014_02_07",
        type: "data",
        width: "55",
        header: {
            text: "02/07"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }, {
            criteria: "(row > 20) and ((value mod 15 = 0) or (row mod 16 = 0) or (row mod 17 = 0) or (row mod 20 = 0))",
            styles: "background=#FFC0D79E"
        }, {
            criteria: "(row > 20) and ((value mod 18 = 0) or (row mod 19 = 0))",
            styles: "foreground=#FFFF0000"
        }]
    }, {
        fieldName: "2014_02_08",
        type: "data",
        width: "55",
        header: {
            text: "02/08"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }, {
            criteria: "(row > 20) and ((value mod 18 = 0) or (row mod 19 = 0))",
            styles: "foreground=#FFFF0000"
        }, {
            criteria: "(row > 20) and ((value mod 15 = 0) or (row mod 16 = 0) or (row mod 17 = 0) or (row mod 20 = 0))",
            styles: "background=#FFC0D79E"
        }]
    }, {
        fieldName: "2014_02_09",
        type: "data",
        width: "55",
        header: {
            text: "02/09"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }, {
            criteria: "(row > 20) and ((value mod 15 = 0) or (row mod 16 = 0) or (row mod 17 = 0) or (row mod 20 = 0))",
            styles: "background=#FFC0D79E"
        }, {
            criteria: "(row > 20) and ((value mod 18 = 0) or (row mod 19 = 0))",
            styles: "foreground=#FFFF0000"
        }]
    }, {
        fieldName: "2014_02_10",
        type: "data",
        width: "55",
        header: {
            text: "02/10"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }, {
            criteria: "(value mod 27 = 0) or (row mod 39 = 0)",
            styles: "foreground=#FFFF0000"
        }]
    }, {
        fieldName: "2014_03",
        type: "data",
        width: "55",
        header: {
            text: "2014/03"
        },
        styles: {
            background:"#FFF5F5F5"
        },
        dynamicStyles: [{
            criteria: "value mod 5 = 0",
            styles: "fontBold=true;background=#FFFCF99B;foreground=#FFFF0000"
        }]
    }, {
        fieldName: "2014_03_01",
        type: "data",
        width: "55",
        header: {
            text: "03/01"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }, {
            criteria: "(value mod 17 = 0) or (row mod 19 = 0)",
            styles: "foreground=#FFFF0000"
        }]
    }, {
        fieldName: "2014_03_02",
        type: "data",
        width: "55",
        header: {
            text: "03/02"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }, {
            criteria: "(value mod 13 = 0) or (row mod 11 = 0)",
            styles: "foreground=#FFFF0000"
        }]
    }, {
        fieldName: "2014_03_03",
        type: "data",
        width: "55",
        header: {
            text: "03/03"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }]
    }, {
        fieldName: "2014_03_04",
        type: "data",
        width: "55",
        header: {
            text: "03/04"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }]
    }, {
        fieldName: "2014_03_05",
        type: "data",
        width: "55",
        header: {
            text: "03/05"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }]
    }, {
        fieldName: "2014_03_06",
        type: "data",
        width: "55",
        header: {
            text: "03/06"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }]
    }, {
        fieldName: "2014_03_07",
        type: "data",
        width: "55",
        header: {
            text: "03/07"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }]
    }, {
        fieldName: "2014_03_08",
        type: "data",
        width: "55",
        header: {
            text: "03/08"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }]
    }, {
        fieldName: "2014_03_09",
        type: "data",
        width: "55",
        header: {
            text: "03/09"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }]
    }, {
        fieldName: "2014_03_10",
        type: "data",
        width: "55",
        header: {
            text: "03/10"
        },
        dynamicStyles: [{
            criteria: "(row mod 10 = 0) or (row mod 10 = 1) or (row mod 10 = 2) or (row mod 10 = 6) or (row mod 10 = 7)",
            styles: "background=#80F3E5FA"
        }]
    }, {
        fieldName: "2014_04",
        type: "data",
        width: "55",
        header: {
            text: "2014/04"
        },
        styles: {
            background:"#FFF5F5F5"
        },
        dynamicStyles: [{
            criteria: "value mod 8 = 0",
            styles: "fontBold=true;background=#FFFCF99B;foreground=#FFFF0000"
        }]
    }, {
        fieldName: "2014_04_01",
        type: "data",
        width: "55",
        header: {
            text: "04/01"
        }
    }, {
        fieldName: "2014_04_02",
        type: "data",
        width: "55",
        header: {
            text: "04/02"
        }
    }, {
        fieldName: "2014_04_04",
        type: "data",
        width: "55",
        header: {
            text: "04/03"
        }
    }, {
        fieldName: "2014_04_04",
        type: "data",
        width: "55",
        header: {
            text: "04/04"
        }
    }, {
        fieldName: "2014_04_05",
        type: "data",
        width: "55",
        header: {
            text: "04/05"
        }
    }, {
        fieldName: "2014_04_06",
        type: "data",
        width: "55",
        header: {
            text: "04/06"
        }
    }, {
        fieldName: "2014_04_07",
        type: "data",
        width: "55",
        header: {
            text: "04/07"
        }
    }, {
        fieldName: "2014_04_08",
        type: "data",
        width: "55",
        header: {
            text: "04/08"
        }
    }, {
        fieldName: "2014_04_09",
        type: "data",
        width: "55",
        header: {
            text: "04/09"
        }
    }, {
        fieldName: "2014_04_10",
        type: "data",
        width: "55",
        header: {
            text: "04/10"
        }
    }, {
        fieldName: "2014_05",
        type: "data",
        width: "55",
        header: {
            text: "2014/05"
        },
        styles: {
            background:"#FFF5F5F5"
        },
        dynamicStyles: [{
            criteria: "value mod 3 = 0",
            styles: "fontBold=true;background=#FFFCF99B;foreground=#FFFF0000"
        }]
    }, {
        fieldName: "2014_05_01",
        type: "data",
        width: "55",
        header: {
            text: "05/01"
        }
    }, {
        fieldName: "2014_05_02",
        type: "data",
        width: "55",
        header: {
            text: "05/02"
        }
    }, {
        fieldName: "2014_05_05",
        type: "data",
        width: "55",
        header: {
            text: "05/03"
        }
    }, {
        fieldName: "2014_05_04",
        type: "data",
        width: "55",
        header: {
            text: "05/04"
        }
    }, {
        fieldName: "2014_05_05",
        type: "data",
        width: "55",
        header: {
            text: "05/05"
        }
    }, {
        fieldName: "2014_05_06",
        type: "data",
        width: "55",
        header: {
            text: "05/06"
        }
    }, {
        fieldName: "2014_05_07",
        type: "data",
        width: "55",
        header: {
            text: "05/07"
        }
    }, {
        fieldName: "2014_05_08",
        type: "data",
        width: "55",
        header: {
            text: "05/08"
        }
    }, {
        fieldName: "2014_05_09",
        type: "data",
        width: "55",
        header: {
            text: "05/09"
        }
    }, {
        fieldName: "2014_05_10",
        type: "data",
        width: "55",
        header: {
            text: "05/10"
        }
    }, {
        fieldName: "2014_06",
        type: "data",
        width: "55",
        header: {
            text: "2014/06"
        },
        styles: {
            background:"#FFF5F5F5"
        },
        dynamicStyles: [{
            criteria: "value mod 7 = 0",
            styles: "fontBold=true;background=#FFFCF99B;foreground=#FFFF0000"
        }]
    }, {
        fieldName: "2014_06_01",
        type: "data",
        width: "55",
        header: {
            text: "06/01"
        }
    }, {
        fieldName: "2014_06_02",
        type: "data",
        width: "55",
        header: {
            text: "06/02"
        }
    }, {
        fieldName: "2014_06_06",
        type: "data",
        width: "55",
        header: {
            text: "06/03"
        }
    }, {
        fieldName: "2014_06_04",
        type: "data",
        width: "55",
        header: {
            text: "06/04"
        }
    }, {
        fieldName: "2014_06_05",
        type: "data",
        width: "55",
        header: {
            text: "06/05"
        }
    }, {
        fieldName: "2014_06_06",
        type: "data",
        width: "55",
        header: {
            text: "06/06"
        }
    }, {
        fieldName: "2014_06_07",
        type: "data",
        width: "55",
        header: {
            text: "06/07"
        }
    }, {
        fieldName: "2014_06_08",
        type: "data",
        width: "55",
        header: {
            text: "06/08"
        }
    }, {
        fieldName: "2014_06_09",
        type: "data",
        width: "55",
        header: {
            text: "06/09"
        }
    }, {
        fieldName: "2014_06_10",
        type: "data",
        width: "55",
        header: {
            text: "06/10"
        }
    }, {
        fieldName: "2014_07",
        type: "data",
        width: "55",
        header: {
            text: "2014/07"
        },
        styles: {
            background:"#FFF5F5F5"
        },
        dynamicStyles: [{
            criteria: "value mod 11 = 0",
            styles: "fontBold=true;background=#FFFCF99B;foreground=#FFFF0000"
        }]
    }, {
        fieldName: "2014_07_01",
        type: "data",
        width: "55",
        header: {
            text: "07/01"
        }
    }, {
        fieldName: "2014_07_02",
        type: "data",
        width: "55",
        header: {
            text: "07/02"
        }
    }, {
        fieldName: "2014_07_07",
        type: "data",
        width: "55",
        header: {
            text: "07/03"
        }
    }, {
        fieldName: "2014_07_04",
        type: "data",
        width: "55",
        header: {
            text: "07/04"
        }
    }, {
        fieldName: "2014_07_05",
        type: "data",
        width: "55",
        header: {
            text: "07/05"
        }
    }, {
        fieldName: "2014_07_06",
        type: "data",
        width: "55",
        header: {
            text: "07/06"
        }
    }, {
        fieldName: "2014_07_07",
        type: "data",
        width: "55",
        header: {
            text: "07/07"
        }
    }, {
        fieldName: "2014_07_08",
        type: "data",
        width: "55",
        header: {
            text: "07/08"
        }
    }, {
        fieldName: "2014_07_09",
        type: "data",
        width: "55",
        header: {
            text: "07/09"
        }
    }, {
        fieldName: "2014_07_10",
        type: "data",
        width: "55",
        header: {
            text: "07/10"
        }
    }];

    grid.setColumns(columns);
}
 
function setOptions(grid) {
    grid.setOptions({
        fixed: {
            //colCount: 4
        },
        header: {
            height: 25
        },
        panel: {
            visible: false
        },
        footer: {
            visible: false
        },
        checkBar: {
            visible: false
        },
        stateBar: {
            visible: false
        },
        indicator: {
            visible: true
        },
        display: {
            rowResizable: true,
            heightMeasurer: "fixed",
            rowHeight: 21
        }
    });
}

function loadData() {
    grdMain.showToast("Load data...", true);
    $.ajax({
        url: "data/CelloData.csv?__time__=" + new Date().getTime(),
        dataType: 'text',
        success: function (data) {
            grdMain.hideToast();
            dataProvider.fillCsvData(data, {
            });
        },
        complete: function (data) {
            grdMain.hideToast();
        }
	}); 
}

var tests = {
    getVersion: function () {
        alert(RealGridJS.getVersion());
    }
};

function setTests(container, title) {
    if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
    /*
    createCheckBox(container, "visible", function (e) {
        grdMain.setStateBar({ visible: e.target.checked });
    }, true);
    createListBox(container, "figureBackground", ["#ffff0000", "#ff00ff00"], function (e) {
        grdMain.setStyles( { stateBar: { figureBackground: _getSelected(e) } } );
    }, "#ff00ff00");
    */
}
