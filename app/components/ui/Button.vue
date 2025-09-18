<template>
  <button
    :class="[`button ${variant}`, { disabled }]"
    :type="type"
    @click="onClick()"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  variant: {
    type: String as PropType<'primary' | 'secondary' | 'bordered'>,
    default: 'primary',
  },
});
</script>

<style scoped lang="scss">
@use '@/assets/style/components/ui/_button.scss';
</style>
