<template>
  <div class="listAllContainer">
    <header>
      <unnnic-breadcrumb
        :crumbs="[
          { name: 'One', path: 'One' },
          { name: 'Two', path: 'Two' },
          { name: 'Active', path: 'Active' },
        ]"
      />
    </header>

    <main>
      <div>
        <!-- PROGRESS ITEM HERE -->
        <h1>Noções Básicas</h1>
      </div>

      <ul class="course-list">
        <Swiper>
          <li v-for="course in courses" :key="course.id">
            <SwiperSlide>
              <router-link :to="`/${course.id}`">
                <unnnic-card-data
                  :title="course.title"
                  :description="course.description"
                  :score="course.rating"
                  :info="`(${course.comments} comments)`"
                  :checked="course.isComplete"
                />
              </router-link>
            </SwiperSlide>
          </li>
        </Swiper>
      </ul>

      <nav class="navigation">navigation here</nav>
    </main>
  </div>
</template>

<script>

export default {
  name: "ListAll",
  data() {
    return {
      hasMovie: true,
      courses: [
        {
          id: 1,
          title: "Noções Básicas",
          description:
            "Criando um fluxo básico para coleta de dados e engajamento, entendendo os princípios.",
          isComplete: false,
          rating: "5.0",
          comments: 2,
        },
        {
          id: 2,
          title: "Conhecendo o editor",
          description:
            "Conheça as funcionalidades do editor de fluxos para facilitar a criação da sua coleta de dados.",
          isComplete: true,
          rating: "4.6",
          comments: 12,
        },
        {
          id: 3,
          title: "Incluindo comentários",
          description: "Realize comentários relevantes em seus fluxos.",
          isComplete: false,
          rating: "4.1",
          comments: 15,
        },
        {
          id: 4,
          title: "Noções Básicas",
          description:
            "Criando um fluxo básico para coleta de dados e engajamento, entendendo os princípios.",
          isComplete: false,
          rating: "5.0",
          comments: 2,
        },
        {
          id: 5,
          title: "Conhecendo o editor",
          description:
            "Conheça as funcionalidades do editor de fluxos para facilitar a criação da sua coleta de dados.",
          isComplete: true,
          rating: "4.6",
          comments: 12,
        },
        {
          id: 6,
          title: "Incluindo comentários",
          description: "Realize comentários relevantes em seus fluxos.",
          isComplete: false,
          rating: "4.1",
          comments: 15,
        },
        {
          id: 7,
          title: "Noções Básicas",
          description:
            "Criando um fluxo básico para coleta de dados e engajamento, entendendo os princípios.",
          isComplete: false,
          rating: "5.0",
          comments: 2,
        },
        {
          id: 8,
          title: "Conhecendo o editor",
          description:
            "Conheça as funcionalidades do editor de fluxos para facilitar a criação da sua coleta de dados.",
          isComplete: true,
          rating: "4.6",
          comments: 12,
        },
        {
          id: 9,
          title: "Incluindo comentários",
          description: "Realize comentários relevantes em seus fluxos.",
          isComplete: false,
          rating: "4.1",
          comments: 15,
        },
      ],
    };
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