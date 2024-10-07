<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TaskComp from '../components/TaskComp.vue';
import { Task } from '../models/Task';

const monTableau = ref<Task[]>([]);

onMounted(async () => {
  const todosRequest = await fetch('api/tasks');
  const todos: Task[] = await todosRequest.json();
  monTableau.value = [...todos];
});

const ajouterElement = async () => {
  const nouvelleTache = { labelTask: 'Nouvelle tâche', done: false };

  const response = await fetch('api/tasks', {
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
  await fetch(`api/tasks/${id}`, {
    method: 'DELETE'
  });

  monTableau.value.splice(index, 1);
  console.log('Task supprimée');
};

const onTodoInput = async (newTodoValue: Task, index: number) => {
  monTableau.value[index] = newTodoValue;

  await fetch(`/api/tasks/${newTodoValue.idTask}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      labelTask: newTodoValue.labelTask,
      done: newTodoValue.completionStateTask
    })
  });

  console.log('monTableau est mis à jour et la modification est envoyée au serveur');
};
</script>

<template>
  <main>
    <div class="container">
      <div class="button-container">
        <button @click="ajouterElement" class="addButt">Create a new task</button>
      </div>
      <br />
      <div class="task-list">
        <div v-for="(element, index) in monTableau" :key="element.idTask">
          <TaskComp :task="element" @onInput="onTodoInput($event, index)" />
          <button @click="deleteTodo(element.idTask, index)">X</button>
        </div>
      </div>
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
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  margin-bottom: 20px;
  margin-right: 10vw;
}

.task-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 10vw;
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
