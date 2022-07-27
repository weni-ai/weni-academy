export default {
  MODULES_REQUEST: (state) => (state.loadingModules = true),
  MODULES__SUCCESS: (state, modules) => {
    state.loadingModules = false;
    state.modules = modules
  },
  MODULES_ERROR: (state, profileError) => {
    state.error = profileError;
    state.loadingModules = false;
  },
  SINGLE_MODULE_REQUEST: (state) => (state.loadingSingleModule = true),
  SINGLE_MODULE__SUCCESS: (state, module) => {
    state.loadingSingleModule = false;
    state.currentModule = module
  },
  SINGLE_MODULE_ERROR: (state, profileError) => {
    state.error = profileError;
    state.loadingSingleModule = false;
  },
  SET_CURRENT_MODULE: (state, module) => {
    state.currentModule = module;
  },

  //CLASS
  TOGGLE_CHECK_CLASS_REQUEST: (state, { value, getters }) => {
    getters.currentClass.lesson_monitoring.watched = value;
    state.loadingToggleCurrentClass = true;
  },
  TOGGLE_CHECK_CLASS__SUCCESS: (state, watched_percentage) => {
    state.loadingToggleCurrentClass = false;
    state.modules
      .find( mod => mod.id === state.currentModule.id )
      .watched_percentage = watched_percentage;
    state.currentModule.watched_percentage = watched_percentage
  },
  TOGGLE_CHECK_CLASS_ERROR: (state, { error, getters, value }) => {
    state.error = error;
    state.loadingSingleModule = false;
    getters.currentClass.lesson_monitoring.watched = !value;
  },
}