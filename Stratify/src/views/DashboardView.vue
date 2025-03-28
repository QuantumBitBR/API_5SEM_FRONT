<template>
  <div class="app-container">
    <Sidebar @toggle="handleSidebarToggle" />
    <div class="card" :class="{ 'sidebar-open': isSidebarOpen }">
      <!-- <Menubar :model="items" /> -->
      <SelectProject @project-selected="handleProjectSelection" />
      <div class="QuantitativeCards">
        <TotalCards />
        <TotalCards />
        <TotalCards />
      </div>
      <div class="grid-container">
        <span>In development</span>
        <TagTable :selectedProject="selectedProject" />
        <DonutChart />
        <span>In development</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TagTable from "../components/TagTable.vue";
import TotalCards from "@/components/TotalCards.vue";
import SelectProject from "@/components/SelectProject.vue";
import DonutChart from "@/components/DonutChart.vue";
import Sidebar from "@/components/Sidebar.vue";

const selectedProject = ref(null);
const isSidebarOpen = ref(false);

const handleProjectSelection = (project) => {
  selectedProject.value = project;
};

const handleSidebarToggle = (isOpen) => {
  isSidebarOpen.value = isOpen;
};
</script>

<style scoped>
.app-container {
  display: flex;
}

.card {
  position: relative;
  transition: padding-left 0.3s ease;
  padding-left: 3em; /* Sidebar aberto */
}

.sidebar-open {
  padding-left: 12em; /* Sidebar fechado */
}

.QuantitativeCards {
  display: flex;
  box-sizing: border-box;
  justify-content: right;
  align-items: center;
  gap: 1.3em;
  margin-top: 2em;
}

.grid-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  padding: 20px;
}
</style>
