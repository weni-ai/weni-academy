<template>
  <div class="listAllContainer">
    <main>
      <div>
        <!-- PROGRESS ITEM HERE -->
        <h1>{{ currentCategory.title }}</h1>
      </div>

      <ul class="course-list">
        <li v-for="course in currentCategory.class_set" :key="course.id">
          <router-link
            :to="{
              name: 'ClassPage',
              params: {
                id_class: course.id,
              },
            }"
          >
            <unnnic-card-data
              :title="course.title"
              :description="course.description"
              :score="course.rating"
              :info="course.comments && `(${course.comments} comments)`"
              :checked="course.lesson_monitoring.watched"
            />
          </router-link>
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
import { mapGetters } from 'vuex';

export default {
  name: "ListAllClasses",
  data() {
    return {
      page: 1,
      hasMovie: true,
    };
  },

  computed: {
    ...mapGetters(['currentCategory']),
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