import axios from 'axios';

const axiosBackend = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URI,
  headers: {
    'Content-Type': 'application/json',
    'Client-Id': process.env.VUE_APP_CLIENT_ID,
  },
});

export default {
  axiosBackend,
};
