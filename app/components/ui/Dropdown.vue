<template>
  <div ref="dropdownRef" class="dropdown">
    <button class="dropdown__toggle" type="button" @click="toggleDropdown">
      {{ selectedLabel }}
      <span class="dropdown__icon">▼</span>
    </button>

    <ul v-if="isOpen" class="dropdown__menu">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="dropdown__item"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string;
  value: string | number;
}

const props = defineProps<{
  options: Option[];
  modelValue: string | number | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => {
  const found = props.options.find((o) => o.value === props.modelValue);
  return found ? found.label : 'Select...';
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
