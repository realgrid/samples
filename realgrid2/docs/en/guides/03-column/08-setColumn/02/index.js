
let manager, dataProvider, gridView;
let rowCount = 0;

/**
 * - 특수한 경우를 예상하고 작성된 기능
 *   - 필드+컬럼 을 추가/삭제 할 수 있다.
 *   - 필드+컬럼을 컬럼으로 표현 하기로 한다.
 *   - 컬럼이 없으면 데이터 연결을 끊어줘야 한다.
 */
const GridManager = (
  function(dp, gv) {
    if (!dp || !gv) throw new Error('DataProvider와 GridView객체는 반드시 필요합니다.');

    const provider = dp;
    const viewer = gv;

    viewer.setDataSource(provider);

    return {
      /**
       * 인자로 주어진 필드이름이 존재하는 이름이라면 마지막 Char 숫자를 increse 한다
       */
      getNewFieldName: function(fieldName) {
        let newFieldName = fieldName.replace(' ', '_');
        const index = provider.getFieldIndex(newFieldName);
        // console.log(fieldName, index, provider.getFieldNames());

        if (index === -1) return newFieldName;
        return this.getNewFieldName(newFieldName.concat('1'));
      },
      hasColumns: function() {
        return viewer.getColumns().length > 0 && provider.getFields().length > 0;
      },
      hasData: function() {
        return provider.getRowCount() > 0;
      },
      _checkData: function() {
        if (this.hasColumns() && !this.hasData()) {
          provider.setRowCount(10);
        }
      },
      addColumn: function(colName, valueType, editor, renderer) {
        const fieldName = this.getNewFieldName(colName);
        provider.addField({ 
          fieldName: fieldName,
          dataType: valueType,
        });
        
        viewer.addColumn({
          name: fieldName,
          fieldName: fieldName,
          width: 130,
          header: {
            text: colName,
          },
          editor: editor,
          renderer: renderer,
        });

        this._checkData();

        return fieldName;
      },
    };
  }
);

/**
 * 텍스트 컬럼 추가
 */
const onClickBtnAddTextColumn = function() {
  const fieldName = manager.addColumn('TEXT Column', 'text', { type: 'line' });
  dataProvider.setValue(1, fieldName, '텍스트 값');
};

const onClickBtnAddNumberColumn = function() {
  const fieldName = manager.addColumn('NUMBER Column', 'number', {
    type: "number",
    positiveOnly: true,
  });
  dataProvider.setValue(1, fieldName, 710708);
};

const onClickBtnAddDateColumn = function() {
  const fieldName = manager.addColumn('DATETIME Column', 'datetime', {
    type: "date",
    maxLength: 6,
    yearNavigation: true,
  });
  dataProvider.setValue(1, fieldName, '2020.07.08');
};

const onClickBtnAddDropdownColumn = function() {
  const fieldName = manager.addColumn('DROPDOWN Column', 'text', {
    type: "list",
    values: ["값1", "값2", "값3"],
    labels: ['값이1입니다', '값이2입니다', '값이3입니다'],
    displayLabels: "valueLabel",
    textReadOnly: true
  });
  dataProvider.setValue(1, fieldName, '값2');
};

const onClickBtnAddBooleanColumn =  function() {
  const fieldName = manager.addColumn('BOOLEAN Column', 'boolean', undefined, {
    type: "check",
    trueValues: "true",
    falseValues: "false",
  });
  dataProvider.setValue(1, fieldName, true);
};

const onClickBtnAddObjectColumn =  function() {
  const fieldName = manager.addColumn('Object Column', 'object', { type: 'line' }, {
    type: "html",
    callback: function(grid, cell, w, h) {
      const p = cell.value;
      console.log(p);
      if (p && p.from && p.to) {
        p.rendom = p.rendom || Math.floor(Math.random() * (p.to - p.from) + p.from);
        cell.value = p;
        return p.rendom;
      }

      return '';
    },
  });
  dataProvider.setValue(1, fieldName, { from: 100, to: 250 });
};

/**
 * root
 */
document.addEventListener('DOMContentLoaded', function () {
  dataProvider = new RealGrid.LocalDataProvider();
  gridView = new RealGrid.GridView('realgrid');
  gridView.setDataSource(dataProvider);
  manager = new GridManager(dataProvider, gridView);

  document.getElementById('btnAddTextColumn')
    .addEventListener('click', onClickBtnAddTextColumn);
  document.getElementById('btnAddNumberColumn')
    .addEventListener('click', onClickBtnAddNumberColumn);
  document.getElementById('btnAddDateColumn')
    .addEventListener('click', onClickBtnAddDateColumn);
  document.getElementById('btnAddDropdownColumn')
    .addEventListener('click', onClickBtnAddDropdownColumn);
  document.getElementById('btnAddBooleanColumn')
    .addEventListener('click', onClickBtnAddBooleanColumn);
  document.getElementById('btnAddObjectColumn')
    .addEventListener('click', onClickBtnAddObjectColumn);
});