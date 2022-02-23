<template>
  <div class="T unnnic-grid-giant">
    <main class="unnnic-grid-span-12">
      <!-- TODO:
        <unnnic-tab initialTab="first" :tabs="['first', 'second', 'third', 'quarter']">
        
        <template slot="tab-head-first">Fluxos</template>
        <template slot="tab-panel-first"><Fluxs /></template>

        
        <template slot="tab-head-second">Inteligência Artificial</template>
        <template slot="tab-panel-second"><Ia /></template>

        
        <template slot="tab-head-third">Atendimento Humano</template>
        <template slot="tab-panel-third"><HumanCare /></template>

        
        <template slot="tab-head-quarter">Canais</template>
        <template slot="tab-panel-quarter"><Channles /></template>
      </unnnic-tab> -->
      <section
        v-for="category in categories"
        :key="category"
        class="section__item"
      >
        <div class="section__item__header">
          <h2>{{ category.title }}</h2>
          <div>
            <a href="/">Ver tudo</a>
            <unnnic-button-icon
              type="secondary"
              size="small"
              icon="arrow-left-1-1"
              class=".swiper-button-prev"
              @click="backSlide"
            />
            <unnnic-button-icon
              type="secondary"
              size="small"
              icon="arrow-right-1-1"
              class=".swiper-button-next"
              @click="nextSlide"
            />
          </div>
        </div>
        <Swiper
          ref="mySwiperRef"
          class="section__item__list swiper"
          :options="swiperOption"
        >
          <SwiperSlide href="" v-for="grade in classes" :key="grade.id">
            <a href="">
              <unnnic-card-data
                :title="grade.title"
                :description="grade.description"
              />
            </a>
          </SwiperSlide>
        </Swiper>
      </section>
    </main>
  </div>
</template>

<script>
// import Channles from '@/components/tabs/channels.vue';
// import Fluxs from '@/components/tabs/fluxsTab.vue';
// import HumanCare from '@/components/tabs/humanCare.vue';
// import Ia from '@/components/tabs/iaTab.vue';
import { mapState } from "vuex";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  name: "Home",
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 16,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  components: {
    // Channles,
    // Fluxs,
    // HumanCare,
    // Ia,
    Swiper,
    SwiperSlide,
  },
  methods: {
    backSlide() {
      this.$refs.mySwiperRef[0].$swiper.slidePrev();
    },
    nextSlide() {
      this.$refs.mySwiperRef[0].$swiper.slideNext();
    },
  },
  computed: {
    ...mapState({
      categories: (state) => state.Modules.module.categories,
      classes: (state) => state.Modules.module.categories[0]?.classes,
    }),
  },
};
</script>

<style scoped lang="scss">
.section__item {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: $unnnic-inline-lg 0 $unnnic-inline-md;

    h2 {
      font: $unnnic-font-size-title-sm $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-darkest;
    }

    > div {
      display: flex;
      align-items: center;

      a {
        color: $unnnic-color-neutral-dark;
        text-decoration: underline;
        margin-right: $unnnic-spacing-stack-sm;
      }

      button {
        & + button {
          margin-left: $unnnic-spacing-stack-xs;
        }
      }
    }
  }

  .section__item__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $unnnic-spacing-stack-md;
  }
}
</style>
