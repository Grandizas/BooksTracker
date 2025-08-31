<template>
  <section id="main-content" class="login-page" tabindex="-1">
    <ui-language-switcher />

    <forms-auth
      :header-note="`${t('login.welcome')} ${t('login.title')}`"
      :footer="footer"
      :loading="state.loading"
      :resend="{ show: state.displayResend, countdown }"
      @submit="handleLogin()"
    >
      {{ countdown }}
      <!-- ------------------------
             [ Email Input ]
      ------------------------- -->
      <ui-input
        id="login-page-email-input"
        v-model="state.email"
        type="email"
        :label="t('auth.email')"
        :placeholder="t('auth.enterEmail')"
        @focus="resetErrors()"
      />
      <p v-if="state.errors.email" class="text-error">
        {{ state.errors.email[0] }}
      </p>

      <!-- ------------------------
            [ Password Input ]
      ------------------------- -->
      <ui-input
        id="login-page-password-input"
        v-model="state.password"
        :type="state.passwordShow ? 'text' : 'password'"
        :label="t('auth.password')"
        :placeholder="t('auth.enterPassword')"
        :right-buttons="[
          {
            icon: ['far', state.passwordShow ? 'eye' : 'eye-slash'],
            action: () => (state.passwordShow = !state.passwordShow),
          },
        ]"
        @focus="resetErrors()"
      />
      <p v-if="state.errors.password" class="text-error">
        {{ state.errors.password[0] }}
      </p>

      <!-- ------------------------
            [ General error ]
      ------------------------- -->
      <p v-if="state.errors.general" class="text-error">
        {{ state.errors.general[0] }}
      </p>
    </forms-auth>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useAuth } from '~/composables/useAuth';
import { useToast } from 'vue-toastification';
import { useResendCooldown } from '~/composables/useResend';

definePageMeta({ layout: 'auth', middleware: 'guest' });

const { t } = useI18n();
const toast = useToast();
const localePath = useLocalePath();
const { login, resendConfirmation } = useAuth();
const { countdown, isCoolingDown, start } = useResendCooldown(
  'resendCooldownAt',
  60,
);

const state = reactive({
  email: '',
  password: '',
  passwordShow: false,
  loading: false,
  displayResend: false,
  errors: {} as Partial<Record<string, string[]>>,
});

// Add computed to check if all fields are empty
const allFieldsEmpty = computed(() => !state.email || !state.password);

const footer = computed(() => ({
  buttonText: state.loading ? t('common.loading') : t('auth.signIn'),
  redirectQuestion: t('login.noAccount'),
  redirectLink: {
    text: t('auth.signUp'),
    to: localePath('/auth/register'),
  },
  disabled: allFieldsEmpty.value,
}));

function resetErrors() {
  state.errors = {};
}

async function handleResend() {
  if (isCoolingDown.value) return;

  try {
    await resendConfirmation(state.email);
    start(60);
  } finally {
    toast.success(t('checkEmail.emailSent'));
  }
}

async function handleLogin() {
  resetErrors();
  state.loading = true;

  try {
    // * --- Attempt login --- *
    const result = await login({
      email: state.email,
      password: state.password,
    });

    state.errors = result.errors || {};

    // * --- If user email is not confirmed --- *
    if (result?.needsConfirmation) {
      await handleResend();
      state.displayResend = true;
    }

    if (result.success) {
      await navigateTo('/');
    }
  } finally {
    state.loading = false;
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/style/pages/auth/_general.scss';
</style>
