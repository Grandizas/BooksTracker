<template>
  <form
    class="form-auth"
    :aria-busy="loading ? 'true' : 'false'"
    @submit.prevent="onSubmit"
  >
    <div class="form-auth__header">
      <ui-logo-text />
      <p class="form-auth__header--note">
        {{ headerNote }}
      </p>
    </div>

    <div class="form-auth__main">
      <!-- Disables *all* form controls inside when loading -->
      <fieldset :disabled="loading">
        <slot />
      </fieldset>
    </div>

    <div class="form-auth__footer">
      <ui-button
        v-if="showSubmit"
        type="submit"
        :disabled="loading || footer.disabled"
      >
        {{ footer.buttonText }}
      </ui-button>

      <ui-button
        v-if="resend?.show"
        type="button"
        :disabled="loading || footer.disabled || resend.countdown > 0"
        @click="emit('resend')"
      >
        {{ t('checkEmail.resendEmail') }}
        {{ resend.countdown > 0 ? resend.countdown : '' }}
      </ui-button>

      <p>
        <span>{{ footer.redirectQuestion }}</span>
        <nuxt-link :to="footer.redirectLink.to">
          {{ footer.redirectLink.text }}
        </nuxt-link>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    headerNote: string;
    footer: {
      buttonText: string;
      disabled?: boolean;
      redirectQuestion: string;
      redirectLink: { text: string; to: RouteLocationRaw };
    };
    resend?: {
      show: boolean;
      countdown: number;
    };
    showSubmit?: boolean;
    loading?: boolean;
  }>(),
  {
    disabled: false,
    loading: false,
    showSubmit: true,
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

/* Optional faint visual while loading */
.form-auth[aria-busy='true'] {
  pointer-events: none;
  opacity: 0.8;
}
</style>
