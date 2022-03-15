<template>
  <header class="unnnic-grid-span-12">
    <unnnicBreadcrumb
      :crumbs="breadcrumbs"
      @crumbClick="handleCrumbClick"
    />
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    handleCrumbClick(crumb) {
      this.$router.push(crumb.path);
    },
  },
  computed: {
    ...mapGetters(['breadcrumbs']),
  }
};
</script>

<style scoped lang="scss">
  header {
    padding: 0 $unnnic-spacing-stack-md;
  }
</style>