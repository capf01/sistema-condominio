<template>
  <div class="gerar-cartao">
    <h2>Meu Cartão</h2>
    <div class="cartao">
      <img :src="morador.foto" alt="Foto do Morador" class="foto" />
      <div class="dados">
        <p><strong>Nome:</strong> {{ morador.nome }}</p>
        <p><strong>Email:</strong> {{ morador.email }}</p>
      </div>
      <vue-qrcode :value="qrCodeData" :options="{ width: 150 }" class="qr-code" />
    </div>
  </div>
</template>

<script>
import VueQrcode from 'vue-qrcode';
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../firebase';

export default {
  components: { VueQrcode },
  data() {
    return {
      morador: {
        nome: '',
        email: '',
        foto: '', // URL da foto do morador
      },
      qrCodeData: '',
    };
  },
  async created() {
    const user = auth.currentUser;
    if (user) {
      try {
        // Busca os dados do morador no Firestore
        const moradorDoc = await getDoc(doc(db, 'moradores', user.uid));
        if (moradorDoc.exists()) {
          this.morador = moradorDoc.data();

          // Gera os dados para o QR Code
          this.qrCodeData = JSON.stringify({
            moradorId: user.uid,
            nome: this.morador.nome,
          });
        } else {
          alert("Dados do morador não encontrados.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do morador:", error.message);
        alert("Erro ao carregar os dados do morador. Tente novamente.");
      }
    } else {
      alert("Você precisa estar logado para acessar esta página.");
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.gerar-cartao {
  padding: 20px;
}

.cartao {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.foto {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover; /* Garante que a imagem fique bem ajustada */
}

.dados {
  flex: 1;
}

.qr-code {
  margin-left: auto;
}
</style>