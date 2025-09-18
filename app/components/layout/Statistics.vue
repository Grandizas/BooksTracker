<template>
  <section class="profile-statistics ignore-bordering">
    <ui-statistics-box
      v-for="item of statistics"
      :key="item.id"
      :icon="item.icon"
      :count="item.count"
      :description="item.description"
    />
  </section>
</template>

<script setup lang="ts">
import type { StatisticsColorScheme } from '~~/types/types';

type Statistic = {
  id: number;
  icon: { name: string; color?: StatisticsColorScheme };
  count: number;
  description: string;
};

const { t } = useI18n();

const statistics: Ref<Statistic[]> = ref([
  {
    id: 1,
    icon: { name: 'trophy', color: 'yellow' },
    count: 0,
    description: t('statistics.booksCompleted'),
  },
  {
    id: 2,
    icon: { name: 'book-open', color: 'blue' },
    count: 0,
    description: t('statistics.currentlyReading'),
  },
  {
    id: 3,
    icon: { name: 'heart', color: 'red' },
    count: 0,
    description: t('statistics.onWishlist'),
  },
  {
    id: 4,
    icon: { name: 'books', color: 'green' },
    count: 0,
    description: t('statistics.pagesRead'),
  },
]);
</script>

<style scoped lang="scss">
@use '../../assets/style/abstracts/functions' as *;

.profile-statistics {
  display: grid;
  gap: spacing(3);
  grid-template-columns: repeat(auto-fit, minmax(rem(200), 1fr));
}
</style>
