import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import LogRocket from 'logrocket';

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

import getEnv from './utils/env'

LogRocket.init('lqshel/test-weni-webapp', {
  mergeIframes: true,
  parentDomain: getEnv('VUE_APP_PARENT_DOMAIN'),
});

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#pageBody')

function enableLinkTranslations() {
  let connectBaseURL = '';

  function translateAllLinks() {
    if (!connectBaseURL) {
      return;
    }
    document.querySelectorAll('a[href]').forEach((link) => {
      const internalHref =
        link.getAttribute('internal-href') || link.getAttribute('href');
      if (
        ['http://', 'https://'].some((initial) =>
          internalHref.startsWith(initial)
        )
      ) {
        return;
      }
      const dashHref = connectBaseURL + internalHref;
      if (link.translateLinkConnect) {
        if (link.getAttribute('href') === dashHref) {
          return;
        }
        link.removeEventListener('click', link.translateLinkConnect);
      }
      link.setAttribute('internal-href', internalHref);
      link.setAttribute('href', dashHref);
      link.addEventListener(
        'click',
        (link.translateLinkConnect = () => {
          if (link.getAttribute('target') !== '_blank') {
            link.setAttribute('href', internalHref);
            setTimeout(() => {
              link.setAttribute('href', dashHref);
            }, 0);
          }
        })
      );
    });
  }
  function initializeObserver() {
    const targetNode = document.getElementById('pageBody');
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function (mutationList) {
      mutationList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          translateAllLinks();
        }
      });
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }
  window.addEventListener('message', (event) => {
    const eventName = event.data && event.data.event;
    if (eventName === 'setConnectBaseURL') {
      connectBaseURL = event.data.connectBaseURL;
      translateAllLinks();
      initializeObserver();
    }
  });
  window.parent.postMessage(
    {
      event: 'getConnectBaseURL',
    },
    '*'
  );
}

enableLinkTranslations();
