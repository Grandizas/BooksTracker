import { useProfile } from '~/composables/useProfile';

export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const { refresh, clear } = useProfile();

  // Initial load if already signed in (SSR -> CSR)
  if (user.value) refresh().catch(() => {});

  supabase.auth.onAuthStateChange(async (event) => {
    if (
      event === 'SIGNED_IN' ||
      event === 'USER_UPDATED' ||
      event === 'TOKEN_REFRESHED'
    ) {
      await refresh().catch(() => {});
    }
    if (event === 'SIGNED_OUT') {
      clear();
    }
  });
});
