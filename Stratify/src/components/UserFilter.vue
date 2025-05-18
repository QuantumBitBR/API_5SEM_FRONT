<template>
  <div class="user-filter-container">
    <AutoComplete
      v-model="selectedUser"
      :suggestions="filteredUserNames"
      placeholder="Digite o nome do usuário"
      @complete="handleSearch"
      @item-select="handleUserSelect"
      @clear="handleClear"
      class="filter-autocomplete"
      forceSelection
      aria-label="Campo de busca de usuários"
    />
    <small v-if="error" class="error-message">{{ error }}</small>
  </div>
</template>

<script>
import AutoComplete from 'primevue/autocomplete';

export default {
  name: 'UserFilter',
  components: {
    AutoComplete
  },
  props: {
    users: {
      type: Array,
      required: true,
      validator: (value) => {
        return Array.isArray(value) &&
               value.every(user => user?.nome && typeof user.nome === 'string');
      }
    }
  },
  emits: ['user-selected', 'clear-filter', 'error'],
  data() {
    return {
      selectedUser: null,
      filteredUserNames: [],
      searchTerm: '',
      error: null,
      isLoading: false
    };
  },
  methods: {
    /**
     * Realiza a busca de usuários com tratamento de erros
     * @param {Object} event - Evento de autocomplete
     */
    async handleSearch(event) {
      try {
        this.isLoading = true;
        this.error = null;
        this.searchTerm = event.query.toLowerCase().trim();

        if (!this.searchTerm) {
          this.filteredUserNames = [];
          return;
        }

        this.filteredUserNames = this.filterAndSortUsers(this.searchTerm);
      } catch (error) {
        this.handleError(error, 'Erro na busca de usuários');
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Filtra e ordena usuários alfabeticamente
     * @param {string} term - Termo de busca
     * @returns {Array} - Lista de nomes de usuários filtrados e ordenados
     */
    filterAndSortUsers(term) {
      if (!this.users || !Array.isArray(this.users)) {
        return [];
      }

      return this.users
        .filter(user => {
          const userName = user.nome?.toLowerCase() || '';
          return userName.includes(term);
        })
        .sort((a, b) => {
          const nomeA = a.nome?.toLowerCase() || '';
          const nomeB = b.nome?.toLowerCase() || '';
          return nomeA.localeCompare(nomeB);
        })
        .map(user => user.nome);
    },

    /**
     * Manipula a seleção de usuário com validação
     * @param {Object} event - Evento de seleção
     */
    handleUserSelect(event) {
      try {
        if (!event.value || !this.users) {
          throw new Error('Seleção inválida');
        }

        const selectedUser = this.users.find(user => user.nome === event.value);
        if (!selectedUser) {
          throw new Error('Usuário não encontrado');
        }

        this.$emit('user-selected', selectedUser);
      } catch (error) {
        this.handleError(error, 'Erro ao selecionar usuário');
      }
    },

    /**
     * Limpa o filtro e trata possíveis erros
     */
    handleClear() {
      try {
        this.selectedUser = null;
        this.filteredUserNames = [];
        this.searchTerm = '';
        this.$emit('clear-filter');
      } catch (error) {
        this.handleError(error, 'Erro ao limpar filtro');
      }
    },

    /**
     * Centraliza o tratamento de erros
     * @param {Error} error - Objeto de erro
     * @param {string} message - Mensagem amigável
     */
    handleError(error, message) {
      console.error(`${message}:`, error);
      this.error = message;
      this.$emit('error', { message, error });
    }
  }
};
</script>

<style scoped>
.user-filter-container {
  padding: 1rem 2rem;
  position: relative;
}

.filter-autocomplete {
  width: 100%;
  max-width: 300px;
}

.error-message {
  display: block;
  color: #ff4d4f;
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

:deep(.p-autocomplete-input) {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
}

:deep(.p-autocomplete-input:focus) {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  outline: 0;
}

:deep(.p-autocomplete-panel) {
  border: 1px solid #d9d9d9;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
              0 6px 16px 0 rgba(0, 0, 0, 0.08),
              0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

:deep(.p-autocomplete-item) {
  padding: 0.5rem 1rem;
  transition: all 0.3s;
}
</style>
