import { useLoginSchema } from '@/validators/auth';
import type { LoginInput } from '@/validators/schemas/loginBase';
import { useI18n } from 'vue-i18n';

/**
 * A composable function that provides authentication-related functionality.
 * This includes a `login` method for handling user login with validation and error handling.
 *
 * @returns {Object} - An object containing the `login` function.
 */
export function useAuth() {
  const client = useSupabaseClient(); // Supabase client instance for authentication.
  const schema = useLoginSchema(); // Zod schema for validating login input.
  const { t } = useI18n(); // i18n instance for localization.

  /**
   * Handles user login by validating input and interacting with the Supabase client.
   *
   * @param {LoginInput} input - The login input containing `email` and `password`.
   * @returns {Promise<Object>} - A promise resolving to an object with `success` and `errors` properties.
   *                              - `success`: Boolean indicating if the login was successful.
   *                              - `errors`: Object containing validation or authentication errors.
   */
  const login = async (input: LoginInput) => {
    // Validate the input using the schema.
    const parsed = schema.safeParse(input);

    if (!parsed.success) {
      // Return validation errors if input is invalid.
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    // Attempt to sign in using Supabase's `signInWithPassword` method.
    const { error } = await client.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    let message = error?.message || '';

    // Localize error message for invalid credentials.
    if (error?.message === 'Invalid login credentials') {
      message = t('login.invalidCredentials');
    }

    // Return success status and errors (if any).
    return {
      success: !error,
      errors: error ? { general: [message] } : null,
    };
  };

  return { login };
}
