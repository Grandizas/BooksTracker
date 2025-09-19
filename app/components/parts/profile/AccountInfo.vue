<template>
  <div class="account-info">
    <p class="account-info__title">{{ t('account.accountInfo') }}</p>

    <!-- * --- Total Books --- * -->
    <div class="account-info__row">
      <p class="account-info__row--title">{{ t('account.memberSince') }}</p>
      <p class="account-info__row--desc">----|--|--</p>
    </div>

    <!-- * --- Completion Rate --- * -->
    <div class="account-info__row">
      <p class="account-info__row--title">{{ t('account.dataStorage') }}</p>
      <p class="account-info__row--desc-small">
        {{ t('account.storedLocally') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style scoped lang="scss">
@use '@/assets/style/components/parts/profile/_account-info.scss';
</style>
