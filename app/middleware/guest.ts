export default defineNuxtRouteMiddleware(async () => {
  const supabase = useSupabaseClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return navigateTo('/');
  }
});
