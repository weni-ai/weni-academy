
const actions = {
  clearBreadcrumb({ commit }) {
    commit('CLEAR_BREADCRUMB')
  },
  addBreadcrumb({ commit }, breadcrumb) {
    commit('ADD_BREADCRUMB', breadcrumb)
  },
  removeBreadcrumb({ commit }, breadcrumb){
    commit('REMOVE_BREADCRUMB', breadcrumb)
  }
}

const mutations = {
  CLEAR_BREADCRUMB: (state) => (state.breadcrumb = []),
  ADD_BREADCRUMB: (state, breadcrumb) => (state.breadcrumb = [...state.breadcrumb, breadcrumb]),
  REMOVE_BREADCRUMB: (state, breadcrumb) => {
    const hasBreadcrum = state.breadcrumb.findIndex(item => item.name === breadcrumb.name);
    if (hasBreadcrum > -1) {
      const newState = state.breadcrumb.slice(0, hasBreadcrum + 1);
      state.breadcrumb = newState;
    }
  },
}

const state = {
  breadcrumb: [],
};

export default {
  state,
  actions,
  mutations,
};
