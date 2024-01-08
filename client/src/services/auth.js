import { api } from './config.js';
const linkApiRoute = '/api/users';

export const register = async (registerDetails) => {
  console.log('auth service - register', `registerDetails - ${registerDetails}`);
  try {
    return await api.post(`${linkApiRoute}/signup`, registerDetails);
  } catch (e) {
    return e.response?.data;
  }
};

export const login = async (loginDetails) => {
  try {
    const response = await api.post(`${linkApiRoute}/login`, loginDetails);
    return response.data;
  } catch (e) {
    return e.response?.data;
  }
};
