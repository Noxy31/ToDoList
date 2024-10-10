import { inject, reactive, provide } from 'vue';

interface State {
  isAdmin: boolean;
  isAccEnabled: boolean;
  setAdminStatus: (status: boolean) => void;
  setAccountStatus: (status: boolean) => void;
}

export const createState = (): State => {
  const savedIsAdmin = localStorage.getItem('isAdmin');
  const savedIsAccEnabled = localStorage.getItem('isAccEnabled');

  const state = reactive({
    isAdmin: savedIsAdmin ? JSON.parse(savedIsAdmin) : false,
    isAccEnabled: savedIsAccEnabled ? JSON.parse(savedIsAccEnabled) : true,

    setAdminStatus: (status: boolean) => {
      state.isAdmin = status;
      localStorage.setItem('isAdmin', JSON.stringify(status));
    },

    setAccountStatus: (status: boolean) => {
      state.isAccEnabled = status;
      localStorage.setItem('isAccEnabled', JSON.stringify(status));
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
