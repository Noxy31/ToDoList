<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../store/auth'; // Importation de useAuth

// Variables pour stocker les valeurs du formulaire
const email = ref('');
const password = ref('');
const router = useRouter();
const { login } = useAuth(); // Récupère la fonction login de useAuth

// Fonction de gestion de la connexion
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

    // Appelle la fonction `login` pour mettre à jour l'état d'authentification
    login();

    // Redirection vers la page d'accueil après connexion
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
