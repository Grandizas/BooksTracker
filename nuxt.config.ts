import type { LocaleObject } from '#i18n';

const locales: LocaleObject[] = [
  { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
  { code: 'lt', iso: 'lt-LT', name: 'Lietuvių', file: 'lt.json' },
];

const publicAuth = [
  '/auth/login',
  '/auth/register',
  '/auth/check-email',
  '/auth/callback',
  '/confirm', // callback should also be public
];

// Build: raw paths + all locale-prefixed variants
const exclude = [
  ...publicAuth,
  ...locales.flatMap((l) => publicAuth.map((p) => `/${l.code}${p}`)),
];

export default defineNuxtConfig({
  app: {
    head: {
      meta: [{ charset: 'utf-8' }],
      htmlAttrs: { lang: 'lt' },
      link: [
        {
          rel: 'preload',
          as: 'font',
          href: '/fonts/Inter/Inter-Variable.woff2',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/i18n', '@nuxtjs/supabase', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/confirm',
      exclude,
    },
  },
  css: [
    '@/assets/style/base/_base.scss',
    '@/assets/style/base/_typography.scss',
    '@/assets/style/base/_normalize.scss',
  ],
  i18n: {
    strategy: 'prefix_except_default',
    locales,
    defaultLocale: 'en',
    langDir: 'locales/',
  },
});
