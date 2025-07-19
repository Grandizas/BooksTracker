export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
    },
  },
  css: [
    "@/assets/style/base/_base.scss",
    "@/assets/style/base/_typography.scss",
    "@/assets/style/base/_normalize.scss",
  ],
});
