<template>
  <div class="selects">
    <div>
      <Select
        v-model="selectedProject"
        :options="projects"
        optionLabel="nome"
        placeholder="Select a Project"
        class="w-full md:w-56"
      />
    </div>
    <div v-if="role !== 'OPERADOR'">
      <Select
        v-model="selectedUser"
        :options="users"
        optionLabel="nomeUsuario"
        placeholder="Select a User"
        class="w-full md:w-56"
      />
    </div>
  </div>
</template>

<script>
import Select from "primevue/select";
import ProjectService from "@/services/ProjectService";
import Cookies from "js-cookie";

export default {
  components: {
    Select,
  },
  data() {
    return {
      selectedProject: null,
      selectedUser: null,
      role: null,
      id: null,
      projects: [],
      users: [],
    };
  },
  methods: {
    async fetchProjects() {
      try {
        const all_projects = await ProjectService.allProjects();
        this.projects = [{ id: 0, nome: "Todos" }, ...all_projects];
        this.selectedProject = this.projects[0];
        this.fetchUsers();
      } catch (error) {
        console.error("Error to find data:", error);
      }
    },
    async fetchUsers() {
      try {
        const all_users = await ProjectService.listUsers(this.selectedProject.id);
        this.users = [{ idUsuario: 0, nomeUsuario: "Todos" }, ...all_users];
        if (this.role === 'OPERADOR') {
          this.selectedUser = this.users.find(user => user.idUsuario == this.id) || this.users[0];
        } else {
          this.selectedUser = this.users[0];
        }
      } catch (error) {
        console.error("Error to find data:", error);
      }
    },
  },
  mounted() {
    this.role = Cookies.get("RoleCookie") || 'OPERADOR';
    this.id = Cookies.get("IdCookie" || 0)
    this.fetchProjects();
  },
  watch: {
    selectedProject(newProject) {
      this.$emit("project-selected", newProject);
    },
    selectedUser(newUser) {
      this.$emit("user-selected", newUser);
    },
  },
};
</script>

<style scoped>
.selects {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>