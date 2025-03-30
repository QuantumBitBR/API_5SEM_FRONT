<template>
  <Card class="p-4 text-white custom-card" id="AverageTime" @click="fetchAverageTime">
    <template #content>
      <div class="text-sm">Média total de horas:</div>
      <div class="text-3xl font-bold">{{ averageTime }}</div>
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
  },
  data() {
    return {
      averageTime: "---",
    };
  },
  methods: {
    async fetchAverageTime() {
        try {
          const data = await AverageTimeService.getAverageTime(this.selectedProject.id);
          this.averageTime = data.tempoMedio ? parseFloat(data.tempoMedio.toFixed(1)) : "---";
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
}
</style>
