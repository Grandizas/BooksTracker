<template>
  <img class="logo" src="@/assets/images/Logo.svg" alt="Logo" />
</template>

<style scoped lang="scss">
@use 'assets/style/abstracts/variables' as *;
@use 'assets/style/abstracts/mixins' as *;

.logo {
  @include box($icon-size-medium);
}
</style>
