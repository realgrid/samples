
let dataProvider, gridView;

document.addEventListener('DOMContentLoaded', function () {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView('realgrid');

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);
  dataProvider.setRows(samples);
});