import { defineEventHandler, readBody, createError } from 'h3';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string }>(event);

  if (!body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required',
    });
  }

  const supabase = await serverSupabaseClient(event);

  // Resend confirmation email
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: body.email,
  });

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }

  return { success: true };
});
