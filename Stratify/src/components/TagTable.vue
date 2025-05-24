<!-- components/TagTable.vue -->
<template>
  <div>
    <DataTable
      :value="tags"
      class="tabela-src"
      removableSort
      stripedRows
      scrollHeight="320px"
    >
      <div class="tag_header">
        <h4>Etiqueta por card</h4>
        <CSVButton/>
      </div>
      <Column field="nomeTag"    sortable header="Etiqueta"      />
      <Column field="quantidade" sortable header="Quantidade Card" />
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column    from 'primevue/column';
import CSVButton from './CSVButton.vue';

export default {
  name: 'TagTable',
  components: { DataTable, Column, CSVButton },
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>

.tag_header{
  padding: 10px;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.tabela-src {
  border: 1px solid #5739B4;
  max-height: 25rem;
  border-radius: 12px;
  padding: 5px;
  background-color: #fff;
}
::v-deep(.p-datatable-table-container) {
  max-height: 24rem;
  overflow: auto;
}
.tabela-src::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}
.tabela-src::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 12px;
}
@media (max-width: 768px) {
  .tabela-src {
    width: 83vw;
    margin: 0 auto;
  }
}
</style>
