<script setup lang="ts">
import { useState } from '../store/store';
import { computed } from 'vue';
const state = useState();

const isAdmin = computed(() => state.isAdmin);
</script>

<template>
  <div class="container">
    <h1>Categories</h1>

    <router-link v-if="isAdmin" to="/create-category">
      <button>Create a new category</button>
    </router-link>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.container {
  font-size: 2rem;
  justify-content: center;
  margin-top: 8vh;
  margin-right: 6vw;
}
</style>
