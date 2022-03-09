import Vue from 'vue'
import Vuex from 'vuex'

import Modules from './modules';
import Header from './header';

import { api } from '@/services/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      api.defaults.headers.common['Authorization'] = token;
    },
  },
  actions: {
    externalLogin({ commit }, token){
      if(!token) return;
      //TO-DO HANDLE ERROR
      commit('SET_TOKEN', token)
    }
  },
  modules: {
    Modules,
    Header
  }
})
