import { inject, reactive, provide } from 'vue';

interface State {
  isAdmin: boolean;
  setAdminStatus: (status: boolean) => void;
}

export const createState = (): State => {
  const savedIsAdmin = localStorage.getItem('isAdmin');
  const state = reactive({
    isAdmin: savedIsAdmin ? JSON.parse(savedIsAdmin) : false,
    setAdminStatus: (status: boolean) => {
      state.isAdmin = status;
      localStorage.setItem('isAdmin', JSON.stringify(status));
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
