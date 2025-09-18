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
@use 'assets/style/abstracts/colors' as *;
@use 'assets/style/abstracts/variables' as *;
@use 'assets/style/abstracts/functions' as *;

.account-info {
  display: flex;
  gap: spacing(2);
  padding: spacing(2);
  flex-direction: column;
  border-radius: $radius-md;
  box-shadow: $box-shadow-box;

  .account-info__title,
  .account-info__row--desc {
    font-size: $font-size-sm;
  }

  .account-info__row--desc-small {
    font-size: $font-size-xs;
  }

  .account-info__row--title {
    opacity: 0.8;
    font-weight: 500;
    margin-bottom: 2px;
    color: $color-gray-dark;
    font-size: $font-size-xs;
  }
}
</style>
