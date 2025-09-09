export default defineNuxtRouteMiddleware((to) => {
  // * --- Only care about /auth pages --- *
  if (!to.path.includes('/auth')) return;

  const isResetPage = to.path.includes('/auth/reset-password');
  const user = useSupabaseUser();

  // * --- Read the recovery hash safely --- *
  const hash =
    typeof window !== 'undefined' && window.location
      ? window.location.hash
      : to.hash;

  const params = new URLSearchParams(hash.replace(/^#\/?/, ''));
  const isRecovery = params.get('type') === 'recovery';

  /**
   * Normal guest rule: signed-in users shouldn't see /auth/*
   * BUT allow /auth/reset-password during recovery.
   */
  if (user.value && !(isResetPage && isRecovery)) {
    return navigateTo('/', { replace: true });
  }
});
