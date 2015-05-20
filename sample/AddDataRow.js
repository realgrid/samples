var grdMain;
var dataProvider;
RealGridJS.setRootContext("../lib");

$().ready(function () {
	dataProvider = new RealGridJS.LocalDataProvider();
	setFields(dataProvider);

	grdMain = new RealGridJS.GridView("container");
	grdMain.setDataSource(dataProvider);
	setColumns(grdMain);
	setOptions(grdMain);
	setSkin();
	setStyles(grdMain);

	loadData(dataProvider);

	// data provider event handlers
	dataProvider.onRowInserting = function (provider, row) {
		if (!_getChecked("allowInsert")) {
			alert('추가할 수 없습니다!');
			return false;
		}
		return true;
	};
	dataProvider.onRowInserted = function (provider, row) {
		// setTimeout을 이용하면 추가된 행이 그리드에 표시된 후에 alert가 호출된다.
		setTimeout(function () {
			var values = provider.getJsonRow(row);
			console.log("$$$$$$$ Inserted: " + JSON.stringify(values));
			alert(JSON.stringify(values));
		}, 0);
	};
	dataProvider.onRowDeleting = function (provider, row) {
		if (!_getChecked("allowDelete")) {
			alert('삭제할 수 없습니다!');
			return false;
		}
		return true;
	};
	dataProvider.onRowDeleted = function (provider, row) {
		setTimeout(function () {
			console.log("$$$$$$$ Deleted: " + row);
			alert(row + " row deleted.");
		}, 0);
	};

	setTests("actions", "AddDataRow");
});

function setFields(provider) {
	var fields = [
		new RealGridJS.DataField("UserId"),
		new RealGridJS.DataField("UserName"),
		new RealGridJS.DataField("Age"),
		new RealGridJS.DataField("Gender"),
		new RealGridJS.DataField("MobilePhone"),
		new RealGridJS.DataField("Email")
	];
	provider.setFields(fields);
}

function setColumns(grid) {
	var columns = [];

	var column = new RealGridJS.DataColumn();
	column.fieldName = "UserId";
	column.header = { text: "User ID" }
	column.width = 150;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.fieldName = "UserName";
	column.header = { text: "Name" }
	column.width = 150;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.fieldName = "Age";
	column.header = { text: "Age" }
	column.width = 60;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.fieldName = "Gender";
	column.header = { text: "Gender" }
	column.width = 60;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.fieldName = "MobilePhone";
	column.header = { text: "Mobile Phone" }
	column.width = 150;
	columns.push(column);

	column = new RealGridJS.DataColumn();
	column.fieldName = "Email";
	column.header = { text: "Email" }
	column.width = 200;
	columns.push(column);

	grid.setColumns(columns);
}

function setOptions(grid) {
	grid.setEditOptions({
		appendable: true,
		insertable: true,
		updatable: true
	});

	// check bar를 감춘다.
	grid.setCheckBar({
		visible: false
	});

	grid.setDisplayOptions({
		rowResizable: true
	});
}

function setStyles() {
	// 추가된 행의 배경색을 바꾼다.
	grdMain.setStyles({
		body: {
			dynamicStyles: [{
				criteria: "state = 'c'",
				styles: "background=#33a1deff"
			}]
		}
	});
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
	var rows = [
		["user1", "Aaron", "28", "Male", "001-0002-0001", "user1@gmail.com"],
		["user3", "Abraham", "25", "Male", "001-0002-0003", "user3@gmail.com"],
		["user6", "Ceci", "21", "Female", "001-0002-0006", "user6@gmail.com"]
	];

	dataProvider.setRows(rows);
	grdMain.setFocus();
}

