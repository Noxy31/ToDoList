import { reactive, provide, inject } from 'vue';

const state = reactive({
  isAdmin: false
});

export const provideState = () => {
  provide('state', state);
};

export const useState = () => {
  const state = inject('state');
  if (!state) {
    throw new Error('State not provided');
  }
  return state;
};
