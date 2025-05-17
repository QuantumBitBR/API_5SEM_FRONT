<template>
  <div class="sprints-container">
    <div class="sprints-header">
      <h4 class="sprints-title">Cards por Sprint</h4>
      <div class="sprints-filters">
        <Dropdown 
          v-model="selectedUserInternal"
          :options="filteredUsers"
          optionLabel="nome"
          optionValue="id"
          placeholder="Selecione um usuário"
          :disabled="!selectedProject || usersLoading"
          :loading="usersLoading"
          class="user-dropdown"
          @change="handleUserChange"
        >
          <template #option="slotProps">
            <div class="user-option">
              <span>{{ slotProps.option.nome }}</span>
              <span class="user-email">{{ slotProps.option.email }}</span>
            </div>
          </template>
        </Dropdown>
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
      <div v-else class="sprints-columns">
        <div 
          v-for="sprint in sprintsData" 
          :key="sprint.sprint" 
          class="sprint-column"
          :style="{
            height: `${calculateColumnHeight(sprint.quantidade)}px`,
            backgroundColor: getColumnColor(sprint.quantidade)
          }"
        >
          <div class="sprint-label">{{ sprint.sprint }}</div>
          <div class="sprint-value">{{ sprint.quantidade }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, type PropType } from 'vue';
import UserStoryService from '@/services/userStoryService';
import userService from '@/services/userService'; // Importe o seu userService
import type { UsuarioInfo } from '@/services/userService'; // Importe a interface


interface QuantidadeCardsPorSprintDTO {
  sprint: string;
  quantidade: number;
}

export default defineComponent({
  name: 'SprintsChart',
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
    const users = ref<UsuarioInfo[]>([]);
    const selectedUserInternal = ref<number | null>(null);
    const usersLoading = ref(false);
    const sprintsLoading = ref(false);

    // Filtra usuários ativos
    const filteredUsers = computed(() => {
      return users.value.filter(user => user.isEnable);
    });

    // Busca usuários quando um projeto é selecionado
    const fetchUsers = async () => {
      if (!props.selectedProject?.id) {
        users.value = [];
        return;
      }

      try {
        usersLoading.value = true;
        // Usa o userService existente
        users.value = await userService.listarUsuarios();
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        usersLoading.value = false;
      }
    };

    // Busca os dados das sprints
    const fetchSprintsData = async () => {
      try {
        const projectId = props.selectedProject?.id;
        const userId = selectedUserInternal.value;

        sprintsLoading.value = true;
        const response = await UserStoryService.getQuantidadePorSprint(
          projectId,
          userId || undefined
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

    const getColumnColor = (quantity: number) => {
      const percentage = quantity / Math.max(maxQuantity.value, 1);
      if (percentage < 0.3) return '#4bc0c0';
      if (percentage < 0.6) return '#36a2eb';
      return '#5739B4';
    };

    const handleUserChange = () => {
      emit('user-selected', selectedUserInternal.value 
        ? { idUsuario: selectedUserInternal.value } 
        : null
      );
      fetchSprintsData();
    };

    // Watchers
    watch(() => props.selectedProject, (newProject) => {
      if (newProject) {
        fetchUsers();
        fetchSprintsData();
      } else {
        sprintsData.value = [];
        users.value = [];
        selectedUserInternal.value = null;
      }
    }, { immediate: true });

    watch(() => props.selectedUser, (newUser) => {
      if (newUser?.idUsuario !== selectedUserInternal.value) {
        selectedUserInternal.value = newUser?.idUsuario || null;
      }
    }, { immediate: true });

    watch(() => props.selectedProject?.id, (newId) => {
        console.log('Project ID changed:', newId);
        if (newId) {
            fetchUsers();
            fetchSprintsData();
        } else {
            sprintsData.value = [];
            users.value = [];
            selectedUserInternal.value = null;
        }
    }, { immediate: true });

    return {
      sprintsData,
      maxQuantity,
      users,
      filteredUsers,
      selectedUserInternal,
      usersLoading,
      sprintsLoading,
      calculateColumnHeight,
      getColumnColor,
      handleUserChange
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
  margin-bottom: 20px;
}

.sprints-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sprints-title {
  color: #333;
  font-size: 1.2rem;
  margin: 0;
}

.sprints-filters {
  display: flex;
  gap: 10px;
}

.user-dropdown {
  min-width: 250px;
}

.user-option {
  display: flex;
  flex-direction: column;
}

.user-email {
  font-size: 0.8rem;
  color: #666;
}

.sprints-chart {
  height: 300px;
  display: flex;
  align-items: flex-end;
}

.sprints-columns {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 20px;
  align-items: flex-end;
  justify-content: center;
}

.sprint-column {
  flex: 1;
  min-width: 60px;
  max-width: 100px;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  transition: height 0.5s ease, background-color 0.5s ease;
  position: relative;
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
</style>