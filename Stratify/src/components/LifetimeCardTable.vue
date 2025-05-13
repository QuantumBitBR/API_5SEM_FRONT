<template>
  <div class="Tabela">
    <Toast />
    <div class="title">Tempo médio gasto por card</div>
    <DataTable :value="dadosTabela" class="tabela-src" removableSort showGridlines stripedRows scrollable scrollHeight="200px">

      <Column field="nomeUserStory" header="User Story" sortable />


      <Column field="tempoMedio" header="Tempo Médio (horas)" sortable>
        <template #body="{ data }">
          <b>{{ data.tempoMedio }}</b> horas
        </template>
      </Column>
    </DataTable>



  </div>
</template>

<script>
import Toast from 'primevue/toast';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import LifeTimeService from '@/services/lifeTimeService.ts';

export default {
  components: {
    Toast,
    Column,
    DataTable,
  },
  props: {
    selectedProject: Object,
    selectedUser: Object,
  },
  data() {
    return {
      dadosTabela: [],
    };
  },
  watch: {
    selectedProject: "fetchChartData",
    selectedUser: "fetchChartData",
  },
  mounted() {
    this.fetchChartData();
  },
  methods: {
    async fetchChartData() {
      try {
        if (!this.selectedProject || !this.selectedUser) {
          console.warn("Nenhum projeto ou usuário selecionado.");
          return;
        }

        const dados = await LifeTimeService.quantityPerProject(
          this.selectedProject.id,
          this.selectedUser.idUsuario
        );
        console.log("Dados recebidos:", dados);
        if (dados && Array.isArray(dados)) {
          this.dadosTabela = dados.map(item => ({
            nomeUserStory: item.descricao,
            tempoMedio: item.tempoMedio,
          }));
        } else {
          console.warn("Dados retornados não estão no formato esperado.");
        }
      } catch (error) {
        console.error("Erro ao buscar os dados.", error);
      }
    },
  },
};
</script>

<style scoped>
.Tabela {
  padding: 20px;
  border: 1px solid #5739b4;
  border-radius: 12px;
}

.tabela-src {
  background-color: #fff;
}

.loading-text {
  text-align: center;
  font-size: 1rem;
  color: #101010;

}
.title{color:black;}
</style>
