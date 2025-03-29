<template>
    <div style="overflow-y: auto; width: auto; height: auto; box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);">
        <DataTable :value="tags" removableSort showGridlines stripedRows>
            <Column field="nomeTag" sortable header="Etiqueta" />
            <Column field="quantidadeCards" sortable header="Quantidade Card" />
        </DataTable>
    </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import TagService from "@/services/TagService";

export default {
    components: {
        DataTable,
        Column,
    },
    props: {
        selectedProject: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            tags: [],
        };
    },
    methods:{
        async fetchTags(project){
            try{
                this.tags = await TagService.quantityPerTag(project);
            }catch(error){
                console.error("Error to find data:", error)
            }
        }
    },
    mounted() {
        if (this.selectedProject) {
            this.fetchTags(this.selectedProject);
        }
    },
    watch:{
        selectedProject(newProject){
            if(newProject){
                this.fetchTags(newProject)
            }
        }
    }
};
</script>
