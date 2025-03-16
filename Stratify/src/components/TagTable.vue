<template>
    <div style="overflow-y: auto; width: 400px;">
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
    data() {
        return {
            tags: [],
        };
    },
    methods:{
        async fetchTags(){
            try{
                this.tags = await TagService.quantityPerTag();
                console.log("TAGS:", this.tags)
            }catch(error){
                console.error("Error to find data:", error)
            }
        }
    },
    mounted() {
        this.fetchTags();
    },
};
</script>
