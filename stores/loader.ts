import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    loading: {} as Record<string, boolean>,
  }),
  getters: {
    isLoading: (state) => (key: string) => !!state.loading[key],
  },
  actions: {
    setLoading(key: string, value: boolean) {
      this.loading[key] = value;
    },
  },
});
