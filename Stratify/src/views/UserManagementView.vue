<template>
    <div class="my-view">
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>
      <button @click="handleClick">Clique aqui</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserManagement',
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
  