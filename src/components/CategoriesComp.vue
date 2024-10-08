<script setup>
import { useState } from './store'; // Assure-toi que c'est le bon chemin vers ton fichier de store

const state = useState();
const isAdmin = state.isAdmin; // Récupérer le statut d'administrateur
</script>

<template>
  <div>
    <h1>Catégories</h1>

    <router-link v-if="isAdmin" to="/create-category">
      <button>Créer une nouvelle catégorie</button>
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
