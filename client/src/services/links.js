import axios from 'axios';

const local = `http://localhost:4002`;
const baseURL = '/api/links';

const getAll = () => {
  const request = axios.get(`${local}${baseURL}`);
  return request.then((res) => res.data);
};

export default {
  getAll,
};
