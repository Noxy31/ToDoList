<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const archivedComp = ref<any[]>([]);

const router = useRouter();

const fetchArchivedLists = async () => {
  try {
    const response = await fetch('/api/list/archived', {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error fetching archived lists: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Archived lists fetched:', data);
    archivedComp.value = data;
  } catch (error) {
    console.error('Error in fetchArchivedLists:', error);
  }
};

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

const redirectToTaskList = (listId: number) => {
  router.push({ name: 'TaskListsComp', params: { idList: listId } });
};

onMounted(fetchArchivedLists);
</script>

<template>
  <div class="container">
    <h1>Archived Lists</h1>
    <div class="lists-wrapper">
      <div class="list-grid">
        <div
          class="list-card"
          v-for="list in archivedComp"
          :key="list.idList"
          @click="redirectToTaskList(list.idList)"
        >
          <h3>{{ list.labelList }}</h3>
          <p>Created on: {{ formatDate(list.listCreationTime) }}</p>
          <p>Status: {{ list.isArchived ? 'Archived' : 'Active' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-size: 1.6rem;
  margin-top: 5vh;
}

h1 {
  font-size: 3rem;
  margin-bottom: 4vh;
}

.lists-wrapper {
  display: flex;
  justify-content: center; /* Centrer les colonnes */
}

.list-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colonnes */
  gap: 2rem;
}

.list-card {
  background-color: #1f1f1f;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-width: 250px;
  max-width: 300px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: left;
  margin-bottom: 1rem;
  transition:
    background-color 0.3s,
    transform 0.3s;
}

.list-card:hover {
  background-color: #2a2a2a;
  transform: scale(1.05);
  cursor: pointer;
}

.list-card h3 {
  font-size: 1.3rem;
}

.list-card p {
  font-size: 1rem;
  margin: 0.5rem 0;
}
</style>
