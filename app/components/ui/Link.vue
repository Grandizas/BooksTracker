<template>
  <nuxt-link class="nav-link" :to="localePath(to)" :aria-current="ariaCurrent">
    <slot />
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
  ariaCurrent: {
    type: String as PropType<
      'page' | 'step' | 'location' | 'date' | 'time' | 'true' | undefined
    >,
    default: undefined,
  },
});

const localePath = useLocalePath();
</script>

<style scoped lang="scss">
@use '@/assets/style/components/ui/_navigation-button.scss';
</style>
