document.addEventListener('DOMContentLoaded', function () {
  // 설치
  const container = document.getElementById('realgrid');
  const provider = new RealGrid.LocalDataProvider(false);
  const gridView = new RealGrid.GridView(container);
  gridView.setDataSource(provider);

  // 필드 생성
  provider.setFields([
    {
      fieldName: "KorName",
      dataType: "text",
    },
    {
      fieldName: "Age",
      dataType: "number",
    },
  ]);

  // 컬럼 생성
  gridView.setColumns([
    {
      name: "KorNameColumn",
      fieldName: "KorName",
      width: "70",
      header: {
        text: "이름",
      },
    },
  ]);
});
