<template>
  <section id="main-content" class="reset-password">
    <ui-language-switcher />

    <forms-auth
      v-if="error !== t('authErrors.invalidOrExpiredLink')"
      :header-note="t('auth.resetPassword')"
      :footer="footer"
      @submit="updatePassword"
    >
      <ui-input
        id="reset-password-new-password-input"
        v-model="newPassword"
        type="password"
        :label="t('auth.newPassword')"
        :placeholder="t('auth.enterNewPassword')"
        :right-buttons="[
          {
            icon: ['far', passwordShow ? 'eye' : 'eye-slash'],
            action: () => (passwordShow = !passwordShow),
          },
        ]"
      />

      <ui-input
        id="reset-password-confirm-password-input"
        v-model="confirmPassword"
        :type="confirmPasswordShow ? 'text' : 'password'"
        :label="t('register.confirmPassword')"
        :placeholder="t('register.confirmYourPassword')"
        :right-buttons="[
          {
            icon: ['far', confirmPasswordShow ? 'eye' : 'eye-slash'],
            action: () => (confirmPasswordShow = !confirmPasswordShow),
          },
        ]"
      />
    </forms-auth>

    <p v-if="error" class="text-error">{{ error }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

definePageMeta({ layout: 'auth', middleware: 'guest' });

const { t } = useI18n();
const toast = useToast();
const supabase = useSupabaseClient();

const newPassword = ref('');
const confirmPassword = ref('');
const passwordShow = ref(false);
const confirmPasswordShow = ref(false);
const error = ref('');
const isRecovery = ref(false);

const footer = computed(() => ({
  buttonText: t('auth.updatePassword'),
  disabled: !newPassword.value,
}));

onMounted(async () => {
  await checkLinkExpiration();
  checkRecovery();
});

function checkRecovery() {
  const params = new URLSearchParams(
    (window.location.hash || '').replace(/^#\/?/, ''),
  );
  isRecovery.value = params.get('type') === 'recovery';
}

async function checkLinkExpiration() {
  const { data, error: err } = await supabase.auth.getSession();

  if (err || !data.session) {
    error.value = t('authErrors.invalidOrExpiredLink');
  } else {
    error.value = 'Please set your new password';
  }
}

async function updatePassword() {
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }

  const { error: err } = await supabase.auth.updateUser({
    password: newPassword.value,
  });

  if (err) {
    error.value = err.message;
  } else {
    navigateTo('/');
    toast.success(t('auth.passwordUpdated'));
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/style/pages/auth/_general.scss';
</style>
