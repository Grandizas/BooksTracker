import { defineEventHandler, readBody, createError } from 'h3';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string }>(event);
  const email = body.email?.toString().trim().toLowerCase();

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required',
    });
  }

  const supabase = await serverSupabaseClient(event);
  const { public: { siteUrl } = {} } = useRuntimeConfig();
  const base = siteUrl
    ? siteUrl.startsWith('http')
      ? siteUrl
      : `https://${siteUrl}`
    : undefined;
  const emailRedirectTo = base
    ? new URL('/auth/callback', base).toString()
    : undefined;

  // Resend confirmation email
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: { emailRedirectTo },
  });

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }

  return { success: true };
});
