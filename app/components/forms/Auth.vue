<template>
  <form class="form-auth" @submit.prevent="emit('submit')">
    <div class="form-auth__header">
      <ui-logo-text />
      <p class="form-auth__header--note">
        {{ t('login.welcome') }} {{ t('login.title') }}
      </p>
    </div>
    <div class="form-auth__main">
      <slot />
    </div>
    <div class="form-auth__footer">
      <ui-button type="submit"> {{ footer.buttonText }} </ui-button>
      <p>
        <span>{{ footer.redirectQuestion }}</span>
        <nuxt-link :to="footer.redirectLink.to">
          {{ footer.redirectLink.text }}
        </nuxt-link>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
  footer: {
    buttonText: string;
    redirectQuestion: string;
    redirectLink: { text: string; to: '/auth/login' | '/auth/register' };
  };
}>();

const emit = defineEmits<{
  (e: 'submit'): void;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/style/components/forms/_auth.scss';
</style>
