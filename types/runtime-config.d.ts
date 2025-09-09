// types/runtime-config.d.ts
declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    /** Your public site url. Accepts full URL or host like "example.com" */
    siteUrl?: string;
  }
}
export {};
