<template>
  <div class="donut_container">
    <h4 class="donut_title">Status dos cards</h4>
    <Chart type="doughnut" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import StatusService from "@/services/StatusService";
import Chart from "primevue/chart";

export default {
  components: { Chart },
  props: {
    selectedProject: null,
    selectedUser: null,
  },
  data() {
    return {
      chartData: {
        // labels: ["A", "B", "C"],
        labels: [],
        datasets: [
          {
            // data: [30,20,50],
            data: [],
            backgroundColor: ["#071952", "#5739B4", "#C6B7F4", "#2D9596", "#145DA0", "#1F6E8C"],
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
                    index: i,
                  };
                });
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                let dataset = tooltipItem.dataset;
                let total = dataset.data.reduce((acc, val) => acc + val, 0);
                let value = dataset.data[tooltipItem.dataIndex];
                let percentage = ((value / total) * 100).toFixed(1) + "%";
                return `${tooltipItem.label}: ${percentage}`;
              },
            },
          },
        },
      },
    };
  },
  methods: {
    async fetchCards() {
      try {
        const response = await StatusService.quantityPerStatus(this.selectedProject.id, this.selectedUser.idUsuario);
        this.chartData.labels = response.map((item) => {
          const status = item.nomeStatus;
          return status;
        });
        this.chartData.datasets[0].data = response.map((item) => item.percentual);
      } catch (error) {
        console.error("Error to find data:", error);
      }
    },
  },
  watch: {
    selectedProject: "fetchCards",
    selectedUser: "fetchCards",
  },
  mounted() {
    if (this.selectedProject) {
      this.fetchCards();
    }
  },
};
</script>

<style lang="css" scoped>
.donut_container {
    display: flex;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    padding: 30px;
    height: 300px;
    border: 1px solid #5739B4;
    border-radius: 12px;
}
.donut_title {
  padding: 5px;
  padding-bottom: 40px;
}
</style>
