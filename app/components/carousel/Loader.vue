<template>
  <span :class="`loader ${size}`" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'small' | 'medium' | 'large';
  }>(),
  {
    size: 'small',
  },
);
</script>

<style scoped lang="scss">
@use '@/assets/style/abstracts/colors' as *;
@use '@/assets/style/abstracts/variables' as *;
@use '@/assets/style/abstracts/mixins' as *;

.loader {
  position: relative;
  border-radius: 50%;
  animation: rotate 1s linear infinite;

  &.small {
    @include box($icon-size-small);
  }
  &.medium {
    @include box($icon-size-medium);
  }
  &.large {
    @include box($icon-size-large);
  }
}

.loader::before {
  content: '';
  inset: 0;
  position: absolute;
  border-radius: 50%;
  box-sizing: border-box;
  border: 2px solid $color-gray-dark;
  animation: clipFix 2s linear infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes clipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}
</style>
