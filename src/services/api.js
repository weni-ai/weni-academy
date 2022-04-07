import axios from 'axios';
import getEnv from '@/utils/env'

const api = axios.create({
  baseURL: getEnv('VUE_APP_BASE_API'),
});

export { api } 