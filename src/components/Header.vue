<template>
  <header class="unnnic-grid-span-12">
    <unnnicBreadcrumb
      :crumbs="breadcrumbs"
      @crumbClick="handleCrumbClick"
    />
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    handleCrumbClick(crumb) {
      this.$router.push(crumb.path);
    },
  },
  computed: {
    ...mapState({
      breadcrumbs: (state) => state.Header.breadcrumb
    })
  }
};
</script>

<style scoped lang="scss">
  header {
    padding: 0 $unnnic-spacing-stack-md;
  }
</style>