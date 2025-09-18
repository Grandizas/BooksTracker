<template>
  <div class="statistics-box">
    <font-awesome-icon
      class="statistics-box__icon"
      :class="`icon--${icon?.color || 'black'}`"
      :icon="['far', icon.name]"
    />
    <p class="statistics-box__count">{{ count }}</p>
    <p class="statistics-box__description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { StatisticsColorScheme } from '~~/types/types';

defineProps<{
  icon: { name: string; color?: StatisticsColorScheme };
  count: number | string;
  description: string;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/style/components/ui/_statistics-box.scss';
</style>
