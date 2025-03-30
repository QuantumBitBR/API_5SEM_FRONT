<template>
  <div class="custom-card">
    <h4 class="lifetime_title">Tempo médio gasto por card</h4>
    <Chart v-if="chartData.datasets[0].data.length" type="bar" :data="chartData" :options="chartOptions" class="chart" />
    <p v-else class="loading-text">Carregando dados...</p>
  </div>
</template>

<script>
import Chart from "primevue/chart";
import LifeTimeService from "@/services/lifeTimeService.ts";

export default {
  components: { Chart },
  props: {
    selectedProject: Object,
  },
  data() {
    return {
      chartData: {
        labels: [], 
        datasets: [
          {
            label: "Tempo Gasto",
            backgroundColor: "#071952",
            borderRadius: 10,
            data: [], 
            labels: [] 
          },
        ],
      },
      chartOptions: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const index = context.dataIndex;
                return `${context.dataset.labels[index]}: ${context.raw} horas`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Tempo Gasto (horas)",
              color: "#333",
              font: {
                size: 14,
                weight: "bold"
              }
            },
            ticks: { color: "#666" }
          },
          y: {
            title: {
              display: true,
              text: "ID User Stories",
              color: "#333",
              font: {
                size: 14,
                weight: "bold"
              }
            },
            ticks: {
              color: "#666",
              stepSize: 1
            }
          }
        }
      },
    };
  },
  methods: {
    async fetchChartData() {
      if (!this.selectedProject || this.selectedProject.id === undefined) return;
      try {
        const dados = await LifeTimeService.quantityPerProject(this.selectedProject);
        if (dados) {
          this.chartData.labels = dados.map(item => item.idUserStory); 
          this.chartData.datasets[0].data = dados.map(item => item.tempoMedio);
          this.chartData.datasets[0].labels = dados.map(item => item.descricao); 
        }
      } catch (error) {
        console.error("Erro ao buscar os dados.", error);
      }
    }
  },
  watch: {
    selectedProject: "fetchChartData"
  },
  mounted() {
    this.fetchChartData();
  }
};
</script>

<style scoped>
.custom-card {
  max-width: 500px;
  height: 300px;
  padding: 0px;
  margin: 0px;
  border-radius: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

.lifetime_title{
  padding: 5px;
  padding-bottom: 40px;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.subtitle {
  font-size: 1rem;
  color: #0088cc;
}

.chart {
  height: 200px;
}

.loading-text {
  text-align: center;
  font-size: 1rem;
  color: #999;
}
</style>
