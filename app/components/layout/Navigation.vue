<template>
  <nav class="navigation" aria-label="Primary">
    <NuxtLink
      v-for="link in useNavigationLinks()"
      :key="link.label"
      :to="localePath(link.to)"
      :aria-current="link.ariaCurrent"
      class="nav-link"
    >
      <FontAwesomeIcon :icon="link.icon" />
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { useNavigationLinks } from '@/config/navigation';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const localePath = useLocalePath();
</script>

<style scoped lang="scss">
@use '@/assets/style/abstracts/functions' as *;
@use '@/assets/style/components/ui/_navigation-button.scss';

.navigation {
  display: flex;
  gap: spacing(2);
  align-items: center;
  justify-content: center;
}
</style>
