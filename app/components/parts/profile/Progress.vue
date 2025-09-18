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
</script>

<style scoped lang="scss">
@use 'assets/style/abstracts/colors' as *;
@use 'assets/style/abstracts/variables' as *;
@use 'assets/style/abstracts/functions' as *;

.reading-progress {
  display: flex;
  gap: spacing(2);
  padding: spacing(2);
  flex-direction: column;
  border-radius: $radius-md;
  box-shadow: $box-shadow-box;

  &__row,
  &__row--rating {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p,
  .reading-progress__row--rating {
    font-size: $font-size-sm;
  }

  svg {
    color: $color-yellow;
  }
}
</style>
