<template>
    <div :class="['sidebar-container', { closed: !isOpen }]">
      <button class="toggle-btn" @click="toggleSidebar">
        {{ isOpen ? '❮' : '❯' }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      toggleSidebar() {
        this.isOpen = !this.isOpen;
        this.$emit("toggle", this.isOpen); // Emite um evento para avisar o pai
      },
    },
  };
  </script>
  
  <style scoped>
  .sidebar-container {
    background-color: blue;
    width: 200px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    transition: width 0.3s ease;
  }
  
  .sidebar-container.closed {
    width: 60px;
  }
  
  .toggle-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: white;
    border: none;
    cursor: pointer;
    padding: 5px;
    font-size: 16px;
  }
  </style>  