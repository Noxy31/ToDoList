import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomeComp.vue';
import Account from '../components/AccountComp.vue';
import Login from '../components/LoginComp.vue';
import Lists from '../components/ListsComp.vue';
import CreateListComp from '../components/CreateListComp.vue';
import CreateCategoryComp from '../components/CreateCategoryComp.vue';
import CategoriesComp from '../components/CategoriesComp.vue';
import CreateUserComp from '@/components/CreateUserComp.vue';
import ManageUserComp from '@/components/ManageUserComp.vue';
import NotFound from '../components/NotFoundComp.vue';
import Cookies from 'js-cookie';
import { useState } from '../store/store';

// On crée les routes de nos vues ici
const routes = [
  { path: '/', component: Login },
  {
    path: '/home',
    component: Home,
    name: 'Home',
    meta: { requiresAuth: true, requiresEnabled: true }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { requiresAuth: true, requiresEnabled: true }
  },
  {
    path: '/lists',
    name: 'Lists',
    component: Lists,
    meta: { requiresAuth: true, requiresEnabled: true }
  },
  {
    path: '/create-list',
    name: 'CreateList',
    component: CreateListComp,
    meta: { requiresAuth: true, requiresEnabled: true }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: CategoriesComp,
    meta: { requiresAuth: true, requiresEnabled: true }
  },
  {
    path: '/create-category',
    name: 'Create Categories',
    component: CreateCategoryComp,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/create-user',
    name: 'Create User',
    component: CreateUserComp,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/manage-users',
    name: 'Manage Users',
    component: ManageUserComp,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = !!Cookies.get('token');
  const state = useState();
  const isAdmin = state.isAdmin;
  const isAccEnabled = state.isAccEnabled;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/');
      return;
    }

    if (to.matched.some((record) => record.meta.requiresEnabled) && !isAccEnabled) {
      next('/');
      return;
    }
  }

  if (to.matched.some((record) => record.meta.requiresAdmin) && !isAdmin) {
    next('/not-found');
  } else {
    next();
  }
});

export default router;
