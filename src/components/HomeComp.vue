<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Task } from '../models/Task';
import { useRouter } from 'vue-router';

const monTableau = ref<Task[]>([]);
const router = useRouter();

onMounted(async () => {
  const todosRequest = await fetch('api/tasks');
  const todos: Task[] = await todosRequest.json();
  monTableau.value = [...todos];
});

const redirigerVersCreationListe = () => {
  router.push({ name: 'CreateList' });
};
</script>

<template>
  <main>
    <div class="container">
      <div class="button-container">
        <button @click="redirigerVersCreationListe" class="addButt">Create a List</button>
      </div>
      <br />
    </div>
  </main>
</template>

<style>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  margin-right: 5vw;
}

.container {
  margin-right: 5vw;
}

.button-container {
  margin-bottom: 20px;
}

.task-list {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.addButt {
  text-decoration: none;
  background-color: #c1c1c1;
  color: #000000;
  border: none;
  border-radius: 20px;
  padding: 15px 30px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.addButt:hover {
  background-color: #a1a1a1;
}
</style>
