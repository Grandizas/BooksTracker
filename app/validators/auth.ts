import { loginBaseSchema } from './schemas/loginBase';
import { z } from 'zod';
import { useI18n } from 'vue-i18n';

export const useLoginSchema = () => {
  const { t } = useI18n();

  return loginBaseSchema.extend({
    email: z.string().email(t('auth.invalidEmail')),
    password: z.string().min(6, t('auth.passwordShort')),
  });
};
