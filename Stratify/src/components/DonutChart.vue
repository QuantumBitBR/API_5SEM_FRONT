<!-- components/DonutChart.vue -->
<template>
  <div class="donut_container">
    <div class="donut_header">
      <h4 class="donut_title">Status dos cards</h4>
      <CSVButton v-if="chartData.labels.length != 0" exportType="cardsporstatus" :projectId="selectedProject?.id"
        :userId="selectedUser?.idUsuario" />
    </div>
    <template v-if="chartData.labels.length != 0">
      <Chart type="doughnut" :data="chartData" :options="chartOptions" />
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
  name: 'DonutChart',
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
  },
  mounted() {
    console.log(this.chartData)
  }
};
</script>

<style scoped>
#no-text {
  display: flex;
  justify-content: center;
  height: 80%;
  align-content: center;
  align-items: center;
  color: #666;
  font-style: italic;
  text-align: center;
}

.donut_header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.donut_container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #5739B4;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  height: 300px;
}

.p-chart {
  height: 250px !important;
}

@media (max-width: 768px) {
  .donut_container {
    width: 83vw;
    margin: 0 auto;
  }
}
</style>
