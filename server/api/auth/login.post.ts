import {
  defineEventHandler,
  readBody,
  createError,
  parseCookies,
  getRequestHeader,
} from 'h3';
import { serverSupabaseClient } from '#supabase/server';
import { buildAuthSchemas } from '~/utils/validation/auth';
import { createServerT } from '~~/server/utils/i18n-server';

export default defineEventHandler(async (event) => {
  /**
   * Here we're reading the request body
   * that should contain { email, password }
   */
  const body = await readBody(event);

  // * --- Getting language. First from cookies, then from header --- *
  const cookies = parseCookies(event);
  const cookieLocale = cookies['i18n_redirected'] || cookies['locale'];
  const acceptLang = getRequestHeader(event, 'accept-language');
  const headerLocale = acceptLang?.split(',')[0]?.split('-')[0]; // e.g. 'en-US' -> 'en'
  const locale = (cookieLocale || headerLocale || 'en').toLowerCase();

  // 2) server-safe translator
  const t = createServerT(locale);

  // 3) validate using your localized messages
  const { signInSchema } = buildAuthSchemas(t);
  const parsed = signInSchema.safeParse(body);

  /**
   * Check repeatedly if parsing was successful.
   * If not, return the error details with 400 status code
   * (bad request from the client).
   */
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'authErrors.validationFailed',
      data: parsed.error.flatten(),
    });
  }

  const { email, password } = parsed.data;
  const supabase = await serverSupabaseClient(event);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.code === 'email_not_confirmed') {
      throw createError({
        statusCode: 403,
        data: { code: error.code },
        statusMessage: 'authErrors.emailNotConfirmed',
      });
    }
    // Keep auth responses generic, but localized if you like:
    throw createError({
      statusCode: 401,
      statusMessage: 'authErrors.invalidEmailOrPassword',
    });
  }

  const user = data.user;
  if (!user) {
    throw createError({
      statusCode: 500,
      statusMessage: 'errors.unexpectedAuthResponse',
    });
  }

  return { userId: user.id, email: user.email };
});
