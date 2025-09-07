<template>
  <div class="callback" aria-busy="true" />
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification';

const router = useRouter();
const route = useRoute();
const supabase = useSupabaseClient();
const toast = useToast();

onMounted(async () => {
  const err = (route.query.error_description || route.query.error) as
    | string
    | undefined;
  if (err) {
    toast.error(err);
    return router.replace('/auth/login');
  }

  try {
    // Exchange the code in the current URL for a session (PKCE)
    const { error } = await supabase.auth.exchangeCodeForSession(
      window.location.href,
    );

    if (error) throw error;

    // honor middleware redirect safely
    const q = route.query.redirect;
    const candidate = Array.isArray(q) ? q[0] : q;
    const next =
      typeof candidate === 'string' &&
      candidate.startsWith('/') &&
      !candidate.startsWith('//')
        ? candidate
        : '/';

    await router.replace(next);
  } catch (e) {
    console.error(e);
    toast.error('Authentication failed');
    await router.replace('/auth/login');
  }
});
</script>
