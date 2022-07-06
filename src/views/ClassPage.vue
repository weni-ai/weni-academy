<template>
  <div class="learning-page unnnic-grid-giant">
    <main class="unnnic-grid-span-12">
      <iframe
        v-if="hasMovie"
        class="i"
        :src="currentClass.video"
        :title="currentClass.title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <div class="main-title">
        <div class="title">
          <h1>{{ currentClass.title }}</h1>
          <h3>{{ currentClass.description }}</h3>
        </div>

        <div class="average-rating">
          <div class="rating">
            <unnnic-icon-svg
              :key="index"
              v-for="index in 5"
              :scheme="starScheme(index)"
              icon="rating-star-1"
              size="ant"
            />

            <div class="rating-title">
              <span class="highlight">{{ averageRating }}</span>/5.0
            </div>
          </div>

          <div class="leave-a-comment" @click="goToCommentInput">
            Deixe um comentário
          </div>
        </div>

        <unnnicSwitch
            size="medium"
            textRight="Marcar aprendizado como concluído"
            @input="
              toggleCheckClass({ classID: currentClass.id, value: $event })
            "
            v-model="currentClass.watched.watched"
          />
        <!-- 
        TODO:

        <div class="comments">
          <h1>COMMENTS</h1>
          <h3>HERE</h3>
        </div>
        
      --></div>
      <unnnic-tab v-model="currentTab" :tabs="['comments']">
        <!--<template slot="tab-head-first">Visão geral</template>
        <template slot="tab-panel-first">
          
        </template> -->
        <template slot="tab-head-comments">Comentários (3)</template>
        <template slot="tab-panel-comments">
          <unnnic-input
            label="Deixe um comentário"
            v-model="comment"
            :disabled="creatingComment"
            size="md"
            placeholder="Um bom comentário pode ajudar outras pessoas que estão aprendendo :)"
            icon-right="send-email-3-1"
            icon-right-clickable
            @icon-right-click="createComment"
            @keydown.enter="createComment"
            class="comment-input"
            ref="comment-input"
          ></unnnic-input>
          
          <div class="comments-container">
            <unnnic-comment
              v-for="comment in comments"
              :key="comment.id"
              :title="comment.name"
              time="- 2 hours ago"
              :text="comment.text"
              class="comment"
            >
              <img
                slot="avatar"
                :src="comment.avatar"
              />
            </unnnic-comment>
          </div>
        </template>
      </unnnic-tab>
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      hasMovie: true,
      text: `<h1>Titulo</h1>\r\n\r\n<p>sdads asdas</p>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta sagittis ligula at egestas. Vivamus vestibulum diam sit amet massa viverra, quis dapibus diam pellentesque. Pellentesque fermentum efficitur lorem sit amet sollicitudin. Sed magna velit, pellentesque sit amet aliquet quis, dapibus vitae erat. Nullam imperdiet mollis odio eu ultrices. Duis imperdiet volutpat dolor, vitae imperdiet turpis elementum at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut ornare nunc.</p>\r\n\r\n<p>Sed quam lorem, ultricies vitae sapien a, vehicula malesuada arcu. Phasellus luctus lobortis enim eget consequat. Praesent mattis quam urna, tempor ornare sapien tincidunt ac. Pellentesque consectetur volutpat velit vel tincidunt. Vestibulum vestibulum fringilla malesuada. Curabitur sit amet ex eu nunc feugiat efficitur. Morbi hendrerit ipsum sed neque accumsan, ut ultricies turpis commodo. Cras dapibus nisi vel interdum laoreet. Sed varius, arcu eu finibus imperdiet, ligula eros luctus augue, quis feugiat justo magna non enim.</p>\r\n\r\n<p>Sed eget bibendum diam, nec vehicula augue. Quisque consectetur commodo finibus. Aenean commodo ante nec tempus auctor. Aenean vel aliquet magna. Mauris aliquam odio sit amet rhoncus ultricies. Praesent lobortis, enim a placerat gravida, dolor ante suscipit libero, ac aliquet dui tellus vitae magna. Fusce ut fermentum urna. Integer nunc nunc, volutpat porttitor tincidunt condimentum, blandit eget turpis. Sed pharetra scelerisque laoreet. Nulla facilisi. Aliquam ultrices non magna sit amet mattis. Sed feugiat dui at lacus finibus, sed tincidunt lorem fermentum. Curabitur molestie pharetra rhoncus. Etiam egestas nunc sed tortor dapibus feugiat vel ac felis.</p>\r\n\r\n<p>&nbsp;</p>`,
      comments: [
        {
          id: 1,
          name: "Matheus",
          avatar: "https://expertphotography.b-cdn.net/wp-content/uploads/2018/07/Pet-Photography-Perspective-6.jpg",
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

      currentTab: 'comments',

      averageRating: 3.6,

      comment: '',
      creatingComment: false,
    };
  },

  methods: {
    ...mapActions(["toggleCheckClass"]),

    goToCommentInput() {
      this.currentTab = 'comments';

      this.$nextTick(() => {
        this.$refs['comment-input'].$el.querySelector('input').focus();
      });
    },

    createComment() {
      if (!this.comment.trim()) {
        return;
      }

      this.creatingComment = true;

      console.log('create comment');

      this.creatingComment = false;
    },

    starScheme(star) {
      return star <= this.averageRating ? 'feedback-yellow' : 'neutral-clean';
    },
  },

  computed: {
    ...mapGetters(["currentClass"]),
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

.learning-page {
  margin-top: $unnnic-spacing-stack-lg;
}

.main-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: $unnnic-spacing-stack-md 0;

  .title {
    /* width: 100%; */
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

.average-rating {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .rating {
    display: flex;
    align-items: center;

    .rating-title {
      margin-left: $unnnic-spacing-inline-xs;
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-bold;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      color: $unnnic-color-neutral-cleanest;

      .highlight {
        color: $unnnic-color-neutral-darkest;
      }
    }
  }

  .leave-a-comment {
    margin-top: $unnnic-spacing-stack-xs;
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-lg;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
    color: $unnnic-color-neutral-darkest;
    text-decoration: underline;
    cursor: pointer;
  }
}

.comment-input {
  margin-bottom: $unnnic-spacing-stack-md;
}

.comments-container {
  .comment {
    ::v-deep .unnnic-comment__avatar {
      display: flex;
      justify-content: center;
      overflow: hidden;
      border-radius: 50%;
    }
  }

  .comment + .comment {
    margin-top: $unnnic-spacing-stack-md;
  }
}
</style>
