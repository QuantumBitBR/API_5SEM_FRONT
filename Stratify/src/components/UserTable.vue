<template>
  <div class="tabela">
    <DataTable :value="usuarios" class="tabela-src" removableSort showGridlines stripedRows>
      <Column header="Nome">
        <template #body="slotProps">
          <i class="pi pi-user" style="margin-right: 8px"></i>
          {{ slotProps.data.nome }}
        </template>
      </Column>
      <Column field="email" header="Email" sortable />
      <Column field="opcao1" header="Opção 1" />
      <Column field="opcao2" header="Opção 2" />
      <Column field="dataCriada" header="Data Criada" sortable />
      <Column header="Ações">
        <template #body="slotProps">
          <button @click="editarUsuario(slotProps.data)" class="btn-editar">Editar</button>
          <button @click="excluirUsuario(slotProps.data)" class="btn-excluir">Excluir</button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      usuarios: [
        {
          nome: "André Meneses",
          email: "andre@email.com",
          opcao1: "abc",
          opcao2: "xyz",
          dataCriada: "13/04/2025",
        },
        {
          nome: "Maria Silva",
          email: "maria@email.com",
          opcao1: "abc",
          opcao2: "xyz",
          dataCriada: "12/04/2025",
        },
        {
          nome: "João Santos",
          email: "joao@email.com",
          opcao1: "abc",
          opcao2: "xyz",
          dataCriada: "10/04/2025",
        },
      ],
    };
  },
  methods: {
    editarUsuario(usuario) {
      console.log("Editar clicado:", usuario);
    },
    excluirUsuario(usuario) {
      console.log("Excluir clicado:", usuario);
    },
  },
};
</script>

<style scoped>
.tabela {
  padding: 40px;
}

.tabela-src {
  border: 1px solid #5739b4;
  max-height: 25rem;
  border-radius: 12px;
  padding: 5px;
  background-color: #fff;
}

::v-deep(.p-datatable-table-container) {
  max-height: 24rem;
  overflow: auto;
}

.tabela-src::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}

.tabela-src::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 12px;
  height: 30px;
  transition: background-color 0.3s ease;
}

.btn-editar {
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-excluir {
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-editar:hover {
  background-color: #303f9f;
}

.btn-excluir:hover {
  background-color: #c62828;
}
</style>
