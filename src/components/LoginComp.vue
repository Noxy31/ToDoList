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
      alert(errorData.message || 'Error on connecting');
      throw new Error(errorData.message || 'Error on connecting');
    }

    const userData = await response.json();
    console.log('User logged in :', userData);

    const isAdmin = Boolean(userData.user.isAdmin);
    const isAccEnabled = Boolean(userData.user.isAccEnabled);

    state.setAdminStatus(isAdmin);
    state.setAccountStatus(isAccEnabled);
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    localStorage.setItem('isAccEnabled', JSON.stringify(isAccEnabled));

    login();
    router.push('/lists');
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <h1>Welcome to Organiz'heure</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 5vw;
}

h1 {
  font-size: 4rem;
  color: rgb(234, 234, 234);
  margin-bottom: 5vh;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  font-size: 1.2rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  max-width: 100%;
}

button {
  font-size: 1.2rem;
  padding: 0.75rem;
  background-color: rgb(230, 230, 230);
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 300px;
  max-width: 100%;
}

button:hover {
  background-color: rgb(0, 85, 160);
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
