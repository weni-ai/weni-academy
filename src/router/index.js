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
    path: '/module/:module_id/all',
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
      console.log(to.query)
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

router.afterEach(async (to) => {
  console.log(to)
  window.parent.postMessage(
    {
      event: 'changePathname',
      pathname: window.location.pathname,
    },
    '*',
  );

  store.dispatch('clearBreadcrumb');

  const current = {
    module: store.state.Modules.module,
    category: null,
    class: null,
  }

  const requires = [];

  const breadcrumbs = [];

  if (to.name === 'ClassesListAll') {
    requires.push('category');
  } else if (to.name === 'ClassPage') {
    requires.push('category');
    requires.push('class');
  }

  try {
    if (requires.includes('category')) {
      current.category = current.module?.categories.find(category => category.id === Number(to.params.module_id));

      if (!current.category) {
        throw new Error('CategoryNotFound');
      }

      breadcrumbs.push({
        name: current.category.title,
        path: {
          name: 'ClassesListAll',
          params: {
            module_id: current.category.id,
          },
        }
      });
    }

    if (requires.includes('class')) {
      current.class = current.category?.classes.find(lesson => lesson.id === Number(to.params.id_class));

      if (!current.class) {
        throw new Error('ClassNotFound');
      }

      breadcrumbs.push({
        name: current.class.title,
        path: {
          name: 'ClassPage',
          params: {
            id_class: current.class.id,
            module_id: current.category.id,
          },
        }
      });
    }

    breadcrumbs.forEach(breadcrumb => {
      store.dispatch('addBreadcrumb', breadcrumb);
    });
  } catch (error) {
    if (error.message === 'CategoryNotFound' || error.message === 'ClassNotFound') {
      console.log('do something');
    }
  }
})

export default router
