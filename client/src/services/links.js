import axios from 'axios';
import { serverUrl } from '../utils/config.js';

const baseURL = '/api/links';

const getAll = () => {
  const request = axios.get(`${serverUrl}${baseURL}`);
  return request.then((res) => res.data);
};

export default {
  getAll,
};
