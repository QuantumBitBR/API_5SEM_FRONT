<template>
  <div>
    <Select
      v-model="selectedProject"
      :options="projects"
      optionLabel="name"
      placeholder="Select a Project"
      class="w-full md:w-56"
    />
  </div>
</template>

<script>
import Select from "primevue/select";
import ProjectService from "@/services/ProjectService";

export default {
  components: {
    Select,
  },
  data() {
    return {
      selectedProject: null,
      projects: [],
    };
  },
  methods: {
    async fetchProjects() {
      try {
        this.projects = await ProjectService.allProjects();
      } catch (error) {
        console.error("Error to find data:", error);
      }
    },
  },
  mounted() {
    // ativar quando endpoint estiver pronto
    // fetchProjects();

    //desativar quando endpoint estiver pronto
    this.projects = [
      { name: "Todos", code: "all" },
      { name: "Projeto A", code: "A" },
      { name: "Projeto B", code: "B" },
      { name: "Projeto C", code: "C" },
      { name: "Projeto D", code: "D" },
      { name: "Projeto E", code: "E" },
    ];
    this.selectedProject = this.projects[0];
  },
  watch:{
    selectedProject(newProject){
        this.$emit('project-selected', newProject);
    }
  }
};
</script>
