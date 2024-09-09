<script setup lang="ts">
import { ref } from 'vue';
const monTableau = ref([
  { todo: 'apprendre Vue JS', done: false },
  { todo: 'apprendre a faire des boucles', done: false },
  { todo: 'apprendre a griller des saucisses', done: false },
  { todo: 'commencer a dominer' }
]);
</script>

<template>
  <main>
    <p>To Do List</p>
    <!-- <span v-if="monTableau.length % 2 === 0"> Mon tableau est pair</span>
    <span v-else>Mon tableau est impair</span> -->
    <!-- <button @mousemove="ajouterElement()">Ajouter une valeur</button> -->
    <br />
    <span v-for="element in monTableau" :key="element.todo">
      mon élément est {{ element.todo }}
      <input type="checkbox" :checked="element.done" />
      <br />
    </span>
  </main>
</template>
