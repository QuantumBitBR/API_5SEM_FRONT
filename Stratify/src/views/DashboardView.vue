<template>
  <div class="card">
    <!-- <Menubar :model="items" /> -->
    <SelectProject @project-selected="handleProjectSelection"/>
    <div class="QuantitativeCards">
      <!-- quando quiser inserir mais cards, poderá adicionar os cards aqui para manter estilização correta. -->
      <TotalCards />
      <TotalCards />
      <TotalCards />
    </div>
    <div class="grid-container">
      <DonutChart/>
      <TagTable :selectedProject="selectedProject"/>
      <DonutChart/>
      <DonutChart/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Menubar } from "primevue";
import TagTable from "../components/TagTable.vue";
import TotalCards from "@/components/TotalCards.vue";
import SelectProject from "@/components/SelectProject.vue";
import DonutChart from "@/components/DonutChart.vue";

const selectedProject = ref(null);

const handleProjectSelection = (project) => {
    selectedProject.value = project;
};
const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
  },
  {
    label: "Projects",
    icon: "pi pi-briefcase",
  },
  {
    label: "Time",
    icon: "pi pi-users",
  },
  {
    label: "Sair",
    icon: "pi pi-sign-out",
  },
]);
</script>

<style scoped>
.grid-container{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  padding: 20px;
  grid-template-columns: 2fr 1fr;
}


.card {
  position: relative;
}
.QuantitativeCards {
  display: flex;
  box-sizing: border-box;
  justify-content: right; /* horizontal aligment*/
  align-items: center; /* vertical aligment*/
  gap: 1.3em;
  margin-top: 2em;
}
.tagDash {
  display: flex;
  box-sizing: border-box;
  justify-content: right; /* horizontal aligment*/
  align-items: center; /* vertical aligment*/
  gap: 1.3em;
  margin-top: 2em;
}
</style>
