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

  createClassComment(_store, { classId, text }) {
    return api.post(`classes/${classId}/comment/`, {
      text,
    });
  },

  getClassComments(_store, { classId }) {
    return api.get(`classes/${classId}/comment/`);
  },

  getClassAnnotation(_store, { classId }) {
    return api.get(`classes/${classId}/update_annotation/`);
  },

  setClassAnnotation(_store, { classId, annotation }) {
    return api.put(`classes/${classId}/update_annotation/`, { annotation });
  },

  setClassMood(_store, { classId, mood }) {
    return api.put(`classes/${classId}/rating_mood/`, { mood });
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
      const { data } = await api.patch(`classes/${classID}/update_watched/`, {
        watched: value
      });
      commit('TOGGLE_CHECK_CLASS__SUCCESS', data.watched_percentage);
    } catch (error) {
      commit('TOGGLE_CHECK_CLASS_ERROR', { error, getters, value });
    }
  }

  // setCurrentModule({ commit }, moduleID){

  //   commit('SET_CURRENT_MODULE', module)
  // }
}