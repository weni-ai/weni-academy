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
  SET_CURRENT_MODULE: (state, module) =>{
    state.currentModule = module;
  }
}