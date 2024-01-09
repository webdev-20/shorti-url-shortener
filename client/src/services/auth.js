import { api } from './config.js';
const linkApiRoute = '/api/users';

export const signup = async (signupDetails) => {
  try {
    return await api.post(`${linkApiRoute}/signup`, signupDetails);
  } catch (e) {
    return e.response?.data;
  }
};

export const login = async (loginDetails) => {
  try {
    return await api.post(`${linkApiRoute}/login`, loginDetails);
  } catch (e) {
    return e.response?.data;
  }
};
