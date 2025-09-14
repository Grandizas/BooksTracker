<template>
  <header class="header">
    <div class="header__left">
      <ui-logo-text />
    </div>

    <layout-navigation class="header__center" />

    <div class="header__right">
      <ui-language-switcher />

      <ui-dropdowns-profile-dropdown
        :avatar="avatarUrl"
        :items="profileItems"
        @select="handleSelect"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
const avatarUrl = '/images/avatar.png'; // replace with real avatar
const profileItems = [
  { label: 'My Profile', value: 'profile', icon: 'fa-user' },
];

function handleSelect(value: string) {
  if (value === 'logout') {
    console.log('Logging out...');
  } else {
    console.log('Selected:', value);
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/style/layout/_header.scss';
</style>
