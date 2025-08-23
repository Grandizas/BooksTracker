// server/api/auth/signup.post.ts
import { defineEventHandler, readBody, createError } from 'h3';
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

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName } },
  });

  if (error) {
    throw createError({ statusCode: 400, statusMessage: error.message });
  }

  return { user: data.user };
});
