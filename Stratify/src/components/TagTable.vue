<!-- components/TagTable.vue -->
<template>
  <DataTable
    :value="tags"
    class="tabela-src"
    removableSort
    stripedRows
  >
    <Column field="nomeTag"    sortable header="Etiqueta"      />
    <Column field="quantidade" sortable header="Quantidade Card" />
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column    from 'primevue/column';

export default {
  name: 'TagTable',
  components: { DataTable, Column },
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
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
</style>
