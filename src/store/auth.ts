import { ref } from 'vue';
import Cookies from 'js-cookie';

const isAuthenticated = ref(!!Cookies.get('token'));

export function useAuth() {
  const login = () => {
    isAuthenticated.value = true;
  };

  const logout = () => {
    isAuthenticated.value = false;
    Cookies.remove('token');
  };

  return {
    isAuthenticated,
    login,
    logout
  };
}
