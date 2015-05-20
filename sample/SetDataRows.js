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

	setTests("actions", "SetDataRows");
});

function setFields(provider) {
	var fields = [
		new RealGridJS.DataField("UserId"),
		new RealGridJS.DataField("UserName"),
		new RealGridJS.DataField("Age"),
		new RealGridJS.DataField("Gender"),
		new RealGridJS.DataField("MobilePhone"),
		new RealGridJS.DataField("Email")
	];;

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
}

function setStyles() {
	grdMain.setStyles({
		selection: {
			background: "#11000000",
			border: "#88000000,1"
		}
	});
}

function setSkin() {
	grdMain.setStyles(skin49.SkinSource);
}

function loadData(provider) {
	var rows = [
		["user1", "Aaron", "28", "Male", "001-0002-0001", "user1@gmail.com"],
		["user2", "Abraham", "25", "Male", "001-0002-0003", "user3@gmail.com"],
		["user3", "Ceci", "21", "Female", "001-0002-0006", "user6@gmail.com"],
		["user4", "Benjamin", "25", "Male", "001-0002-0002", "user2@gmail.com"],
		["user5", "Donald", "38", "Male", "001-0002-0004", "user4@gmail.com"],
		["user6", "Edgar", "55", "Male", "001-0002-0005", "user5@gmail.com"],
		["user7", "Eugene", "44", "Female", "001-0002-0007", "user7@gmail.com"],
		["user8", "Gabriel", "33", "Female", "001-0002-0008", "user8@gmail.com"],
		["user9", "Geoffrey", "55", "Male", "001-0002-0009", "user9@gmail.com"],
		["user10", "George", "65", "Male", "001-0002-0010", "user10@gmail.com"],
		["user11", "Noel", "29", "Female", "001-0002-0011", "user11@gmail.com"],
		["user12", "Oscar", "18", "Female", "001-0002-0012", "user12@gmail.com"],
		["user13", "Martin", "52", "Male", "001-0002-0013", "user13@gmail.com"],
		["user14", "Kenneth", "61", "Male", "001-0002-0014", "user14@gmail.com"],
		["user15", "John", "26", "Female", "001-0002-0015", "user15@gmail.com"],
		["user16", "Peter", "46", "Male", "001-0002-0016", "user16@gmail.com"],
		["user17", "William", "26", "Female", "001-0002-0015", "user15@gmail.com"],
		["user18", "Wallace", "46", "Male", "001-0002-0016", "user16@gmail.com"],
		["user19", "Roland", "26", "Female", "001-0002-0015", "user15@gmail.com"],
		["user20", "Thomas", "46", "Male", "001-0002-0016", "user16@gmail.com"],
		["user21", "Leslie", "64", "Male", "001-0002-0017", "user17@gmail.com"]
	];

	dataProvider.setRows(rows);
	$("#loadResult").css("color", "green").text(dataProvider.getRowCount() + " rows loaded.").show();
	grdMain.setFocus();
}

var tests = {
	getVersion: function () {
		alert(RealGridJS.getVersion());
	},
	clearRows: function () {
		dataProvider.clearRows();
	},
	getCurrent: function () {
		alert(JSON.stringify(grdMain.getCurrent()));
	}
};

function setTests(container, title) {
	if (title) document.title = "RealGrid - " + title;
	createButtons(container, tests);
}
