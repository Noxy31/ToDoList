<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useState } from '../store/store';

const categories = ref<any[]>([]);
const users = ref<any[]>([]);
const selectedUser = ref<number | null>(null);
const state = useState();

const isAdmin = ref(state.isAdmin || JSON.parse(localStorage.getItem('isAdmin') || 'false'));

const fetchCategories = async () => {
  try {
    const response = await fetch('api/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories');
    }

    const data = await response.json();
    categories.value = data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
  }
};

const fetchUsers = async () => {
  try {
    const response = await fetch('api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }

    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
  }
};

const assignUserToCategory = async (idCategory: number) => {
  if (selectedUser.value) {
    try {
      const response = await fetch('api/users/assign-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idUser: selectedUser.value, idCategory })
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'assignation de l'utilisateur");
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Erreur lors de l'assignation de l'utilisateur :", error);
      alert("Erreur lors de l'assignation de l'utilisateur.");
    }
  } else {
    alert('Veuillez sélectionner un utilisateur.');
  }
};

onMounted(() => {
  if (isAdmin.value) {
    fetchCategories();
    fetchUsers();
  }
});
</script>

<template>
  <div class="container">
    <h1>Categories</h1>
    <router-link v-if="isAdmin" to="/create-category">
      <button class="catButton">Create a new category</button>
    </router-link>
    <div v-if="isAdmin">
      <ul>
        <li v-for="category in categories" :key="category.idCategory">
          {{ category.labelCategory }}
          <div>
            <select v-model="selectedUser">
              <option disabled value="">Select user</option>
              <option v-for="user in users" :key="user.idUser" :value="user.idUser">
                {{ user.fullName }}
              </option>
            </select>
            <button @click="assignUserToCategory(category.idCategory)">Assign user</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 5vh;
}
.container {
  font-size: 2rem;
  justify-content: center;
  margin-top: 8vh;
  margin-right: 6vw;
}

.catButton {
  text-decoration: none;
  background-color: #c1c1c1;
  color: #000000;
  border: none;
  border-radius: 20px;
  padding: 15px 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 5vh;
}

select {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
