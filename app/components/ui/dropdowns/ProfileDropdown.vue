<template>
  <div ref="dropdownRef" class="profile-dropdown">
    <!-- Avatar toggle -->
    <button
      class="profile-dropdown__toggle"
      :class="{ active: isOpen }"
      @click="toggleDropdown"
    >
      <carousel-loader v-if="pending" />

      <img
        v-else-if="profile && profile.avatar_url"
        :src="avatar"
        alt="User avatar"
        class="profile-dropdown__avatar"
      />

      <ui-avatar v-else />
    </button>

    <!-- Dropdown menu -->
    <div v-if="isOpen" class="profile-dropdown__menu">
      <ul class="profile-dropdown__menu--list">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="profile-dropdown__item"
          @click="onSelect(item)"
        >
          <font-awesome-icon :icon="`fa-regular ${item.icon}`" />
          <span>{{ item.label }}</span>
        </li>
      </ul>

      <ui-logout-button />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useProfile } from '~/composables/useProfile';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface MenuItem {
  label: string;
  value: string;
  icon?: string;
}

const { profile, pending } = useProfile();

defineProps<{
  avatar: string;
  items: MenuItem[];
}>();

const emit = defineEmits<{
  (e: 'select', value: string): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function onSelect(item: MenuItem) {
  emit('select', item.value);
  isOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped lang="scss">
@use '@/assets/style/components/ui/dropdowns/_profile-dropdown.scss';
</style>
