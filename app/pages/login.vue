<template>
  <div class="login-page">
    <forms-auth :footer="footer" @submit="handleLogin()">
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
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { login } = useAuth();

definePageMeta({
  layout: 'auth',
});

const state = reactive({
  email: '',
  password: '',
  passwordShow: false,
  errors: {} as Partial<Record<string, string[]>>,
});

const footer = computed(() => {
  return {
    buttonText: t('auth.signIn'),
    redirectQuestion: t('login.noAccount'),
    redirectLink: { text: t('auth.signUp'), to: '/register' as const },
  };
});

function resetErrors() {
  state.errors = {};
}

async function handleLogin() {
  console.log('Email', state.email);
  console.log('Password', state.password);

  const result = await login({
    email: state.email,
    password: state.password,
  });
  state.errors = result.errors || {};

  console.log('state.errors', state.errors);
  console.log('Result', result);

  if (result.success) {
    console.log('Login successful:', result);
    // Do redirect or show success toast
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/style/utilities/_errors.scss';
</style>
