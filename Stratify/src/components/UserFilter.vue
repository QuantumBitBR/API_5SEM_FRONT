<template>
  <div class="user-filter-container">
    <label class="filter-label" for="user-autocomplete">Busque Pelo Nome de Usuario:</label>
    <AutoComplete
      inputId="user-autocomplete"
      pls
      placeholder="Digite o nome do usuário"
      v-model="selectedUser"
      :suggestions="filteredUserNames"

      @complete="searchUsers"
      @item-select="handleUserSelect"
      @clear="handleClear"
      class="filter-autocomplete"
      forceSelection
    />
  </div>
</template>

<script>
import AutoComplete from "primevue/autocomplete";

export default {
  components: {
    AutoComplete
  },
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedUser: null,
      filteredUserNames: [],
      searchTerm: ''
    };
  },
  methods: {
    searchUsers(event) {
      this.searchTerm = event.query.toLowerCase();
      this.filteredUserNames = this.users
        .filter(user => user.nome.toLowerCase().includes(this.searchTerm))
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .map(user => user.nome);
    },
    handleUserSelect(event) {
      const selectedUser = this.users.find(user => user.nome === event.value);
      this.$emit('user-selected', selectedUser);
    },
    handleClear() {
      this.selectedUser = null;
      this.$emit('clear-filter');
    }
  }
};
</script>

<style scoped>
.user-filter-container {
  padding: 41px 21px;
}

.filter-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.filter-autocomplete {
  width: 7%;
}

:deep(.p-autocomplete) {
  width: 30%;
}

:deep(.p-autocomplete-input) {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #5739b4;
  border-radius: 4px;
}

:deep(.p-autocomplete-panel) {
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: -1px;
}

:deep(.p-autocomplete-item) {
  padding: 0.6rem 1.1rem;
  border-bottom: none;
}

:deep(.p-autocomplete-items) {
  padding: 0;
}
</style>
