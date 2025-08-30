// Adjust the import paths to your actual locale files
import en from '~~/i18n/locales/en.json';
import lt from '~~/i18n/locales/lt.json';

type Messages = typeof en;
const dicts: Record<string, Messages> = { en, lt };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function get(obj: any, path: string) {
  return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
}

export function createServerT(locale: string) {
  const messages = dicts[locale] ?? dicts.en;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (key: string, params?: Record<string, any>) => {
    const raw = get(messages, key);
    if (typeof raw !== 'string') return key; // fallback to key if missing
    return raw.replace(/\{(\w+)\}/g, (_, p) => params?.[p] ?? `{${p}}`);
  };
}
