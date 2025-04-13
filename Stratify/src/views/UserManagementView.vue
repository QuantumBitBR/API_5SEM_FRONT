<template>
    <div class="management-container">
      <Navbar/>
      <UserTable/>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import UserTable from "@/components/UserTable.vue";

  export default {
    name: 'UserManagement',
    components:{
      Navbar,
      UserTable
    },
    data() {
      return {
        title: 'Minha View',
        message: 'Olá'
      };
    },
    methods: {
      handleClick() {
        this.message = 'Você clicou no botão!';
      }
    },
    created() {
      console.log('Componente criado');
    }
  };
  </script>
  
  <style scoped>
  .my-view {
    padding: 1rem;
    font-family: Arial, sans-serif;
  }
  </style>
  