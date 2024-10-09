<template>
  <div class="container">
    <h1>404 - Page not found</h1>
    <p>The page you're trying to access to doesn't exist.</p>
    <router-link to="/home" class="link">Back to homepage</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  margin-right: 5vw;
  margin-top: 8vh;
}
h1 {
  font-size: 4rem;
  color: rgb(234, 234, 234);
}

p {
  font-size: 3rem;
  color: rgb(234, 234, 234);
  margin-bottom: 10vh;
}

.link {
  font-size: 2rem;
  color: rgb(1, 101, 188);
  text-decoration: none;
}
</style>
