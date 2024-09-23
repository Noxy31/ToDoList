<script setup lang="ts">
import { ref } from 'vue';
import TodoComp from '../components/TodoComp.vue';

const monTableau = ref([
  { todo: 'apprendre Vue JS', done: false },
  { todo: 'apprendre a faire des boucles', done: false },
  { todo: 'apprendre a griller des saucisses', done: false },
  { todo: 'commencer a dominer le monde', done: false },
  { todo: 'boire moins de café et travailler plus', done: false }
]);

onMounted(async () => {
  const todosRequest = await fetch('http://localhost:3000/todos');
  const todos = await todosRequest.json();
  monTableau.value = [...todos];
});

const ajouterElement = () => {
  monTableau.value.push({ todo: 'Nouvelle tache', done: false });
};

const onTodoInput = (newTodoValue: any, index: number) => {
  monTableau.value[index] = newTodoValue;
  console.log('monTableau est mis a jour');
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
