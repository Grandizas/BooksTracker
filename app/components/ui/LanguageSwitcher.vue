<template>
  <div ref="root" class="language-switcher">
    <button
      class="language-switcher__button"
      type="button"
      aria-haspopup="listbox"
      :aria-expanded="open ? 'true' : 'false'"
      aria-label="Change language"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.arrow-down.prevent="openAndFocusFirst"
      @keydown.escape.prevent="close"
    >
      <img :src="currentImg" class="icon-flag" alt="flag" aria-hidden="true" />
      <span class="label">{{ current?.nativeName }}</span>
      <svg class="icon-chevron" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 9l6 6 6-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>

    <ul v-if="open" class="language-switcher__menu" role="listbox">
      <li
        v-for="(language, i) in languages"
        :key="language.code"
        class="language-switcher__option"
        role="option"
        :aria-selected="language.code === selected"
        tabindex="-1"
        @click="select(language.code)"
        @keydown.enter.prevent="select(language.code)"
        @keydown.escape.prevent="close"
        @keydown.arrow-down.prevent="focusNext(i)"
        @keydown.arrow-up.prevent="focusPrev(i)"
      >
        <img
          :src="flagMap[language?.code]"
          class="icon-flag"
          alt="flag"
          aria-hidden="true"
        />
        <span class="name">
          {{ language.nativeName }}
          <span class="muted">— {{ language.name }}</span>
        </span>
        <svg
          v-if="language.code === selected"
          class="icon-check"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M20 6L9 17l-5-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import enFlag from '@/assets/images/flags/en.svg';
import ltFlag from '@/assets/images/flags/lt.svg';

type LangCode = 'en' | 'lt';
type Language = {
  code: LangCode;
  name: string;
  nativeName: string;
  flag: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹' },
];

const flagMap: Record<string, string> = {
  en: enFlag,
  lt: ltFlag,
};

const root = ref<HTMLElement | null>(null);
const open = ref(false);
const selected = ref<LangCode>('en');

const current = computed(
  () => languages.find((l) => l.code === selected.value)!,
);
const currentCode = computed<LangCode>(() => current.value.code);
const currentImg = computed(() => flagMap[currentCode.value]);

function toggle() {
  open.value = !open.value;
  if (open.value) focusOption(0);
}

function close() {
  open.value = false;
  root.value?.querySelector('button')?.focus();
}

function openAndFocusFirst() {
  open.value = true;
  focusOption(0);
}

function focusOption(index: number) {
  const el = root.value?.querySelectorAll<HTMLElement>(
    '.language-switcher__option',
  )?.[index];
  el?.focus();
}

function focusNext(i: number) {
  focusOption((i + 1) % languages.length);
}

function focusPrev(i: number) {
  focusOption((i - 1 + languages.length) % languages.length);
}

function select(code: LangCode) {
  selected.value = code;
  persistAndApply(code);
  close();
}

function onClickOutside(e: MouseEvent) {
  if (!root.value) return;
  if (!root.value.contains(e.target as Node)) {
    open.value = false;
  }
}

function persistAndApply(code: LangCode, save = true) {
  if (save) localStorage.setItem('lang', code);
  // Update <html lang>
  document.documentElement.setAttribute('lang', code);

  try {
    const { $i18n } = useNuxtApp();

    if ($i18n) {
      if (typeof $i18n.setLocale === 'function') $i18n.setLocale(code);
      else if ($i18n.locale) $i18n.locale.value = code;
    }
  } catch {
    /* no i18n installed—ignore */
  }
}

onMounted(() => {
  const saved = (localStorage.getItem('lang') as LangCode) || 'en';
  if (languages.some((l) => l.code === saved)) {
    selected.value = saved;
    persistAndApply(saved, false);
  }
  document.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>

<style scoped lang="scss">
@use '~/assets/style/components/ui/_language-switcher.scss';
</style>
