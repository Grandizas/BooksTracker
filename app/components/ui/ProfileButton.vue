<template>
  <div ref="dropdownRef" class="profile-dropdown">
    <!-- Avatar toggle -->
    <ui-link
      class="profile-dropdown__toggle"
      to="/profile"
      :aria-current="ariaCurrent"
    >
      <ui-profile-image />

      {{
        t('profile.hi', {
          name: profile?.full_name?.split(' ')[0] || 'Undefined',
        })
      }}
    </ui-link>
  </div>
</template>

<script setup lang="ts">
import { useProfile } from '~/composables/useProfile';

const { t } = useI18n();
const localePath = useLocalePath();
const { profile } = useProfile();

const dropdownRef = ref<HTMLElement | null>(null);

const ariaCurrent = computed(() => {
  const path = useRoute().path;
  return path.startsWith(localePath('/profile')) ? 'page' : undefined;
});
</script>

<style scoped lang="scss">
@use 'assets/style/abstracts/variables' as *;

.profile-dropdown__toggle {
  font-size: $font-size-sm;
}
</style>
