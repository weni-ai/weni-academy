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
        v-for="(category, index) in currentModule.category_set"
        :key="category.id"
        class="section__item"
      >
        <div class="section__item__header">
          <h2>{{ category.title }}</h2>
          <div>
            <router-link :to="{ name: 'ClassesListAll', params: { id_category: category.id } }">Ver tudo</router-link>
            <unnnic-button-icon
              type="secondary"
              size="small"
              icon="arrow-left-1-1"
              class=".swiper-button-prev"
              @click="backSlide(index)"
            />
            <unnnic-button-icon
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
            <router-link
              :to="{
                name: 'ClassPage',
                params: { id_class: grade.id, id_category: category.id },
              }"
            >
              <unnnic-card-data
                class="card"
                :title="grade.title"
                :description="grade.description"
              />
            </router-link>
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
import { mapActions, mapGetters, mapState } from "vuex";
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
  async mounted() {
    const { module_id } = this.$route.params;

    await this.fetchSingleModule(module_id);
  },
  methods: {
    ...mapActions(["fetchSingleModule"]),
    backSlide(index) {
      this.$refs.mySwiperRef[index].$swiper.slidePrev();
    },
    nextSlide(index) {
      this.$refs.mySwiperRef[index].$swiper.slideNext();
    },
  },
  computed: {
    ...mapGetters(['currentModule']),
    ...mapState({
      loading: (state) => state.Modules.loadingSingleModule,
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

    .card {
      height: 100%;
    }
  }
}
</style>
