import axios from 'axios';
import { serverUrl } from '../utils/config.js';

export const api = axios.create({
  baseURL: serverUrl,
});
