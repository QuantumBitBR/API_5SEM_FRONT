<template>
  <div class="Tabela">
    <div class="title">Tempo médio gasto por card</div>
    <DataTable
      :value="lifetimeData"
      class="tabela-src"
      removableSort
      stripedRows
      scrollable
      :scrollHeight="scrollHeightValue"
    >
      <Column field="descricao" header="User Story" sortable />
      <Column field="tempoMedio" header="Tempo Médio (horas)" sortable>
        <template #body="{ data }">
          <b>{{ data.tempoMedio }}</b> horas
        </template>
      </Column>
      <Column field="quantidadeRetrabalhos" header="Contagem de Retrabalho" sortable></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: 'LifetimeCardTable',
  components: { DataTable, Column },
  props: {
    lifetimeData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      scrollHeightValue: window.innerWidth <= 768 ? '400px' : '200px'
    };
  },
  mounted() {
    window.addEventListener('resize', this.updateScrollHeight);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScrollHeight);
  },
  methods: {
    updateScrollHeight() {
      this.scrollHeightValue = window.innerWidth <= 768 ? '400px' : '200px';
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
