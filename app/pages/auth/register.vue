<template>
  <main class="register-page">
    <forms-auth
      :header-note="t('register.startTracking')"
      :footer="footer"
      :loading="state.loading"
      @submit="handleRegister()"
    >
      <!-- ------------------------
             [ Full Name Input ]
      ------------------------- -->
      <ui-input
        id="login-page-full-name-input"
        v-model="form.fullName"
        type="text"
        :label="t('register.fullName')"
        :placeholder="t('register.enterFullName')"
        @focus="resetErrors()"
      />
      <p v-if="errors.fullName" class="text-error">
        {{ errors.fullName }}
      </p>

      <!-- ------------------------
             [ Email Input ]
      ------------------------- -->
      <ui-input
        id="login-page-email-input"
        v-model="form.email"
        type="email"
        :label="t('auth.email')"
        :placeholder="t('auth.enterEmail')"
        @focus="resetErrors()"
      />
      <p v-if="errors.email" class="text-error">
        {{ errors.email }}
      </p>

      <!-- ------------------------
            [ Password Input ]
      ------------------------- -->
      <ui-input
        id="login-page-password-input"
        v-model="form.password"
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
      <p v-if="errors.password" class="text-error">
        {{ errors.password }}
      </p>

      <!-- -------------------------
         [ Repeat Password Input ]
      -------------------------- -->
      <ui-input
        id="login-page-confirm-password-input"
        v-model="form.repeatPassword"
        :type="state.confirmPasswordShow ? 'text' : 'password'"
        :label="t('register.confirmPassword')"
        :placeholder="t('register.confirmYourPassword')"
        :right-buttons="[
          {
            icon: ['far', state.confirmPasswordShow ? 'eye' : 'eye-slash'],
            action: () =>
              (state.confirmPasswordShow = !state.confirmPasswordShow),
          },
        ]"
        @focus="resetErrors()"
      />
      <p v-if="errors.repeatPassword" class="text-error">
        {{ errors.repeatPassword }}
      </p>
      <p v-if="apiError" class="text-error">
        {{ apiError }}
      </p>
    </forms-auth>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { z } from 'zod';
import { signUpSchema, type SignUpInput } from '~/utils/validation/auth';

definePageMeta({ layout: 'auth', middleware: 'guest' });

const { t } = useI18n();

const state = reactive({
  passwordShow: false,
  confirmPasswordShow: false,
  loading: false,
});

const form = reactive<SignUpInput>({
  fullName: '',
  email: '',
  password: '',
  repeatPassword: '',
});

const errors = ref<Record<string, string>>({});
const apiError = ref<string | null>(null); // optional global error (e.g., email taken)

const footer = computed(() => ({
  buttonText: state.loading ? t('common.loading') : t('register.createAccount'),
  redirectQuestion: t('register.alreadyHaveAccount'),
  redirectLink: { text: t('auth.signIn'), to: '/auth/login' as const },
}));

function toFieldErrors(err: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path[0] as string;
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

function resetErrors() {
  errors.value = {};
  apiError.value = null;
}

async function handleRegister() {
  resetErrors();

  const parsed = signUpSchema.safeParse(form);
  if (!parsed.success) {
    errors.value = toFieldErrors(parsed.error);
    return;
  }

  const { fullName, email, password } = parsed.data;

  try {
    state.loading = true;
    // Call your server route
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: { fullName, email, password },
    });

    // If you require email confirmation, navigate to a “check your email” page
    // or directly to app if email confirmations are disabled.
    await navigateTo('/auth/check-email');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // Map API/server errors (e.g., Supabase: Email already registered)
    apiError.value =
      e?.data?.statusMessage || e?.message || t('errors.unknownError');
    // You can also set field-specific errors if your server returns them
  } finally {
    state.loading = false;
  }
}
</script>

<style scoped lang="scss"></style>
