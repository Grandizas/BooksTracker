import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthenticated' });
  }

  const supabase = await serverSupabaseClient(event);
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
  return data;
});
