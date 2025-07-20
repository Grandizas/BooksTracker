<template>
  <select
    :value="$i18n.locale"
    aria-label="Select language"
    class="language-switcher"
    @change="setLocale($event)"
  >
    <option value="en">English</option>
    <option value="lt">Lietuvių</option>
  </select>
</template>

<script setup lang="ts">
import type { Languages } from "~~/types/types";

const { $i18n } = useNuxtApp();

function setLocale(event: Event) {
  const target = event.target as HTMLSelectElement;
  const locale = target.value as Languages;
  $i18n.setLocale(locale);
}
</script>
