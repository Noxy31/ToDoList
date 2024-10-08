<script setup>
import { ref } from 'vue';

const categoryName = ref('');

const createCategory = async () => {
  try {
    const response = await axios.post('/api/categories', { name: categoryName.value });
    alert(response.data.message);
    categoryName.value = '';
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    alert('Erreur lors de la création de la catégorie.');
  }
};
</script>

<template>
  <div>
    <h1>Créer une nouvelle catégorie</h1>
    <form @submit.prevent="createCategory">
      <label for="categoryName">Category name :</label>
      <input type="text" v-model="categoryName" id="categoryName" required />

      <button type="submit">Créer</button>
    </form>
  </div>
</template>
