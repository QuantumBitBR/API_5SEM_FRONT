<template>
  <Card class="custom-card">
    <template #content>
      <h3 class="title">Tempo de vida de cards</h3>
      <p class="subtitle"> <span>Tempo que um card permanece ativo sem ser concluído</span></p>
      <Chart v-if="chartData.datasets[0].data.length" type="bar" :data="chartData" :options="chartOptions" class="chart"/>
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
        labels: [], // Eixo X (Dias)
        datasets: [
          {
            label: "Dias ",
            backgroundColor: "#5aa17e",
            borderRadius: 10,
            data: [], // Eixo Y (Valores)
          },
        ],
      },
      chartOptions: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: "#666" } },
          y: { ticks: { color: "#666" } },
        },
      },
    };
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await axios.get("http://localhost:8080/tempo-gasto"); // API endpoint
        const dados = response.data;

        this.chartData.labels = dados.map(item => item.label); // Define os labels (X)
        this.chartData.datasets[0].data = dados.map(item => item.valor); // Define os valores (Y)
      } catch (error) {
        console.error("Erro ao buscar os dados. Usando mock:", error);

        // Mock de dados para teste
        const mockData = [
          { label: "card1", valor: 5 },
          { label: "card2", valor: 10 },
          { label: "card3", valor: 8 },
          { label: "card3", valor: 15 },
          { label: "card4", valor: 4 },
          { label: "card5", valor: 12 }
        ];

        this.chartData.labels = mockData.map(item => item.label);
        this.chartData.datasets[0].data = mockData.map(item => item.valor);
      }
    }
  },
  mounted() {
    this.fetchChartData(); // Busca os dados ao carregar
  }
};
</script>

<style scoped>
.custom-card {
  width: 400px;
  padding: 15px;
  border-radius: 10px;
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
