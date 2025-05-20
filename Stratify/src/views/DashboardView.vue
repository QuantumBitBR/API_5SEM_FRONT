<template>
  <div class="app-container">
    <Navbar />
    <div class="card">
      <SelectProject @project-selected="handleProjectSelection" @user-selected="handleUserSelection" />

      <div class="QuantitativeCards">
        <template v-if="quantStore.loadingAverageTime && quantStore.loadingTotalCards">
          <Skeleton width="100%" height="7em" class="mr-4" />
          <Skeleton width="100%" height="7em" />
        </template>
        <template v-else>
          <TotalCards :selectedProject="selectedProject" :selectedUser="selectedUser" />
          <AverageTimeCard :selectedProject="selectedProject" :selectedUser="selectedUser"
            :averageTime="quantStore.averageTime" />
        </template>
      </div>

      <div class="grid-container1">
        <template v-if="chartStore.loadingTimeline && chartStore.loadingTags">
          <Skeleton width="100%" height="400px" class="skeleton-chart" />
          <Skeleton width="100%" height="400px" class="skeleton-chart" />
        </template>
        <template v-else>
          <TimelineChart :chartData="chartData" :chartOptions="chartOptions" class="grid_item" />
          <TagTable :tags="chartStore.tags" class="grid_item" />
        </template>
      </div>

      <div class="grid-container2">
        <template v-if="chartStore.loadingStatus && chartStore.loadingLifetime">
          <Skeleton class="skeleton-donut" width="100%" height="300px" />
          <Skeleton class="skeleton-table" width="100%" height="300px"/>
        </template>
        <template v-else>
          <DonutChart :chartData="donutData" :chartOptions="donutOptions" class="grid_item" />
          <LifetimeCardTable
            :lifetimeData="chartStore.lifetimeData"
            class="grid_item"
          />
        </template>

      </div>
      <div class="grid-container3">
        <SprintsChart :selectedProject="selectedProject" :selectedUser="selectedUser" class="sprints-chart-container"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useQuantitativeStore } from '@/stores/QuantitativeCardsStorage';
import { useChartStore } from '@/stores/ChartStorage';
import Navbar from '@/components/Navbar.vue';
import SelectProject from '@/components/SelectProject.vue';
import TotalCards from '@/components/TotalCards.vue';
import AverageTimeCard from '@/components/AverageTimeCard.vue';
import TimelineChart from '@/components/TimelineChart.vue';
import TagTable from '@/components/TagTable.vue';
import SprintsChart from "@/components/SprintsChart.vue";
import DonutChart from '@/components/DonutChart.vue';
import LifetimeCardTable from '@/components/LifetimeCardTable.vue';
import Skeleton from 'primevue/skeleton';

const selectedProject = ref(null);
const selectedUser = ref(null);

const quantStore = useQuantitativeStore();
const chartStore = useChartStore();

function handleProjectSelection(proj) {
  selectedProject.value = proj;
}

function handleUserSelection(usr) {
  selectedUser.value = usr;
}

watch(
  [selectedProject, selectedUser],
  ([proj, usr]) => {
    const pid = proj?.id ?? 0;
    const uid = usr?.idUsuario ?? 0;
    quantStore.fetchAverageTime(pid, uid);
    quantStore.fetchTotalCards(pid, uid);
    chartStore.fetchTimeline(pid, uid);
    chartStore.fetchTags(pid, uid);
    chartStore.fetchStatus(pid, uid);
    chartStore.fetchLifetime(pid, uid);
  },
  { immediate: true }
);

onMounted(() => {
});

// Timeline chart data
const chartData = computed(() => {
  const labels = chartStore.timelineData.map(item =>
    item.periodo.charAt(0).toUpperCase() + item.periodo.slice(1).toLowerCase()
  );
  return {
    labels,
    datasets: [
      { label: 'Criados', data: chartStore.timelineData.map(i => i.quantidadeCriadas), backgroundColor: '#5739B4' },
      { label: 'Finalizados', data: chartStore.timelineData.map(i => i.quantidadeFinalizadas), backgroundColor: '#071952' },
    ]
  };
});

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

const donutData = computed(() => {
  const labels = chartStore.statusData.map(s => s.nomeStatus);
  const data = chartStore.statusData.map(s => s.percentual);
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ['#071952', '#5739B4', '#C6B7F4', '#2D9596', '#145DA0', '#1F6E8C']
      }
    ]
  };
});

const donutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'right',
      labels: {
        generateLabels: chart => {
          const ds = chart.data.datasets[0];
          const total = ds.data.reduce((a, v) => a + v, 0);
          return chart.data.labels.map((label, i) => {
            const val = ds.data[i];
            const pct = ((val / total) * 100).toFixed(1) + '%';
            return { text: `${label}: ${pct}`, fillStyle: ds.backgroundColor[i], index: i };
          });
        }
      }
    },
    tooltip: {
      callbacks: {
        label: ctx => {
          const ds = ctx.dataset.data;
          const total = ds.reduce((a, v) => a + v, 0);
          const val = ctx.raw;
          return `${ctx.label}: ${((val / total) * 100).toFixed(1)}%`;
        }
      }
    }
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

.sprints-chart-container {
  display: flex;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 0;
  height: 320px;
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
  padding: 20px 0 0 0;
}

.grid-container3 {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: 1fr;
  gap: 10px;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 0;
}

@media (max-width: 768px) {
  .QuantitativeCards {
    flex-direction: column;
    align-items: stretch;
  }

  .grid-container1,
  .grid-container2 {
    grid-template-columns: 1fr;
  }
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
  width: 12em;
  height: 7em;
  background-color: #fff;
  border: 1px solid #5739B4;
  border-radius: 12px;
}

.mr-4 {
  margin-right: 1em;
}
</style>
