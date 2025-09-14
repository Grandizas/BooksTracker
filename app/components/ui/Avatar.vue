<template>
  <div class="avatar">
    <font-awesome-icon icon="fa-regular fa-user" />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<style scoped lang="scss">
@use 'assets/style/abstracts/colors' as *;
@use 'assets/style/abstracts/variables' as *;
@use 'assets/style/abstracts/functions' as *;
@use 'assets/style/abstracts/mixins' as *;

.avatar {
  display: flex;
  width: fit-content;
  border-radius: 50%;
  padding: spacing(1);
  background-color: $color-gray-dark;

  :deep(svg) {
    color: $color-white;
    @include box($icon-size-small);
  }
}
</style>
