<template>
  <div id="app">
    <!-- Barra de navegação -->
    <nav v-if="showNavbar">
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard-morador" v-if="isMorador">Dashboard Morador</router-link>
      <router-link to="/dashboard-funcionario" v-if="isFuncionario">Dashboard Funcionário</router-link>
      <router-link to="/gerar-cartao" v-if="isMorador">Gerar Cartão</router-link>
      <button @click="logout" v-if="isAuthenticated">Logout</button>
    </nav>

    <!-- Renderiza as páginas -->
    <router-view />
  </div>
</template>

<script>
import { auth } from '@/firebase';

export default {
  data() {
    return {
      isAuthenticated: false,
      isMorador: false,
      isFuncionario: false,
    };
  },
  computed: {
    showNavbar() {
      // Mostra a navbar apenas nas páginas que não são Home, Login ou Cadastro
      return this.$route.path !== '/' && this.$route.path !== '/login' && this.$route.path !== '/cadastro';
    },
  },
  created() {
    // Verifica o estado de autenticação
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.isMorador = !user.email.endsWith('@condominio.com');
        this.isFuncionario = user.email.endsWith('@condominio.com');
      } else {
        this.isAuthenticated = false;
        this.isMorador = false;
        this.isFuncionario = false;
      }
    });
  },
  methods: {
    async logout() {
      try {
        await auth.signOut();
        this.$router.push('/');
      } catch (error) {
        alert('Erro ao fazer logout: ' + error.message);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 20px;
  background-color: #42b983;
}

nav a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

button {
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #cc0000;
}
</style>