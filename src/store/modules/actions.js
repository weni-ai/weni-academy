import { api } from "@/services/api";

export default {
  async fetchModules({ commit }) {
    commit('MODULES_REQUEST');

    try {
      const response = await api.get('modules');
      commit('MODULES__SUCCESS', response.data);
    } catch (e) {
      commit('MODULES_ERROR', e);
    }
  },

  async fetchSingleModule({ commit }, moduleID) {
    commit('SINGLE_MODULE_REQUEST');

    try {
      const response = await api.get(`modules/${moduleID}`);
      commit('SINGLE_MODULE__SUCCESS', response.data);
    } catch (e) {
      commit('SINGLE_MODULE_ERROR', e);
    }
  },

  async toggleCheckClass({ commit, getters }, {classID, value}) {
    commit('TOGGLE_CHECK_CLASS_REQUEST', { value, getters });
    try {
      await api.patch(`classes/${classID}/update_watched/`, {
        watched: value
      });
      commit('TOGGLE_CHECK_CLASS__SUCCESS');
    } catch (error) {
      commit('TOGGLE_CHECK_CLASS_ERROR', { error, getters, value });
    }
  }

  // setCurrentModule({ commit }, moduleID){

  //   commit('SET_CURRENT_MODULE', module)
  // }
}