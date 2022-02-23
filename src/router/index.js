import Vue from 'vue'
import VueRouter from 'vue-router'
import LearningPage from '@/views/LearningPage.vue';
import About from '@/views/About.vue';
import Home from '@/views/Home.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/LearningPage',
    name: 'LearningPage',
    component: LearningPage
  },
  {
    path: '/about',
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
