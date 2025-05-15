<template>
  <div class="app-container">
    <Navbar/>
    <div class="card">
      <SelectProject
        @project-selected="handleProjectSelection"
        @user-selected="handleUserSelection"
      />

      <div class="QuantitativeCards">
        <template v-if="quantStore.loadingAverageTime">
          <!-- Skeletons para TotalCards e AverageTimeCard -->
          <Skeleton width="100%" height="7em" class="mr-4" />
          <Skeleton width="100%" height="7em" />
        </template>
        <template v-else>
          <TotalCards
            :selectedProject="selectedProject"
            :selectedUser="selectedUser"
          />
          <AverageTimeCard
            :selectedProject="selectedProject"
            :selectedUser="selectedUser"
            :averageTime="quantStore.averageTime"
          />
        </template>
      </div>

      <div class="grid-container1">
        <TimelineChart
          :selectedProject="selectedProject"
          :selectedUser="selectedUser"
          class="grid_item"
        />
        <TagTable
          :selectedProject="selectedProject"
          :selectedUser="selectedUser"
          class="grid_item"
        />
      </div>

      <div class="grid-container2">
        <DonutChart
          :selectedProject="selectedProject"
          :selectedUser="selectedUser"
          class="grid_item"
        />
        <LifetimeCardTable
          :selectedProject="selectedProject"
          :selectedUser="selectedUser"
          id="lifetimeTable"
          class="grid_item"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useQuantitativeStore } from '@/stores/QuantitativeCardsStorage';
import Navbar from '@/components/Navbar.vue';
import SelectProject from '@/components/SelectProject.vue';
import TotalCards from '@/components/TotalCards.vue';
import AverageTimeCard from '@/components/AverageTimeCard.vue';
import TimelineChart from '@/components/TimelineChart.vue';
import TagTable from '@/components/TagTable.vue';
import DonutChart from '@/components/DonutChart.vue';
import LifetimeCardTable from '@/components/LifetimeCardTable.vue';
import Skeleton from 'primevue/skeleton';
import Cookies from 'js-cookie';

const selectedProject = ref(null);
const selectedUser = ref(null);
const role = ref(null);

const quantStore = useQuantitativeStore();

function handleProjectSelection(project) {
  selectedProject.value = project;
}

function handleUserSelection(user) {
  selectedUser.value = user;
}

watch(
  [selectedProject, selectedUser],
  ([proj, usr]) => {
    quantStore.fetchAverageTime(proj?.id, usr?.idUsuario);
  },
  { immediate: true }
);

onMounted(() => {
  role.value = Cookies.get('RoleCookie') || null;
});
</script>

<style scoped>
.card {
  position: relative;
  transition: padding-left 0.3s ease;
  padding: 0 2em;
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
  gap: 10px;
  width: 100%;
  padding: 20px 0 0;
}

.grid-container2 {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
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

.template_dash {
  background-color: #fff;
}

.skeleton-card {
  width: 12em;           /* mesmo width que antes */
  height: 7em;           /* mesmo height que os cards */
  background-color: #fff;/* fundo branco */
  border: 1px solid #5739B4;
  border-radius: 12px;
}

/* margem igual ao mr-4 que criamos */
.mr-4 {
  margin-right: 1em;
}

</style>
