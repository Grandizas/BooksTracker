import { serverSupabaseClient } from '#supabase/server';
import { z } from 'zod';

const Body = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1).max(200),
});

export default defineEventHandler(async (event) => {
  const origin = getRequestURL(event).origin;
  const supabase = await serverSupabaseClient(event);
  const body = await readBody(event);
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid form data' });
  }

  const { email, password, fullName } = parsed.data;

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
      statusMessage: 'Sign up failed',
      data: import.meta.dev ? { details: error.message } : undefined,
    });
  }

  // No manual profile upsert needed; trigger covers it.
  return { ok: true, userId: data.user?.id };
});
