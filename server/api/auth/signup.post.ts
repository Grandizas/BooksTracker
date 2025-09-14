import { defineEventHandler, readBody, createError, getRequestURL } from 'h3';
import { buildAuthSchemas } from '~/utils/validation/auth';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // server-safe 't' (no Vue composable on the server route)
    const t = (key: string) => key;
    const { serverSignUpSchema } = buildAuthSchemas(t);

    const parsed = serverSignUpSchema.safeParse(body);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation failed',
        data: flat, // fieldErrors & formErrors
      });
    }

    const supabase = await serverSupabaseClient(event);
    const { fullName, email, password } = parsed.data;

    const origin = getRequestURL(event).origin;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName },
        emailRedirectTo: `${origin}/auth/login`,
      },
    });

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Sign up failed. Please try again.',
        // In dev we can surface details to help debugging
        data: import.meta.dev ? { details: error.message } : undefined,
      });
    }

    return { user: data.user };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Ensure we always return a structured error (avoids raw 500s without context)
    if (err?.statusCode) throw err;
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal signup error',
      data: import.meta.dev
        ? { details: String(err?.message ?? err) }
        : undefined,
    });
  }
});
