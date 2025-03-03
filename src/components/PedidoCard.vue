<template>
    <div class="pedido-card">
      <p><strong>Descrição:</strong> {{ pedido.descricao }}</p>
      <p><strong>Status:</strong> {{ pedido.status }}</p>
      <button v-if="pedido.status === 'pendente'" @click="$emit('entregue')">Marcar como Entregue</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      pedido: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .pedido-card {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
  }
  </style>