<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComp from './components/HeaderComp.vue';
import './assets/base.css';
</script>

<template>
  <HeaderComp v-if="$route.path !== '/'" />
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
