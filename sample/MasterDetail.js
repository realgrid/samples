var grdMain, grdDetail, dpMain, dpDetail;
 
var masterData = [
    ["10248", "VINET", "Vins et alcools Chevalier", "5", "1996-07-04", "Vins et alcools Chevalier", "59 rue de l'Abbaye", "Reims", "France"],
    ["10249", "TOMSP", "Toms Spezialitaten", "6", "1996-07-05", "Toms Spezialitaten", "Luisenstr. 48", "Munster", "Germany"],
    ["10250", "HANAR", "Hanari Carnes", "4", "1996-07-08", "Hanari Carnes", "Rua do Paco, 67", "Rio de Janeiro", "Brazil"],
    ["10251", "VICTE", "Victuailles en stock", "3", "1996-07-08", "Victuailles en stock", "2, rue du Commerce", "Lyon", "France"],
    ["10252", "SUPRD", "Supremes delices", "4", "1996-07-09", "Supremes delices", "Boulevard Tirou, 255", "Charleroi", "Belgium"],
    ["10253", "HANAR", "Hanari Carnes", "3", "1996-07-10", "Hanari Carnes", "Rua do Paco, 67", "Rio de Janeiro", "Brazil"]
];
 
var detailData = [
    { OrderID: 10248, ProductName: "Queso Cabrales", UnitPrice: 14, Quantity: 12 },
    { OrderID: 10248, ProductName: "Singaporean Hokkien Fried Mee", UnitPrice: 9.8, Quantity: 10 },
    { OrderID: 10248, ProductName: "Mozzarella di Giovanni", UnitPrice: 34.8, Quantity: 5 },
    { OrderID: 10249, ProductName: "Tofu", UnitPrice: 18.6, Quantity: 9 },
    { OrderID: 10249, ProductName: "Manjimup Dried Apples", UnitPrice: 42.4, Quantity: 40 },
    { OrderID: 10250, ProductName: "Jack's New England Clam Chowder", UnitPrice: 7.7, Quantity: 10 },
    { OrderID: 10250, ProductName: "Manjimup Dried Apples", UnitPrice: 42.4, Quantity: 35 },
    { OrderID: 10250, ProductName: "Louisiana Fiery Hot Pepper Sauce", UnitPrice: 16.8, Quantity: 15 },
    { OrderID: 10251, ProductName: "Gustaf's Knackebrod", UnitPrice: 16.8, Quantity: 6 },
    { OrderID: 10251, ProductName: "Ravioli Angelo", UnitPrice: 15.6, Quantity: 15 },
    { OrderID: 10251, ProductName: "Louisiana Fiery Hot Pepper Sauce", UnitPrice: 16.8, Quantity: 20 },
    { OrderID: 10252, ProductName: "Sir Rodney's Marmalade", UnitPrice: 64.8, Quantity: 40 },
    { OrderID: 10252, ProductName: "Geitost", UnitPrice: 2, Quantity: 25 },
    { OrderID: 10252, ProductName: "Camembert Pierrot", UnitPrice: 27.2, Quantity: 40 },
    { OrderID: 10253, ProductName: "Gorgonzola Telino", UnitPrice: 10, Quantity: 20 },
    { OrderID: 10253, ProductName: "Chartreuse verte", UnitPrice: 14.4, Quantity: 42 }
];

$(document).ready(function () {
    $("#btnMasterSave").click(onbtnMasterSave);
    $("#btnMasterAdd").click(onbtnMasterAdd);
    $("#btnDetailSave").click(onbtnDetailSave);
 
    $("#masterGrid").css("width", "100%");
    $("#masterGrid").css("height", "300px");
    $("#detailGrid").css("width", "100%");
    $("#detailGrid").css("height", "200px");
 
    RealGridJS.setTrace(false);
    RealGridJS.setRootContext("../lib");

    // Master 
    dpMain = new RealGridJS.LocalDataProvider();
    grdMain = new RealGridJS.GridView("masterGrid");
    grdMain.setDataProvider(dpMain);
 
    setMasterField(dpMain);
    setMasterColumn(grdMain);
    setMasterOptions(dpMain, grdMain);    
    setMasterCallback();
 
    // detail
    dpDetail = new RealGridJS.LocalDataProvider();
    grdDetail = new RealGridJS.GridView("detailGrid");
    grdDetail.setDataProvider(dpDetail);
 
    setDetailField(dpDetail);
    setDetailColumn(grdDetail);
    setDetailOptions(dpDetail, grdDetail);
    setDetailCallback();
 
    dpMain.setRows(masterData);
    grdMain.setCurrent({ itemIndex: 0 });
});

