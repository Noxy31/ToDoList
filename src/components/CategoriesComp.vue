<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useState } from '../store/store';

const categories = ref<any[]>([]);
const userCategories = ref<any[]>([]); // Catégories affectées à l'utilisateur
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

const fetchUserCategories = async () => {
  try {
    const response = await fetch('api/categories/users-categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories de l’utilisateur');
    }

    const data = await response.json();
    userCategories.value = data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories de l’utilisateur :', error);
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
  fetchCategories();
  if (isAdmin.value) {
    fetchUsers();
  } else {
    fetchUserCategories();
  }
});
</script>

<template>
  <div class="container">
    <h1>{{ isAdmin ? 'Categories' : 'My Categories' }}</h1>

    <router-link v-if="isAdmin" to="/create-category">
      <button class="catButton">Create a new category</button>
    </router-link>

    <div v-if="isAdmin">
      <ul class="list">
        <div v-for="category in categories" :key="category.idCategory">
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
        </div>
      </ul>
    </div>

    <div v-else>
      <div class="categories-container">
        <div v-for="category in userCategories" :key="category.idCategory" class="category-card">
          <h2>{{ category.labelCategory }}</h2>
          <p>Lists:</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 5vh;
  font-size: 3rem;
}
.container {
  justify-content: center;
  margin-top: 5vh;
  margin-right: 5vw;
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

.list {
  font-size: 2rem;
  margin-right: 2.2vw;
  margin-bottom: 5vh;
}

.categories-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: left;
}

.category-card {
  flex-direction: column;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2 2px 4px rgba(255, 255, 255, 0.1);
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.category-card h2 {
  margin: 0;
  font-size: 2rem;
}

.category-card p {
  margin: 10px 0 0 0; /* Espacement sous le texte "Lists :" */
  font-size: 1.5rem; /* Taille du texte "Lists :" */
}
</style>
