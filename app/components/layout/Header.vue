<template>
  <header class="header">
    <div class="header__left">
      <ui-logo-text />
    </div>
    <div class="header__center">Navigation</div>
    <div class="header__right">
      <LanguageSwitcher />
    </div>
  </header>
</template>

<script setup lang="ts">
import LanguageSwitcher from "@/components/ui/LanguageSwitcher.vue";
</script>

<style scoped lang="scss">
@use "@/assets/style/layout/_header.scss";
</style>
