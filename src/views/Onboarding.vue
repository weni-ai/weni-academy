<template>
  <main class="onboarding">
    <div class="onboarding__header unnnic-grid-giant">
      <div class="texts unnnic-grid-span-7">
        <h1>{{ name }}, o que você quer aprender hoje?</h1>
        <p>
          Abaixo estão listadas algumas trilhas de conhecimento que vão lhe
          ajudar a aprender a utilizar a Plataforma Weni para diversos fins.
          Escolha a que for de seu interesse para começar uma jornada de
          aprendizado da plataforma 💙
        </p>
      </div>
    </div>

    <ul class="onboarding__list unnnic-grid-giant">
      <li
        v-for="(current, index) in modules"
        :key="index"
        class="unnnic-grid-span-3"
      >
        <Banner
          :bgGradient="colors[index % colors.length]"
          :currentModule="current"
        />
      </li>
    </ul>
  </main>
</template>

<script>
import { useModulesStore } from '@/store/modules';
import Banner from '@/components/Banner.vue';

export default {
  data() {
    return {
      modulesStore: useModulesStore(),
      colors: [
        'green-yellow',
        'yellow-pink',
        'pink-blue',
        'red-blue',
        'red-blue',
        'pink-blue',
        'yellow-pink',
        'green-yellow',
      ],
      name: '',
    };
  },
  components: {
    Banner,
  },
  computed: {
    modules() {
      return this.modulesStore.modules;
    },
  },
  mounted() {
    window.addEventListener('message', (event) => {
      if (event.data?.event === 'userInfo') {
        this.name = event.data.first_name;
      }
    });

    window.parent.postMessage(
      {
        event: 'getUserInfo',
      },
      '*',
    );
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
