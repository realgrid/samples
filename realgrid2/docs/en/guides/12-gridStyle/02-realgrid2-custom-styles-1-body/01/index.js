
let dataProvider, gridView;

document.addEventListener('DOMContentLoaded', function () {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView('realgrid');

  gridView.setDataSource(dataProvider);
  gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  // dataProvider.setFields(fields);
  // gridView.setColumns(columns);
  // dataProvider.setRows(samples);
});