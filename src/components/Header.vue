<template>
  <header class="unnnic-grid-span-12">
    <UnnnicBreadcrumb
      :crumbs="breadcrumbs"
      @crumbClick="handleCrumbClick"
    />
  </header>
</template>

<script>
import { useHeaderStore } from '@/store/header';

export default {
  data() {
    return {
      headerStore: useHeaderStore(),
    };
  },
  methods: {
    handleCrumbClick(crumb) {
      this.$router.push(crumb.path);
    },
  },
  computed: {
    breadcrumbs() {
      return this.headerStore.breadcrumbs;
    },
  },
};
</script>

<style scoped lang="scss">
header {
  padding: 0 $unnnic-spacing-stack-md;
}
</style>
