import { useState } from 'react';
import { useAuth } from './useAuth.js';
import { login as loginService } from '../services/auth.js';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuth();

  const login = async ({ email, password }) => {
    setIsLoading(true);
    setError(null);

    const res = await loginService({
      email,
      password,
    });

    console.log(res);

    if (res.success === false) {
      setIsLoading(false);
      setError(res.message);
    } else {
      console.log(res.data);
      localStorage.setItem(
        'user',
        JSON.stringify({
          email,
          token: res.data.token,
        }),
      );
      dispatch({
        type: 'LOGIN',
        payload: {
          email,
          token: res.data.token,
        },
      });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
