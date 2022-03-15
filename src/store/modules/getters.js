import router from '@/router';

export default {
  currentModule(state){
    const id = router.app.$route.params.module_id;

    return state.modules.find((item)=> {
      return item.id == id;
    });
  },

  currentCategory(_state, getters) {
    const module = getters.currentModule;
    const idCategory = router.app.$route.params.id_category;

    return module?.category_set.find(({ id }) => id == idCategory);
  },

  currentClass(_state, getters) {
    const category = getters.currentCategory;
    const idClass = router.app.$route.params.id_class;

    return category?.class_set.find(({ id }) => id == idClass);
  },
};
