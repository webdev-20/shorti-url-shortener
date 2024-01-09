import { useAuth } from './useAuth.js';

export const useLogout = () => {
  const { dispatch } = useAuth();

  const logout = () => {
    localStorage.removeItem('user');

    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};
