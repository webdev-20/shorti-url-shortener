require('dotenv').config();
import axios  from 'axios';

const linkApiURL = `${process.env.API_URL}/links`

export async function getAllLinks() {
  return await axios.get(linkApiURL);
}

export async function createLink(url, short = "") {
  return await axios.post(linkApiURL, { url, short });
}

export async function getLinkFromCode(code) {
  return await axios.get(`${linkApiURL}/${code}`);
}
