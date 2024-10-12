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
  isEditing?: boolean;
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
    let originalTask: Task | null = null;

    const fetchListDetails = async () => {
      const listId = route.params.idList as string;
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
          isEditing: false,
          lastUpdateMessage: task.lastUpdatedBy
            ? `Updated last by ${task.lastUpdatedBy} at ${formatDateTime(task.lastUpdateTime)}`
            : 'Never been updated yet'
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const addTask = () => {
      const listId = route.params.idList as string;
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

        task.completionStateTask = newCompletionState;
        await fetchTasks(listId);
      } catch (error) {
        console.error(error);
      }
    };

    const toggleEditTask = (task: Task) => {
      if (!task.isEditing) {
        originalTask = { ...task };
      } else {
        task.labelTask = originalTask?.labelTask || '';
        task.dueTask = originalTask?.dueTask || '';
      }
      task.isEditing = !task.isEditing;
    };

    const updateTask = async (task: Task) => {
      const listId = route.params.idList as string;
      const updates: Partial<Task> = {};

      if (task.labelTask !== originalTask?.labelTask) {
        updates.labelTask = task.labelTask;
      }

      if (task.dueTask !== originalTask?.dueTask) {
        updates.dueTask = task.dueTask;
      }

      if (Object.keys(updates).length === 0) {
        console.log('Aucun changement détecté.');
        task.isEditing = false;
        return;
      }

      try {
        const response = await fetch(`/api/tasks/edit/${task.idTask}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updates)
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }

        task.isEditing = false;
        await fetchTasks(listId);
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
      toggleTaskCompletion,
      toggleEditTask,
      updateTask
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
      <li v-for="task in tasks" :key="task.idTask">
        <div v-if="task.isEditing">
          <input v-model="task.labelTask" type="text" />
          <input v-model="task.dueTask" type="date" />
          <button @click="updateTask(task)">Save</button>
          <button @click="toggleEditTask(task)">Cancel</button>
        </div>
        <div v-else>
          <strong :class="{ 'completed-task': task.completionStateTask }">{{
            task.labelTask
          }}</strong>
          - <span class="due-date">Due on: {{ formatDate(task.dueTask) }}</span>
          <button @click="toggleEditTask(task)" class="edit-button">Edit</button>

          <label class="toggle">
            <input
              type="checkbox"
              :checked="task.completionStateTask"
              @change="toggleTaskCompletion(task)"
            />
            <span class="slider"></span>
          </label>
          <p>{{ task.lastUpdateMessage }}</p>
        </div>
      </li>
    </ul>

    <button @click="addTask" class="add-button">Add a task</button>
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
  padding: 0.5rem 1rem;
  background-color: white;
  color: #000000;
  border: 2px solid #000000;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 1rem;
  margin-left: 10vw;
  transition:
    transform 0.2s,
    background-color 0.2s;
}

button:hover {
  background-color: #f0f0f0;
  transform: scale(1.05);
}

.edit-button {
  padding: 0.5rem 0.75rem;
}

.add-button {
  margin-top: 2rem;
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
