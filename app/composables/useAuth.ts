import type { SignInInput } from '~/utils/validation/auth';
import { signInSchema } from '~/utils/validation/auth';

type FieldErrors = Partial<Record<'email' | 'password' | 'general', string[]>>;

export function useAuth() {
  async function login(
    payload: SignInInput,
  ): Promise<{ success: boolean; errors?: FieldErrors }> {
    // Client-side validation for instant UX
    const parsed = signInSchema.safeParse(payload);
    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors as FieldErrors,
      };
    }

    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: parsed.data,
      });
      return { success: true };
    } catch (e: unknown) {
      // Map server errors to a general message (or to fields if you prefer)
      const err = e as {
        data?: { statusMessage?: string };
        statusMessage?: string;
        message?: string;
      };
      const msg =
        err.statusMessage ??
        err.data?.statusMessage ??
        err.message ??
        'Login failed.';
      return { success: false, errors: { general: [msg] } };
    }
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' });
  }

  return { login, logout };
}
