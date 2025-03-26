<template>
  <div class="card">
    <Menubar :model="items" />
    <SelectProject @project-selected="handleProjectSelection"/>
    <div class="QuantitativeCards">
      <!-- quando quiser inserir mais cards, poderá adicionar os cards aqui para manter estilização correta. -->
      <TotalCards />
    </div>
    <div class="tagDash">
        <TagTable :selectedProject="selectedProject"/>
    </div>

    <div class="lifetimeTable">
      <LifetimeCardTable :selectedProject="selectedProject"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Menubar } from "primevue";
import TagTable from "../components/TagTable.vue";
import TotalCards from "@/components/TotalCards.vue";
import SelectProject from "@/components/SelectProject.vue";
import LifetimeCardTable from "@/components/LifetimeCardTable.vue";

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