function setMasterCallback() {
    grdMain.onCurrentRowChanged = function (grid, oldRow, newRow) {
        console.log("grdMain.onCurrentRowChanged");
 
        var isNew = (newRow < 0) || dpMain.getRowState(newRow) === "created";
 
        // 최초 입력시에만 수정가능하도록
        grid.setColumnProperty("OrderID", "editable", isNew);
 
        detailControl(newRow);
    };
    grdMain.onEditCommit = function (grid, index, oldValue, newValue) {
 
    };
    grdMain.onCurrentChanging = function (grid, oldIndex, newIndex) {
        // detail을 확인해서 수정중이거나. 수정후 저장된것이 있으면 종료..
        if (oldIndex.itemIndex != newIndex.itemIndex && !chkDetail()) {
            return false;
        }
    };
    grdMain.onSorting = function (grid) {
        if (!chkDetail()) {
            return false;
        }
    };
    grdMain.onFiltering = function (grid) {
        if (!chkDetail()) {
            return false;
        }
    };
    grdMain.onGrouping = function (grid) {
        if (!chkDetail()) {
            return false;
        }
    };
    dpMain.onRowsDeleted = function (provider, rows) {
        //master 레코드 삭제 처리
        console.log("Master Rows삭제: " + rows);
        detailControl(grdMain.getCurrent().dataRow);
    };
    dpMain.onRowDeleted = function (provider, row) {
        //master 레코드 삭제 처리
        console.log("Master Row삭제: " + row);
        detailControl(grdMain.getCurrent().dataRow);
    };
};
 
function setDetailCallback() {
    grdDetail.onCurrentRowChanged = function (grid, oldRow, newRow) {
        var isNew = (newRow < 0) || dpMain.getRowState(newRow) === "created";
 
        // 최초 입력시에만 수정가능하도록
        grid.setColumnProperty("OrderID", "editable", isNew);
        grid.setColumnProperty("ProductName", "editable", isNew);
    };
    grdDetail.onRowInserting = function (grid, itemIndex, dataRow) {
        if (grdMain.isItemEditing() || dpMain.getRowStateCount("all") > 0) {
 
            return "마스터를 저장해야 합니다.";
        };
    };
    dpDetail.onRowInserting = function (provider, row, values) {
        var idx = dpDetail.getFieldIndex("OrderID");
        var OrderID = grdMain.getValue(grdMain.getCurrent().itemIndex, "OrderID");
 
        values[idx] = OrderID;
    };
    dpDetail.onRowDeleted = function (provider, row) {
        console.log("Detail Row삭제: " + row);
    };
};
 
function setMasterField(provider) {
    var fields = [
        {
            fieldName: "OrderID",
            dataType: "number"
        }, {
            fieldName: "CustomerID",
            dataType: "text"
        }, {
            fieldName: "CompanyName",
            dataType: "text"
        }, {
            fieldName: "EmployeeID",
            dataType: "number"
        }, {
            fieldName: "OrderDate",
            dataType: "datetime"
        }, {
            fieldName: "ShipName",
            dataType: "text"
        }, {
            fieldName: "ShipAddress",
            dataType: "text"
        }, {
            fieldName: "ShipCity",
            dataType: "text"
        }, {
            fieldName: "ShipCountry",
            dataType: "text"
        }
    ];
    provider.setFields(fields);
 
};
function setMasterColumn(grid) {
 
    var columns = [
        {
            // OrderID의 경우 신규만 가능, 수정은 불가능하게 처리..
            fieldName: "OrderID",
            name: "OrderID",
            required: true,
            requiredLevel: "error",
            requiredMessage: "OrderID는 반드시 입력해야 합니다.",
            header: "OrderID",
            width: 70,
            styles: {
                textAlignment: "center"
            }
             
        },
        {
            fieldName: "CustomerID",
            name: "CustomerID",
            required: true,
            requiredLevel: "info",
            requiredMessage: "CustomerID는 반드시 입력해야 합니다.",
            header: "CustomerID",
            width: 80,
            styles: {
                textAlignment: "center"
            }
        },
        {
            fieldName: "CompanyName",
            name: "CompanyName",
            header: "CompanyName",
            width: 160
        },
        {
            fieldName: "EmployeeID",
            name: "EmployeeID",
            header: "EmployeeID",
            lookupDisplay: true,
            values: ["1", "2", "3", "4", "5", "6"],
            labels: ["Davolio", "Fuller", "Leverling", "Peacock", "Buchanan", "Suyama"],
            editor: {
                type: "dropDown"
            },
            styles: {
                textAlignment: "center"
            }
        },
        {
            fieldName: "OrderDate",
            name: "OrderDate",
            header: "OrderDate",
            editor: {
                datetimeFormat: "yyyy-MM-dd"
            },
            styles: {
                textAlignment: "center",
                datetimeFormat: "yyyy/MM/dd"
            }
        },
        {
            fieldName: "ShipName",
            name: "ShipName",
            header: "ShipName",
            width: 160
        },
        {
            fieldName: "ShipAddress",
            name: "ShipAddress",
            header: "ShipAddress",
            width: 160
        },
        {
            fieldName: "ShipCity",
            name: "ShipCity",
            header: "ShipCity"
        },
        {
            fieldName: "ShipCountry",
            name: "ShipCountry",
            header: "ShipCountry"
        }
    ];
 
    grid.setColumns(columns);
 
};
 
