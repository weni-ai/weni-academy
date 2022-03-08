<template>
  <div id="app">
    <Header v-show="currentRouteName !== 'Onboarding'"/>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import "@weni/unnnic-system";
import Header from "@/components/Header";
export default {
  name: "app",
  components: {
    Header,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions(["fetchModules"]),
  },
  async mounted() {
    // await this.fetchModules();
    console.log('2')
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
</style>
