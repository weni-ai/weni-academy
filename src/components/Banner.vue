<template>
  <div class="link" tabindex="0">
    <div
      :class="[
        'banner',
        `banner__${bgGradient}`,
        expanded ? 'expanded' : 'reduced',
      ]"
    >
      <div :class="['banner__content']">
        <p v-if="!expanded" class="banner__content-icon">
          <img :src="currentModule.image" alt="Module icon" />
        </p>
        <h3>{{ currentModule.title }}</h3>
        <p
          :class="[
            'banner__content-description',
            currentModule.watched_percentage ? '' : 'hasNotProgress',
          ]"
        >
          {{ currentModule.description }}
        </p>

        <div v-if="currentModule.watched_percentage > 0" class="progress-bar">
          <div
            class="progress"
            :style="`width:${currentModule.watched_percentage}%`"
          />
        </div>
        <p v-if="expanded" class="percentage-info">
          {{`${currentModule.watched_percentage}% completo` }}
        </p>
      </div>
      <div class="hover" v-if="!expanded">
        <div class="links">
          <router-link
            :to="{
              name: 'Home',
              params: {
                module_id: currentModule.id,
              },
            }"
          >
            <unnnic-button type="secondary">Abrir</unnnic-button>
          </router-link>
        </div>
        <!-- <unnnic-button type="terciary">gerar certificado</unnnic-button> -->
        <router-link
          v-if="resumeWhereILeft(currentModule)"
          class="continue__class"
          :to="{
            name: 'ClassPage',
            params: {
              module_id: resumeWhereILeft(currentModule).module.id,
              id_category: resumeWhereILeft(currentModule).category.id,
              id_class: resumeWhereILeft(currentModule).id,
            },
          }"
        >
          Continuar de onde parei →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
    bgGradient: {
      type: String,
      default: "green-yellow",
    },
    currentModule: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    resumeWhereILeft: (currentModule) => {
      const classes = currentModule?.category_set?.reduce(
        (acumulator, current) => {
          return acumulator.concat(current.class_set);
        },
        []
      );
      const lesson = classes?.find((lesson) => {
        return !lesson.watched.watched;
      });

      return lesson;
    },
  },
  data() {
    return {
      isExpanded: this.expanded,
    };
  },
};
</script>

<style scoped lang="scss">
.link {
  position: relative;
}

.banner {
  display: flex;
  padding: $unnnic-inset-md;
  position: relative;

  &__green-yellow {
    background: linear-gradient(117.82deg, #c4eaf5 0%, #fbf7c9 100%);
  }
  &__yellow-pink {
    background: linear-gradient(117.97deg, #fbf7c9 0%, #ffcbf6 100%);
  }
  &__pink-blue {
    background: linear-gradient(117.82deg, #ffcbf6 0%, #c4eaf5 100%);
  }
  &__red-blue {
    background: linear-gradient(117.82deg, #f4c4c4 0%, #c4eaf5 100%);
  }

  border-radius: $unnnic-border-radius-md;
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;

    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 56px; //not in unnnic
      height: 100%;
      min-height: 56px; //not in unnnic
      max-height: 56px; //not in unnnic
      background-color: rgba($unnnic-color-background-snow, 0.4);
      border-radius: $unnnic-border-radius-pill;

      > img {
        width: 24px;
      }
    }

    h3 {
      margin: $unnnic-spacing-stack-sm 0 $unnnic-spacing-stack-xs;
      font-family: $unnnic-font-family-primary;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-black;
      font-size: $unnnic-font-size-title-md;
      line-height: $unnnic-line-height-md + $unnnic-font-size-title-md;
    }

    & &-description {
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-darkest;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-line-height-md + $unnnic-font-size-body-lg;
    }
  }
  &.reduced {
    height: 318px;
    .banner__content {
      h3 {
        height: 64px;
      }
      .banner__content-description {
        height: 72px;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -webkit-box;

        &.hasNotProgress {
          margin-bottom: $unnnic-spacing-stack-sm;
        }
      }
    }
  }
  &.expanded {
    margin-top: $unnnic-spacing-stack-xs;
    margin-bottom: $unnnic-spacing-stack-xs;
    & > .banner__content {
      height: auto;
      h3 {
        margin-top: 0;
      }
    }
  }
}

.hover {
  padding: $unnnic-inset-md;
  // display: none;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: $unnnic-border-radius-md;
  background: rgba($unnnic-color-background-carpet, 0.88);
  backdrop-filter: blur(4px);
  transition: visibility 0s, opacity 0.1s linear;

  .links {
    flex: 1;
    display: flex;
    align-items: center;
  }

  a,
  button {
    width: 100%;
  }

  .continue__class {
    position: absolute;
    bottom: $unnnic-spacing-stack-md;
    right: 0;
    text-align: center;
    text-decoration: underline;
    color: $unnnic-color-neutral-darkest;
    font-family: $unnnic-font-family-secondary;
  }
}

.banner:hover,
.link:active,
.link:focus-visible {
  .hover {
    visibility: visible;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    button:first-child {
      margin-bottom: $unnnic-spacing-stack-xs;
    }
  }
}

.progress-bar {
  background-color: rgba($unnnic-color-neutral-snow, 0.4);
  height: 8px;
  border-radius: $unnnic-border-radius-pill;
  overflow: hidden;
  max-width: 267px;
  margin-top: $unnnic-spacing-stack-xs;

  .progress {
    background-color: $unnnic-color-neutral-snow;
    height: 100%;
    border-radius: $unnnic-border-radius-pill;
  }
}

.percentage-info{
  margin-top: $unnnic-spacing-stack-xs;
  font-weight: $unnnic-font-weight-bold;
  color: $unnnic-color-neutral-darkest;
}
</style>