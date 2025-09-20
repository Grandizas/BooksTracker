<template>
  <div ref="dropdownRef" class="dropdown">
    <ui-button
      v-if="variant === 'button'"
      variant="bordered"
      :on-click="toggleDropdown"
    >
      {{ selectedLabel }}
    </ui-button>

    <button
      v-else
      class="dropdown__select"
      type="button"
      @click="toggleDropdown()"
    >
      {{ selectedLabel }}
      <font-awesome-icon :icon="['far', 'chevron-down']" class="icon-small" />
    </button>

    <ul v-if="isOpen" class="dropdown__menu">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="dropdown__item"
        @click="selectOption(option)"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Option {
  text: string;
  value: string | number;
}

const props = withDefaults(
  defineProps<{
    options: Option[];
    variant?: 'button' | 'select';
    modelValue: string | number | null;
  }>(),
  {
    variant: 'select',
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => {
  const found = props.options.find((o) => o.value === props.modelValue);
  return found ? found.text : 'Select...';
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option: Option) {
  emit('update:modelValue', option.value);
  isOpen.value = false;
}

useClickOutside(dropdownRef, () => (isOpen.value = false));
</script>

<style scoped lang="scss">
@use '@/assets/style/components/ui/dropdowns/_dropdown.scss';
</style>
