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
      <ui-button type="submit" :disabled="loading">
        {{ footer.buttonText }}
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
const props = defineProps<{
  headerNote: string;
  footer: {
    buttonText: string;
    redirectQuestion: string;
    redirectLink: { text: string; to: '/auth/login' | '/auth/register' };
  };
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit'): void;
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
