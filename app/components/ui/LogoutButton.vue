<template>
  <ui-button v-if="user" :disabled="loading" @click="handleLogout">
    {{ loading ? t('common.loading') : t('auth.logout') }}
  </ui-button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const user = useSupabaseUser();
const loading = ref(false);

const { logout } = useAuth();

async function handleLogout() {
  try {
    loading.value = true;
    await logout();
    await navigateTo('/auth/login', { replace: true });
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss"></style>
