<template>
  <div class="bar_container">
    <div class="timeline_header">
      <h4 class="bar_title">Evolução da criação e finalização de cards</h4>
      <CSVButton v-if="chartData.labels.length != 0" exportType="cardsporperiodo" :projectId="selectedProject?.id" :userId="selectedUser?.idUsuario"/>
    </div>
    <template v-if="chartData.labels.length != 0">
      <Chart type="bar" :data="chartData" :options="chartOptions"/>
    </template>
    <template v-else>
      <h4 id="no-text">Nenhum dado encontrado para os filtros selecionados</h4>
    </template>
  </div>
</template>

<script>
import Chart from 'primevue/chart';
import CSVButton from './CSVButton.vue';

export default {
  name: 'TimelineChart',
  components: { Chart, CSVButton },
  props: {
    chartData: { type: Object, required: true },
    chartOptions: { type: Object, required: true },
    selectedUser: {
      type: Object,
      default: 0
    },
    selectedProject: {
      type: Object,
      default: 0
    },
  }
};
</script>

<style scoped>
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
  .bar_container {
    width: 83vw;
    margin: 0 auto;
  }
}
.bar_container {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #5739B4;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  padding: 30px;
  height: 400px;
}
.timeline_header{
    display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}
.p-chart { height: 300px !important; }
</style>
