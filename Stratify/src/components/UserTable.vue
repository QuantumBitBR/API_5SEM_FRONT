// src/components/UserTable.vue
<template>
  <div class="tabela">
    <DataTable
      :value="usuarios"
      class="tabela-src"
      removableSort
      showGridlines
      stripedRows
      selectionMode="single"
      :selection="selectedUsuario"
      @selection-change="onSelection"
      scrollable
      scrollHeight="400px"
    >
      <Column field="nome" header="Nome" sortable>
        <template #body="{ data }">
          <i class="pi pi-user" style="margin-right: 8px"></i>
          {{ data.nome }}
        </template>
      </Column>

      <Column field="email" header="Email" sortable />

      <Column field="cargo" header="Cargo" sortable>
        <template #body="{ data }">
          <Dropdown
            v-model="data.cargo"
            :options="cargos"
            optionLabel="label"
            optionValue="value"
            class="w-full"
          />
        </template>
      </Column>

      <Column field="gestor" header="Gestor">
        <template #body="{ data }">
          <div v-if="data.cargo === 'USER'">
            <Dropdown
              v-model="data.gestor"
              :options="gestoresOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Selecione o gestor"
              class="w-full"
            />
          </div>
          <div v-else>
            {{ data.gestor || '-' }}
          </div>
        </template>
      </Column>

      <Column field="habilitado" header="Habilitado">
        <template #body="{ data }">
          <ToggleButton
            v-model="data.habilitado"
            onLabel="Sim"
            offLabel="Não"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            class="p-button-sm"
          />
        </template>
      </Column>

      <Column header="Ações">
        <template #body="{ data }">
          <button @click="editPass(data)" class="btn-senha">
            Trocar senha
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import ToggleButton from 'primevue/togglebutton';
import userService from '../services/userService';
import type { UsuarioInfo } from '../services/userService';

// Opções de Cargo devem casar com valores retornados pelo endpoint
const cargos = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Gestor', value: 'GESTOR' },
  { label: 'Funcionário', value: 'USER' },
];

const usuarios = ref<UsuarioInfo[]>([]);
const selectedUsuario = ref<UsuarioInfo | null>(null);

// Computed: apenas gestores (role === 'GESTOR')
const gestoresOptions = computed(() =>
  usuarios.value
    .filter(u => u.role === 'GESTOR')
    .map(u => ({ label: u.nome, value: u.nome }))
);

async function fetchUsuarios() {
  try {
    const data = await userService.listarUsuarios();
    usuarios.value = data.map(u => ({
      ...u,
      cargo: u.role,         // agora corresponde a one of ['ADMIN','GESTOR','USER']
      gestor: u.gestorNome,
      habilitado: u.isEnable
    }));
  } catch (err) {
    console.error('Erro ao carregar usuários:', err);
  }
}

function onSelection(event: { value: UsuarioInfo }) {
  selectedUsuario.value = event.value;
  console.log('Usuário selecionado ID:', selectedUsuario.value?.id);
}

function editPass(user: UsuarioInfo) {
  console.log('Editar senha, usuário ID:', user.id);
  // abra modal ou navegue passando user.id
}

onMounted(fetchUsuarios);
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

/* Ajusta o header fixo no PrimeVue quando scrollable é true */
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
</style>
