<template>
  <main class="auth-layout">
    <slot />
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/assets/style/abstracts/_colors.scss' as *;
@use '@/assets/style/abstracts/_placeholders.scss' as *;

.auth-layout {
  @extend %flex;
  min-height: 100vh;
  background-color: $color-blue-light;
}
</style>
