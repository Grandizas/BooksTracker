<template>
  <section id="main-content" class="email-confirmation" tabindex="-1">
    <forms-auth
      :header-note="t('checkEmail.checkYourInbox')"
      :footer="{
        buttonText: t('checkEmail.resendEmail'),
        redirectQuestion: t('checkEmail.backTo'),
        redirectLink: { text: t('auth.signIn'), to: '/auth/login' },
        disabled: isCoolingDown,
      }"
      :show-submit="false"
      :resend="{ show: true, countdown }"
      :loading="loading"
      @resend="handleResend"
    >
      <p>
        {{ t('checkEmail.ifNotReceived') }}
      </p>
    </forms-auth>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useAuth } from '#imports';
import { useToast } from 'vue-toastification';
import { useResendCooldown } from '~/composables/useResend';

definePageMeta({ layout: 'auth', middleware: 'guest' });

const { countdown, isCoolingDown, start } = useResendCooldown(
  'resendCooldownAt',
  60,
);

const { t } = useI18n();
const route = useRoute();
const toast = useToast();
const { resendConfirmation } = useAuth();

const loading = ref(false);

const email = computed(() =>
  (route.query.email as string | undefined)?.trim().toLowerCase(),
);

async function handleResend() {
  if (isCoolingDown.value) return;

  loading.value = true;

  try {
    await resendConfirmation(email.value || '');
    start(60);
    toast.success(t('checkEmail.emailSent'));
  } catch (err) {
    console.error(err);
    toast.error(t('authErrors.couldNotResendConfirmation'));
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss"></style>
