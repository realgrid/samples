
let dataProvider, gridView;

document.addEventListener('DOMContentLoaded', function () {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView('realgrid');

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);
  dataProvider.setRows(samples);

  const sel = {
    style: "block",
    // startItem: 1,
    startRow: 1,
    startColumn: "Gender",
    // endItem: 3,
    endRow: 3,
    endColumn: "Phone"
  };

  setTimeout(function() {
    gridView.setSelection(sel);
  }, 200);
});