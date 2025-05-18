<template>
  <div class="management-container">
    <Navbar />
    <div class="filter-container">
      <UserFilter
        :users="usuarios"
        @user-selected="handleUserSelection"
        @clear-filter="resetFilter"
        @error="handleFilterError"
      />
      <small v-if="filterError" class="error-message">{{ filterError }}</small>
    </div>
    <UserTable
      :usuarios="filteredUsers"
      :key="tableKey"
      @refresh="fetchUsuarios"
    />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import UserFilter from "@/components/UserFilter.vue";
import UserTable from "@/components/UserTable.vue";
import { showToast } from "@/eventBus";
import Cookies from "js-cookie";
import userService from "@/services/userService";

export default {
  name: "UserManagement",
  components: {
    Navbar,
    UserTable,
    UserFilter
  },
  data() {
    return {
      usuarios: [],
      filteredUsers: [],
      tableKey: 0,
      filterError: null,
      isLoading: false,
      error: null
    };
  },
  async created() {
    await this.initializeComponent();
  },
  methods: {
    /**
     * Inicializa o componente com tratamento de erros
     */
    async initializeComponent() {
      try {
        await this.checkPermissions();
        await this.fetchUsuarios();
      } catch (error) {
        this.handleError(error, 'Erro na inicialização');
      }
    },

    /**
     * Verifica permissões do usuário
     */
    async checkPermissions() {
      try {
        if (Cookies.get("RoleCookie") !== "ADMIN") {
          throw new Error('Acesso não autorizado');
        }
      } catch (error) {
        showToast({
          severity: 'error',
          summary: 'Acesso negado',
          detail: 'Você não tem permissão para acessar esta página',
          life: 3000
        });
        this.$router.push('/dashboard');
        throw error; // Propaga o erro para o chamador
      }
    },

    /**
     * Busca usuários com tratamento completo de erros
     */
    async fetchUsuarios() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await userService.listarUsuarios();

        if (!response || !Array.isArray(response)) {
          throw new Error('Resposta inválida da API');
        }

        this.usuarios = this.sortUsers(response);
        this.filteredUsers = [...this.usuarios];
      } catch (error) {
        this.handleError(error, 'Erro ao carregar usuários');
        this.usuarios = [];
        this.filteredUsers = [];
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Ordena usuários alfabeticamente com tratamento seguro
     */
    sortUsers(users) {
      if (!Array.isArray(users)) {
        return [];
      }

      return [...users].sort((a, b) => {
        const nomeA = a.nome?.toLowerCase() || '';
        const nomeB = b.nome?.toLowerCase() || '';
        return nomeA.localeCompare(nomeB);
      });
    },

    /**
     * Manipula seleção de usuário no filtro
     */
    handleUserSelection(selectedUser) {
      try {
        if (!selectedUser || !this.usuarios) {
          throw new Error('Seleção inválida');
        }

        this.filterTable(selectedUser);
      } catch (error) {
        this.handleError(error, 'Erro ao filtrar usuário');
      }
    },

    /**
     * Filtra a tabela com validações
     */
    filterTable(selectedUser) {
      try {
        if (!this.usuarios) {
          throw new Error('Lista de usuários não disponível');
        }

        this.filteredUsers = selectedUser ?
          [selectedUser] :
          [...this.usuarios];

        this.tableKey += 1;
        this.filterError = null;
      } catch (error) {
        this.handleError(error, 'Erro ao filtrar tabela');
        this.filteredUsers = [...this.usuarios];
      }
    },

    /**
     * Reseta o filtro com tratamento de erros
     */
    resetFilter() {
      try {
        this.filteredUsers = [...this.usuarios];
        this.tableKey += 1;
        this.filterError = null;
      } catch (error) {
        this.handleError(error, 'Erro ao resetar filtro');
      }
    },

    /**
     * Manipula erros do componente de filtro
     */
    handleFilterError(errorData) {
      this.filterError = errorData.message;
      showToast({
        severity: 'error',
        summary: 'Erro no Filtro',
        detail: errorData.message,
        life: 3000
      });
    },

    /**
     * Centraliza o tratamento de erros
     */
    handleError(error, context) {
      console.error(`${context}:`, error);
      this.error = context;
      showToast({
        severity: 'error',
        summary: 'Erro',
        detail: context,
        life: 3000
      });
    }
  }
};
</script>

<style scoped>
/* Mantenha os estilos existentes e adicione: */
.error-message {
  color: #ff4d4f;
  display: block;
  margin-top: 0.5rem;
}

.management-container {
  position: relative;
}
</style>
