<template>
  <div class="tabela">
    <Toast />
    <DataTable :value="usuariosOrdenados" class="tabela-src" removableSort showGridlines stripedRows selectionMode="single"
      :selection="selectedUsuario" @selection-change="onSelection" scrollable scrollHeight="calc(100vh - 160px)">
      <Column field="nome" header="Nome" sortable>
        <template #body="{ data }">
          <i class="pi pi-user" style="margin-right: 8px"></i>
          {{ data.nome }}
        </template>
      </Column>

      <Column field="email" header="Email" sortable />

      <Column field="cargo" header="Cargo" sortable>
        <template #body="{ data }">
          <Dropdown v-model="data.cargo" :options="cargos" optionLabel="label" optionValue="value" class="w-full"
            @change="(val) => handleRole(data, val)" />
        </template>
      </Column>

      <Column field="gestor" header="Gestor">
        <template #body="{ data }">
          <template v-if="data.cargo === 'OPERADOR'">
            <b>Atual: </b>{{ data.gestor }}
            <Dropdown v-model="data.gestor" :options="gestoresDisponiveis" optionLabel="label"
              optionValue="value" class="w-full" @update:modelValue="val => atribuirGestor(data.id, val)" />
          </template>
          <template v-else>
            <b>N/A</b>
          </template>
        </template>
      </Column>

      <Column field="habilitado" header="Habilitado">
        <template #body="{ data }">
          <ToggleButton v-model="data.habilitado" @update:modelValue="val => onToggleStatus(data, val)" onLabel="Sim"
            offLabel="Não" onIcon="pi pi-check" offIcon="pi pi-times" class="p-button-sm" />
        </template>
      </Column>

      <Column header="Ações">
        <template #body="{ data }">
          <button @click="resetarSenha(data.id)" class="btn-senha">
            Resetar senha
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import ManagementService from '../services/ManagementService';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';
import ToggleButton from 'primevue/togglebutton';
import { useToast } from 'primevue/usetoast';
import { ref, computed, watch } from 'vue';
import userService from '../services/userService';

const toast = useToast();
const props = defineProps({
  usuarios: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['refresh']);

// Opções de cargo
const cargos = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Gestor', value: 'GESTOR' },
  { label: 'Funcionário', value: 'OPERADOR' }
];

const selectedUsuario = ref(null);
const internalUsuarios = ref([]);

// Lista de usuários ordenada alfabeticamente
const usuariosOrdenados = computed(() => {
  return [...internalUsuarios.value].sort((a, b) => a.nome.localeCompare(b.nome));
});

// Lista de gestores disponíveis (atualizada automaticamente)
const gestoresDisponiveis = computed(() => {
  return internalUsuarios.value
    .filter(u => u.cargo === 'GESTOR')
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(u => ({
      label: u.nome,
      value: u.id
    }));
});

// Sincroniza os dados recebidos
watch(() => props.usuarios, (newUsuarios) => {
  internalUsuarios.value = newUsuarios.map(u => ({
    ...u,
    cargo: u.role,
    gestor: u.gestorNome,
    habilitado: u.isEnable
  }));
}, { immediate: true, deep: true });

async function handleRole(data, newRole) {
  try {
    const res = await ManagementService.setNewRole(data.id, newRole);
    if (res) {
      toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cargo alterado', life: 3000 });
      emit('refresh');
    }
  } catch (error) {
    console.error('Erro ao alterar cargo:', error);
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao alterar cargo', life: 3000 });
  }
}

async function atribuirGestor(userId, newGestorId) {
  try {
    await userService.atribuirGestor(userId, newGestorId);
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Gestor atualizado', life: 3000 });
    emit('refresh');
  } catch (err) {
    console.error('Erro ao atualizar gestor:', err);
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar gestor', life: 3000 });
  }
}

// Mantenha os outros métodos (onToggleStatus, resetarSenha, onSelection)
</script>

<style scoped>
.tabela {
  padding: 40px 20px;
}

.tabela-src {
  border: 1px solid #5739b4;
  border-radius: 12px;
  background-color: #fff;
}

::v-deep(.p-datatable-scrollable-header) {
  position: sticky;
  top: 0;
  z-index: 2;
}

.btn-senha {
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-senha:hover {
  background-color: #303f9f;
}

b {
  font-weight: bold;
}
</style>
