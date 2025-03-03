<template>
  <div class="home">
    <!-- Imagem de boas-vindas -->
    <img src="@/assets/images/logo_porta_f_cil_bonito_e_moderno_nas-removebg-preview.png" alt="Bem-vindo ao Sistema de Condomínio" class="welcome-image" />

    <!-- Título de boas-vindas -->
    <h1>Bem-vindo ao Sistema de Condomínio</h1>

    <!-- Links de navegação -->
    <div class="actions">
      <router-link to="/login-funcionario" class="btn funcionario-btn">Entrar como Funcionário</router-link>
      <router-link to="/login" class="btn morador-btn">Entrar como Morador</router-link>
      <router-link to="/cadastro" class="btn cadastro-btn">Cadastrar-se</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
}

.welcome-image {
  width: 200px; /* Ajuste o tamanho da imagem conforme necessário */
  height: auto; /* Mantém a proporção da imagem */
  margin-bottom: 20px; /* Espaçamento entre a imagem e o título */
  border-radius: 50%; /* Bordas arredondadas (opcional) */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra (opcional) */
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.actions {
  display: flex;
  flex-direction: column; /* Alterado para coluna para melhor organização */
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-weight: bold;
  text-align: center;
}

.funcionario-btn {
  background-color: #42b983;
  color: white;
}

.funcionario-btn:hover {
  background-color: #369f6e;
}

.morador-btn {
  background-color: #ff7f50;
  color: white;
}

.morador-btn:hover {
  background-color: #cc6640;
}

.cadastro-btn {
  background-color: #6a5acd; /* Cor roxa para o botão de cadastro */
  color: white;
}

.cadastro-btn:hover {
  background-color: #5c40d6; /* Tom mais escuro ao passar o mouse */
}
</style>