import axios from 'axios';

const api = axios.create({
  baseURL: config.get('VUE_APP_BASE_API'),
});

export { api } 