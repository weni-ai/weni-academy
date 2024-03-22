import { defineStore } from 'pinia';

import { api } from '@/services/api';

export const useLoginStore = defineStore('login', {
  state: () => ({
    token: '',
  }),
  actions: {
    SET_TOKEN(token) {
      this.token = token;
      api.defaults.headers.common['Authorization'] = token;
      localStorage.setItem('token', token);
    },
    externalLogin(token) {
      if (!token) return;
      this.SET_TOKEN(token);
    },
  },
});
