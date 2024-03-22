import { defineStore } from 'pinia';
import { useModulesStore } from '@/store/modules';

import { useRouter } from 'vue-router';

export const useHeaderStore = defineStore('header', {
  getters: {
    breadcrumbs() {
      const router = useRouter();
      const name = router.currentRoute.name;
      const breadcrumbs = [];

      if (['Home', 'ClassesListAll', 'ClassPage'].includes(name)) {
        breadcrumbs.push({
          name: 'Trilhas',
          path: {
            name: 'Onboarding',
          },
        });
        breadcrumbs.push({
          name: useModulesStore.currentModule?.title,
          path: {
            name: 'Home',
            params: {
              module_id: useModulesStore.currentModule?.id,
            },
          },
        });
      }

      if (['ClassesListAll', 'ClassPage'].includes(name)) {
        breadcrumbs.push({
          name: useModulesStore.currentCategory?.title,
          path: {
            name: 'ClassesListAll',
            params: {
              category_id: useModulesStore.currentCategory?.id,
            },
          },
        });
      }

      if (name === 'ClassPage') {
        breadcrumbs.push({
          name: useModulesStore.currentClass?.title,
          path: {
            name: 'ClassPage',
            params: {
              id_class: useModulesStore.currentClass?.id,
            },
          },
        });
      }

      return breadcrumbs;
    },
  },
});
