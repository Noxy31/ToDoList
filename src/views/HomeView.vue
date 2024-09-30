<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TodoComp from '../components/TodoComp.vue';
import { Todo } from '../models/Todo';

const monTableau = ref<Todo[]>([]);

onMounted(async () => {
  const todosRequest = await fetch('http://localhost:3000/todos');
  const todos: Todo[] = await todosRequest.json();
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

const deleteTodo = async (id: number, index: number) => {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE'
  });

  monTableau.value.splice(index, 1);
  console.log('Todo supprimé');
};

const onTodoInput = async (newTodoValue: Todo, index: number) => {
  monTableau.value[index] = newTodoValue;

  await fetch(`http://localhost:3000/todos/${newTodoValue.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ label: newTodoValue.label, done: newTodoValue.done })
  });

  console.log('monTableau est mis à jour et la modification est envoyée au serveur');
};
</script>

<template>
  <main>
    <h1>To Do List</h1>
    <button @click="ajouterElement" class="addButt">Ajouter une tâche</button>
    <br />
    <div v-for="(element, index) in monTableau" :key="element.id">
      <TodoComp :todo="element" @onInput="onTodoInput($event, index)" />
      <button @click="deleteTodo(element.id, index)">Supprimer</button>
    </div>
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
