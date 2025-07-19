<template>
  <div class="logo-text">
    <ui-logo />
    <span> Books Tracker. </span>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/style/abstracts/functions" as *;

.logo-text {
  display: flex;
  gap: spacing(1);
  font-weight: bold;
  align-items: center;
}
</style>
