<template>
    <div class="flex">
        <InputText v-model="text" placeholder="Digite algo" class="w-1/4 p-2 border border-gray-300 rounded" />
        <Dropdown v-model="selectedOption" :options="options" optionLabel="label" optionValue="value" class="w-1/6 ml-[20px]" id="dpd-manager"/>
    </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

export default {
    components: {
        InputText,
        Dropdown,
    },
    data() {
        return {
            text: "",
            selectedOption: null,
            options: [
                { label: "Opção 1", value: 1 },
                { label: "Opção 2", value: 2 },
                { label: "Opção 3", value: 3 },
            ],
        };
    }
};
</script>

<style>
.flex {
    display: flex;
    align-items: center;
    padding-left: 40px;
  
}
</style>
