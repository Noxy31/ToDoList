import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomeComp.vue';
import Account from '../components/AccountComp.vue';
import Login from '../components/LoginComp.vue';
import Lists from '../components/ListsComp.vue';
import CreateListComp from '../components/CreateListComp.vue';
import CreateCategoryComp from '../components/CreateCategoryComp.vue';
import CategoriesComp from '../components/CategoriesComp.vue';
import CreateUserComp from '@/components/CreateUserComp.vue';
import NotFound from '../components/NotFoundComp.vue';
import Cookies from 'js-cookie';
import { useState } from '../store/store';

// On crée les routes de nos vues ici
const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/account', component: Account, meta: { requiresAuth: true } },
  { path: '/lists', component: Lists, meta: { requiresAuth: true } },
  { path: '/create-list', name: 'CreateList', component: CreateListComp, requiresAuth: true },
  { path: '/categories', component: CategoriesComp, meta: { requiresAuth: true } },
  {
    path: '/create-category',
    component: CreateCategoryComp,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/create-user',
    component: CreateUserComp,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!Cookies.get('token');

  const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false');

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next('/');
  } else if (to.matched.some((record) => record.meta.requiresAdmin) && !isAdmin) {
    next('/not-found');
  } else {
    next();
  }
});

export default router;
