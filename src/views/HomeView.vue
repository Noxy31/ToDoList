<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TodoComp from '../components/TodoComp.vue';

const monTableau = ref<any[]>([]);

onMounted(async () => {
  const todosRequest = await fetch('http://localhost:3000/todos');
  const todos = await todosRequest.json();
  monTableau.value = [...todos];
});

const ajouterElement = async () => {
  const nouvelleTache = { label: 'Nouvelle tâche', done: false };

  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nouvelleTache)
  });

  if (response.ok) {
    const nouvelleTacheAjoutee = await response.json();

    monTableau.value.push(nouvelleTacheAjoutee);
  } else {
    console.error("Erreur lors de l'ajout de la tâche");
  }
};

const onTodoInput = (newTodoValue: any, index: number) => {
  monTableau.value[index] = newTodoValue;
  console.log('monTableau est mis à jour');
};
</script>

<template>
  <main>
    <h1>To Do List</h1>
    <button @click="ajouterElement" class="addButt">Ajouter une tâche</button>
    <br />

    <TodoComp
      v-for="(element, index) in monTableau"
      :key="index"
      :todo="element"
      @onInput="onTodoInput($event, index)"
    />
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
h1 {
  font-size: 7rem;
  color: #dfdede;
  text-align: center;
  padding-right: 10vw;
  padding-bottom: 5vh;
}

span {
  font-size: 2rem;
  justify-content: center;
}

main {
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
  margin-bottom: 5vh;
  display: inline-block;
}

.addButt:hover {
  background-color: #a1a1a1;
}
</style>
