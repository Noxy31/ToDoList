<script setup lang="ts">
import { ref, onMounted } from 'vue';

const users = ref<User[]>([]);
const currentUserId = ref<number | null>(null);

interface User {
  idUser: number;
  fullName: string;
  userMail: string;
  isAccEnabled: boolean;
}

const fetchUsers = async () => {
  try {
    const currentUserResponse = await fetch('api/users/getUserId');
    const currentUserData = await currentUserResponse.json();
    currentUserId.value = currentUserData.id;

    const response = await fetch('api/users');
    const data = await response.json();

    users.value = data.filter((user: User) => user.idUser !== currentUserId.value);
  } catch (error) {
    console.error(error);
  }
};

const toggleUserStatus = async (user: User) => {
  const newStatus = !user.isAccEnabled;

  const message = newStatus
    ? 'Are you sure that you want to enable this account?'
    : 'Are you sure that you want to disable this account?';

  const confirmed = window.confirm(message);
  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`api/users/${user.idUser}/enable-disable`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isAccEnabled: newStatus })
    });

    if (response.ok) {
      user.isAccEnabled = newStatus;
    } else {
      console.error('Error');
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="container">
    <h1>Manage Users</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.idUser">
          <td>{{ user.fullName }}</td>
          <td>{{ user.userMail }}</td>
          <td>{{ user.isAccEnabled ? 'Enabled' : 'Disabled' }}</td>
          <td>
            <button @click="toggleUserStatus(user)">
              {{ user.isAccEnabled ? 'Disable' : 'Enable' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  margin: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 1rem;
  border: 1px solid #ddd;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
