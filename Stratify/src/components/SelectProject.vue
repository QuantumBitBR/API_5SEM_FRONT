<template>
  <div>
    <Select
      v-model="selectedProject"
      :options="projects"
      optionLabel="nome"
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
        const all_projects = await ProjectService.allProjects();
        this.projects = [{id:0, nome:"Todos"}, ...all_projects]
        this.selectedProject = this.projects[0]
      } catch (error) {
        console.error("Error to find data:", error);
      }
    },
  },
  mounted() {
    this.fetchProjects();
  },
  watch:{
    selectedProject(newProject){
        this.$emit('project-selected', newProject);
    }
  }
};
</script>
