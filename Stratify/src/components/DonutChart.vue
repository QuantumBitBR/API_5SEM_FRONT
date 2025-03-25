<template>
  <div class="donut_container">
    <h2 class="donut_title">Status dos cards</h2>
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
            backgroundColor: ["#94E9B8", "#92BFFF", "#6F98F0"],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "right",
            labels: {
              generateLabels: (chart) => {
                let dataset = chart.data.datasets[0];
                let total = dataset.data.reduce((acc, val) => acc + val, 0);
                return chart.data.labels.map((label, i) => {
                  let value = dataset.data[i];
                  let percentage = ((value / total) * 100).toFixed(1) + "%";
                  return {
                    text: `${label}: ${percentage}`,
                    fillStyle: dataset.backgroundColor[i],
                    hidden: false,
                    index: i
                  };
                });
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                let dataset = tooltipItem.dataset;
                let total = dataset.data.reduce((acc, val) => acc + val, 0);
                let value = dataset.data[tooltipItem.dataIndex];
                let percentage = ((value / total) * 100).toFixed(1) + "%";
                return `${tooltipItem.label}: ${percentage}`;
              }
            }
          }
        }
      },
    };
  }
};
</script>

<style lang="css" scoped>
  .donut_container{
    width: 600px;
  }
  .donut_title{
    color: #00C7BE;
    font-weight: 500;
    padding: 5px;
  }
</style>
