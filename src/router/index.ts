import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomeComp.vue';
import Account from '../components/AccountComp.vue';
import Login from '../components/LoginComp.vue';
import Categories from '../components/CategoriesComp.vue';
import Lists from '../components/ListsComp.vue';
import Cookies from 'js-cookie';

// On crée les routes de nos vues ici
const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/account', component: Account, meta: { requiresAuth: true } },
  { path: '/lists', component: Lists, meta: { requiresAuth: true } },
  { path: '/categories', component: Categories, meta: { requiresAuth: true } }
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
