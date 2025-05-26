<template>
    <div class="csv_container">
        <button @click="exportCSV">CSV</button>
    </div>
</template>

<script>
import CSVService from "@/services/CSVService";

export default {
    props: {
        exportType: {
            type: String,
            required: true,
        },
        projectId: {
            type: Number,
            default: null,
        },
        userId: {
            type: Number,
            default: null,
        }
    },
    methods: {
        exportCSV() {
            CSVService.downloadCsvFile(this.exportType, this.projectId, this.userId);
        }
    }
}
</script>

<style>
button {
    padding: 5px 12px;
    background-color: #3f51b5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #36469e;
}

.csv_container {
    display: flex;
    justify-content: end;
}
</style>
