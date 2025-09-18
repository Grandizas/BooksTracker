<template>
  <main class="profile-page">
    <h1 class="page__title">{{ t('profile.profile') }}</h1>

    <parts-profile-user />
    <layout-statistics />

    <section class="profile-page__info ignore-bordering">
      <parts-profile-progress />
      <parts-profile-account-info />
    </section>
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style scoped lang="scss">
@use 'assets/style/abstracts/functions' as *;

.profile-page__info {
  display: grid;
  gap: spacing(3);
  grid-template-columns: repeat(auto-fit, minmax(rem(30), 1fr));
}
</style>
