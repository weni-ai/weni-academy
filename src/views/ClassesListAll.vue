<template>
  <div class="listAllContainer">
    <main>
      <div class="header">
        <UnnnicCircleProgressBar
          :progress="getTotalCompletedClasses"
          :totalProgress="getTotalClasses"
        />
        <h1>{{ currentCategory.title }}</h1>
      </div>

      <ul class="course-list">
        <li
          v-for="course in currentCategory.class_set"
          :key="course.id"
        >
          <RouterLink
            :to="{
              name: 'ClassPage',
              params: {
                id_class: course.id,
              },
            }"
          >
            <UnnnicCardData
              :title="course.title"
              :description="course.description"
              :score="
                course.average_rating ? course.average_rating.toFixed(1) : null
              "
              :info="
                course.lesson_monitoring.comment_count !== null
                  ? `(${course.lesson_monitoring.comment_count} comentários)`
                  : null
              "
              :checked="course.lesson_monitoring.watched"
            />
          </RouterLink>
        </li>
      </ul>

      <!-- 
      <nav class="navigation">
        <unnnic-pagination v-model="page" :value="1" :max="10" :show="5" />
      </nav> 
      -->
    </main>
  </div>
</template>

<script>
import { useModulesStore } from '@/store/modules';

export default {
  name: 'ListAllClasses',
  data() {
    return {
      modulesStore: useModulesStore(),
      page: 1,
      hasMovie: true,
    };
  },

  computed: {
    currentCategory() {
      return this.modulesStore.currentCategory;
    },

    getTotalClasses() {
      return this.modulesStore.getTotalClasses;
    },

    getTotalCompletedClasses() {
      return this.modulesStore.getTotalCompletedClasses;
    },
  },
};
</script>

<style scoped lang="scss">
.listAllContainer {
  margin: 0 20px;
}
h1 {
  font-size: $unnnic-font-size-title-md;
  color: $unnnic-color-neutral-darkest;
}

main {
  margin: $unnnic-spacing-stack-lg 0 $unnnic-spacing-stack-sm;
  .header {
    display: flex;
    align-items: center;
    gap: $unnnic-spacing-stack-sm;
  }
  .course-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $unnnic-spacing-stack-sm;

    list-style: none;

    margin: $unnnic-spacing-stack-md 0;

    li a {
      > div {
        height: 100%;
      }
    }
  }

  .navigation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
