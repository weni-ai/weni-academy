<template>
  <div class="learning-page unnnic-grid-giant">
    <main class="unnnic-grid-span-12">
      <div class="page-container">
        <iframe
          v-if="hasMovie"
          class="i"
          :src="currentClass.video"
          :title="currentClass.title"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <div :class="['notes', { yellowed: isNotesYellowed }]">
          <div class="header">
            <div class="title">Suas anotações</div>

            <div class="action">
              <unnnic-icon v-if="isSavingNotes" class="spin" icon="loading-circle-1" scheme="neutral-dark" />
            </div>
          </div>

          <div class="placeholder" v-if="!isNotesFocusedOrFilled">
            <span class="edit-button" @click="$refs.notesInput.focus()">Clique aqui</span> para começar a fazer anotações.
          </div>

          <div class="content">
            <textarea ref="notesInput" v-model="notes" @input="saveNotes" @focus="isNotesFocused = true" @blur="isNotesFocused = false"></textarea>
          </div>
        </div>

        <div>
          <div class="main-title">
            <div class="title">
              <h1>{{ currentClass.title }}</h1>
              <h3>{{ currentClass.description }}</h3>
            </div>

            <div class="average-rating">
              <unnnic-star-rating
                v-model="currentClass.average_rating"
                show-value
                readonly
              />

              <div class="leave-a-comment" @click="goToCommentInput">
                Deixe um comentário
              </div>
            </div>
            <!-- 
            TODO:

            <div class="comments">
              <h1>COMMENTS</h1>
              <h3>HERE</h3>
            </div>
            
          --></div>
          <unnnic-tab v-model="currentTab" :tabs="['overview', 'materials', 'comments']">
            <template slot="tab-head-overview">Visão Geral</template>
            <template slot="tab-panel-overview">
              <div class="overview-container">
                <unnnicSwitch
                  size="medium"
                  textRight="Marcar aprendizado como concluído"
                  @input="
                    toggleCheckClass({ classID: currentClass.id, value: $event })
                  "
                  v-model="currentClass.lesson_monitoring.watched"
                  class="toggle-class"
                />

                <div v-html="currentClass.content"></div>
              </div>
            </template>

            <template slot="tab-head-materials">Materiais de Apoio</template>
            <template slot="tab-panel-materials">
              <div v-for="(material, index) in materials" :key="index">
                <unnnic-icon v-if="material.type === 'pdf'" icon="office-file-pdf-1-1" />
                {{ material.title }}
              </div>
            </template>

            <template slot="tab-head-comments">Comentários ({{ comments.length }})</template>
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
                  :time="`- ${comment.created_at}`"
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
        </div>

        <div class="right-side">
          <div class="mood-rating-container">
            <unnnic-mood-rating
              title="Avalie seu aprendizado nesta aula"
              :value="mood === 0 ? null : mood"
              @input="setMood"
              :titles-moods="['Decepcionado', 'Insatisfeito', 'Neutro', 'Feliz', 'Produtivo']"
            />
          </div>

          <div v-if="nextClass" class="next-class-container">
            <div class="title">Próxima aula</div>

            <router-link
              :to="{
                name: 'ClassPage',
                params: {
                  id_class: nextClass.id,
                },
              }"
            >
              <unnnic-card-data
                :title="nextClass.title"
                :description="nextClass.description"
                :score="nextClass.rating"
                :info="nextClass.comments && `(${nextClass.comments} comments)`"
                :checked="nextClass.lesson_monitoring.watched"
              />
            </router-link>
          </div>
        </div>
      </div>
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
      comments: [],

      currentTab: 'overview',

      comment: '',
      creatingComment: false,

      materials: [{
        title: 'Nome do arquivo.docx',
        type: 'doc',
      }, {
        title: 'Nome do arquivo.pdf',
        type: 'pdf',
      }, {
        title: 'Nome do link',
        type: 'link',
      }],

      mood: 0,

      notes: '',

      isNotesFocused: false,

      isSavingNotes: false,
      lastCallSaveNotes: null,
    };
  },

  created() {
    this.mood = this.currentClass.lesson_monitoring.mood;

    this.getClassAnnotation({
      classId: this.currentClass.id,
    }).then(({ data }) => {
      this.notes = data.text;
    });

    this.getClassComments({
      classId: this.currentClass.id,
    }).then(({ data }) => {
      this.comments = data.comments;
    });
  },

  methods: {
    ...mapActions([
      "toggleCheckClass",
      'setClassMood',
      'getClassAnnotation',
      'setClassAnnotation',
      'createClassComment',
      'getClassComments',
    ]),

    async setMood($event) {
      const mood = $event === null ? 0 : $event;

      const initialValue = this.mood;
      this.mood = $event;

      try {
        const response = await this.setClassMood({
          classId: this.currentClass.id,
          mood,
        });

        this.mood = this.currentClass.lesson_monitoring.mood = response.data.mood;
      } catch (error) {
        this.mood = initialValue;
      }
    },

    goToCommentInput() {
      this.currentTab = 'comments';

      this.$nextTick(() => {
        this.$refs['comment-input'].$el.querySelector('input').focus();
      });
    },

    async createComment() {
      if (!this.comment.trim()) {
        return;
      }

      try {
        this.creatingComment = true;

        const response = await this.createClassComment({
          classId: this.currentClass.id,
          text: this.comment.trim(),
        });

        this.comments.unshift({
          id: response.data.id,
          name: response.data.name,
          avatar: response.data.avatar,
          text: response.data.text,
          created_at: response.data.created_at,
        });

        this.comment = '';
      } finally {
        this.creatingComment = false;
      }
    },

    saveNotes() {
      clearTimeout(this.lastCallSaveNotes);

      this.lastCallSaveNotes = setTimeout(async () => {
        try {
          this.isSavingNotes = true;

          await this.setClassAnnotation({
            classId: this.currentClass.id,
            annotation: this.notes,
          });
        } finally {
          this.isSavingNotes = false;
        }
      }, 300);
    },
  },

  computed: {
    ...mapGetters(["currentClass", "currentModule"]),

    isNotesFocusedOrFilled() {
      return this.isNotesFocused || this.notes;
    },

    isNotesYellowed() {
      return !this.isNotesFocused && this.notes;
    },

    nextClass() {
      const classes =
        this.currentModule.category_set
          .map((categories) => categories.class_set)
          .flat();
      
      const indexCurrentClass =
        classes
          .findIndex((classItem) => classItem.id === this.currentClass.id);
      
      if (indexCurrentClass !== -1 && classes[indexCurrentClass + 1]) {
        return classes[indexCurrentClass + 1];
      } else {
        return null;
      }
    },
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

.page-container {
  display: grid;
  grid-template-columns: auto 26.875rem;
  grid-column-gap: $unnnic-spacing-inline-sm;
  grid-row-gap: $unnnic-spacing-stack-md;

  .notes {
    border-radius: $unnnic-border-radius-md;
    padding: $unnnic-spacing-inset-md;
    display: flex;
    flex-direction: column;

    background-color: $unnnic-color-background-carpet;
    border-radius: $unnnic-border-radius-md;
    outline-style: solid;
    outline-color: $unnnic-color-neutral-soft;
    outline-width: $unnnic-border-width-thinner;
    outline-offset: -$unnnic-border-width-thinner;

    &.yellowed {
      // background-color: $unnnic-color-aux-baby-yellow;
      background-color: #FBF7C9;
      outline: none;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $unnnic-spacing-stack-sm;

      .title {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-bold;
        font-size: $unnnic-font-size-title-sm;
        line-height: $unnnic-font-size-title-sm + $unnnic-line-height-md;
        color: $unnnic-color-neutral-darkest;
      }

      .action {
        text-decoration: underline;
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
        color: $unnnic-color-neutral-dark;
        cursor: pointer;
        user-select: none;
      }
    }

    .placeholder {
      font-family: $unnnic-font-family-primary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      color: $unnnic-color-neutral-dark;

      .edit-button {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .content {
      flex: 1;

      textarea {
        background-color: transparent;
        border: 0;
        width: calc(100% + $unnnic-spacing-inline-xs);
        height: 100%;
        resize: none;
        font-family: $unnnic-font-family-primary;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-lg;
        line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
        color: $unnnic-color-neutral-dark;
        outline: none;
        padding-right: $unnnic-spacing-inline-sm;

        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-thumb {
          background: $unnnic-color-neutral-clean;
          border-radius: $unnnic-border-radius-pill;
        }

        &::-webkit-scrollbar-track {
          background: $unnnic-color-neutral-soft;
          border-radius: $unnnic-border-radius-pill;
        }
      }
    }
  }
}

.learning-page {
  margin-top: $unnnic-spacing-stack-lg;
}

.main-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: $unnnic-spacing-stack-md;

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

.mood-rating-container {
  padding: $unnnic-spacing-inset-md;
  background-color: $unnnic-color-background-carpet;
  border-radius: $unnnic-border-radius-md;
  outline-style: solid;
  outline-color: $unnnic-color-neutral-soft;
  outline-width: $unnnic-border-width-thinner;
  outline-offset: -$unnnic-border-width-thinner;
}

.next-class-container {
  margin-top: $unnnic-spacing-stack-md;

  .title {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-bold;
    font-size: $unnnic-font-size-title-sm;
    line-height: $unnnic-font-size-title-sm + $unnnic-line-height-md;
    color: $unnnic-color-neutral-dark;
    margin-bottom: $unnnic-spacing-stack-sm;
  }
}

.average-rating {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

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

.overview-container {
  .toggle-class {
    margin-bottom: $unnnic-spacing-stack-sm;
  }

  ::v-deep  {
    p {
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      color: $unnnic-color-neutral-darkest;

      & + p {
        margin-top: 1rem;
      }
    }

    img {
      display: block;
      margin: 0 auto;
      max-width: 75%;
      max-height: 24.5rem;
    }
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

.spin {
  animation-name: spin;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>
