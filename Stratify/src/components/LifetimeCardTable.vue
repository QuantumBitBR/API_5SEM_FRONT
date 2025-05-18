<template>
  <div class="Tabela">
    <div class="title">Tempo médio gasto por card</div>
    <DataTable
      :value="lifetimeData"
      class="tabela-src"
      removableSort
      stripedRows
      scrollable
      scrollHeight="200px"
    >
      <Column field="descricao" header="User Story" sortable />
      <Column field="tempoMedio" header="Tempo Médio (horas)" sortable>
        <template #body="{ data }">
          <b>{{ data.tempoMedio }}</b> horas
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column    from 'primevue/column';

export default {
  name: 'LifetimeCardTable',
  components: { DataTable, Column },
  props: {
    lifetimeData: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.Tabela {
  padding: 20px;
  border: 1px solid #5739b4;
  border-radius: 12px;
  background: #fff;
}
.title {
  color: black;
  margin-bottom: 1em;
}
.tabela-src {
  background-color: #fff;
}
</style>
