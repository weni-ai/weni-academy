import { defineStore } from 'pinia';

import { api } from '@/services/api';

export const useModulesStore = defineStore('modules', {
  state: () => ({
    loading: null,
    modules: [],
  }),
  getters: {
    currentModule: (state) => (routeParams) => {
      const id = routeParams.params.module_id;

      return state.modules.find((item) => item.id == id);
    },

    currentCategory: (getters) => (routeParams) => {
      const module = getters.currentModule;
      const idCategory = routeParams.params.id_category;

      return module?.category_set.find(({ id }) => id == idCategory);
    },

    currentClass: (getters) => (routeParams) => {
      const category = getters.currentCategory;
      const idClass = routeParams.params.id_class;

      return category?.class_set.find(({ id }) => id == idClass);
    },

    getTotalClasses(getters) {
      const category = getters.currentCategory;

      return category?.class_set.length;
    },

    getTotalCompletedClasses(getters) {
      const category = getters.currentCategory;

      const number = category?.class_set.reduce((accumulator, lesson) => {
        if (lesson.lesson_monitoring.watched) accumulator++;
        return accumulator;
      }, 0);

      return number;
    },
  },
  actions: {
    MODULES_REQUEST: (state) => (state.loadingModules = true),

    MODULES__SUCCESS: (state, modules) => {
      state.loadingModules = false;
      state.modules = modules;
    },

    MODULES_ERROR: (state, profileError) => {
      state.error = profileError;
      state.loadingModules = false;
    },

    SINGLE_MODULE_REQUEST: (state) => (state.loadingSingleModule = true),

    SINGLE_MODULE__SUCCESS: (state, module) => {
      state.loadingSingleModule = false;
      state.currentModule = module;
    },

    SINGLE_MODULE_ERROR: (state, profileError) => {
      state.error = profileError;
      state.loadingSingleModule = false;
    },

    SET_CURRENT_MODULE: (state, module) => {
      state.currentModule = module;
    },

    TOGGLE_CHECK_CLASS_REQUEST: (state, { value, getters }) => {
      getters.currentClass.lesson_monitoring.watched = value;
      state.loadingToggleCurrentClass = true;
    },

    TOGGLE_CHECK_CLASS__SUCCESS: (state, watched_percentage) => {
      state.loadingToggleCurrentClass = false;
      state.modules.find(
        (mod) => mod.id === state.currentModule.id,
      ).watched_percentage = watched_percentage;
      state.currentModule.watched_percentage = watched_percentage;
    },

    TOGGLE_CHECK_CLASS_ERROR: (state, { error, getters, value }) => {
      state.error = error;
      state.loadingSingleModule = false;
      getters.currentClass.lesson_monitoring.watched = !value;
    },

    async fetchModules({ commit }) {
      commit('MODULES_REQUEST');

      try {
        const response = await api.get('modules');
        commit('MODULES__SUCCESS', response.data);
      } catch (e) {
        commit('MODULES_ERROR', e);
      }
    },

    createClassComment({ classId, text }) {
      return api.post(`classes/${classId}/comment/`, {
        text,
      });
    },

    removeClassComment({ classId, commentId }) {
      return api.delete(`classes/${classId}/comment/`, {
        data: {
          comment_id: commentId,
        },
      });
    },

    getClassComments({ classId }) {
      return api.get(`classes/${classId}/comment/`);
    },

    getClassAnnotation({ classId }) {
      return api.get(`classes/${classId}/update_annotation/`);
    },

    setClassAnnotation({ classId, annotation }) {
      return api.put(`classes/${classId}/update_annotation/`, { annotation });
    },

    setClassMood({ classId, mood }) {
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

    async toggleCheckClass({ commit, getters }, { classID, value }) {
      commit('TOGGLE_CHECK_CLASS_REQUEST', { value, getters });
      try {
        const { data } = await api.patch(`classes/${classID}/update_watched/`, {
          watched: value,
        });
        commit('TOGGLE_CHECK_CLASS__SUCCESS', data.watched_percentage);
      } catch (error) {
        commit('TOGGLE_CHECK_CLASS_ERROR', { error, getters, value });
      }
    },
  },
});
