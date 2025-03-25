<template>
  <div>
    <Chart type="doughnut" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>

import Chart from 'primevue/chart';


export default {
  components: { Chart },
  data() {
    return {
      chartData: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            data: [30, 50, 20],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
