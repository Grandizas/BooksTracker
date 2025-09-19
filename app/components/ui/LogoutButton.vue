<template>
  <ui-button
    v-if="user"
    variant="bordered"
    :disabled="loading"
    @click="handleLogout"
  >
    <font-awesome-icon class="icon-small" :icon="['far', 'person-to-door']" />
    {{ loading ? t('common.loading') : t('auth.logout') }}
  </ui-button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
