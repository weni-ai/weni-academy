<template>
  <div class="T unnnic-grid-giant">
    <main class="unnnic-grid-span-12">
      <iframe
        v-if="hasMovie"
        class="i"
        :src="data.video"
        :title="data.title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <div class="main-title">
        <div class="title">
          <h1>{{ data.title }}</h1>
          <h3>{{ data.description }}</h3>
        </div>
        <!-- 
        TODO:

        <div class="comments">
          <h1>COMMENTS</h1>
          <h3>HERE</h3>
        </div>
      --></div>

      <!-- 
      TODO:  
      <unnnic-tab initialTab="first" :tabs="['first']">
        <template slot="tab-head-first">Visão geral</template>
        <template slot="tab-panel-first">
          <div v-html="text" />
        </template>
        <template slot="tab-head-second">Comentários</template>
        <template slot="tab-panel-second">
          <unnnic-comment
            v-for="comment in comments"
            :key="comment.id"
            :title="comment.name"
            time="- 2 hours ago"
            :text="comment.text"
            :avatar="comment.avatar"
          >
          </unnnic-comment>
        </template> 
      </unnnic-tab>-->
    </main>
<!-- 
  TODO:
    <aside class="unnnic-grid-span-4">
      <div class="card-default comments"></div>

      <unnnicButton text="Ir para o aprendizado guiado" type="secondary" />

      <div class="buttons-container">
        <unnnicButton
          iconCenter="video-file-mp4-1"
          text="Aula em .MP4"
          type="secondary"
        />
        <unnnicButton
          iconCenter="office-file-pdf-1-1"
          text="Aula em .PDF"
          type="secondary"
        />
      </div>

      <div class="card-default evaluate"></div>

      <h2>Próxima aula</h2>

      <unnnic-card-data
        title="Title Card"
        description="Description Description Description Description Description Description Description Description."
        score="4.9"
        info="(3 comments)"
        checked
      />
    </aside> -->
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      hasMovie: true,
      data: {
        title: "class test",
        category: {
          title: "test category",
          module: { title: "title test", description: "module to test app" },
        },
        video: "https://www.youtube.com/embed/pWeQGcLscx8",
        description: "test class",
      },
      text: `<h1>Titulo</h1>\r\n\r\n<p>sdads asdas</p>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta sagittis ligula at egestas. Vivamus vestibulum diam sit amet massa viverra, quis dapibus diam pellentesque. Pellentesque fermentum efficitur lorem sit amet sollicitudin. Sed magna velit, pellentesque sit amet aliquet quis, dapibus vitae erat. Nullam imperdiet mollis odio eu ultrices. Duis imperdiet volutpat dolor, vitae imperdiet turpis elementum at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut ornare nunc.</p>\r\n\r\n<p>Sed quam lorem, ultricies vitae sapien a, vehicula malesuada arcu. Phasellus luctus lobortis enim eget consequat. Praesent mattis quam urna, tempor ornare sapien tincidunt ac. Pellentesque consectetur volutpat velit vel tincidunt. Vestibulum vestibulum fringilla malesuada. Curabitur sit amet ex eu nunc feugiat efficitur. Morbi hendrerit ipsum sed neque accumsan, ut ultricies turpis commodo. Cras dapibus nisi vel interdum laoreet. Sed varius, arcu eu finibus imperdiet, ligula eros luctus augue, quis feugiat justo magna non enim.</p>\r\n\r\n<p>Sed eget bibendum diam, nec vehicula augue. Quisque consectetur commodo finibus. Aenean commodo ante nec tempus auctor. Aenean vel aliquet magna. Mauris aliquam odio sit amet rhoncus ultricies. Praesent lobortis, enim a placerat gravida, dolor ante suscipit libero, ac aliquet dui tellus vitae magna. Fusce ut fermentum urna. Integer nunc nunc, volutpat porttitor tincidunt condimentum, blandit eget turpis. Sed pharetra scelerisque laoreet. Nulla facilisi. Aliquam ultrices non magna sit amet mattis. Sed feugiat dui at lacus finibus, sed tincidunt lorem fermentum. Curabitur molestie pharetra rhoncus. Etiam egestas nunc sed tortor dapibus feugiat vel ac felis.</p>\r\n\r\n<p>&nbsp;</p>`,
      comments: [
        {
          id: 1,
          name: "Matheus",
          avatar: "https://via.placeholder.com/600/92c952",
          text: "Estou muito feliz pela oportunidade de aprender, de forma fácil, a utilização do editor de Fluxos, afinal, é uma ferramenta em que mexeremos diariamente.",
        },
        {
          id: 2,
          name: "Matheus",
          avatar: "https://via.placeholder.com/600/92c952",
          text: "Estou muito feliz pela oportunidade de aprender, de forma fácil, a utilização do editor de Fluxos, afinal, é uma ferramenta em que mexeremos diariamente.",
        },
        {
          id: 3,
          name: "Matheus",
          avatar: "https://via.placeholder.com/600/92c952",
          text: "Estou muito feliz pela oportunidade de aprender, de forma fácil, a utilização do editor de Fluxos, afinal, é uma ferramenta em que mexeremos diariamente.",
        },
        {
          id: 4,
          name: "Matheus",
          avatar: "https://via.placeholder.com/600/92c952",
          text: "Estou muito feliz pela oportunidade de aprender, de forma fácil, a utilização do editor de Fluxos, afinal, é uma ferramenta em que mexeremos diariamente.",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
h1 {
  font-size: $unnnic-font-size-title-md;
  color: $unnnic-color-neutral-darkest;
}

h3 {
  margin-top: $unnnic-spacing-stack-nano;
  font-size: $unnnic-font-size-body-lg;
  color: $unnnic-color-neutral-cloudy;
}

h2 {
  margin-top: $unnnic-spacing-stack-nano;
  font-size: $unnnic-font-size-title-sm;
  color: $unnnic-color-neutral-dark;
}

.main-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: $unnnic-spacing-stack-md 0;

  .title {
    width: 100%;
    max-width: 80%;
    margin-right: $unnnic-spacing-stack-sm;
  }

  .comments {
    width: 100%;
    max-width: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}

aside {
  .card-default {
    width: 100%;
    background: $unnnic-color-background-carpet;
    border: 1px solid $unnnic-color-neutral-soft;
    border-radius: $unnnic-border-radius-md;
    margin-bottom: $unnnic-spacing-stack-md;
  }
  .comments {
    height: 492px;
  }

  .evaluate {
    height: 120px;
  }

  > button:first-of-type {
    width: 100%;
  }

  > .buttons-container {
    margin: $unnnic-spacing-stack-sm 0 $unnnic-spacing-stack-md 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $unnnic-spacing-stack-sm;
  }
}

.i {
  width: 100%;
  height: 492px;
  border-radius: $unnnic-border-radius-md;
}
</style>
