
const actions = {
  addBreadcrumb({ commit }, breadcrumb) {
    commit('ADD_BREADCRUMB', breadcrumb)
  },
  removeBreadcrumb({ commit }, breadcrumb){
    commit('REMOVE_BREADCRUMB', breadcrumb)
  }
}

const mutations = {
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
  breadcrumb: [
    { name: 'One', path: 'One' },
    { name: 'TWO', path: 'TWO' },
    { name: 'THREE', path: 'THREE' },
  ],
};

export default {
  state,
  actions,
  mutations,
};
