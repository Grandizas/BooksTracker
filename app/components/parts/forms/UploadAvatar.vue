<template>
  <div class="upload-avatar">
    <!-- * --- Image / Avatar --- * -->
    <ui-profile-image size="medium" />

    <input
      id="avatar-input"
      ref="fileEl"
      type="file"
      accept="image/*"
      class="visually-hidden"
      @change="onAvatarChange"
    />

    <!-- * --- Button to add file --- * -->
    <label for="avatar-input" class="button bordered">
      <font-awesome-icon
        :icon="['far', 'arrow-up-from-bracket']"
        class="icon-small"
      />
      {{ t('settings.uploadAvatar') }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { t } = useI18n();

function onAvatarChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file) {
    // Handle the file upload logic here
    console.log('Selected file:', file);
  }
}
</script>

<style scoped lang="scss">
@use 'assets/style/abstracts/functions' as *;
@use '@/assets/style/components/ui/_button.scss';

.upload-avatar {
  display: flex;
  gap: spacing(2);
  align-items: center;
}

#avatar-input {
  display: none;
}
</style>
