<template>
  <form
    class="form-auth"
    :novalidate="noValidate"
    :aria-busy="loading ? 'true' : 'false'"
    @submit.prevent="onSubmit"
  >
    <!-- ------------------------
              [ Header ]
    ------------------------- -->
    <div class="form-auth__header">
      <ui-logo-text />
      <p class="form-auth__header--note">
        {{ headerNote }}
      </p>
    </div>

    <!-- ------------------------
               [ Main ]
    ------------------------- -->
    <div class="form-auth__main">
      <fieldset :disabled="loading">
        <slot />
      </fieldset>
    </div>

    <!-- ------------------------
              [ Footer ]
    ------------------------- -->
    <div class="form-auth__footer">
      <!-- * --- Disabled Resend button with cooldown --- * -->
      <ui-button v-if="sendCooldown > 0" disabled>
        {{ t('auth.resendIn', { s: sendCooldown }) }}
      </ui-button>

      <template v-else>
        <!-- * --- Main submit button --- * -->
        <ui-button
          v-if="showSubmit"
          type="submit"
          :disabled="loading || footer.disabled"
        >
          {{ footer.buttonText }}
        </ui-button>

        <!--
         * On the login and check-email pages, show the resend button
         * The button is with timer
        -->
        <ui-button
          v-if="resend?.show"
          type="button"
          :disabled="loading || footer.disabled || resend.countdown > 0"
          @click="emit('resend')"
        >
          {{ t('checkEmail.resendEmail') }}
          {{ resend.countdown > 0 ? resend.countdown : '' }}
        </ui-button>
      </template>

      <!-- * --- Redirect link and forgot password link --- * -->
      <parts-forms-auth-redirect-footer
        :footer="{
          redirectQuestion: footer.redirectQuestion,
          redirectLink: footer.redirectLink,
          forgotPasswordLink: footer.forgotPasswordLink,
        }"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    headerNote: string;
    showSubmit?: boolean;
    noValidate?: boolean;
    sendCooldown?: number;

    resend?: {
      show: boolean;
      countdown: number;
    };

    footer: {
      buttonText: string;
      disabled?: boolean;
      redirectQuestion?: string;
      redirectLink?: { text: string; to: RouteLocationRaw };
      forgotPasswordLink?: { text: string; to: RouteLocationRaw };
    };
  }>(),
  {
    disabled: false,
    loading: false,
    showSubmit: true,
    noValidate: false,
    sendCooldown: 0,
    resend: () => ({ show: false, countdown: 0 }),
  },
);

const emit = defineEmits<{
  submit: [];
  resend: [];
}>();

function onSubmit() {
  if (props.loading) return; // guard against double submits
  emit('submit');
}
</script>

<style scoped lang="scss">
@use '@/assets/style/components/forms/_auth.scss';

fieldset {
  margin: 0;
  padding: 0;
  border: none;
}

.form-auth[aria-busy='true'] {
  pointer-events: none;
  opacity: 0.8;
}
</style>
