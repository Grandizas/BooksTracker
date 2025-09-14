import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody<{ email: string }>(event);

  const { data, error } = await client
    .from('auth.users') // system table
    .select('id')
    .eq('email', body.email)
    .maybeSingle();

  if (error) throw error;

  return { exists: !!data };
});
