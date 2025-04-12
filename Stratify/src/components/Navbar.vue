<template>
  <Menubar class="custom-menubar">
    <template #start>
      <div class="start-content">
        <div class="logo">
          <h1>Stratify</h1>
        </div>
        <div class="nav-buttons">
          <button class="nav-btn" @click="$router.push('/')">
            <i class="pi pi-home"></i>
            <span>Home</span>
          </button>
          <button class="nav-btn" @click="$router.push('/usuarios')">
            <i class="pi pi-users"></i>
            <span>Usuários</span>
          </button>
          <button class="nav-btn" @click="logout">
            <i class="pi pi-sign-out"></i>
            <span>Sair</span>
          </button>
        </div>
      </div>
    </template>

    <template #end>
      <button class="profile-btn">
        <i class="pi pi-user"><span>Teste</span></i>
      </button>
    </template>
  </Menubar>
</template>

<script>
export default {
  name: "StratifyMenubar",
  methods: {
    logout() {
      console.log("Usuário deslogado");
    },
  },
};
</script>

<style scoped>
.custom-menubar {
  background: linear-gradient(135deg, #0C1947, #5739B4); /* roxo escuro pro claro */
  border: none;
  color: white;
  margin-bottom: 1em;
  border-radius: 0 !important;
}

.start-content {
  display: flex;
  align-items: center;
}

span{
  font-family: Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
    padding: 10px;
}

.pi-user{
  padding: 0 10px;
}

.logo h1 {
  margin: 0;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 2rem;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.nav-btn:hover {
  opacity: 0.8;
}

.profile-btn {
  background: transparent;
  border: 1px solid #fff;
  border-radius: 10px;
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
  margin-right: 10px;
  transition: opacity 0.2s ease;
}

.profile-btn:hover {
  opacity: 0.8;
}
</style>
