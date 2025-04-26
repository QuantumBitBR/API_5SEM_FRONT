// src/components/UserTable.vue
<template>
  <div class="tabela">
    <Toast />
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
          {{ data.gestor }}
        </template>
      </Column>

      <Column field="habilitado" header="Habilitado">
        <template #body="{ data }">
          <ToggleButton
            v-model="data.habilitado"
            @update:modelValue="val => onToggleStatus(data, val)"
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
          <button @click="resetarSenha(data.id)" class="btn-senha">
            Resetar senha
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import ToggleButton from 'primevue/togglebutton';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import userService from '../services/userService';
import type { UsuarioInfo } from '../services/userService';

const toast = useToast();

const cargos = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Gestor', value: 'GESTOR' },
  { label: 'Funcionário', value: 'USER' }
];

const usuarios = ref<UsuarioInfo[]>([]);
const selectedUsuario = ref<UsuarioInfo | null>(null);

async function fetchUsuarios() {
  try {
    const data = await userService.listarUsuarios();
    usuarios.value = data.map(u => ({
      ...u,
      cargo: u.role,
      gestor: u.gestorNome,
      habilitado: u.isEnable
    } as any));
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar usuários', life: 3000 });
    console.error('Erro ao carregar usuários:', err);
  }
}

async function onToggleStatus(user: { id: number; habilitado: boolean }, val: boolean) {
  const previous = user.habilitado;
  user.habilitado = val;
  try {
    if (val) {
      await userService.ativarUsuario(user.id);
      toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário ativado', life: 3000 });
    } else {
      await userService.desativarUsuario(user.id);
      toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário desativado', life: 3000 });
    }
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível alterar status', life: 3000 });
    console.error('Erro ao alterar status do usuário:', err);
    user.habilitado = previous;
  }
}

async function resetarSenha(userId: number) {
  try {
    await userService.resetarSenha(userId);
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Senha resetada', life: 3000 });
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao resetar senha', life: 3000 });
    console.error('Erro ao resetar senha:', err);
  }
}

function onSelection(event: { value: UsuarioInfo }) {
  selectedUsuario.value = event.value;
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
