<template>
    <div class="csv_container">
        <button @click="exportCSV">Export CSV</button>
    </div>
</template>

<script>
export default {
    methods: {
        exportCSV() {
            console.log('Exportando CSV...');
        }
    }
}
</script>

<style>
button {
    padding: 8px 16px;
    background-color: #3f51b5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #36469e;
}

.csv_container{
    display: flex;
    justify-content: end;
}
</style>
