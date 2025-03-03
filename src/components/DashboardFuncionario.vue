<template>
  <div class="dashboard-funcionario">
    <h2>Dashboard do Funcionário</h2>
    <p>Bem-vindo, {{ nome }}!</p>

    <!-- Botões para administrador -->
    <div v-if="isAdmin">
      <button @click="cadastrarNovoFuncionario">Cadastrar Novo Funcionário</button>
      <button @click="alterarFuncionario">Alterar Funcionário</button>
    </div>

    <button @click="logout">Sair</button>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Importa funções do Firestore
import { db } from '@/firebase'; // Importa a instância do Firestore

export default {
  data() {
    return {
      nome: '',
      isAdmin: false, // Indica se o usuário é administrador
    };
  },
  async created() {
    const authInstance = getAuth();
    const user = authInstance.currentUser;

    if (user) {
      // Define o nome ou email do usuário
      this.nome = user.displayName || user.email;

      // Verifica se o usuário é administrador
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.isAdmin = userData.role === 'admin';
      }
    }
  },
  methods: {
    logout() {
      const authInstance = getAuth();
      signOut(authInstance)
        .then(() => {
          alert('Logout realizado com sucesso!');
          this.$router.push('/');
        })
        .catch((error) => {
          alert('Erro ao fazer logout: ' + error.message);
        });
    },
    cadastrarNovoFuncionario() {
      this.$router.push('/cadastro-funcionario'); // Redireciona para a página de cadastro de funcionários
    },
    alterarFuncionario() {
      this.$router.push('/alterar-funcionario'); // Redireciona para a página de alteração de funcionários
    },
  },
};
</script>

<style scoped>
.dashboard-funcionario {
  padding: 20px;
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #ff7f50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

button:hover {
  background-color: #cc6640;
}
</style>