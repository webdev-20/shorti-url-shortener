import axios  from 'axios';

const apiURL = 'http://127.0.0.1:4002/api/links'

export async function getAllLinks() {
  return await axios.get(apiURL);
}

export async function createLink(url, short = "") {
  return await axios.post(apiURL, { url, short });
}

export async function getLinkFromCode(code) {
  return await axios.get(`${apiURL}/${code}`);
}
