import axios from 'axios';

const baseURL = '/api/links';
const localUrl = import.meta.env.VITE_LOCAL_URL || 'http://localhost:4002';

const getAll = () => {
  const request = axios.get(`${localUrl}${baseURL}`);
  return request.then((res) => res.data);
};

export default {
  getAll,
};
