import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa o router
import { abilitiesPlugin } from '@casl/vue';
import { buildAbilityFor } from './ability';

// Cria a instância do Vue
const app = createApp(App);

// Usa o router
app.use(router);

// Usa o plugin CASL para controle de permissões
app.use(abilitiesPlugin, buildAbilityFor({ role: 'guest' })); // Define o usuário inicial como "guest"

// Monta o aplicativo no elemento #app
app.mount('#app');