import axios from 'axios';
import getEnv from '@/utils/env'



const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: getEnv('VUE_APP_BASE_API'),
});

if (token) { api.defaults.headers.common['Authorization'] = token; }

export { api } 