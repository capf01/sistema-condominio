<template>
  <div class="dashboard">
    <h2>Dashboard Morador</h2>
    <ul>
      <li v-for="morador in moradores" :key="morador.id">
        {{ morador.nome }} - {{ morador.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase';

export default {
  data() {
    return {
      moradores: [], // Armazena os dados dos moradores
    };
  },
  async created() {
    try {
      const moradoresRef = collection(db, 'moradores'); // Referência à coleção
      const querySnapshot = await getDocs(moradoresRef); // Obtém os documentos da coleção

      this.moradores = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Erro ao acessar o Firestore:", error.message);
    }
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
}
</style>