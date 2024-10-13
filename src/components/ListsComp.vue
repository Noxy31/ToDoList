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
  computed: {
    publicLists() {
      return this.lists.filter((list) => !list.isPersonnal);
    },
    personalLists() {
      return this.lists.filter((list) => list.isPersonnal);
    }
  },
  methods: {
    async redirectCreationList() {
      this.$router.push({ name: 'CreateList' });
    },
    async redirectToArchivedLists() {
      this.$router.push({ name: 'ArchivedComp' });
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
    },
    redirectToTaskList(listId: number) {
      this.$router.push({ name: 'TaskListsComp', params: { idList: listId } });
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
      <button @click="redirectToArchivedLists" class="addButt">Archived Lists</button>
    </div>
    <div v-if="loading">Loading lists...</div>
    <div class="lists-wrapper">
      <div class="public-lists">
        <div class="list-grid">
          <div
            class="list-card"
            v-for="list in publicLists"
            :key="list.idList"
            @click="redirectToTaskList(list.idList)"
          >
            <h3>{{ list.labelList }}</h3>
            <p>Created on: {{ formatDate(list.listCreationTime) }}</p>
            <p>Status: {{ list.isPersonnal ? 'Personal' : 'Public' }}</p>
          </div>
        </div>
      </div>
      <div class="divider"></div>

      <div class="personal-lists">
        <h2>Personnal Lists</h2>
        <div
          v-for="list in personalLists"
          :key="list.idList"
          class="list-card"
          @click="redirectToTaskList(list.idList)"
        >
          <h3>{{ list.labelList }}</h3>
          <p>Created on: {{ formatDate(list.listCreationTime) }}</p>
          <p>Status: {{ list.isPersonnal ? 'Personnal' : 'Public' }}</p>
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

button {
  margin-left: 2vw;
  margin-right: 2vw;
}

.button-container {
  margin-bottom: 8vh;
}

.lists-wrapper {
  display: flex;
  gap: 2vw;
}

.public-lists {
  flex: 1;
  margin-bottom: 5vh;
}

.personal-lists {
  flex: 1;
  margin-bottom: 5vh;
}

.personal-lists h2 {
  margin-bottom: 1.5rem;
}

.list-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  margin-left: 2vw;
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

.divider {
  width: 1px;
  background-color: #ccc;
  height: auto;
  margin: 0 2vw;
}
</style>
