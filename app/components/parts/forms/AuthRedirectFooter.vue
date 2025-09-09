<template>
  <div class="form-auth__main-footer">
    <p v-if="footer.forgotPasswordLink" class="form-auth__forgot-password-link">
      <nuxt-link :to="footer.forgotPasswordLink.to">
        {{ footer.forgotPasswordLink.text }}
      </nuxt-link>
    </p>

    <p v-if="footer.redirectQuestion || footer?.redirectLink">
      <span v-if="footer.redirectQuestion">{{ footer.redirectQuestion }}</span>
      <nuxt-link v-if="footer?.redirectLink" :to="footer.redirectLink.to">
        {{ footer.redirectLink.text }}
      </nuxt-link>
    </p>
  </div>
</template>
<script setup lang="ts">
import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from '#vue-router';

type Link = {
  text: string;
  to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
};

defineProps<{
  footer: {
    redirectQuestion?: string;
    redirectLink?: Link;
    forgotPasswordLink?: Link;
  };
}>();
</script>
