<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Task {
  idTask: string;
  labelTask: string;
  dueTask: string;
  completionStateTask: boolean;
  lastUpdateMessage: string;
  lastUpdateTime?: string;
}

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const list = ref({
      labelList: '',
      isPersonnal: false,
      listCreationTime: '',
      creatorName: ''
    });

    const tasks = ref<Task[]>([]);

    const fetchListDetails = async () => {
      const listId = route.params.idList as string; // assertion type usage
      try {
        const response = await fetch(`/api/list/tasklist/${listId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch list details');
        }
        const data = await response.json();
        list.value = data;

        fetchTasks(listId);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTasks = async (listId: string) => {
      try {
        const response = await fetch(`/api/tasks/details/${listId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        tasks.value = data.map((task: any) => ({
          ...task,
          lastUpdateMessage: task.lastUpdatedBy
            ? `Updated last by ${task.lastUpdatedBy} at ${formatDateTime(task.lastUpdateTime)}`
            : 'Never been updated yet'
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const addTask = () => {
      const listId = route.params.idList as string; // assertion type usage
      router.push({ name: 'CreateTask', params: { idList: listId } });
    };

    const formatDate = (timestamp: string) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    };

    const toggleTaskCompletion = async (task: Task) => {
      const newCompletionState = !task.completionStateTask;
      const listId = route.params.idList as string;
      try {
        const response = await fetch(`/api/tasks/${task.idTask}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ done: newCompletionState })
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }

        const updatedTask = tasks.value.find((t) => t.idTask === task.idTask);
        if (updatedTask) {
          updatedTask.completionStateTask = newCompletionState;

          await fetchTasks(listId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchListDetails();
    });

    return {
      list,
      tasks,
      formatDate,
      addTask,
      toggleTaskCompletion
    };
  }
});
</script>

<template>
  <div class="list-details">
    <h1 class="list-title">{{ list.labelList }}</h1>
    <p class="list-info">
      <strong>Type:</strong> {{ list.isPersonnal ? 'Personal' : 'Public' }} -
      <strong>Created on:</strong> {{ formatDate(list.listCreationTime) }} -
      <strong>Created by:</strong> {{ list.creatorName }}
    </p>

    <h2 class="tasks-title">Tasks for this List</h2>
    <ul>
      <li class="taskslabel" v-for="task in tasks" :key="task.idTask">
        <strong :class="{ 'completed-task': task.completionStateTask, 'task-label': true }">{{
          task.labelTask
        }}</strong>
        - <span class="due-date">Due on: {{ formatDate(task.dueTask) }}</span>

        <label class="toggle">
          <input
            type="checkbox"
            :checked="task.completionStateTask"
            @change="toggleTaskCompletion(task)"
          />
          <span class="slider"></span>
        </label>
        <p>{{ task.lastUpdateMessage }}</p>
      </li>
    </ul>

    <button @click="addTask">Add a task</button>
  </div>
</template>

<style scoped>
.list-details {
  margin: 2rem 0;
  padding-left: 0;
  text-align: left;
  width: 100%;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 2vh;
  margin-left: 10vw;
}

button:hover {
  background-color: #0056b3;
}

.completed-task {
  color: #666;
  text-decoration: line-through;
}

.task-label {
  font-size: 1.25rem;
}

li {
  padding: 10px 0;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-left: 10px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style>
