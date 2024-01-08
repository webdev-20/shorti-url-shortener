import { useState } from 'react';
import { useAuth } from './useAuth.js';
import { register } from '../services/auth.js';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuth();

  const signup = async ({ email, password, confirmPassword }) => {
    console.log(`useSignup / signup - ${email}, ${password}, ${confirmPassword}`);
    setIsLoading(true);
    setError(null);

    const res = await register({
      email,
      password,
      confirmPassword,
    });

    console.log('res', res);

    if (res.success === false) {
      setIsLoading(false);
      setError(res.message);
    } else {
      console.log('res.ok');
      localStorage.setItem('user', JSON.stringify({ email }));
      dispatch({
        type: 'LOGIN',
        payload: {
          email,
        },
      });
      setIsLoading(false);
    }
  };

  console.log('error', error);

  return { signup, isLoading, error };
};
