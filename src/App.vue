<script setup lang="ts">
import { ref } from 'vue'

const monTableau = ref([1, 2, 3, 4])

const ajouterElement = () => {
  monTableau.value.push(monTableau.value.length + 1)
}
</script>

<template>
  <p>Hello World</p>
  <span v-if="monTableau.length % 2 === 0"> Mon tableau est pair</span>
  <span v-else>Mon tableau est impair</span>
  <button @mousemove="ajouterElement()">Ajouter une valeur</button>
  <br />
  <span v-for="element in monTableau" v-bind:key="element"> mon élément est {{ element }} </span>
</template>

<style scoped></style>
