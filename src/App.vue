<template>
  <div id="app">
    <Header v-show="currentRouteName !== 'Onboarding'" />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "@/components/Header.vue";
export default {
  name: "app",
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["currentModule"]),
    currentRouteName() {
      return this.$route.name;
    },
  },
  updated() {
    this.translateAllLinks();
  },
  mounted() {
    window.parent.postMessage(
      {
        event: "getConnectBaseURL",
      },
      "*"
    );
    window.addEventListener("message", (event) => {
      const eventName = event.data && event.data.event;
      if (eventName === "setConnectBaseURL") {
        this.connectBaseURL = event.data.connectBaseURL;
        this.translateAllLinks();
      }
    });
  },
  methods: {
    translateAllLinks() {
      if (!this.connectBaseURL) {
        return;
      }
      const url = new URL(this.connectBaseURL);
      const debug = url.host && url.host.includes("develop");
      document.querySelectorAll("a[href]").forEach((link) => {
        const internalHref =
          link.getAttribute("internal-href") || link.getAttribute("href");
        if (
          ["http://", "https://"].some((initial) =>
            internalHref.startsWith(initial)
          )
        ) {
          return;
        }
        const dashHref = this.connectBaseURL + internalHref;
        if (link.translateLinkConnect) {
          if (link.getAttribute("href") === dashHref) {
            return;
          }
          link.removeEventListener("click", link.translateLinkConnect);
        }
        link.setAttribute("internal-href", internalHref);
        link.setAttribute("href", dashHref);
        const randomId = Math.floor(Math.random() * 100);
        link.addEventListener(
          "click",
          (link.translateLinkConnect = () => {
            if (debug) {
              console.log(`TranslateLinkConnectId ${randomId}`);
            }
            link.setAttribute("href", internalHref);
            setTimeout(() => {
              link.setAttribute("href", dashHref);
            }, 0);
          })
        );
      });
    },
  },
};
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  /* @media (max-width: 1080px){
      font-size: 93.75%;
    }

    @media (max-width: 720px){
      font-size: 87.5% ;
    } */
}

body {
  -webkit-font-smoothing: antialiased;
}

body,
input,
textarea,
button {
  font-family: $unnnic-font-family-secondary;
}

h1,
h2,
h3,
h4,
h5,
h6,
strong {
  font-family: $unnnic-font-family-primary;
}

button {
  cursor: pointer;
}

a:link {
  text-decoration: none;
}

a:active {
  text-decoration: none;
  color: blue;
}
a:visited {
  color: inherit;
}

.card {
  height: 100%;
}
</style>
