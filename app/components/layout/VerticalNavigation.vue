<template>
  <aside class="vertical-navigation">
    <ul>
      <li v-for="link in useSettingsNavigation()" :key="link.id">
        <ui-link
          :to="link.to"
          class="text-left borderless"
          :aria-current="link.ariaCurrent"
        >
          <font-awesome-icon :icon="['far', link.icon]" class="icon-small" />
          <span> {{ link.name }} </span>
        </ui-link>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { useSettingsNavigation } from '@/config/settingsNavigation';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<style scoped lang="scss">
@use 'assets/style/abstracts/variables' as *;
@use 'assets/style/abstracts/functions' as *;

.vertical-navigation {
  width: rem(225);
  padding: spacing(2);
  border-radius: $radius-lg;
  box-shadow: $box-shadow-box;

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    gap: spacing(1);
    list-style: none;
    flex-direction: column;

    li svg {
      margin-right: spacing(0.5);
    }
  }
}
</style>
