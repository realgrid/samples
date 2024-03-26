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
        text: "Name",
      },
    },
  ]);

  // 데이터 채우기
  provider.setRows([
    {
      KorName: "박영호",
      Gender: "남",
      Age: "71",
      Phone: "(025)6563-2802",
      ProductId: "198160731-00008",
      KorCountry: "모잠비크",
      OrderDate: "2021-01-16",
      CardNumber: "5587-2139-9692-3644",
      Monetary: "EUR",
      StartDate: "2018-02-25",
      EndDate: "2021-08-12",
      ToMonth: "23",
      Month: "41",
      Year: "3",
      InterestRate: "0.15",
      SaveCost: "51000",
      SaveMaturity: "14950650",
      CurrentSave: "9304950",
      Rating: "5",
      BusinessProficiency: "59",
      Address: "서울특별시 강서구 공항동 45-89",
    },
  ]);
});