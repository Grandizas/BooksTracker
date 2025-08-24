<template>
  <main class="dashboard">
    <!-- * --- Currently reading --- * -->
    <section
      class="panel"
      aria-labelledby="currently-reading-title"
      :aria-busy="loadingCurrentlyReading"
    >
      <header class="panel__header">
        <h2 id="currently-reading-title">Currently Reading</h2>
        <NuxtLink to="/books" class="link">View all</NuxtLink>
      </header>
    </section>

    <!-- * --- Books stats --- * -->
    <section
      class="panel"
      aria-labelledby="books-status-title"
      :aria-busy="loadingStats"
    >
      <header class="panel__header">
        <h2 id="books-status-title">Books Status</h2>
      </header>
    </section>

    <!-- * --- Recent activity --- * -->
    <section
      class="panel"
      aria-labelledby="recent-activity-title"
      :aria-busy="loadingActivity"
    >
      <header class="panel__header">
        <h2 id="recent-activity-title">Recent Activity</h2>
        <NuxtLink to="/books" class="link">Open library</NuxtLink>
      </header>
    </section>
  </main>
</template>

<script setup lang="ts">
// import { useI18n } from 'vue-i18n';
// const { t: $t } = useI18n();

const loadingCurrentlyReading = ref<boolean>(false);
const loadingStats = ref<boolean>(false);
const loadingActivity = ref<boolean>(false);
</script>
