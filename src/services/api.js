import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
});

if(process.env.NODE_ENV === 'development') {
  api.defaults.headers.common['Authorization'] = process.env.VUE_APP_API_TOKEN;
}

export { api } 