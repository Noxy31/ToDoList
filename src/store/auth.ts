import { ref } from 'vue';
import Cookies from 'js-cookie';

const isAuthenticated = ref(!!Cookies.get('token'));

export function useAuth() {
  const login = () => {
    // sert a automatiquement mettre la valeur a jour de isAuthenticated dés la connexion afin de permettre le bon affichage du HeaderComp dés la connexion
    isAuthenticated.value = true;
  };

  const logout = () => {
    // permets de se déconnecter et de supprimer le cookie de connexion
    isAuthenticated.value = false;
    Cookies.remove('token');
  };

  return {
    isAuthenticated,
    login,
    logout
  };
}
