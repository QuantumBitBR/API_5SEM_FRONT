<template>
  <Card class="custom-card">
    <template #content>
      <h3 class="title">Grafico 4</h3>
      <p class="subtitle"> <span>Tempo Gasto por Card</span></p>
      <Chart v-if="chartData.datasets[0].data.length" type="bar" :data="chartData" :options="chartOptions"
        class="chart" />
      <p v-else class="loading-text">Carregando dados...</p>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";
import Chart from "primevue/chart";
import LifeTimeService from "@/services/lifeTimeService.ts";

export default {
  components: { Card, Chart },
  props: {
    selectedProject: Object,
  },
  data() {
    return {
      chartData: {
        labels: [], // Eixo Y (id ou numérico)
        datasets: [
          {
            label: "Tempo Gasto",
            backgroundColor: "#5aa17e",
            borderRadius: 10,
            data: [], // Valores numéricos para o eixo Y
            labels: [] // Rótulos para tooltip
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
          x: { ticks: { color: "#666" } },
          y: {
            ticks: {
              color: "#666",
              stepSize: 1, // Mantém numérico
            },
          },
        },
      },
    };
  },
  methods: {
    async fetchChartData() {
      if (!this.selectedProject || this.selectedProject.id === undefined) return;
      try {
        const dados = await LifeTimeService.quantityPerProject(this.selectedProject);
        if (dados) {
          this.chartData.labels = dados.map(item => item.idUserStory); // Usa id ou sequência numérica
          this.chartData.datasets[0].data = dados.map(item => item.tempoMedio);
          this.chartData.datasets[0].labels = dados.map(item => item.descricao); // Labels para tooltip
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
  width: 35vw;
  height: 30vh;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
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
