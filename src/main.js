// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa o router

// Cria a instância do Vue e monta o app
createApp(App)
  .use(router) // Usa o router
  .mount('#app');