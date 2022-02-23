<template>
  <header class="unnnic-grid-span-12">
    <unnnicBreadcrumb
      :crumbs="[
        { name: 'One', path: 'One' },
        { name: 'Two', path: 'Two' },
        { name: 'Active', path: 'Active' },
      ]"
    />
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
  header {
    padding: 0 $unnnic-spacing-stack-md;
  }
</style>