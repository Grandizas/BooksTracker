<template>
  <div>
    <forms-auth
      :header-note="t('checkEmail.headerNote')"
      :footer="{
        buttonText: t('checkEmail.resendEmail'),
        redirectQuestion: t('checkEmail.backTo'),
        redirectLink: { text: t('auth.login'), to: '/auth/login' },
      }"
      :loading="false"
      @submit="() => {}"
    >
      <p class="mb-4">
        {{ t('checkEmail.checkYourInbox') }}
      </p>
      <p>
        {{ t('checkEmail.ifNotReceived') }}
      </p>
    </forms-auth>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped lang="scss"></style>
