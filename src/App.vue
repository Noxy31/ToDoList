<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComp from './components/HeaderComp.vue';
import './assets/base.css';
import { provideState } from './store/store';
import { useAuth } from './store/auth';

provideState();
const { isAuthenticated } = useAuth();
</script>

<template>
  <HeaderComp v-if="isAuthenticated && $route.path !== '/'" />

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  padding-top: 10vh;
  padding-left: 5vw;
}
</style>
