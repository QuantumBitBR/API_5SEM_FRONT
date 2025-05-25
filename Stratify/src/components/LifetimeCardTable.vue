<template>
  <div class="Tabela">
    <div class="lifetime_header">
      <div class="title">Tempo médio gasto por card</div>
      <CSVButton exportType="tempomedio" :projectId="selectedProject?.id" :userId="selectedUser?.idUsuario"/>
    </div>
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
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import CSVButton from './CSVButton.vue';

export default {
  name: 'LifetimeCardTable',
  components: { DataTable, Column, CSVButton },
  props: {
    lifetimeData: {
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
/* .title {
  color: black;
  margin-bottom: 1em;
} */
.lifetime_header{
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}
.tabela-src {
  background-color: #fff;
}
</style>
