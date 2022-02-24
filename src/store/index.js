import Vue from 'vue'
import Vuex from 'vuex'

import Modules from './modules';
import Header from './header';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Modules,
    Header
  }
})
