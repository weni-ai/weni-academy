import axios from 'axios';
import getEnv from '@/utils/env'

const api = axios.create({
  baseURL: getEnv('VUE_APP_BASE_API'),
});

console.log(getEnv('VUE_APP_BASE_API'))
console.log(getEnv('VUE_APP_PARENT_DOMAIN'))

export { api } 