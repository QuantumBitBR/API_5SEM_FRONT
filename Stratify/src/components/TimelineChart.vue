<template>
    <div class="bar_container">
      <h4 class="bar_title">Evolução da criação e finalização de cards</h4>
      <Chart type="bar" :data="chartData" :options="chartOptions"/>
    </div>
  </template>
  
  <script>
  import TimelineService from "@/services/TimelineService";
  import Chart from "primevue/chart";
  
  export default {
    components: { Chart },
    props: {
      selectedProject: Object,
      userSelected: Object,
    },
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Criados",
              data: [],
              backgroundColor: "#5739B4",
            },
            {
              label: "Finalizados",
              data: [],
              backgroundColor: "#071952",
            },
          ],
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
          x: {
            title: {
              display: true,
              text: "Períodos",
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
        },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
        },
      };
    },
    methods: {
      async fetchTimelines(project) {
        try {
          const response = await TimelineService.quantityPerTimeline(project);

          // const response = [
          //   { periodo: "Jan", quantidadeCriadas: 5, quantidadeFinalizadas: 2 },
          //   { periodo: "Fev", quantidadeCriadas: 8, quantidadeFinalizadas: 6 },
          //   { periodo: "Mar", quantidadeCriadas: 6, quantidadeFinalizadas: 4 },
          //   { periodo: "Abr", quantidadeCriadas: 10, quantidadeFinalizadas: 9 },
          // ];

          if (response && Array.isArray(response)) {
            this.chartData.labels = response.map((item) => {
              const periodo = item.periodo;
              return periodo.charAt(0).toUpperCase() + periodo.slice(1).toLowerCase();
            });
            this.chartData.datasets[0].data = response.map((item) => item.quantidadeCriadas);
            this.chartData.datasets[1].data = response.map((item) => item.quantidadeFinalizadas);
          } else {
            console.error("Formato inesperado da resposta:", response);
          }
        } catch (error) {
          console.error("Error to find data:", error);
        }
      },
    },
    mounted() {
      if (this.selectedProject) {
        this.fetchTimelines(this.selectedProject, this.userSelected);
      }
    },
    watch: {
      selectedProject(newProject) {
        if (newProject) {
          this.fetchTimelines(newProject);
        }
      },
    },
  };
  </script>
  
  <style lang="css" scoped>
  .bar_container {
    display: flex;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    padding: 30px;
    height: 400px;
    border: 1px solid #5739B4;
    border-radius: 12px;
  }
  .bar_title {
    padding: 5px;
    padding-bottom: 20px;
  }

  .p-chart{
    height: 300px;
  }
  </style>
  