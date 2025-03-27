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
import axios from "axios";
import Card from "primevue/card";
import Chart from "primevue/chart";

export default {
  components: { Card, Chart },
  data() {
    return {
      chartData: {
        labels: [], // Eixo Y (Numérico)
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
      try {
        const response = await axios.get("http://localhost:8080/tempo-gasto");
        const dados = response.data; // Exemplo: [{ label: "Task A", valor: 5 }, { label: "Task B", valor: 10 }]

        this.chartData.labels = dados.map((_, index) => index + 1); // Índices numéricos no eixo Y
        this.chartData.datasets[0].data = dados.map(item => item.valor);
        this.chartData.datasets[0].labels = dados.map(item => item.label); // Labels para tooltip
      } catch (error) {
        console.error("Erro ao buscar os dados. Usando mock:", error);

        // Mock de dados para teste
        const mockData = [
          { label: "Task aasdaisjdnaioksdniasdjoaisjdoiadonefoinqnoaoni", valor: 5 },
          { label: "Task B", valor: 10 },
          { label: "Task C", valor: 8 },
          { label: "Task D", valor: 15 },
          { label: "Task E", valor: 4 },
          { label: "Task F", valor: 12 }
        ];

        this.chartData.labels = mockData.map((_, index) => index + 1);
        this.chartData.datasets[0].data = mockData.map(item => item.valor);
        this.chartData.datasets[0].labels = mockData.map(item => item.label);
      }
    }
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
