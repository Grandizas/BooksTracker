<template>
  <section class="profile-statistics ignore-bordering">
    <ui-statistics-box
      v-for="item of statistics"
      :key="item.id"
      :icon="item.icon"
      :count="item.count"
      :loading="loading"
      :description="item.description"
    />
  </section>
</template>

<script setup lang="ts">
import type { StatisticsColorScheme } from '~~/types/types';
import { useBooksStore } from '~~/stores/books';

const books = useBooksStore();
const { statistics: piniaStatistics } = storeToRefs(books);

type Statistic = {
  id: number;
  icon: { name: string; color?: StatisticsColorScheme };
  count: number;
  description: string;
};

const { t } = useI18n();

const loading = ref(true);
const statistics: Ref<Statistic[]> = ref([
  {
    id: 1,
    icon: { name: 'trophy', color: 'yellow' },
    count: piniaStatistics.value.booksCompleted,
    description: t('statistics.booksCompleted'),
  },
  {
    id: 2,
    icon: { name: 'book-open', color: 'blue' },
    count: piniaStatistics.value.currentlyReading,
    description: t('statistics.currentlyReading'),
  },
  {
    id: 3,
    icon: { name: 'heart', color: 'red' },
    count: piniaStatistics.value.wishlist,
    description: t('statistics.onWishlist'),
  },
  {
    id: 4,
    icon: { name: 'books', color: 'green' },
    count: piniaStatistics.value.pagesRead,
    description: t('statistics.pagesRead'),
  },
]);

onMounted(async () => {
  await books.getStatistics();
  updateCounts();
  loading.value = false;
});

function updateCounts() {
  statistics.value[0]!.count = piniaStatistics.value.booksCompleted;
  statistics.value[1]!.count = piniaStatistics.value.currentlyReading;
  statistics.value[2]!.count = piniaStatistics.value.wishlist;
  statistics.value[3]!.count = piniaStatistics.value.pagesRead;
}
</script>

<style scoped lang="scss">
@use '../../assets/style/abstracts/functions' as *;

.profile-statistics {
  display: grid;
  gap: spacing(3);
  grid-template-columns: repeat(auto-fit, minmax(rem(200), 1fr));
}
</style>
