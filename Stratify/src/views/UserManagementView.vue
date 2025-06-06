<template>
  <div class="management-container">
    <Navbar />
    <div class="filter-container">
      <UserFilter
        :users="usuarios"
        @user-selected="filterTable"
        @clear-filter="resetFilter"
      />
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
      tableKey: 0
    };
  },
  async created() {
    // await this.checkPermissions();
    await this.fetchUsuarios();
  },
  methods: {

  async fetchUsuarios() {
    try {
      const response = await userService.listarUsuarios();
      this.usuarios = response.sort((a, b) => a.nome.localeCompare(b.nome));
      // this.usuarios = response;
      this.filteredUsers = [...this.usuarios];
    } catch (error) {
      console.error('Failed to load users:', error);

      showToast({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao carregar usuários',
        life: 3000
      });
    }
  },
    filterTable(selectedUser) {
      this.filteredUsers = selectedUser ? [selectedUser] : [...this.usuarios];
      this.tableKey += 1;
    },
    resetFilter() {
      this.filteredUsers = [...this.usuarios];
      this.tableKey += 1;
    }
  }
};
</script>

<style scoped>
.management-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
}



@media (max-width: 768px) {
  .filter-container {
    padding: 0.75rem;
  }
}
</style>
