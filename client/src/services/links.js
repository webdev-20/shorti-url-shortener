import axios from 'axios';
import { serverUrl } from '../utils/config.js';

const baseURL = '/api/links';

const getAll = () => {
  const request = axios.get(`${serverUrl}${baseURL}`);
  return request.then((res) => res.data);
};

const createLink = async (link) => {
  try {
    const res = await axios.post(`${serverUrl}${baseURL}`, link);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const redirectToLink = async (shortCode) => {
  try {
    const {
      data: { success, data },
    } = await axios.get(`${serverUrl}${baseURL}/${shortCode}`);
    if (success) {
      return data.longUrl;
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAll,
  createLink,
  redirectToLink,
};
