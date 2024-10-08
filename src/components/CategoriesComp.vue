<script>
import { useState } from '../src/store/store.ts';

const state = useState();
const isAdmin = state.isAdmin;
</script>

<template>
  <div>
    <h1>Catégories</h1>

    <router-link v-if="isAdmin" to="/create-category">
      <button>Create a new category</button>
    </router-link>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

h1 {
  font-size: 2rem;
  justify-content: center;
}
</style>
