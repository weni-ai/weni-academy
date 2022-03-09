import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import LogRocket from 'logrocket';

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

LogRocket.init('lqshel/test-weni-webapp', {
  mergeIframes: true,
  parentDomain: config.get('VUE_APP_PARENT_DOMAIN'),
});

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
