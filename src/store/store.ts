import { inject, reactive, provide } from 'vue';

interface State {
  isAdmin: boolean;
  setAdminStatus: (status: boolean) => void; // Déclare la méthode pour mettre à jour isAdmin
}

export const createState = (): State => {
  const state = reactive({
    isAdmin: false,
    setAdminStatus: (status: boolean) => {
      state.isAdmin = status;
    }
  });
  return state;
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
