import Vue from 'vue'
import VueRouter from 'vue-router'
import ClassPage from '@/views/ClassPage.vue';
import ClassesListAll from '@/views/ClassesListAll.vue';
import Home from '@/views/Home.vue';

import store from '@/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/module/:module_id',
    name: 'Home',
    component: Home
  },
  {
    path: '/module/:module_id/category/:id_category/class/:id_class',
    name: 'ClassPage',
    component: ClassPage
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
      const { token } = to.params;
      store.dispatch('externalLogin', token.replace('+', ' '));

      await store.dispatch('fetchModules');

      if (to.query.next) {
        next(to.query.next);
      } else {
        next('/');

        //TO-DO HANDLE ERROR
      }
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.afterEach(async () => {
  window.parent.postMessage(
    {
      event: 'changePathname',
      pathname: window.location.pathname,
    },
    '*',
  );
})

export default router
