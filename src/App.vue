<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComp from './components/HeaderComp.vue';

import './assets/base.css';
// const ajouterElement = () => {
//   monTableau.value.push(monTableau.value.length + 1);
// };
</script>

<template>
  <HeaderComp />
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
