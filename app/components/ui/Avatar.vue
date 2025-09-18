<template>
  <div class="avatar" :class="`avatar--${size}`">
    <font-awesome-icon :icon="['far', 'user']" />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
@use '@/assets/style/components/ui/_avatar.scss';
</style>
