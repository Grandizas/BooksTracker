<template>
  <main class="settings">
    <header class="page__message">
      <h1 class="page__title">{{ t('profile.settings') }}</h1>
      <p class="page__subtitle">{{ t('settings.manageYourSettings') }}</p>
    </header>

    <div class="settings__body">
      <layout-vertical-navigation />
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style scoped lang="scss">
@use 'assets/style/abstracts/functions' as *;

.settings__body {
  display: flex;
  gap: spacing(4);
  margin-top: spacing(2);
}
</style>
