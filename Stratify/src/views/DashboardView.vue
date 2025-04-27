<template>
  <div class="app-container">
    <Navbar/>
    <div class="card">
      <SelectProject @project-selected="handleProjectSelection" @user-selected="handleUserSelection"/>
      <div class="QuantitativeCards">
        <TotalCards :selectedProject="selectedProject" :selectedUser="selectedUser"/>
        <AverageTimeCard :selectedProject="selectedProject" :selectedUser="selectedUser" />
      </div>
      <div class="grid-container1">
        <TimelineChart :selectedProject="selectedProject" :selectedUser="selectedUser" class="grid_item"/>
        <TagTable :selectedProject="selectedProject" :selectedUser="selectedUser" class="grid_item" />
      </div>
      <div class="grid-container2">
        <DonutChart :selectedProject="selectedProject" :selectedUser="selectedUser" class="grid_item"/>
        <LifetimeCardTable :selectedProject="selectedProject" :selectedUser="selectedUser" id="lifetimeTable" class="grid_item"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TagTable from "../components/TagTable.vue";
import TotalCards from "@/components/TotalCards.vue";
import AverageTimeCard from "@/components/AverageTimeCard.vue";
import SelectProject from "@/components/SelectProject.vue";
import DonutChart from "@/components/DonutChart.vue";
import Navbar from "@/components/Navbar.vue";
import LifetimeCardTable from "@/components/LifetimeCardTable.vue";
import TimelineChart from "@/components/TimelineChart.vue";

const selectedProject = ref(null);
const selectedUser = ref(null);

const handleProjectSelection = (project) => {
  selectedProject.value = project;
};

const handleUserSelection = (project) => {
  selectedUser.value = project;
};

</script>

<style scoped>

.card {
  position: relative;
  transition: padding-left 0.3s ease;
  padding: 0 2em 0 2em
}

.QuantitativeCards {
  display: flex;
  box-sizing: border-box;
  justify-content: right;
  align-items: center;
  gap: 1.3em;
  margin-top: 2em;
}

.grid-container1 {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: 1fr;
  gap: 10px;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 0;
}

.grid-container2 {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  grid-template-rows: 1fr;
  gap: 10px;
  width: 100%;
  padding: 20px 0;
}

#lifetimeTable {
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

.template_dash{
  background-color: #fff;
}
</style>
