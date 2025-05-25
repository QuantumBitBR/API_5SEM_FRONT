<!-- components/TagTable.vue -->
<template>
  <div>
    <div class="tabela-src">
      <div class="tag_header">
        <h4>Quantidade de card por etiqueta</h4>
        <CSVButton v-if="tags.length != 0" exportType="cardsporetiqueta" :projectId="selectedProject?.id" :userId="selectedUser?.idUsuario"/>
      </div>
      <template v-if="tags.length != 0">
      <DataTable :value="tags" removableSort stripedRows scrollHeight="18rem">
          <Column field="nomeTag" sortable header="Etiqueta" />
          <Column field="quantidade" sortable header="Quantidade Card" />
      </DataTable>
      </template>
      <template v-else>
        <h4 id="no-text">Nenhum card encontrado para os filtros selecionados</h4>
      </template>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import CSVButton from './CSVButton.vue';

export default {
  name: 'TagTable',
  components: { DataTable, Column, CSVButton },
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    selectedUser: {
      type: Object,
      default: 0
    },
    selectedProject: {
      type: Object,
      default: 0
    },
  },
  mounted(){
    console.log(this.tags)
  }
};
</script>

<style scoped>
.tag_header {
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
  height: 25rem;
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

#no-text{
  display: flex;
  justify-content: center;
  height: 70%;
  align-content: center;
  align-items: center;
  color: #666;
  font-style: italic;
  text-align: center;
}

@media (max-width: 768px) {
  .tabela-src {
    width: 83vw;
    margin: 0 auto;
  }
}
</style>
