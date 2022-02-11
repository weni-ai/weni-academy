<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import '@weni/unnnic-system';
export default {
  name: 'app',
}
</script>


<style lang="scss">
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px){
      font-size: 93.75%;
    }

    @media (max-width: 720px){
      font-size: 87.5% ;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: $unnnic-font-family-secondary;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: $unnnic-font-family-primary;
  }

  button {
    cursor: pointer;
  }

</style>
