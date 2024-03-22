import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import LogRocket from 'logrocket';

import Unnnic from './utils/plugins/UnnnicSystem';
import '@weni/unnnic-system/dist/style.css';

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css';

import getEnv from './utils/env';

LogRocket.init(getEnv('VUE_APP_LOGROCKET_ID'), {
  mergeIframes: true,
  parentDomain: getEnv('VUE_APP_PARENT_DOMAIN'),
});

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(VueAwesomeSwiper);
app.use(Unnnic);

app.mount('#app');

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
          internalHref.startsWith(initial),
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
        }),
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
    '*',
  );
}

enableLinkTranslations();
