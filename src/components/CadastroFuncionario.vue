<template>
    <div class="cadastro-funcionario">
      <h2>Cadastro de Funcionário</h2>
      <input v-model="nome" placeholder="Nome" />
      <input v-model="email" placeholder="Email" type="email" />
      <input v-model="password" placeholder="Senha" type="password" />
      <button @click="cadastrar">Cadastrar</button>
      <p><router-link to="/dashboard-funcionario">Voltar ao Dashboard</router-link></p>
    </div>
  </template>
  
  <script>
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { doc, setDoc, getDoc } from "firebase/firestore";
  import { db } from '@/firebase';
  
  export default {
    data() {
      return {
        nome: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async cadastrar() {
        const authInstance = getAuth();
        const user = authInstance.currentUser;
  
        // Verifica se há um usuário logado
        if (!user) {
          alert('Você precisa estar logado para realizar esta ação.');
          this.$router.push('/login-funcionario');
          return;
        }
  
        // Verifica se o usuário logado é o administrador
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        if (!userDoc.exists() || userDoc.data().role !== 'admin') {
          alert('Apenas o administrador pode cadastrar funcionários.');
          this.$router.push('/dashboard-funcionario');
          return;
        }
  
        try {
          // Cria o novo funcionário no Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(authInstance, this.email, this.password);
          const newUser = userCredential.user;
  
          // Salva os dados do funcionário no Firestore
          await setDoc(doc(db, 'usuarios', newUser.uid), {
            nome: this.nome,
            email: this.email,
            role: 'funcionario',
          });
  
          alert('Funcionário cadastrado com sucesso!');
          this.$router.push('/dashboard-funcionario');
        } catch (error) {
          alert('Erro ao cadastrar funcionário: ' + error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .cadastro-funcionario {
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
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #369f6e;
  }
  
  p {
    margin-top: 10px;
  }
  </style>