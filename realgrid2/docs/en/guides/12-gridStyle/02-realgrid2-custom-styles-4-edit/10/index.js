
let dataProvider, gridView;

const showFormModal = function() {
  let formView = gridView.formView;
  formView.visible = true;
  formView.options.modal = true;
  formView.options.modalPadding = "10% 8%";
  formView.options.autoClose = true;
  formView.options.saveLabel = "저장";
  formView.options.cancelLabel = "취소";
  
  let formModel = {
    items:[{
          header: "이름",
          column: "KorName"
      },
      {
          header: "성별",
          column: "Gender"
      },
      {
          header: "주문일",
          column: "OrderDate"
      },
      {
          header: "커스텀",
          template: "<span>Good!<br>121212</span>"
      },
      "Phone",
    ],
  };

  formView.setModel(formModel);
};

document.addEventListener('DOMContentLoaded', function () {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView('realgrid');

  gridView.setDataSource(dataProvider);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);
  dataProvider.setRows(samples);

  setTimeout(function() {
    gridView.setFocus();
    showFormModal();
  }, 200);
});