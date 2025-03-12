
<template>
    <div class="card">
        <Menubar :model="items"/>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { Menubar } from "primevue";
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