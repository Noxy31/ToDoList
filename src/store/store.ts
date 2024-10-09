import { inject, reactive, provide } from 'vue';

interface State {
  isAdmin: boolean;
}

export const createState = (): State => {
  return reactive({
    isAdmin: false
  });
};

export const provideState = () => {
  const state = createState();
  provide('state', state);
};

export const useState = (): State => {
  const state = inject<State>('state');
  if (!state) {
    throw new Error('State not provided');
  }
  return state;
};
