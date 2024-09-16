<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  todo: {
    done: boolean;
    todo: any;
  };
}>();

const editMode = ref(false);
const newValue = ref(props.todo.todo);

const emit = defineEmits(['onInput']);
const onInput = (value: boolean) => {
  console.log('TodoComponent a détécté un changement', value);
  emit('onInput', { ...props.todo, done: value });
};

const onConfirmText = () => {
  editMode;
};
</script>

<template>
  <div v-if="!editMode">
    <span @click="editMode = !editMode">
      {{ props.todo.todo }}
    </span>
    <input
      type="checkbox"
      :checked="props.todo.done"
      @click="(event: any) => onInput(event.target?.checked)"
    />
    <br />
  </div>
  <span v-if="editMode">
    <input type="text" v-model="newValue" />
    <button
      type="button"
      @click="
        props.todo.todo = newValue;
        editMode = !editMode;
      "
    >
      ✔
    </button>
  </span>
  <span v-if="editMode">
    <button
      type="button"
      @click="
        editMode = !editMode;
        newValue = props.todo.todo;
      "
    >
      X
    </button>
  </span>
</template>

<style></style>
