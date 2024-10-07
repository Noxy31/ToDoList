import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Login from '../components/LoginComp.vue';
import Cookies from 'js-cookie';

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

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!Cookies.get('token');

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
