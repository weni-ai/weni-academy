import { createRouter, createWebHistory } from 'vue-router';
import ClassPage from '@/views/ClassPage.vue';
import ClassesListAll from '@/views/ClassesListAll.vue';
import Home from '@/views/Home.vue';
import Onboarding from '@/views/Onboarding.vue';

import { useLoginStore } from '@/store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Home',
        params: {
          module_id: 1,
        },
      },
    },
    {
      path: '/module/:module_id',
      name: 'Home',
      component: Home,
    },
    {
      path: '/onboarding',
      name: 'Onboarding',
      component: Onboarding,
    },
    {
      path: '/module/:module_id/category/:id_category/class/:id_class',
      name: 'ClassPage',
      component: ClassPage,
    },
    {
      path: '/module/:module_id/category/:id_category',
      name: 'ClassesListAll',
      component: ClassesListAll,
    },
    {
      path: '/loginexternal/:token/',
      name: 'externalLogin',
      component: null,
      beforeEnter: async (to, from, next) => {
        const store = useLoginStore();
        const { token } = to.params;
        store.externalLogin(token.replace('+', ' '));
        await store.fetchModules();
        if (to.query.next) {
          next(to.query.next);
        } else {
          next('/onboarding');
          //TO-DO HANDLE ERROR
        }
      },
    },
  ],
});
router.afterEach(async () => {
  window.parent.postMessage(
    {
      event: 'changePathname',
      pathname: window.location.pathname,
    },
    '*',
  );
});
export default router;
