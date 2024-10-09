<script setup lang="ts">
import { ref } from 'vue';

const categoryName = ref('');

const createCategory = async () => {
  try {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: categoryName.value })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de la catégorie');
    }

    const data = await response.json();
    alert(data.message);
    categoryName.value = '';
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    alert('Erreur lors de la création de la catégorie.');
  }
};
</script>

<template>
  <div class="container">
    <h1>Create a new category</h1>
    <form @submit.prevent="createCategory">
      <label for="categoryName">Category name :</label>
      <input type="text" v-model="categoryName" id="categoryName" required />
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  font-size: 1rem;
  justify-content: center;
  margin-right: 5vw;
  margin-top: 8vh;
}
</style>
