export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/i18n', '@nuxtjs/supabase'],
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
      exclude: ['/auth/login', '/auth/register', '/auth/check-email'], // Add public routes here
    },
  },
  css: [
    '@/assets/style/base/_base.scss',
    '@/assets/style/base/_typography.scss',
    '@/assets/style/base/_normalize.scss',
  ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'lt', iso: 'lt-LT', name: 'Lietuvių', file: 'lt.json' },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
  },
});
