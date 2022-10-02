import { axios } from 'axios';

const apiURL = 'http://localhost:4002'

export async function getAllLinks() {
  await axios.get(apiURL);
}

export async function createLink(url) {
  await axios.post(apiURL, { url });
}

export async function getLinkFromCode(code) {
  await axios.get(`${apiURL}/${code}`);
}
