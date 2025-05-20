<template>
  <div class="tabela">
    <Toast />
    <DataTable :value="usuarios" class="tabela-src" removableSort showGridlines stripedRows selectionMode="single"
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
            @change="handleRole(data)" />
        </template>
      </Column>

      <Column field="gestor" header="Gestor">
        <template #body="{ data }">
          <template v-if="data.cargo === 'OPERADOR'">
            <b>Atual: </b>{{ data.gestor }}
            <Dropdown v-model="data.gestor" :value="data.gestor" :options="gestores" optionLabel="label"
              optionValue="value" class="w-full" @update:modelValue="val => {
                atribuirGestor(data.id, val);
                const selectedGestor = gestores.find(g => g.value === val);
                if (selectedGestor) {
                  data.gestor = selectedGestor.label;
                }
              }" />
          </template>
          <template v-if="data.cargo === 'ADMIN' || data.cargo === 'GESTOR'">
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
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import ManagementService from '../services/ManagementService';
import userService from '../services/userService';
import type { UsuarioInfo } from '../services/userService';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import ToggleButton from 'primevue/togglebutton';

const toast = useToast();

// Mantendo as mesmas variáveis do template
const cargos = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Gestor', value: 'GESTOR' },
  { label: 'Funcionário', value: 'OPERADOR' }
];

const usuarios = ref<UsuarioInfo[]>([]);
const selectedUsuario = ref<UsuarioInfo | null>(null);
const gestores = ref<{ label: string; value: number }[]>([]);

// Métodos principais (mantendo os nomes que o template usa)
async function fetchUsuarios() {
  try {
    const data = await userService.listarUsuarios();
    usuarios.value = data.map(u => ({
      ...u,
      cargo: u.role,
      gestor: u.gestorNome,
      habilitado: u.isEnable
    }));

    // Atualiza os nomes dos gestores com base na lista atual
    atualizarNomesGestores();
  } catch (err) {
    mostrarErro('Falha ao carregar usuários');
    console.error('Erro ao carregar usuários:', err);
  }
}

async function fetchGestores() {
  try {
    const data = await userService.listarGestores();
    gestores.value = data.map(u => ({
      label: u.nome,
      value: u.id
    }));
    // Atualiza os nomes nos usuários quando carrega gestores
    atualizarNomesGestores();
  } catch (err) {
    mostrarErro('Falha ao carregar gestores');
    console.error('Erro ao carregar gestores:', err);
  }
}

async function handleRole(data: any) {
  try {
    await ManagementService.setNewRole(data.id, data.cargo);

    // Se virou gestor ou deixou de ser, atualiza a lista
    if (data.cargo === 'GESTOR' || data.cargo === 'OPERADOR') {
      await fetchGestores();
    }

    mostrarSucesso('Cargo alterado com sucesso');
  } catch (err) {
    mostrarErro('Erro ao alterar cargo');
    console.error('Erro ao alterar cargo:', err);
  }
}

async function atribuirGestor(userId: number, newGestorId: number) {
  try {
    await userService.atribuirGestor(userId, newGestorId);
    await fetchUsuarios();
    mostrarSucesso('Gestor atribuído com sucesso');
  } catch (err) {
    mostrarErro('Falha ao atribuir gestor');
    console.error('Erro ao atribuir gestor:', err);
  }
}

async function onToggleStatus(user: { id: number; habilitado: boolean }, val: boolean) {
  const previous = user.habilitado;
  user.habilitado = val;
  try {
    if (val) {
      await userService.ativarUsuario(user.id);
    } else {
      await userService.desativarUsuario(user.id);
    }
    mostrarSucesso(`Usuário ${val ? 'ativado' : 'desativado'}`);
  } catch (err) {
    user.habilitado = previous;
    mostrarErro('Não foi possível alterar status');
    console.error('Erro ao alterar status do usuário:', err);
  }
}

async function resetarSenha(userId: number) {
  try {
    await userService.resetarSenha(userId);
    mostrarSucesso('Senha resetada com sucesso');
  } catch (err) {
    mostrarErro('Falha ao resetar senha');
    console.error('Erro ao resetar senha:', err);
  }
}

function onSelection(event: { value: UsuarioInfo }) {
  selectedUsuario.value = event.value;
}

// Métodos auxiliares novos
function atualizarNomesGestores() {
  usuarios.value.forEach(u => {
    // Encontra o gestor correspondente pelo ID (usando gestorNome como referência)
    const gestorEncontrado = gestores.value.find(g =>
      u.gestorNome && g.label === u.gestorNome
    );

    // Se encontrou, atualiza o objeto usuário mantendo a estrutura original
    if (gestorEncontrado) {
      // Mantemos todas as propriedades originais e apenas atualizamos o que existe
      Object.assign(u, {
        ...u,
        gestorNome: gestorEncontrado.label
      });
    }
  });
}

function mostrarSucesso(mensagem: string) {
  toast.add({ severity: 'success', summary: 'Sucesso', detail: mensagem, life: 3000 });
}

function mostrarErro(mensagem: string) {
  toast.add({ severity: 'error', summary: 'Erro', detail: mensagem, life: 3000 });
  console.error(mensagem);
}

// Inicialização (mantendo a mesma lógica)
onMounted(async () => {
  try {
    await fetchGestores();
    await fetchUsuarios();
  } catch (err) {
    mostrarErro('Falha ao carregar dados iniciais');
    console.error('Erro ao carregar dados iniciais:', err);
  }
});
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
