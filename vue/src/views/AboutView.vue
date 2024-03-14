
import { RealGridVue } from 'realgrid-vue3';
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <RealGridVue ref="gridRef" style="width:100%; height: 400px;"
      :auto-generate-field="true"
      :rows="rows"
      @current-row-changed="onCurrentRowChanged"
    >
      <RGDataColumn v-for="column in columns" v-bind="column"></RGDataColumn>
    </RealGridVue>
  </div>
</template>

<script setup lang="ts">
import { type DataValues, ValueType, GridView, LocalDataProvider } from 'realgrid';
import { RGDataColumn, RealGridVue } from 'realgrid-vue3';
import { nextTick, onMounted, ref } from 'vue';

const gridRef = ref<RealGridVue>();
const columns = ref<Array<RGDataColumn>>();
const rows = ref<Array<DataValues>>();

let gridView: GridView;
let dataProvider: LocalDataProvider;

async function getData(): Promise<Array<DataValues>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data: any[] = [];
      for (let i = 0; i < 100; i++) {
        data.push({
          text1: `text1 ${i}`,
          text2: `text2 ${i}`,
          text3: `text3 ${i}`,
          number: Math.round(Math.random() * 1000000 - 1000000) / 1000
        })
      }
      resolve(data)
    }, 1000);
  });
}

function onCurrentRowChanged(grid: GridView, oldRow: number, newRow: number) {
  console.log("onCurrentChanged");
}

onMounted(() => {
  const cols: Array<RGDataColumn> = [
    {fieldName: "text1", name: "text1"},
    {fieldName: "text2", name: "text2"},
    {field: {fieldName: "number", dataType: ValueType.NUMBER}},
    {fieldName: "text3"}
  ];
  columns.value = cols;
  gridView = gridRef.value?.gridView!;
  dataProvider = gridRef.value?.dataProvider!;

  nextTick(async () => {
    // gridView.value?.showLoading(true);
    gridView.showLoading(true);
    rows.value = await getData();
    gridView.closeLoading();
  });
});


</script>
<style>
@media (min-width: 1024px) {
  .about {
    flex-direction: column;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
