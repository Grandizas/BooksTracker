<template>
  <layout-settings-wrapper>
    <section class="panel panel__preferences">
      <!-- * --- Header --- * -->
      <header class="panel__header">
        <h2 class="panel__header--title">
          {{ t('settings.displayPreferences') }}
        </h2>
        <p class="panel__header--subtitle">
          {{ t('settings.customizeAppLooks') }}
        </p>
      </header>

      <div class="panel__preferences--fields disabled-element">
        <div class="panel__preferences--fields__field">
          <p>{{ t('settings.theme') }}</p>

          <ui-dropdown
            v-model="fields.theme.modelValue"
            :options="fields.theme.options"
            class="panel__preferences--fields__dropdown"
          />
        </div>

        <div class="panel__preferences--fields__field">
          <p>{{ t('settings.defaultBookSorting') }}</p>

          <ui-dropdown
            v-model="fields.sortOrder.modelValue"
            :options="fields.sortOrder.options"
            class="panel__preferences--fields__dropdown"
          />
        </div>
      </div>
    </section>
  </layout-settings-wrapper>
</template>

<script setup lang="ts">
const { t } = useI18n();

const fields = ref({
  theme: {
    id: 'theme',
    label: t('settings.theme'),
    options: [
      { value: 'light', text: t('settings.light') },
      { value: 'dark', text: t('settings.dark') },
      { value: 'system', text: t('settings.system') },
    ],
    modelValue: 'system',
  },
  sortOrder: {
    id: 'sort-order',
    label: t('settings.defaultBookSorting'),
    options: [
      { value: 'title', text: t('settings.byTitle') },
      { value: 'author', text: t('settings.byAuthor') },
      { value: 'date', text: t('settings.byDateAdded') },
      { value: 'progress', text: t('settings.byProgress') },
    ],
    modelValue: 'title',
  },
});
</script>

<style scoped lang="scss">
@use '@/assets/style/components/parts/settings/_settings-preferences.scss';
</style>
