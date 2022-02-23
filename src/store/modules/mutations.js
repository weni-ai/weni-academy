export default {
  MODULES_REQUEST: (state) => (state.loading = true),
  MODULES__SUCCESS: (state, module) => {
    state.loading = false;
    state.module = module 
  },
  MODULES_ERROR: (state, profileError) => {
    state.error = profileError;
    state.loading = false;
  },
}