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
      fieldName: "Gender",
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
      width: "100",
      header: {
        text: "이름",
      },
    },
    {
      name: "GenderColumn",
      fieldName: "Gender",
      width: "70",
      header: {
        text: "성별",
      },
    },
    {
      name: "AgeColumn",
      fieldName: "Age",
      width: "60",
      numberFormat: "00",
      header: {
        text: "나이",
      },
    },
  ]);

  provider.setFilters({ criteria: "value['Gender']='여'" });

  // 데이터 채우기
  provider.setRows([
    {
      KorName: "박영호",
      Gender: "남",
      Age: "71",
    },
    {
      KorName: "조일형",
      Gender: "남",
      Age: "62",
    },
    {
      KorName: "김덕중",
      Gender: "여",
      Age: "53",
    },
    {
      KorName: "국영석",
      Gender: "남",
      Age: "63",
    },
    {
      KorName: "성노식",
      Gender: "남",
      Age: "66",
    },
    {
      KorName: "김진영",
      Gender: "남",
      Age: "29",
    },
    {
      KorName: "전우수",
      Gender: "여",
      Age: "73",
    },
  ]);
});