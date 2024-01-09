import { useState } from 'react';
import { useAuth } from './useAuth.js';
import { signup as signupService } from '../services/auth.js';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuth();

  const signup = async ({ email, password, confirmPassword }) => {
    setIsLoading(true);
    setError(null);

    const res = await signupService({
      email,
      password,
      confirmPassword,
    });

    console.log('useSignup - res', res);
    if (res.success === false) {
      setIsLoading(false);
      setError(res.message);
    } else {
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

  return { signup, isLoading, error };
};
