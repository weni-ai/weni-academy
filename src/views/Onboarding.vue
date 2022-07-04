<template>
  <main class="onboarding">
    <div class="onboarding__header unnnic-grid-giant">
      <div class="texts unnnic-grid-span-7">
        <h1>Filipe, o que você quer aprender hoje?</h1>
        <p>
          Abaixo estão listadas situações que são possíveis de serem criados com
          os nossos bots e fluxos. escolha o que for de seu interesse para
          começar uma jornada de aprendizado sobre a nossa plataforma 💙
        </p>
      </div>
    </div>

    <ul class="onboarding__list unnnic-grid-giant">
      
      <li v-for="(current, index) in modules" :key="index" class="unnnic-grid-span-3">
        <Banner :bgGradient="colors[index  % colors.length]" :currentModule="current" />
      </li>
    </ul>
  </main>
</template>

<script>
import Banner from "@/components/Banner.vue";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      colors: [
        "green-yellow",
        "yellow-pink",
        "pink-blue",
        "red-blue",
        "red-blue",
        "pink-blue",
        "yellow-pink",
        "green-yellow",
      ],
    };
  },
  computed: {
    ...mapState({
      modules: state => state.Modules.modules,
    })
  },
  components: {
    Banner,
  },
};
</script>

<style scoped lang="scss">
.onboarding {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: $unnnic-spacing-stack-md;
  height: 100vh;

  .texts {
    margin-bottom: $unnnic-spacing-stack-xgiant;

    h1,
    p {
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-darkest;
    }

    h1 {
      font-family: $unnnic-font-family-primary;
      font-size: $unnnic-font-size-title-lg;
      line-height: $unnnic-line-height-md + $unnnic-font-size-title-lg;
    }

    p {
      margin-top: $unnnic-spacing-stack-xs;
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-line-height-md + $unnnic-font-size-body-lg;
    }
  }

  &__list {
    li {
      list-style: none;
    }
  }
}
</style>