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
        <TagTable :selectedProject="selectedProject" class="tagDash" />
        <DonutChart :selectedProject="selectedProject"/>
        <LifetimeCardTable :selectedProject="selectedProject" class="lifetimeTable" />
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
import LifetimeCardTable from "@/components/LifetimeCardTable.vue";

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

.card {
  position: relative;
  transition: padding-left 0.3s ease;
  padding-left: 3em;
}

.sidebar-open {
  padding-left: 12em;
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
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  padding: 20px;
}


.lifetimeTable {
    display: flex;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    padding: 30px;
    height: 300px;
}

.responsive-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
