declare module 'vue-i18n-routing' {
  export interface LocaleObject {
    code: string;
    name?: string;
    file?: string;
    iso?: string;
    dir?: 'ltr' | 'rtl';
    domain?: string;
    // allow any extra fields you might add in your config
    [key: string]: unknown;
  }
}
