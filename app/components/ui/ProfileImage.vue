<template>
  <carousel-loader v-if="pending" />

  <img
    v-else-if="profile && profile.avatar_url"
    :src="avatar"
    alt="User avatar"
    class="profile-dropdown__avatar"
  />

  <ui-avatar v-else :size="size" />
</template>

<script setup lang="ts">
import { useProfile } from '~/composables/useProfile';

defineProps<{
  size?: 'small' | 'medium' | 'large';
}>();

const { profile, pending } = useProfile();
const avatar = ref('/images/avatar.png');
</script>

<style scoped lang="scss"></style>
