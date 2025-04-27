<template>
  <Card class=" text-white custom-card" id="AverageTime" @click="fetchAverageTime">
    <template #content>
      <div class="text-sm">Média total de horas:</div>
      <div class="total_number">{{ averageTime }}</div>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";
import AverageTimeService from "@/services/AverageTimeService";

export default {
  components: { Card },
  props: {
    selectedProject: Object,
    userSelected: Object,
  },
  data() {
    return {
      averageTime: "---",
    };
  },
  methods: {
    async fetchAverageTime() {
        try {
          const data = await AverageTimeService.getAverageTime(this.selectedProject.id, this.userSelected.usuarioId);
          if(data !== undefined){
            this.averageTime = data.tempoMedio ? parseFloat(data.tempoMedio.toFixed(1)) : "---";
          }else{
            this.averageTime = "---"
          }
        } catch (error) {
          console.error("Error fetching average time:", error);
          this.averageTime = "---";
        }
      },
  },
  watch: {
    selectedProject: "fetchAverageTime",
  },
  mounted() {
    if (this.selectedProject) {
        this.fetchAverageTime();
    }
  },
};
</script>

<style scoped>
.custom-card {
  background: #fff;
  border-radius: 0;
  color: black;
  width: 100%;
  height: 7em;
  border: 1px solid #5739B4;
  border-radius: 12px;
}

.total_number{
  font-weight: 600;
  font-size: 2em;
}
</style>
