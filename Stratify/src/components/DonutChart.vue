<template>
  <div class="donut_container">
    <h2 class="donut_title">Status dos cards</h2>
    <Chart type="doughnut" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import StatusService from "@/services/StatusService";
import Chart from "primevue/chart";

export default {
  components: { Chart },
  props: {
    selectedProject: {
      type: String,
      default: null,
    },
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
    async fetchCards(project) {
      try {
        this.chartData = {
          labels: response.map((item) => item.status),
          datasets: [
            {
              data: response.map((item) => item.quantity),
              backgroundColor: ["#94E9B8", "#92BFFF", "#6F98F0"],
            },
          ],
        };
      } catch (error) {
        console.error("Error to find data:", error);
      }
    },
  },
  mounted() {
    if (this.selectedProject) {
      this.fetchCards(this.selectedProject);
    }
  },
  watch: {
    selectedProject(newProject) {
      if (newProject) {
        this.fetchCards(newProject);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.donut_container {
  width: 600px;
}
.donut_title {
  color: #00c7be;
  font-weight: 500;
  padding: 5px;
}
</style>
