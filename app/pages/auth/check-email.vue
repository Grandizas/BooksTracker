<template>
  <section id="main-content" class="email-confirmation" tabindex="-1">
    <forms-auth
      :header-note="t('checkEmail.checkYourInbox')"
      :footer="{
        buttonText: t('checkEmail.resendEmail'),
        redirectQuestion: t('checkEmail.backTo'),
        redirectLink: { text: t('auth.signIn'), to: '/auth/login' },
      }"
      :loading="loading"
      @submit="handleResend"
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
import { useSupabaseClient } from '#imports';
import { useToast } from 'vue-toastification';

definePageMeta({ layout: 'auth', middleware: 'guest' });

const { t } = useI18n();
const route = useRoute();
const toast = useToast();
const supabase = useSupabaseClient();

const loading = ref(false);

const email = computed(() =>
  (route.query.email as string | undefined)?.trim().toLowerCase(),
);

async function handleResend() {
  if (!email.value) {
    // Optionally navigate back to register or show an inline error
    return;
  }
  loading.value = true;
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.value,
    });
    if (error && import.meta.dev) console.warn('Resend failed:', error.message);
    else {
      toast.success(t('checkEmail.emailSent'));
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss"></style>
