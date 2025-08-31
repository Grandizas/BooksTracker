import type { SignInInput } from '~/utils/validation/auth';
import { buildAuthSchemas } from '~/utils/validation/auth';
import { useI18n } from 'vue-i18n';

type FieldErrors = Partial<Record<'email' | 'password' | 'general', string[]>>;

export function useAuth() {
  const { t } = useI18n();

  async function login(payload: SignInInput): Promise<{
    success: boolean;
    needsConfirmation?: boolean;
    errors?: FieldErrors;
  }> {
    /**
     * Here we're getting schema from 'zod',
     * where fields are being checked if it has a valid value.
     * In this case, email and password fields.
     */
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

    /**
     * So here is where the real login happens.
     * We're sending a request to our `/server/api/login.post.ts` with data:
     * { email, password }
     */
    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: parsed.data,
      });

      // * --- Returning success in case we want to set disabled or show toast --- *
      return { success: true };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      /**
       * We can modify what we want to get with error.
       * We're providing an error object in `/server/api/login.post.ts`
       * There we can include translation strings, error codes from Supabase
       * and much more...
       */
      const err = e as {
        data?: { message?: string };
        statusMessage?: string;
        message?: string;
      };

      /**
       * This code is an example of a custom error object.
       * We set createError({ data: { code: 'some-code' } });
       */
      const code = e?.data?.data?.code;

      if (code === 'email_not_confirmed') {
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

      // Prefer server statusMessage (which is now a KEY), then data.message, then message
      const keyOrText =
        err.statusMessage ??
        err.data?.message ??
        err.message ??
        'errors.unexpected';

      // If it's a known key, t(key) will differ; if not, show the raw text.
      const translated = t(keyOrText);
      const msg = translated !== keyOrText ? translated : keyOrText;

      return { success: false, errors: { general: [msg] } };
    }
  }

  async function resendConfirmation(email: string) {
    await $fetch('/api/auth/resend-confirmation', {
      method: 'POST',
      body: { email },
    });
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' });
  }

  return { login, logout, resendConfirmation };
}
