export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient();
  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    const redirect = to?.fullPath
      ? `?redirect=${encodeURIComponent(to.fullPath)}`
      : '';
    return navigateTo(`/auth/login${redirect}`);
  }
});
