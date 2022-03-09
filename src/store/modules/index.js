import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
  loading: null,
  currentModule: {},
};
export default {
  state,
  getters,
  actions,
  mutations,
};
