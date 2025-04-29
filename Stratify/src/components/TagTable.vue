<template>
    <div class="tabela">
        <DataTable :value="tags" class="tabela-src" removableSort stripedRows>
            <Column class="abc" field="nomeTag" sortable header="Etiqueta" />
            <Column field="quantidade" sortable header="Quantidade Card" />
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
        selectedProject: null,
        selectedUser: null,
    },
    data() {
        return {
            tags: [],
        };
    },
    methods:{
        async fetchTags(){
            try{
                this.tags = await TagService.quantityPerTag(this.selectedProject.id, this.selectedUser.idUsuario);
            }catch(error){
                console.error("Error to find data:", error)
            }
        }
    },
    mounted() {
        if (this.selectedProject) {
            this.fetchTags();
        }
    },
    watch:{
        selectedProject: "fetchTags",
        selectedUser: "fetchTags",
    }
};
</script>

<style scoped>

.tabela-src {
    border: 1px solid #5739B4;
    max-height: 25rem;
    border-radius: 12px;
    padding: 5px;
    background-color: #fff;
}

::v-deep(.p-datatable-table-container) {
    max-height: 24rem;
    margin-bottom: 100%;
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

</style>
