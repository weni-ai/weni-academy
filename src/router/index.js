import Vue from 'vue'
import VueRouter from 'vue-router'
import LearningPage from '@/views/LearningPage.vue';
import About from '@/views/About.vue';
import Home from '@/views/Home.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/module/:module_id',
    name: 'Home',
    component: Home
  },
  {
    path: '/module/:module_id/lession/:id_lession',
    name: 'LearningPage',
    component: LearningPage
  },
  {
    path: '/module/:module_id/all',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
