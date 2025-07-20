<template>
  <header class="header">
    <div class="header__left">
      <ui-logo-text />
    </div>
    <layout-navigation class="header__center" />
    <div class="header__right">
      <ui-language-switcher />
    </div>
  </header>
</template>

<style scoped lang="scss">
@use "@/assets/style/layout/_header.scss";
</style>
