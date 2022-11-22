import { api } from './config.js';
const linkApiRoute = '/api/users';

export const register = async (registerDetails) => {
  try {
    const response = await api.post(`${linkApiRoute}/signup`, registerDetails);
    return response.data;
  } catch (e) {
    console.error(e.response.data);
  }
};
