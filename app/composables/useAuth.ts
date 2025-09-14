import type { SignInInput } from '~/utils/validation/auth';
import { buildAuthSchemas } from '~/utils/validation/auth';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';

type FieldErrors = Partial<Record<'email' | 'password' | 'general', string[]>>;

const emailSchema = z.string().trim().toLowerCase().email();

export function useAuth() {
  const { t } = useI18n();
  const user = useSupabaseUser();
  const isAuthenticated = computed(() => !!user.value);

  async function login(payload: SignInInput): Promise<{
    success: boolean;
    needsConfirmation?: boolean;
    errors?: FieldErrors;
  }> {
    // validate on client for instant field errors
    const { signInSchema } = buildAuthSchemas(t);
    const parsed = signInSchema.safeParse(payload);
    /**
     * Here we're getting result if every field meets requirements.
     * If the result was unsuccessful, we're sending back error details to
     * `login.vue`, where this `useAuth()` is called
     */

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors as FieldErrors,
      };
    }

    // Perform auth on client so Supabase emits auth state change immediately
    const supabase = useSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      // Normalize common cases
      const code = (error as unknown as { code?: string })?.code;
      const msg = (error.message || '').toLowerCase();

      if (code === 'email_not_confirmed' || msg.includes('confirm')) {
        return {
          success: false,
          needsConfirmation: true,
          errors: {
            general: [
              t('authErrors.emailNotConfirmed') ||
                'Please confirm your email to continue.',
            ],
          },
        };
      }

      // Invalid credentials or other generic auth errors
      return {
        success: false,
        errors: { general: [t('authErrors.invalidEmailOrPassword')] },
      };
    }

    if (!data?.user) {
      return {
        success: false,
        errors: { general: [t('errors.unexpectedAuthResponse')] },
      };
    }

    return { success: true };
  }

  async function resendConfirmation(email: string) {
    await $fetch('/api/auth/resend-confirmation', {
      method: 'POST',
      body: { email },
    });
  }

  async function forgotPassword(
    rawEmail: string,
  ): Promise<{ ok: boolean; message: string }> {
    const parsed = emailSchema.safeParse(rawEmail);
    if (!parsed.success) {
      return { ok: false, message: t('authErrors.invalidEmail') };
    }

    try {
      await $fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: { email: parsed.data }, // server builds redirectTo
      });
      return { ok: true, message: t('auth.resetEmailSentGeneric') };
    } catch {
      // generic to prevent enumeration and avoid leaking infra errors
      return { ok: true, message: t('auth.resetEmailSentGeneric') };
    }
  }

  async function logout() {
    // Use client-side sign out so auth state updates immediately
    const supabase = useSupabaseClient();
    await supabase.auth.signOut();
  }

  return { login, logout, resendConfirmation, forgotPassword, isAuthenticated };
}
