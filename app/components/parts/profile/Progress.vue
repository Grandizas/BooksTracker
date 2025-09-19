<template>
  <div class="reading-progress">
    <p>{{ t('books.readingProgress') }}</p>

    <!-- * --- Total Books --- * -->
    <div class="reading-progress__row">
      <p>{{ t('books.totalBooks') }}</p>
      <p>0</p>
    </div>

    <!-- * --- Completion Rate --- * -->
    <div class="reading-progress__row">
      <p>{{ t('books.completionRate') }}</p>
      <p>0</p>
    </div>

    <!-- * --- Average Rating --- * -->
    <div class="reading-progress__row">
      <p>{{ t('books.averageRating') }}</p>

      <div class="reading-progress__row--rating">
        <font-awesome-icon class="icon-small" :icon="['far', 'star']" />
        &nbsp; 0
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { t } = useI18n();

const readingProgress = ref({
  totalBooks: 0,
  completionRate: '0%',
  averageRating: 0,
});
</script>

<style scoped lang="scss">
@use '@/assets/style/components/parts/profile/_progress.scss';
</style>
