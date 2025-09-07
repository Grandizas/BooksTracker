import { defineEventHandler, createError, getRequestHeader } from 'h3';
import { z } from 'zod';
import { serverSupabaseClient } from '#supabase/server';

const bodySchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  // Do NOT accept redirectTo from client
});

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  // Validate
  const raw = await readBody(event);
  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email.' });
  }
  const email = parsed.data.email;

  // Build a safe redirectTo from trusted base
  // Prefer runtimeConfig.public.siteUrl (set it in nuxt.config), fallback to the current host
  const config = useRuntimeConfig();
  const host = getRequestHeader(event, 'host') ?? 'localhost:3000';
  const protocol = config.public?.siteUrl?.startsWith('http')
    ? undefined
    : 'http';
  const base =
    config.public?.siteUrl ??
    `${getRequestHeader(event, 'x-forwarded-proto') ?? protocol ?? 'http'}://${host}`;

  // Optionally extract locale from cookie/header if you use i18n
  // For simplicity, redirect to /auth/reset-password (your page)
  const redirectTo = new URL('/auth/reset-password', base).toString();

  // Ask Supabase to send the email
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  // Always return generic success to avoid revealing if the email exists
  if (error) {
    // Log internally if you want, but do not forward exact error to user
    return { success: true }; // generic
  }
  return { success: true };
});
