<template>
  <div class="login-page">
    <forms-auth :footer="footer">
      <ui-input
        id="login-page-email-input"
        v-model="state.email.value"
        type="email"
        :label="t('auth.email')"
        :placeholder="t('auth.enterEmail')"
      />
      <ui-input
        id="login-page-password-input"
        v-model="state.password.value"
        :type="state.password.show ? 'text' : 'password'"
        :label="t('auth.password')"
        :placeholder="t('auth.enterPassword')"
        :right-buttons="[
          {
            icon: ['far', state.password.show ? 'eye' : 'eye-slash'],
            action: () => (state.password.show = !state.password.show),
          },
        ]"
      />
    </forms-auth>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

definePageMeta({
  layout: 'auth',
});

const state = reactive({
  email: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
    show: false,
  },
});

const footer = computed(() => {
  return {
    buttonText: t('auth.signIn'),
    redirectQuestion: t('login.noAccount'),
    redirectLink: { text: t('auth.signUp'), to: '/login' as const },
  };
});
</script>

<style scoped lang="scss"></style>
