<template>
  <Menubar class="custom-menubar">
    <template #start>
      <div class="start-content">
        <button class="menu-toggle" @click="toggleMenu">
          <i class="pi pi-bars"></i>
        </button>

        <div class="logo">
          <h1>Stratify</h1>
        </div>

        <div class="nav-buttons" :class="{ open: isMenuOpen }">
          <button class="nav-btn" @click="$router.push('/dashboard')">
            <i class="pi pi-home"></i>
            <span>Home</span>
          </button>
          <button v-if="user && user.role === 'ADMIN'" class="nav-btn" @click="$router.push('/management')">
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
      <button class="profile-btn desktop-only" @click="$router.push('/profile')">
        <i class="pi pi-user"><span v-if="user">{{ user.nome }}</span></i>
      </button>
    </template>
  </Menubar>
</template>


<script>
import TokenService from '@/services/TokenService';
export default {
  name: "StratifyMenubar",
  data() {
    return {
      user: null,
      isMenuOpen: false
    }
  },
  methods:{
    logout(){
      TokenService.removeToken();
      this.$router.push('/')
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  },
  mounted(){
    this.user = TokenService.decodeToken(TokenService.getToken());
  },
};
</script>

<style scoped>
.custom-menubar {
  background: linear-gradient(135deg, #0c1947, #5739b4);
  border: none;
  color: white;
  margin-bottom: 1em;
  border-radius: 0 !important;
}

.start-content {
  display: flex;
  align-items: center;
}

span {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  padding: 10px;
  padding-left: 0;
  padding-right: 15px;
}

.pi-user {
  padding: 0 10px;
  padding-right: 0;
}

.pi-user span {
  padding: 10px;
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
  display: flex;
  padding: 6px;
}

.profile-btn:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .start-content {
    width: 100vw;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  .logo h1 {
    font-size: 1.2rem;
  }

  .menu-toggle {
    display: block;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .nav-buttons {
    display: none;
    flex-direction: column;
    width: 100%;
    background: #0c1947;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    padding: 1em;
  }

  .pi-user {
    padding: 0;
  }

  .nav-buttons.open {
    display: flex;
  }

  .profile-btn {
    display: none;
    /* Oculta no mobile */
  }

  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }
}

@media (min-width: 769px) {
  .menu-toggle {
    display: none;
  }

  .nav-buttons {
    display: flex !important;
    position: static;
    background: transparent;
    padding: 0;
  }

  .desktop-only {
    display: flex;
  }

  .mobile-only {
    display: none;
  }
}
</style>
