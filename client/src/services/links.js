import { api } from './config.js';

const linkApiRoute = '/api/links';

const getAll = () => {
  const request = api.get(linkApiRoute);
  return request.then((res) => res.data);
};

const getLinksByUser = async (email) => {};

const createLink = async (link) => {
  try {
    const res = await api.post(linkApiRoute, link);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const redirectToLink = async (shortCode) => {
  try {
    const {
      data: { success, data },
    } = await api.get(`${linkApiRoute}/${shortCode}`);
    if (success) {
      return data.longUrl;
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAll,
  getLinksByUser,
  createLink,
  redirectToLink,
};
