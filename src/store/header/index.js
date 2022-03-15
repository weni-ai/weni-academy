import router from '@/router';
import store from '@/store';

const getters = {
  breadcrumbs() {
    const name = router.app.$route.name;
    const breadcrumbs = [];

    if (['Home', 'ClassesListAll', 'ClassPage'].includes(name)) {
      breadcrumbs.push({
        name: store.getters.currentModule?.title,
        path: {
          name: 'Home',
          params: {
            module_id: store.getters.currentModule?.id,
          },
        }
      });
    }

    if (['ClassesListAll', 'ClassPage'].includes(name)) {
      breadcrumbs.push({
        name: store.getters.currentCategory?.title,
        path: {
          name: 'ClassesListAll',
          params: {
            category_id: store.getters.currentCategory?.id,
          },
        }
      });
    }

    if (name === 'ClassPage') {
      breadcrumbs.push({
        name: store.getters.currentClass?.title,
        path: {
          name: 'ClassPage',
          params: {
            id_class: store.getters.currentClass?.id,
          },
        }
      });
    }

    return breadcrumbs;
  },
};

export default {
  getters,
};
