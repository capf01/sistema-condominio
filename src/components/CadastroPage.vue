<template>
  <div class="cadastro">
    <h2>Cadastro</h2>
    <input v-model="nome" placeholder="Nome" />
    <input v-model="email" placeholder="Email" type="email" />
    <input v-model="password" placeholder="Senha" type="password" />
    <input v-model="endereco" placeholder="Endereço (com apt)" />
    <input v-model="cpf" placeholder="CPF (XXX.XXX.XXX-XX)" />
    <input v-model="rg" placeholder="RG" />
    <input v-model="dataNascimento" placeholder="Data de Nascimento (DD/MM/AAAA)" />
    <label for="foto">Foto:</label>
    <input id="foto" type="file" @change="onFileChange" accept="image/*" />
    <button :disabled="loading" @click="cadastrar">
      <span v-if="!loading">Cadastrar</span>
      <span v-else>Carregando...</span>
    </button>
    <p>Já tem uma conta? <router-link to="/">Faça login</router-link></p>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db, storage } from '@/firebase'; // Importe o storage do Firebase
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      nome: '',
      email: '',
      password: '',
      endereco: '',
      cpf: '',
      rg: '',
      dataNascimento: '',
      foto: null, // Armazena o arquivo da foto
      loading: false, // Estado de carregamento
    };
  },
  methods: {
    onFileChange(event) {
      // Captura o arquivo selecionado
      this.foto = event.target.files[0];
    },
    validarCPF(cpf) {
      // Validação básica de CPF (formato XXX.XXX.XXX-XX)
      const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (!regex.test(cpf)) {
        return false;
      }
      // Verifica se todos os dígitos são iguais (ex.: 111.111.111-11)
      const digits = cpf.replace(/\D/g, '');
      return !/(\d)\1{10}/.test(digits);
    },
    validarDataNascimento(data) {
      // Validação básica de data no formato DD/MM/AAAA
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(data)) {
        return false;
      }
      // Extrai dia, mês e ano
      const [dia, mes, ano] = data.split('/').map(Number);
      const dataAtual = new Date();
      const anoAtual = dataAtual.getFullYear();
      const mesAtual = dataAtual.getMonth() + 1;
      const diaAtual = dataAtual.getDate();

      // Verifica se a data é válida
      if (ano > anoAtual || ano < 1900) return false;
      if (mes < 1 || mes > 12) return false;
      if (dia < 1 || dia > 31) return false;

      // Verifica meses com 30 ou 31 dias
      if ([4, 6, 9, 11].includes(mes) && dia > 30) return false;
      if (mes === 2) {
        const isLeapYear = (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
        if (dia > (isLeapYear ? 29 : 28)) return false;
      }

      // Verifica se a data é futura
      if (ano === anoAtual && mes > mesAtual) return false;
      if (ano === anoAtual && mes === mesAtual && dia > diaAtual) return false;

      return true;
    },
    async cadastrar() {
      // Inicia o estado de carregamento
      this.loading = true;

      try {
        // Validação dos campos
        if (!this.nome || !this.email || !this.password || !this.endereco || !this.cpf || !this.rg || !this.dataNascimento || !this.foto) {
          alert('Por favor, preencha todos os campos e selecione uma foto.');
          return;
        }

        // Validação específica de CPF e data de nascimento
        if (!this.validarCPF(this.cpf)) {
          alert('CPF inválido. Use o formato XXX.XXX.XXX-XX.');
          return;
        }
        if (!this.validarDataNascimento(this.dataNascimento)) {
          alert('Data de nascimento inválida. Use o formato DD/MM/AAAA.');
          return;
        }

        const authInstance = getAuth();

        // Cria o usuário no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(authInstance, this.email, this.password);
        const user = userCredential.user;

        // Faz o upload da foto para o Firebase Storage
        const storageRef = ref(storage, `fotos/${user.uid}/${this.foto.name}`);
        await uploadBytes(storageRef, this.foto);
        const fotoUrl = await getDownloadURL(storageRef);

        // Salva os dados do usuário no Firestore
        await setDoc(doc(db, 'moradores', user.uid), {
          nome: this.nome,
          email: this.email,
          endereco: this.endereco,
          cpf: this.cpf,
          rg: this.rg,
          dataNascimento: this.dataNascimento,
          fotoUrl: fotoUrl, // URL da foto no Storage
          pedidos: [],
        });

        alert('Cadastro realizado com sucesso!');
        this.$router.push('/dashboard-morador');
      } catch (error) {
        alert('Erro ao cadastrar: ' + error.message);
      } finally {
        // Finaliza o estado de carregamento
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.cadastro {
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

p {
  margin-top: 10px;
}
</style>