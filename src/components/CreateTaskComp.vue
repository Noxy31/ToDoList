<script lang="ts">
import { defineComponent, ref } from 'vue';
import Cookies from 'js-cookie';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const taskLabel = ref('');
    const dueTask = ref('');

    const createTask = async () => {
      const listId = route.params.idList;

      const token = Cookies.get('token');

      if (!token) {
        console.error('Token is not available.');
        return;
      }

      const userId = getUserIdFromToken(token);

      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            labelTask: taskLabel.value,
            dueTask: dueTask.value,
            idList: listId,
            idUser: userId
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create task');
        }

        const newTask = await response.json();
        console.log('Task created:', newTask);
        router.push({ name: 'TaskListsComp', params: { idList: listId } });
      } catch (error) {
        console.error(error);
      }
    };

    const getUserIdFromToken = (token: string) => {
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    };

    return {
      taskLabel,
      dueTask,
      createTask
    };
  }
});
</script>

<template>
  <div>
    <h1>Create a Task</h1>
    <label for="taskLabel">Task Name:</label>
    <input id="taskLabel" v-model="taskLabel" />

    <label for="dueTask">Due Date and Time:</label>
    <input type="datetime-local" id="dueTask" v-model="dueTask" />

    <button @click="createTask">Create Task</button>
  </div>
</template>

<style scoped>
.create-task {
  margin: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
