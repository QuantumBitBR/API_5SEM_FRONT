<template>
  <div class="bar_container">
    <CSVButton/>
    <h4 class="bar_title">Evolução da criação e finalização de cards</h4>
    <Chart type="bar" :data="chartData" :options="chartOptions"/>
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
    chartOptions: { type: Object, required: true }
  }
};
</script>

<style scoped>

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
.bar_title {
  margin-bottom: 20px;
}
.p-chart { height: 300px !important; }
</style>
