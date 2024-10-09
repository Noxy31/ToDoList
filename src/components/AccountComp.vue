<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const user = ref({
  id: null,
  userName: '',
  userSurname: '',
  userMail: '',
  isAdmin: ''
});

const router = useRouter();
const isAdmin = ref(JSON.parse(localStorage.getItem('isAdmin') || 'false'));

const fetchUserInfo = async () => {
  try {
    const response = await fetch('/api/users/info', {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des informations de l'utilisateur");
    }

    const data = await response.json();
    user.value = data;
  } catch (error) {
    console.error('Erreur:', error);
  }
};

onMounted(() => {
  fetchUserInfo();
});

const handleLogout = () => {
  Cookies.remove('token');
  router.push('/');
};
</script>

<template>
  <div class="container">
    <h1 class="title">My account</h1>

    <div class="content">
      <div class="info-section">
        <h2>My informations:</h2>
        <p>Name: {{ user.userName }}</p>
        <p>Surname: {{ user.userSurname }}</p>
        <p>Email: {{ user.userMail }}</p>
        <p>Type: {{ user.isAdmin ? 'Administrator' : 'User' }}</p>
        <button @click="handleLogout">Se déconnecter</button>
      </div>

      <div class="separator"></div>

      <div class="admin-section" v-if="isAdmin">
        <h2>Options:</h2>
        <router-link to="/create-user">
          <button class="create-user-button">Créer un nouvel utilisateur</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
  width: 100%;
}

.title {
  font-size: 3rem;
  margin-bottom: 10vh;
}

.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.info-section {
  flex: 1;
  padding-left: 2vw;
  text-align: left;
  font-size: 1.5rem;
}

h2 {
  margin: 1.5vh 0;
  text-align: left;
  font-size: 2.5rem;
}

button {
  text-decoration: none;
  background-color: #ae4444;
  color: #ebebeb;
  border: none;
  border-radius: 20px;
  padding: 15px 30px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10vh;
}

.separator {
  width: 3px;
  background-color: #c1c1c1;
  margin: 0 20px;
  margin-left: 35vw;
}

.admin-section {
  flex: 1;
  text-align: right;
  padding-right: 2vw;
}

.create-user-button {
  background-color: #ececec;
  color: black;
  text-align: center;
  margin-right: 3vw;
}
</style>
