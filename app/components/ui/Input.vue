<template>
  <div class="input-wrapper">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="state.value"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="emit('update:modelValue', state.value)"
      @focus="emit('focus', $event)"
    />

    <div v-show="rightButtons || state.value" class="input-wrapper__buttons">
      <button
        v-if="state.value"
        type="button"
        class="input-wrapper__button"
        @click="
          () => {
            state.value = '';
            emit('update:modelValue', '');
          }
        "
      >
        <font-awesome-icon :icon="['far', 'xmark']" />
      </button>

      <button
        v-for="(button, index) in rightButtons"
        :key="index"
        type="button"
        class="input-wrapper__button"
        @click="(e) => button.action(e)"
      >
        <font-awesome-icon :icon="button.icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  id: string;
  label?: string;
  disabled?: boolean;
  modelValue: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  rightButtons?: {
    icon: [string, string];
    action: (e: Event) => void;
  }[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
}>();

const state = reactive({
  value: props.modelValue,
});

watch(
  () => props.modelValue,
  (newValue: string) => {
    state.value = newValue;
  },
);
</script>

<style scoped lang="scss">
@use '@/assets/style/components/ui/_input.scss';
</style>
