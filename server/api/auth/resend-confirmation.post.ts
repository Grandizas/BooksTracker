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
  if (!siteUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server misconfigured: public.siteUrl is required.',
    });
  }
  const base = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`;
  const emailRedirectTo = new URL('/auth/callback', base).toString();

  // Resend confirmation email
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: { emailRedirectTo },
  });

  if (error) {
    console.error('Resend confirmation failed:', error);
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not resend confirmation email.',
    });
  }

  return { success: true };
});
