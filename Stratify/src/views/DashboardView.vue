
<template>
    <div class="card">
        <Menubar :model="items"/>
        <TagTable/>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { Menubar } from "primevue";
  import TagTable from "../components/TagTable.vue"
  const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home'
    },
    {
        label: 'Projects',
        icon: 'pi pi-briefcase',
    },
    {
        label: 'Time', 
        icon: 'pi pi-users'
    },
    {
        label: 'Sair',
        icon: 'pi pi-sign-out'
    }
  ]);
  </script>
  <style>
  </style>