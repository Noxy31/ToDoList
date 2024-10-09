import { ref } from 'vue';
import Cookies from 'js-cookie';
import { useState } from './store';

const isAuthenticated = ref(!!Cookies.get('token'));

export function useAuth() {
  const state = useState();

  const login = () => {
    isAuthenticated.value = true;
  };

  const logout = () => {
    isAuthenticated.value = false;
    Cookies.remove('token');
    localStorage.removeItem('isAdmin');
    state.setAdminStatus(false);
  };

  return {
    isAuthenticated,
    login,
    logout
  };
}
