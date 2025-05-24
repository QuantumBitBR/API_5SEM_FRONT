<template>
    <div>
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
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>
