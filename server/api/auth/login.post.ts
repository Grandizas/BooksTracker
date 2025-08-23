import { defineEventHandler, readBody, createError } from 'h3';
import { serverSupabaseClient } from '#supabase/server';
import { signInSchema } from '~/utils/validation/auth';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const parsed = signInSchema.safeParse(body);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: parsed.error.flatten(), // fieldErrors to map on client if you want
    });
  }

  const { email, password } = parsed.data;
  const supabase = await serverSupabaseClient(event);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    // Avoid leaking whether the email exists or is unconfirmed
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password.',
    });
  }

  // Cookie/session is handled by @nuxtjs/supabase automatically.
  const user = data.user;
  if (!user) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Unexpected auth response.',
    });
  }
  return { userId: user.id, email: user.email };
});
