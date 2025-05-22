<template>
  <div class="sprints-container">
    <div class="sprints-header">
      <h4 class="sprints-title">Quantidade de Cards por Sprint</h4>
      <div class="sprints-filters">
      </div>
    </div>

    <div class="sprints-chart">
      <div v-if="!selectedProject" class="no-data">
        Selecione um projeto para visualizar as sprints
      </div>
      <div v-else-if="sprintsLoading" class="no-data">
        <ProgressSpinner style="width: 50px; height: 50px" />
      </div>
      <div v-else-if="sprintsData.length === 0" class="no-data">
        Nenhuma sprint encontrada para os filtros selecionados
      </div>
      <div v-else class="sprints-columns-container">
        <div class="sprints-columns">
          <div
            v-for="(sprint, index) in sprintsData"
            :key="sprint.sprint"
            class="sprint-column"
            :style="{
              height: `${calculateColumnHeight(sprint.quantidade)}px`,
              backgroundColor: getColumnColor(sprint.quantidade, index),
              flex: `${sprint.quantidade + 1}`
            }"
          >
            <div class="sprint-label">{{ sprint.sprint }}</div>
            <div class="sprint-value">{{ sprint.quantidade }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, type PropType } from 'vue';
import Select from 'primevue/select';
import ProgressSpinner from 'primevue/progressspinner';
import UserStoryService from '@/services/userStoryService';

interface QuantidadeCardsPorSprintDTO {
  sprint: string;
  quantidade: number;
}

export default defineComponent({
  name: 'SprintsChart',
  components: {
    Select,
    ProgressSpinner
  },
  props: {
    selectedProject: {
      type: Object as PropType<{ id: number } | null>,
      default: null
    },
    selectedUser: {
      type: Object as PropType<{ idUsuario: number } | null>,
      default: null
    }
  },
  setup(props, { emit }) {
    const sprintsData = ref<QuantidadeCardsPorSprintDTO[]>([]);
    const maxQuantity = ref(0);
    const sprintsLoading = ref(false);

    // Busca os dados das sprints
    const fetchSprintsData = async () => {
      try {
        const projectId = props.selectedProject?.id;
        // Use diretamente props.selectedUser?.idUsuario
        const userId = props.selectedUser?.idUsuario;

        sprintsLoading.value = true;
        const response = await UserStoryService.getQuantidadePorSprint(
          projectId,
          userId
        );

        sprintsData.value = response;
        calculateMaxQuantity();
      } catch (error) {
        console.error('Error fetching sprints data:', error);
      } finally {
        sprintsLoading.value = false;
      }
    };

    const calculateMaxQuantity = () => {
      if (sprintsData.value.length === 0) {
        maxQuantity.value = 0;
        return;
      }
      maxQuantity.value = Math.max(...sprintsData.value.map(s => s.quantidade));
    };

    const calculateColumnHeight = (quantity: number) => {
      if (maxQuantity.value === 0) return 0;
      return (quantity / maxQuantity.value) * 200;
    };

    const getColumnColor = (quantity: number, index: number) => {
      const colorPalette = [
        '#36a2eb', // Azul claro
        '#4a6bdf', // Azul médio
        '#5e35b1', // Azul-roxo
        '#7e57c2', // Roxo médio
        '#9575cd', // Roxo claro
        '#b39ddb'   // Roxo muito claro
      ];

      const baseColor = colorPalette[index % colorPalette.length];
      const percentage = maxQuantity.value > 0 ? quantity / maxQuantity.value : 0;
      return adjustColorIntensity(baseColor, percentage);
    };

    const adjustColorIntensity = (hex: string, intensity: number) => {
      const r = parseInt(hex.substring(1, 3), 16);
      const g = parseInt(hex.substring(3, 5), 16);
      const b = parseInt(hex.substring(5, 7), 16);
      const adjustedIntensity = Math.min(Math.max(intensity * 0.8 + 0.2, 0.2), 1.0);
      const newR = Math.floor(r * adjustedIntensity);
      const newG = Math.floor(g * adjustedIntensity);
      const newB = Math.floor(b * adjustedIntensity);
      return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)}`;
    };

    // Watchers
    watch(() => props.selectedProject, (newProject) => {
      if (newProject) {
        fetchSprintsData();
      } else {
        sprintsData.value = [];
      }
    }, { immediate: true });

    watch(() => props.selectedUser, (newUser) => {
      // Refetch data when selectedUser prop changes
      fetchSprintsData();
    }, { immediate: true });

    return {
      sprintsData,
      maxQuantity,
      sprintsLoading,
      calculateColumnHeight,
      getColumnColor
    };
  }
});
</script>

<style scoped>

.sprints-container {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border: 1px solid #5739B4;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}

.sprints-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 15px;
}

.sprints-title {
  color: #333;
  font-size: 14px;
  margin: 0;
}

.sprints-filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.sprints-chart {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.sprints-columns-container {
  flex: 1;
  display: flex;
  overflow-x: auto;
  padding-bottom: 0% 40px;
}

.sprints-columns {
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 12px;
  align-items: flex-end;
  min-width: min-content;
  padding: 0 10px 3px;
}

.sprint-column {
  min-width: 60px;
  max-width: 100px;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.sprint-column:hover {
  opacity: 0.8;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.sprint-label {
  position: absolute;
  top: -25px;
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  word-break: break-word;
  width: 100%;
}

.sprint-value {
  margin-bottom: 10px;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

.no-data {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
}

@media (max-width: 768px) {
  .sprint-column {
    min-width: 50px;
  }
  
  .sprint-label {
    font-size: 0.7rem;
    top: -20px;
  }
}
</style>