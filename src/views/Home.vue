<template>
  <div class="unnnic-grid-giant">
    <header class="unnnic-grid-span-12">
      <unnnic-breadcrumb
        :crumbs="[
          { name: 'One', path: 'One' },
          { name: 'Two', path: 'Two' },
          { name: 'Active', path: 'Active' },
        ]"
      />
    </header>

    <main class="unnnic-grid-span-8">
      <iframe
        v-if="hasMovie"
        class="i"
        src="https://www.youtube.com/embed/AVNADGzXrrQ"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <div class="main-title">
        <div class="title">
          <h1>Noções básicas - Conhecendo o editor</h1>
          <h2>
            Criando um fluxo básico para coleta de dados e engajamento,
            entendendo os princípios.

            oriawroai

            daoidoai
          </h2>
        </div>

        <div class="comments">
          <h1>COMMENTS</h1>
          <h2>HERE</h2>
        </div>
      </div>

      <unnnic-tab initialTab="first" :tabs="['first', 'second']">
        <template slot="tab-head-first">Visão geral</template>
        <template slot="tab-panel-first"> CONTENT HERE </template>
        <template slot="tab-head-second">Comentários</template>
        <template slot="tab-panel-second"> COMMENTS HERE </template>
      </unnnic-tab>
    </main>

    <aside class="unnnic-grid-span-4"></aside>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      hasMovie: true,
    };
  },
};
</script>

<style scoped lang="scss">
h1 {
  font-size: $unnnic-font-size-title-md;
  color: $unnnic-color-neutral-darkest;
}

h2 {
  margin-top: $unnnic-spacing-stack-nano;
  font-size: $unnnic-font-size-body-lg;
  color: $unnnic-color-neutral-cloudy;
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

.i {
  width: 100%;
  height: 492px;
  border-radius: $unnnic-border-radius-md;
}
</style>
