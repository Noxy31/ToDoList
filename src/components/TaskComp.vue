<script setup lang="ts">
import { ref } from 'vue';
import { Task } from '@/models/Task';

const props = defineProps<{ task: Task }>();

const editMode = ref(false);

const newValue = ref(props.task.labelTask);

const emit = defineEmits(['onInput']);
const onInput = (value: boolean) => {
  console.log('TaskComponent a détecté un changement ', value);
  emit('onInput', { ...props.task, completionStateTask: value });
};

const onConfirmText = () => {
  editMode.value = false;
  emit('onInput', { ...props.task, labelTask: newValue.value });
};
const onCancelText = () => {
  editMode.value = false;
  newValue.value = props.task.labelTask;
};
</script>

<template>
  <span v-if="!editMode">
    <span @click="editMode = !editMode">
      {{ props.task.labelTask }}
    </span>
    <input
      type="checkbox"
      :checked="props.task.completionStateTask"
      @click="(event: any) => onInput(event.target?.checked)"
    />
    <br />
  </span>
  <span v-else>
    <!-- mode edition -->
    <input type="text" v-model="newValue" />
    <button @click="onConfirmText">Confirmer</button>
    <button @click="onCancelText">Annuler</button>
    <br />
  </span>
</template>

<style lang="css" scoped>
span {
  display: flex;
  align-items: center; /* Aligne les éléments verticalement */
  justify-content: center; /* Centre horizontalement */
  margin-bottom: 10px; /* Ajoute de l'espace entre les tâches */
}

button {
  margin: 0 5px; /* Espace autour des boutons */
}
.done {
  color: green;
}
</style>
