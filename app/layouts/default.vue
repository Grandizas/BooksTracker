<template>
  <div class="default-layout">
    <layout-header />
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/assets/style/layout/structure/_default.scss';
</style>
