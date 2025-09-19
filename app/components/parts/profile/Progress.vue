<template>
  <div class="reading-progress">
    <p>{{ t('books.readingProgress') }}</p>

    <!-- * --- Total Books --- * -->
    <div class="reading-progress__row">
      <p>{{ t('books.totalBooks') }}</p>
      <p>
        <carousel-loader v-if="loader.isLoading('books')" />
        <template v-else> {{ totalBooks }} </template>
      </p>
    </div>

    <!-- * --- Completion Rate --- * -->
    <div class="reading-progress__row">
      <p>{{ t('books.completionRate') }}</p>

      <p>
        <carousel-loader v-if="loader.isLoading('books')" />
        <template v-else> {{ completionRate }} </template>
      </p>
    </div>

    <!-- * --- Average Rating --- * -->
    <div class="reading-progress__row">
      <p>{{ t('books.averageRating') }}</p>

      <div class="reading-progress__row--rating">
        <font-awesome-icon class="icon-small" :icon="['far', 'star']" />
        &nbsp;
        <carousel-loader v-if="loader.isLoading('books')" />
        <template v-else> {{ averageRating }} </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useBooksStore } from '~~/stores/books';
import { useLoaderStore } from '~~/stores/loader';

const loader = useLoaderStore();
const store = useBooksStore();
const { books, statistics } = storeToRefs(store);

const { t } = useI18n();

const totalBooks = computed(() => {
  return Object.keys(books.value).length;
});

const completionRate = computed(() => {
  const completedBooks = statistics.value.booksCompleted;
  if (totalBooks.value === 0) return '0%';

  const rate = (completedBooks / totalBooks.value) * 100;
  return `${rate.toFixed(0)}%`;
});

const averageRating = computed(() => {
  const rated = Object.values(books.value).filter(
    (book) => book.rating && book.rating > 0,
  );
  if (rated.length === 0) return 0;

  const totalRating = rated.reduce((sum, book) => sum + book.rating!, 0);
  return (totalRating / rated.length).toFixed(1);
});
</script>

<style scoped lang="scss">
@use '@/assets/style/components/parts/profile/_progress.scss';
</style>
