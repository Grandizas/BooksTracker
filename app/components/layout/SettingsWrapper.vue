<template>
  <main class="settings">
    <header class="page__message">
      <h1 class="page__title">{{ t('profile.settings') }}</h1>
      <p class="page__subtitle">{{ t('settings.manageYourSettings') }}</p>
    </header>

    <div class="settings__body">
      <layout-vertical-navigation aria-label="Settings navigation" />
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style scoped lang="scss">
@use '@/assets/style/layout/_settings-wrapper.scss';
</style>
