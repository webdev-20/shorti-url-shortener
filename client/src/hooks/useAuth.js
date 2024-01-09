import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider.jsx';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuth must be used inside an AuthContextProvider');
  }

  return context;
};
