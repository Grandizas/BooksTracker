<template>
  <div class="container">
    <h1>{{ $t("home.title") }}</h1>
    <p>{{ $t("home.content") }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t: $t } = useI18n();
</script>
