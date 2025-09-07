<template>
  <section id="main-content" class="forgot-password" aria-labelledby="fp-title">
    <ui-language-switcher />

    <forms-auth
      :header-note="t('auth.forgotPassword')"
      :footer="footer"
      :loading="loading"
      :no-validate="true"
      :send-cooldown="cooldown"
      @submit="onSubmit"
    >
      <ui-input
        id="forgot-password-email-input"
        v-model="email"
        type="email"
        :label="t('auth.email')"
        :placeholder="t('auth.enterEmail')"
        autocomplete="email"
        :disabled="loading"
        @focus="clearStatus"
      />

      <p v-if="status" class="status" aria-live="polite">{{ status }}</p>

      <p class="hint">
        {{ t('auth.resetHelpHint') }}
      </p>
    </forms-auth>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { useToast } from 'vue-toastification';

definePageMeta({ layout: 'auth', middleware: 'guest' });

const { t } = useI18n();
const toast = useToast();
const localePath = useLocalePath();
const { forgotPassword } = useAuth();

const email = ref('');
const status = ref('');
const loading = ref(false);
const cooldown = ref(0);
let timer: number | NodeJS.Timeout | null = null;

const footer = computed(() => ({
  buttonText: loading.value ? t('common.loading') : t('auth.sendResetLink'),
  redirectQuestion: `${t('auth.backToLogin')}:`,
  redirectLink: {
    text: t('auth.signIn'),
    to: localePath('/auth/login'),
  },
  disabled: !email.value,
}));

function startCooldown(sec = 30) {
  cooldown.value = sec;

  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    cooldown.value--;

    if (cooldown.value <= 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
}

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});

function clearStatus() {
  status.value = '';
}

async function onSubmit() {
  loading.value = true;
  status.value = '';

  const { ok, message } = await forgotPassword(email.value);
  if (ok) toast.success(t('auth.resetEmailSent', { email: email.value }));

  status.value = message;
  loading.value = false;
  startCooldown(30); // prevent spam / accidental multiple clicks
}
</script>

<style scoped lang="scss">
@use '@/assets/style/abstracts/variables' as *;
@use '@/assets/style/pages/auth/_general.scss';

.status,
.hint {
  font-size: $font-size-xs;
}
</style>
