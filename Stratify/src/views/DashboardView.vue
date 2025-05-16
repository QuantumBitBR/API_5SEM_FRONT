<template>
  <div class="app-container">
    <Navbar/>
    <div class="card">
      <SelectProject
        @project-selected="handleProjectSelection"
        @user-selected="handleUserSelection"
      />

      <!-- Quantitative Cards -->
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

      <!-- Grid 1: Timeline + TagTable -->
      <div class="grid-container1">
        <template v-if="chartStore.loadingTimeline">
          <Skeleton  width="100%" height="400px" class="skeleton-chart" />
          <Skeleton  width="100%" height="400px" class="skeleton-chart" />
        </template>
        <template v-else>
          <TimelineChart
            :chartData="chartData"
            :chartOptions="chartOptions"
            class="grid_item"
          />
          <TagTable
            :selectedProject="selectedProject"
            :selectedUser="selectedUser"
            class="grid_item"
          />
        </template>
      </div>

      <!-- Grid 2: Donut + Lifetime -->
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
import { ref, watch, onMounted, computed } from 'vue';
import { useQuantitativeStore } from '@/stores/QuantitativeCardsStorage';       // seu store de cards
import { useChartStore }       from '@/stores/ChartStorage';       // o novo store só de gráficos
import Navbar                  from '@/components/Navbar.vue';
import SelectProject           from '@/components/SelectProject.vue';
import TotalCards              from '@/components/TotalCards.vue';
import AverageTimeCard         from '@/components/AverageTimeCard.vue';
import TimelineChart           from '@/components/TimelineChart.vue';
import TagTable                from '@/components/TagTable.vue';
import DonutChart              from '@/components/DonutChart.vue';
import LifetimeCardTable       from '@/components/LifetimeCardTable.vue';
import Skeleton                from 'primevue/skeleton';
import Cookies                 from 'js-cookie';

const selectedProject = ref(null);
const selectedUser    = ref(null);
const role            = ref(null);

const quantStore = useQuantitativeStore();
const chartStore = useChartStore();

function handleProjectSelection(proj) {
  selectedProject.value = proj;
}

function handleUserSelection(usr) {
  selectedUser.value = usr;
}

// dispara todos os fetches de uma vez, inclusive timeline
watch(
  [selectedProject, selectedUser],
  ([proj, usr]) => {
    const pid = proj?.id ?? 0;
    const uid = usr?.idUsuario ?? 0;
    quantStore.fetchAverageTime(pid, uid);
    quantStore.fetchTotalCards(pid, uid);
    chartStore.fetchTimeline(pid, uid);
  },
  { immediate: true }
);

onMounted(() => {
  role.value = Cookies.get('RoleCookie') || null;
});

// monta os dados para o TimelineChart
const chartData = computed(() => {
  const labels = chartStore.timelineData.map(item =>
    item.periodo.charAt(0).toUpperCase() + item.periodo.slice(1).toLowerCase()
  );
  return {
    labels,
    datasets: [
      { label: 'Criados',     data: chartStore.timelineData.map(i => i.quantidadeCriadas),     backgroundColor: '#5739B4' },
      { label: 'Finalizados', data: chartStore.timelineData.map(i => i.quantidadeFinalizadas), backgroundColor: '#071952' },
    ]
  };
});

// opções fixas de configurações do chart
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: { display: true, text: 'Períodos', color: '#333', font: { size: 14, weight: 'bold' } },
      ticks: { color: '#666' }
    },
    y: {
      title: { display: true, text: 'ID User Stories', color: '#333', font: { size: 14, weight: 'bold' } },
      ticks: { color: '#666', stepSize: 1 }
    }
  },
  plugins: {
    legend: { display: true, position: 'top' },
    tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.raw}` } }
  }
};
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
