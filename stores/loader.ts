import { reactive } from 'vue';
export const useLoaderStore = defineStore('loader', () => {
  const loading = reactive<Record<string, boolean>>({});

  function isLoading(key: string): boolean {
    return loading[key] || false;
  }

  function setLoading(key: string, value: boolean) {
    loading[key] = value;
  }

  return {
    loading,
    isLoading,
    setLoading,
  };
});
