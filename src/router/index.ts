import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Login from '../components/LoginComp.vue';

// On crée les routes de nos vues ici
const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/about', component: About, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// On protège les routes avec beforeEach pour checker si un tilisateur est connecté
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next('/'); // Rediriger vers la page de login si l'utilisateur n'est pas authentifié
  } else {
    next();
  }
});

export default router;
