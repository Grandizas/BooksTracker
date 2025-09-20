<template>
  <section class="profile-user">
    <div class="profile-user__info">
      <carousel-loader v-if="pending" />

      <template v-else>
        <img
          v-if="profile && profile.avatar_url"
          :src="avatar"
          alt="User avatar"
          class="profile-dropdown__avatar"
        />

        <ui-avatar v-else size="medium" />

        <div class="profile-user__info--contacts">
          <p class="profile-user__info--contacts__name">
            {{ profile?.full_name || 'Undefined' }}
          </p>
          <p class="profile-user__info--contacts__email">
            {{ user?.email }}
          </p>
        </div>
      </template>
    </div>

    <div class="profile-user__buttons">
      <ui-link to="/settings/profile" class="profile-user__settings-button">
        <font-awesome-icon class="icon-small" :icon="['far', 'gear']" />
        {{ t('profile.settings') }}
      </ui-link>

      <ui-logout-button />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProfile } from '~/composables/useProfile';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { t } = useI18n();
const user = useSupabaseUser();
const { profile, pending } = useProfile();

const avatar = ref('/images/avatar.png');
</script>

<style scoped lang="scss">
@use '@/assets/style/components/parts/profile/_profile-user.scss';
</style>
