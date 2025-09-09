import { serverSupabaseClient } from '#supabase/server';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: 'Logout failed' });
  }
  return { ok: true };
});
