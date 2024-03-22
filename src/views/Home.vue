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
      <Banner
        :bgGradient="colors[modules.indexOf(currentModule) % colors.length]"
        :currentModule="currentModule"
        expanded
      />
      <section
        v-for="(category, index) in currentModule.category_set"
        :key="category.id"
        class="section__item"
      >
        <div class="section__item__header">
          <div class="section__item__header-left">
            <UnnnicCircleProgressBar
              :progress="getAllCompletedClasses(category)"
              :totalProgress="getAllClasses(category)"
            />
            <h2>{{ category.title }}</h2>
          </div>
          <div>
            <RouterLink
              :to="{
                name: 'ClassesListAll',
                params: { id_category: category.id },
              }"
              >Ver tudo</RouterLink
            >
            <UnnnicButtonIcon
              type="secondary"
              size="small"
              icon="arrow-left-1-1"
              class=".swiper-button-prev"
              @click="backSlide(index)"
            />
            <UnnnicButtonIcon
              type="secondary"
              size="small"
              icon="arrow-right-1-1"
              class=".swiper-button-next"
              @click="nextSlide(index)"
            />
          </div>
        </div>
        <Swiper
          ref="mySwiperRef"
          class="section__item__list swiper"
          :options="swiperOption"
        >
          <SwiperSlide
            href=""
            v-for="grade in category.class_set"
            :key="grade.id"
          >
            <RouterLink
              :to="{
                name: 'ClassPage',
                params: { id_class: grade.id, id_category: category.id },
              }"
            >
              <UnnnicCardData
                class="card"
                :title="grade.title"
                :description="grade.description"
                :score="
                  grade.average_rating ? grade.average_rating.toFixed(1) : null
                "
                :info="
                  grade.lesson_monitoring.comment_count !== null
                    ? `(${grade.lesson_monitoring.comment_count} comentários)`
                    : null
                "
                :checked="grade.lesson_monitoring.watched"
              />
            </RouterLink>
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
import { useModulesStore } from '@/store/modules';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import Banner from '@/components/Banner.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data() {
    return {
      modulesStore: useModulesStore(),
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 16,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
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
    };
  },
  components: {
    // Channles,
    // Fluxs,
    // HumanCare,
    // Ia,
    Swiper,
    SwiperSlide,
    Banner,
  },
  async mounted() {
    const { module_id } = this.$route.params;

    await this.fetchSingleModule(module_id);
  },
  methods: {
    fetchSingleModule() {
      return this.modulesStore.fetchSingleModule;
    },
    backSlide(index) {
      this.$refs.mySwiperRef[index].$swiper.slidePrev();
    },
    nextSlide(index) {
      this.$refs.mySwiperRef[index].$swiper.slideNext();
    },
    getAllClasses(category) {
      return category.class_set.length;
    },
    getAllCompletedClasses(category) {
      const number = category.class_set.reduce((acumulator, lesson) => {
        if (lesson.lesson_monitoring.watched) acumulator++;
        return acumulator;
      }, 0);

      return number;
    },
  },
  computed: {
    currentModule() {
      return this.modulesStore.currentModule;
    },
    loading() {
      return this.modulesStore.loadingSingleModule;
    },
    modules() {
      return this.modulesStore.modules;
    },
  },
};
</script>

<style scoped lang="scss">
.section__item {
  &:nth-child(1) {
    margin-top: $unnnic-inline-lg;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-left {
      gap: $unnnic-spacing-stack-sm;
    }

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

    padding: $unnnic-inline-lg 0 $unnnic-inline-md;

    .card {
      height: 100%;
      ::v-deep .description {
        height: 72px;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -webkit-box;
      }
    }
  }
}
</style>
