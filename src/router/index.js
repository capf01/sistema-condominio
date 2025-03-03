import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/firebase';

// Importação dos componentes
const HomePage = () => import('@/views/HomePage.vue');
const LoginComponent = () => import('@/components/LoginComponent.vue');
const CadastroPage = () => import('@/components/CadastroPage.vue');
const DashboardMorador = () => import('@/components/DashboardMorador.vue');
const DashboardFuncionario = () => import('@/components/DashboardFuncionario.vue');
const GerarCartao = () => import('@/components/GerarCartao.vue');
const LoginFuncionario = () => import('@/components/LoginFuncionario.vue');
const CadastroFuncionario = () => import('@/components/CadastroFuncionario.vue');

// Definição das rotas
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: CadastroPage,
  },
  {
    path: '/cadastro-funcionario',
    name: 'CadastroFuncionario',
    component: CadastroFuncionario,
    meta: { requiresAuth: true, role: 'admin' }, // Apenas administradores podem acessar
  },
  {
    path: '/dashboard-morador',
    name: 'DashboardMorador',
    component: DashboardMorador,
    meta: { requiresAuth: true, role: 'morador' }, // Rota exclusiva para moradores
  },
  {
    path: '/dashboard-funcionario',
    name: 'DashboardFuncionario',
    component: DashboardFuncionario,
    meta: { requiresAuth: true, role: 'funcionario' }, // Rota exclusiva para funcionários
  },
  {
    path: '/gerar-cartao',
    name: 'GerarCartao',
    component: GerarCartao,
    meta: { requiresAuth: true }, // Rota autenticada (sem distinção de role)
  },
  {
    path: '/login-funcionario',
    name: 'LoginFuncionario',
    component: LoginFuncionario,
  },
];

// Criação do roteador
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Função para verificar permissões
async function checkPermissions(to, user) {
  try {
    const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
    if (!userDoc.exists()) {
      console.error('Dados do usuário não encontrados.');
      alert('Dados do usuário não encontrados.');
      return false;
    }

    const userData = userDoc.data();
    console.log('Role do usuário:', userData.role);
    console.log('Role necessária:', to.meta.role);

    // Verifica se a role do usuário corresponde à rota
    if (to.meta.role && userData.role !== to.meta.role) {
      alert('Você não tem permissão para acessar esta área.');
      return false;
    }

    return true; // Permissão concedida
  } catch (error) {
    console.error('Erro ao verificar permissões:', error.message);
    alert('Erro ao verificar permissões. Tente novamente mais tarde.');
    return false;
  }
}

// Proteção de rotas
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth) {
    const authInstance = getAuth();
    const user = authInstance.currentUser;

    if (!user) {
      console.log('Usuário não autenticado. Redirecionando para /login.');
      next('/login'); // Redireciona para a página de login se não estiver autenticado
      return;
    }

    const hasPermission = await checkPermissions(to, user);
    if (!hasPermission) {
      console.log('Permissão negada. Redirecionando para /.');
      next('/'); // Redireciona para a página inicial
      return;
    }

    next(); // Permite acesso à rota
  } else {
    next(); // Rota não requer autenticação, permite acesso
  }
});

export default router;