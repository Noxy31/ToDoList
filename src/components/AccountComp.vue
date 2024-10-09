<script setup lang="ts">
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const router = useRouter();

const handleLogout = () => {
  Cookies.remove('token');
  router.push('/');
};
</script>

<template>
  <div class="container">
    <h1>My account</h1>
    <button @click="handleLogout">Se déconnecter</button>
  </div>
</template>

<style scoped>
.container {
  margin-right: 5vw;
}

h1 {
  font-size: 3rem;
  color: rgb(234, 234, 234);
  margin-bottom: 5vh;
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
}
</style>
