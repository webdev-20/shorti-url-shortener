import axios from 'axios';

const baseURL = '/api/links';

const getAll = () => {
  const request = axios.get(`${import.meta.env.VITE_LOCAL_URL}${baseURL}`);
  return request.then((res) => res.data);
};

export default {
  getAll,
};
