<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListsComp',
  data() {
    return {
      lists: [] as any[],
      loading: true
    };
  },
  methods: {
    async redirectCreationList() {
      this.$router.push({ name: 'CreateList' });
    },
    async fetchUserId() {
      try {
        const response = await fetch('api/users/getUserId', {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de l'ID de l'utilisateur");
        }

        const { id } = await response.json();
        console.log(`L'ID de l'utilisateur actuellement connecté est : ${id}`);
        return id;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async fetchLists() {
      const userId = await this.fetchUserId();
      if (!userId) return;

      try {
        const response = await fetch(`api/list/${userId}`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des listes');
        }

        const data = await response.json();
        this.lists = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(timestamp: string) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    }
  },
  mounted() {
    this.fetchLists();
  }
});
</script>

<template>
  <div class="container">
    <h1>My Lists</h1>
    <div class="button-container">
      <button @click="redirectCreationList" class="addButt">Create a List</button>
    </div>
    <div v-if="loading">Loading lists...</div>
    <ul v-if="!loading && lists.length">
      <li v-for="list in lists" :key="list.idList">
        <h3>{{ list.labelList }}</h3>
        <p>Créée le : {{ formatDate(list.listCreationTime) }}</p>
        <p>Statut : {{ list.isPersonnal ? 'Personnelle' : 'Publique' }}</p>
      </li>
    </ul>
    <div v-else>
      <p>No list found.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-size: 2rem;
  justify-content: center;
  margin-right: 5vw;
  margin-top: 5vh;
}

h1 {
  margin-bottom: 5vh;
  font-size: 3rem;
}
</style>
