<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'ListsComp',
  setup() {
    const lists = ref<any[]>([]);
    const loading = ref(true);

    const fetchUserId = async () => {
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
    };

    const fetchLists = async () => {
      const userId = await fetchUserId();
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
        lists.value = data;
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (timestamp: string) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    };

    onMounted(fetchLists);

    return {
      lists,
      loading,
      formatDate
    };
  }
});
</script>

<template>
  <div class="container">
    <h1>My Lists</h1>
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
  margin-top: 8vh;
}
</style>
