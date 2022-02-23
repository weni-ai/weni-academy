import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/api/v1/',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

export { api } 