function setMasterOptions(provider, grid) {
    provider.setOptions({
        restoreMode: "auto"
    });
 
    grid.setOptions({
        edit: {
            insertable: true,
            appendable: true,
            deletable: true,
            upateable: true,
            commitWhenExitLast: true,
            crossWhenExitLast: true,
            enterToTab: true,
        },
        sort: {
            keepFocusedRow: true
        },
        footer: {
            visible: false
        }
    })
};
 
function setDetailField(provider) {
    var fields = [
        {
            fieldName: "OrderID",
            dataType: "number"
        },
        {
            fieldName: "ProductName",
            dataType: "text"
        },
        {
            fieldName: "ProductName",
            dataType: "text"
        },
        {
            fieldName: "UnitPrice",
            dataType: "number"
        },
        {
            fieldName: "Quantity",
            dataType: "number"
        }
    ];
    provider.setFields(fields);
 
};

function setDetailColumn(grid) {
    // OrderID는 자동으로 입력됨, ProductName의 경우 신규만 가능, 수정은 불가능하게 처리.
    var columns = [
        {
            fieldName: "OrderID",
            name: "OrderID",
            header: "OrderID",
            width: 70,
            editable: false,
            readOnly: true,
            styles: {
                textAlignment: "center"
            }
        },
        {
            fieldName: "ProductName",
            name: "ProductName",
            required: true,
            requiredLevel: "info",
            requiredMessage: "ProductName는 반드시 입력해야 합니다.",
            header: "ProductName",
            width: 200
        },
        {
            fieldName: "UnitPrice",
            name: "UnitPrice",
            header: "UnitPrice",
            styles: {
                textAlignment: "far",
                numberFormat: "#,##0.00"
            }
        },
        {
            fieldName: "Quantity",
            name: "Quantity",
            header: "Quantity",
            styles: {
                textAlignment: "far",
                numberFormat: "#,##0"
            }
        }
    ];
 
    grid.setColumns(columns);
 
};
 
function setDetailOptions(provider, grid) {
    provider.setOptions({ softDeleting: true });
    grid.setOptions({
        edit: {
            insertable: true,
            appendable: true,
            deletable: true,
            upateable: true,
            commitWhenExitLast: true,
            enterToTab: true,
        }
    })
};
 
function detailControl(masterRow) {
    dpDetail.clearRows();
 
    if (masterRow >= 0) {
        var mstKey = dpMain.getValue(masterRow, "OrderID");
 
        // detailData 배열에서 자료추출. DB대용
        var datas = detailData.filter(function (element) {
            if (element.OrderID === mstKey) {
                return true;
            }
        });
 
        dpDetail.setRows(datas);
    };
};
 
function chkDetail() {
    if (grdDetail.isItemEditing() || dpDetail.getRowStateCount("*") > 0) {
        alert("Detail을 저장해야 합니다");
        return false;
    };
    return true;
};
 
function onbtnDetailSave(evt) {
    grdDetail.commit();
 
    var states = dpDetail.getAllStateRows();
 
    if (states.created.length > 0) {
        // 생성
        for (var i = 0; i < states.created.length; i++) {
            detailData.push(dpDetail.getJsonRow(states.created[i]));
            dpDetail.setRowState(states.created[i], "none");
        }
    };
    if (states.updated.length > 0) {
        // 수정인 경우
        for (var i = 0; i < states.updated.length; i++) {
            var orderId = dpDetail.getValue(states.updated[i], "OrderID");
            var productName = dpDetail.getValue(states.updated[i], "ProductName");
            var rowData = dpDetail.getJsonRow(states.updated[i]);
 
            for (var j = 0; j < detailData.length - 1; j++) {
                if ((orderId == detailData[j].OrderID) && (productName == detailData[j].ProductName)) {
                    detailData.splice(j, 1, rowData);
                    dpDetail.setRowState(states.updated[i], "none");
                    break;
                }
            }
        }
    };
    if (states.deleted.length > 0) {
        // 삭제 softDelete인경우
        for (var i = 0; i < states.deleted.length; i++) {
            var orderId = dpDetail.getJsonRow(states.deleted[i]).OrderID;
            var productName = dpDetail.getJsonRow(states.deleted[i]).ProductName;
 
            for (var j = 0; j < detailData.length - 1; j++) {
                if ((orderId == detailData[j].OrderID) && (productName == detailData[j].ProductName)) {
                    detailData.splice(j, 1);
                    break;
                }
            }
        }
 
        dpDetail.clearRowStates(true, true);
    };
    if (states.createAndDeleted.length > 0) {
        // 생성후 삭제.
        dpDetail.clearRowStates(true);
    };
 
};
 
function onbtnMasterSave(event) {
    grdMain.commit();
    //마스터 저장 생략.
    dpMain.clearRowStates();
};
 
function onbtnMasterAdd(event) {
    var row = dpMain.addRow({});
    grdMain.setCurrent({ dataRow: row })
    grdMain.setFocus();
};
