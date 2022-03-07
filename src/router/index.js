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
    path: '/module/:module_id/class/:id_class',
    name: 'ClassPage',
    component: ClassPage
  },
  {
    path: '/module/:module_id/all',
    name: 'ClassesListAll',
    component: ClassesListAll
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach(async (to) => {
  if (to.name === 'ClassPage') {
    /* to.params.id_class
    to.params.module_id */
  }

  await store.dispatch('fetchModules');
  
  console.log('to', to, store.state.Modules.module.categories.find(category => category.url_frienly_title === to.params.module_id));
  console.log(store.state.Modules)

  store.dispatch('addBreadcrumb', { name: 'One', path: 'One' });
  store.dispatch('addBreadcrumb', { name: 'One', path: 'One' });
})

export default router