var tests = {
	addUser: function () {
		/*
		var row = {
			UserId: $("#txtUserId").val(),
			UserName: $("#txtUserName").val(),
			Age: $("#txtAge").val(),
			Gender: $("#txtGender").val(),
			MobilePhone: $("#txtPhone").val(),
			Email: $("#txtMail").val()
		};

		var arr = [
			$("#txtUserId").val(),
			$("#txtUserName").val(),
			$("#txtAge").val(),
			$("#txtGender").val(),
			$("#txtPhone").val(),
			$("#txtMail").val()
		];
		*/
		var row = {
			UserId: "UserId",
			UserName: "UserName",
			Age: 33,
			Gender: "Male",
			MobilePhone: "010-0001-0011",
			Email: "Email"
		};
		var arr = [
			"UserId", "userName", 35, "male", "000-1111-2222", "Email"
		];

		dataProvider.addRow(row);
		//dataProvider.addRow(arr);
	},
	insertUser: function () {
		var current = grdMain.getCurrent();
		var dataRow = current.dataRow

		if (dataRow < 0) {
			alert("삽입할 위치의 행을 선택해야 합니다.");
			return;
		}

		/*
		var row = {
			UserId: $("#txtUserId").val(),
			UserName: $("#txtUserName").val(),
			Age: $("#txtAge").val(),
			Gender: $("#txtGender").val(),
			MobilePhone: $("#txtPhone").val(),
			Email: $("#txtMail").val()
		};
		*/

		var row = {
			UserId: "UserId",
			UserName: "UserName",
			Age: 33,
			Gender: "Male",
			MobilePhone: "010-0001-0011",
			Email: "Email"
		};
		dataProvider.insertRow(dataRow, row);
	},
	updateUser: function () {
		var current = grdMain.getCurrent();
		var dataRow = current.dataRow

		if (dataRow < 0) {
			alert("수정할 행을 선택해야 합니다.");
			return;
		}

		/*
		var row = {
			UserId: undefined,
			UserName: undefined,
			Age: undefined,
			Gender: undefined,
			MobilePhone: undefined,
			Email: undefined
		};

		if ($("#txtUserId").length > 0)
			row.UserId = $("#txtUserId").val();
		if ($("#txtUserName").length > 0)
			row.UserName = $("#txtUserName").val();
		if ($("#txtAge").length > 0)
			row.Age = $("#txtAge").val();
		if ($("#txtGender").length > 0)
			row.Gender = $("#txtGender").val();
		if ($("#txtPhone").length > 0)
			row.MobilePhone = $("#txtPhone").val();
			*/

		var row = {
			UserId: "UserId",
			UserName: "UserName",
			Age: undefined,
			Gender: undefined,
			MobilePhone: undefined,
			Email: undefined
		};
		dataProvider.updateRow(dataRow, row);
	},
	updateStrictUser: function () {
		var current = grdMain.getCurrent();
		var dataRow = current.dataRow

		if (dataRow < 0) {
			alert("수정할 행을 선택해야 합니다.");
			return;
		}

		/*
		var row = {
			UserId: undefined,
			UserName: undefined,
			Age: undefined,
			Gender: undefined,
			MobilePhone: undefined,
			Email: undefined
		};

		if ($("#txtUserId").val() != "")
			row.UserId = $("#txtUserId").val();
		if ($("#txtUserName").val() != "")
			row.UserName = $("#txtUserName").val();
		if ($("#txtAge").val() != "")
			row.Age = $("#txtAge").val();
		if ($("#txtGender").val() != "")
			row.Gender = $("#txtGender").val();
		if ($("#txtPhone").val() != "")
			row.MobilePhone = $("#txtPhone").val();
		*/

		var row = {
			UserId: "UserId",
			UserName: "UserName",
			Age: undefined,
			Gender: undefined,
			MobilePhone: undefined,
			Email: undefined
		};
		dataProvider.updateStrictRow(dataRow, row);
	},
	moveRow: function () {
		//var oldRow = $("#txtOldRow").val();
		//var newRow = $("#txtNewRow").val();
		var oldRow = grdMain.getCurrent().dataRow;
		var newRow = 0;
		dataProvider.moveRow(oldRow, newRow);
	},
	deleteRow: function () {
		var cur = grdMain.getCurrent();
		if (cur.dataRow >= 0) {
			dataProvider.removeRow(cur.dataRow);
		}
	},
	deleteRows: function () {
		var rows = grdMain.getSelectedRows();
		dataProvider.removeRows(rows);
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
	createCheckBox(container, "checkStates", function (e) {
		dataProvider.checkRowStates(_getChecked(e));
	}, true);
	createCheckBox(container, "allowInsert", null, true);
	createCheckBox(container, "allowDelete", null, true);
}
