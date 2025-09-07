import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type T = (key: string, params?: Record<string, any>) => string;

export function buildAuthSchemas(t: T) {
  /* ------------------------
        [ Field checks ]
  ------------------------- */
  const passwordSchema = z
    .string()
    .min(8, { message: t('authErrors.passwordAtLeast8Chars') })
    .max(72, { message: t('authErrors.passwordAtMost72Chars') })
    .regex(/[a-z]/, { message: t('authErrors.passwordMustContainLowercase') })
    .regex(/[A-Z]/, { message: t('authErrors.passwordMustContainUppercase') })
    .regex(/\d/, { message: t('authErrors.passwordMustContainNumber') })
    .regex(/[^A-Za-z0-9]/, {
      message: t('authErrors.passwordMustContainSpecialChar'),
    });

  const emailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: t('authErrors.emailInvalid') });

  /* -------------------------------
      [ Checks for registration ]
  -------------------------------- */
  const signUpBase = z
    .object({
      fullName: z
        .string()
        .trim()
        .min(2, { message: t('authErrors.fullNameAtLeast2Chars') })
        .max(100, { message: t('authErrors.fullNameAtMost100Chars') })
        .refine((v) => v.split(/\s+/).filter(Boolean).length >= 2, {
          message: t('authErrors.fullNamePleaseEnterValidName'),
        }),
      email: emailSchema,
      password: passwordSchema,
      repeatPassword: z.string(),
    })
    .strict();

  /**
   * Add additional check to ensure password and repeatPassword match
   * This is done using superRefine to have access to multiple fields
   */
  const signUpSchema = signUpBase.superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['repeatPassword'],
        message: t('authErrors.passwordMustMatch'),
      });
    }
  });

  /**
   * Server-side signup schema without repeatPassword
   * This schema is used in server-side validation to avoid handling
   * the repeatPassword field on the server, which is unnecessary.
   */
  const serverSignUpSchema = signUpBase.omit({ repeatPassword: true });

  /* -------------------------------
         [ Checks for login ]
  -------------------------------- */
  const signInSchema = z
    .object({
      email: emailSchema,
      password: z
        .string()
        .min(1, { message: t('authErrors.passwordIsRequired') }),
    })
    .strict();

  return { passwordSchema, signUpSchema, serverSignUpSchema, signInSchema };
}

export type SignUpInput = z.infer<
  ReturnType<typeof buildAuthSchemas>['signUpSchema']
>;
export type ServerSignUpInput = z.infer<
  ReturnType<typeof buildAuthSchemas>['serverSignUpSchema']
>;
export type SignInInput = z.infer<
  ReturnType<typeof buildAuthSchemas>['signInSchema']
>;
