<template>
  <div :class="['sidebar-container', { closed: !isOpen }]">
    <h1 v-if="isOpen" class="logo_side">Stratify</h1>
    <button class="toggle-btn" @click="toggleSidebar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          :d="isOpen ? 'M6 18L18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div  v-if="isOpen" class="sidebar_allitems">
        <div class="sidebar_item">
            <button class="sidebar_btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
                <span >Home</span>
            </button>
        </div>
        <div class="sidebar_item" style="border: none;">
            <button class="sidebar_btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                </svg>
                <span >Usuários</span>
            </button>
        </div>
        <div class="sidebar_item">
            <button class="sidebar_btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                    <path fill-rule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clip-rule="evenodd" />
                </svg>
                <span >Sair</span>
            </button>
        </div>
    </div>
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
      this.$emit("toggle", this.isOpen);
    },
  },
};
</script>

<style scoped>

.logo_side{
    color: white;
    padding-left: 20px;
    padding: 0px 0px 20px 30px;
}
.sidebar-container {
  background-color: #071952;
  width: 200px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s ease;
  z-index: 999;
}

.size-6 {
  width: 30px;
  color: white;
}

.size-5 {
  width: 25px;
  color: white;
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
  background: transparent;
}

.sidebar_item{
    width: 100%;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 8px 0px 8px 10px;
}

.sidebar_btn{
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    font-size: medium;
    border: none;
    background: transparent;
    color: white;
    /* padding: 5px 0px 5px 0px; */
    cursor: pointer;
}
</style>
