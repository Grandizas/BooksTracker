import { z } from 'zod';
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

const Body = z.object({
  full_name: z.string().min(1).max(200).optional(),
  avatar_url: z.string().url().optional(),
});

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthenticated' });
  }

  const body = await readBody(event);
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payload' });
  }

  const supabase = await serverSupabaseClient(event);
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq('id', user.id)
    .select('*')
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
  return data;
});
