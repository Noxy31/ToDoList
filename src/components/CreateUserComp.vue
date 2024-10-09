<script setup lang="ts">
import { ref } from 'vue';

const userName = ref('');
const userSurname = ref('');
const userMail = ref('');
const hashedPass = ref('');
const isAdmin = ref(false);
const isAccEnabled = ref(true);

const createUser = async () => {
  try {
    const response = await fetch('api/users/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: userName.value,
        userSurname: userSurname.value,
        userMail: userMail.value,
        hashedPass: hashedPass.value,
        isAdmin: isAdmin.value,
        isAccEnabled: isAccEnabled.value
      })
    });

    if (!response.ok) {
      throw new Error("Erreur sur la craétion de l'utilisateur");
    }

    alert('User successfully created !');
  } catch (error) {
    console.error("Erreur sur la création de l'utilisateur :", error);
    alert('Erreur création utilisateur');
  }
};
</script>

<template>
  <div class="create-user-container">
    <h2>Create User</h2>
    <form @submit.prevent="createUser">
      <div>
        <label for="userName">Name :</label>
        <input type="text" id="userName" v-model="userName" required />
      </div>
      <div>
        <label for="userSurname">Surname :</label>
        <input type="text" id="userSurname" v-model="userSurname" required />
      </div>
      <div>
        <label for="userMail">Email :</label>
        <input type="email" id="userMail" v-model="userMail" required />
      </div>
      <div>
        <label for="hashedPass">Password :</label>
        <input type="text" id="hashedPass" v-model="hashedPass" required />
        <!-- le type password n'est pas pratique, pas besoin de cacher le mot de passe pour un admin -->
      </div>
      <div>
        <label> <input type="checkbox" v-model="isAdmin" /> Admin </label>
      </div>
      <div>
        <label> <input type="checkbox" v-model="isAccEnabled" /> Enabled </label>
      </div>
      <button type="submit">Créer l'utilisateur</button>
    </form>
  </div>
</template>

<style scoped>
.create-user-container {
  margin: 20px;
  font-size: 1.2rem;
}
</style>
