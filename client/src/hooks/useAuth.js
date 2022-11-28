import { useContext } from 'react';
import AuthContext from '../context/AuthProvider.jsx';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
