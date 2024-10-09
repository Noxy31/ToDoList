<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../store/auth';
import { useState } from '../store/store';

const email = ref('');
const password = ref('');
const router = useRouter();
const { login } = useAuth();
const state = useState();

const handleLogin = async () => {
  try {
    const response = await fetch('api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la connexion');
    }

    const userData = await response.json();
    console.log('Utilisateur connecté :', userData);

    state.setAdminStatus(userData.user.isAdmin === 1);

    login();

    router.push('/home');
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <h1>Connect</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  margin-right: 5vw;
}
h1 {
  font-size: 4rem;
  color: rgb(234, 234, 234);
  margin-bottom: 5vh;
}

p {
  font-size: 4rem;
  color: rgb(234, 234, 234);
  margin-bottom: 10vh;
}

.link {
  font-size: 3rem;
  color: rgb(1, 101, 188);
  text-decoration: none;
}
</style>
