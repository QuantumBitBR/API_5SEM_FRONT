<!-- components/DonutChart.vue -->
<template>
  <div class="donut_container">
    <h4 class="donut_title">Status dos cards</h4>
    <Chart type="doughnut" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import Chart from 'primevue/chart';

export default {
  name: 'DonutChart',
  components: { Chart },
  props: {
    chartData:    { type: Object, required: true },
    chartOptions: { type: Object, required: true }
  }
};
</script>

<style scoped>
.donut_container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #5739B4;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  padding: 30px;
  height: 300px;
}
.donut_title {
  margin-bottom: 40px;
}
.p-chart { height: 250px !important; }
</style>
