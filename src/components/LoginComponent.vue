<template>
  <div class="login-morador">
    <h2>Login de Morador</h2>
    <input v-model="email" placeholder="Email" type="email" />
    <input v-model="password" placeholder="Senha" type="password" />
    <button @click="login">Entrar</button>
    <p><router-link to="/">Voltar ao Login Geral</router-link></p>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const authInstance = getAuth();
      try {
        // Autentica o usuário no Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(authInstance, this.email, this.password);
        const user = userCredential.user;

        // Busca os dados do usuário no Firestore
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Verifica se o usuário é um morador
          if (userData.role === 'morador') {
            alert('Login de morador realizado com sucesso!');
            this.$router.push('/dashboard-morador');
          } else {
            alert('Você não tem permissão para acessar esta área.');
            authInstance.signOut(); // Desloga o usuário
          }
        } else {
          alert('Dados do usuário não encontrados.');
        }
      } catch (error) {
        alert('Erro ao fazer login: ' + error.message);
      }
    },
  },
};
</script>

<style scoped>
.login-morador {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
}

input {
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #ff7f50; /* Cor diferente para diferenciar de funcionários */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #cc6640;
}

p {
  margin-top: 10px;
}
</style>