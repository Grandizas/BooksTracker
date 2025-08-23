import { defineEventHandler, readBody, createError, getRequestURL } from 'h3';
import { serverSignUpSchema } from '~/utils/validation/auth';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsed = serverSignUpSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: parsed.error.flatten(),
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
      // captchaToken, // if you integrate hCaptcha/Turnstile later
    },
  });

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Sign up failed. Please try again.',
      data: import.meta.dev ? { details: error.message } : undefined,
    });
  }

  return { user: data.user };
});
