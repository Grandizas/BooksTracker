<template>
  <layout-settings-wrapper>
    <section class="panel panel__profile">
      <!-- * --- Header --- * -->
      <header class="panel__header">
        <h2 class="panel__header--title">
          {{ t('settings.profileInformation') }}
        </h2>
        <p class="panel__header--subtitle">
          {{ t('settings.updateYourPersonalInfo') }}
        </p>
      </header>

      <form class="panel__profile--form" @submit.prevent="onSubmit">
        <!-- * --- Upload avatar --- * -->
        <parts-forms-upload-avatar class="panel__profile--form__avatar" />

        <div class="panel__profile--form__fields">
          <!-- * --- Full name --- * -->
          <ui-input
            id="profile-full-name"
            v-model="form.fullName"
            :label="t('register.fullName')"
            type="text"
            name="fullName"
            :placeholder="t('register.enterFullName')"
            class="panel__profile--form__fields--input"
          />

          <!-- * --- Email --- * -->
          <ui-input
            id="profile-email"
            v-model="form.email"
            :label="t('auth.email')"
            type="email"
            name="email"
            :placeholder="t('auth.enterEmail')"
            class="panel__profile--form__fields--input no-margin"
          />
        </div>

        <div class="panel__profile--form__buttons">
          <ui-button type="button" variant="bordered">
            <font-awesome-icon
              :icon="['far', 'eye-slash']"
              class="icon-small"
            />
            {{ t('profile.changePassword') }}
          </ui-button>
        </div>

        <ui-button type="submit" class="button-primary">
          {{ t('settings.saveChanges') }}
        </ui-button>
      </form>
    </section>
  </layout-settings-wrapper>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { t } = useI18n();

const form = reactive({
  fullName: '',
  email: '',
});

function onSubmit() {
  // Handle form submission
}
</script>

<style scoped lang="scss">
@use '@/assets/style/components/parts/settings/_settings-profile.scss';
</style>
