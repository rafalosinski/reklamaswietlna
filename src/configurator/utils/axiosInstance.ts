import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'http://localhost:1337/',
  // baseURL: 'https://reklama-swietlna.herokuapp.com',
  baseURL: 'https://hermes-reklama-swietlna.herokuapp.com',
});
