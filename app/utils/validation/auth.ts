// utils/validation.auth.ts
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type T = (key: string, params?: Record<string, any>) => string;

export function buildAuthSchemas(t: T) {
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

  const signUpBase = z.object({
    fullName: z
      .string()
      .trim()
      .min(2, { message: t('authErrors.fullNameAtLeast2Chars') })
      .max(100, { message: t('authErrors.fullNameAtMost100Chars') })
      .refine((v) => v.split(/\s+/).filter(Boolean).length >= 2, {
        message: t('authErrors.fullNamePleaseEnterValidName'),
      }),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email({ message: t('authErrors.emailInvalid') }),
    password: passwordSchema,
    repeatPassword: z.string(),
  });

  const signUpSchema = signUpBase.superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['repeatPassword'],
        message: t('authErrors.passwordMustMatch'),
      });
    }
  });

  const serverSignUpSchema = signUpBase.omit({ repeatPassword: true });

  const signInSchema = z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email({ message: t('authErrors.emailInvalid') }),
    password: z
      .string()
      .min(1, { message: t('authErrors.passwordIsRequired') }),
  });

  return { passwordSchema, signUpSchema, serverSignUpSchema, signInSchema };
}

// (optional) exported types
export type SignUpInput = z.infer<
  ReturnType<typeof buildAuthSchemas>['signUpSchema']
>;
export type ServerSignUpInput = z.infer<
  ReturnType<typeof buildAuthSchemas>['serverSignUpSchema']
>;
export type SignInInput = z.infer<
  ReturnType<typeof buildAuthSchemas>['signInSchema']
>;
