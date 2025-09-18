import { z } from 'zod';
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~~/types/database';

// Make the body compatible with DB: allow nullables if your columns are nullable.
const Body = z.object({
  full_name: z.string().min(1).max(200).nullable().optional(),
  avatar_url: z.string().url().nullable().optional(),
});

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthenticated' });
  }

  const parsed = Body.safeParse(await readBody(event));
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payload' });
  }

  const supabase = await serverSupabaseClient<Database>(event);

  type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
  const payload = {
    ...parsed.data,
    updated_at: new Date().toISOString(),
  } satisfies ProfileUpdate;

  const { data, error } = await supabase
    .from('profiles')
    .update(payload)
    .eq('id', user.id)
    .select('*')
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
  return data;
});
