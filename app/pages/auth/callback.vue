<template>
  <div class="callback" aria-busy="true" role="status" aria-live="polite">
    <!-- Optional spinner/visually hidden text -->
    <span class="sr-only">Signing you in…</span>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

// If you use global auth middleware, consider opting out here:
definePageMeta({ layout: 'auth', middleware: 'guest' });

useHead({
  title: 'Signing in…',
  meta: [{ name: 'robots', content: 'noindex,nofollow' }],
});

const router = useRouter();
const route = useRoute();
const supabase = useSupabaseClient();
const toast = useToast();
const { t } = useI18n();

function safeRedirect(raw: unknown): string {
  const candidate = Array.isArray(raw) ? raw[0] : raw;
  if (typeof candidate !== 'string') return '/';
  // decode once, then validate again
  let path = candidate;
  try {
    path = decodeURIComponent(candidate);
  } catch {
    /* ignore */
  }

  // only allow in-app absolute paths, not protocol-relative or external
  if (!path.startsWith('/') || path.startsWith('//')) return '/';
  // avoid redirect loop back to callback (adjust to your path)
  if (path.startsWith('/auth/callback')) return '/';
  return path;
}

onMounted(async () => {
  const err = (route.query.error_description || route.query.error) as
    | string
    | undefined;
  if (err) {
    console.error('OAuth callback error:', err);
    toast.error(t('authErrors.oauthError'));
    await router.replace('/auth/login');
    return;
  }

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(
      window.location.href,
    );
    if (error) throw error;

    const next = safeRedirect(route.query.redirect);
    await router.replace(next);
  } catch (e) {
    console.error('Auth exchange failed:', e);
    toast.error(t('authErrors.authFailed'));
    await router.replace('/auth/login');
  }
});
</script>

<style scoped lang="scss">
.callback {
  min-height: 40vh;
  display: grid;
  place-items: center;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
