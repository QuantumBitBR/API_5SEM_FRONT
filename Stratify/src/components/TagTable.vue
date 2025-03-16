<template>
    <div style="overflow-y: auto; width: 400px;">
        <DataTable :value="tags">
            <Column field="tag" header="Etiqueta" />
            <Column field="count" header="Quantidade Card" />
        </DataTable>
    </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

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
    mounted() {
        this.tags = [
            {
                tag: "Front-End",
                count: 34
            },
            {
                tag: "Back-End",
                count: 23
            },
        ];
    },
};
</script>
