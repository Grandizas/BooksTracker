// utils/validation/auth.ts
import { z } from 'zod';

// Password rules (edit to taste)
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must be at most 72 characters')
  .regex(/[a-z]/, 'Must include a lowercase letter')
  .regex(/[A-Z]/, 'Must include an uppercase letter')
  .regex(/\d/, 'Must include a number')
  .regex(/[^A-Za-z0-9]/, 'Must include a symbol');

// 1) Base object (ZodObject) — can use `.omit()`, `.pick()`, etc.
const signUpBase = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name is too short')
    .max(100, 'Full name is too long')
    .refine(
      (v) => v.split(/\s+/).filter(Boolean).length >= 2,
      'Please enter first and last name',
    ),
  // If your zod version doesn't support `.toLowerCase()`, replace with `.transform(s => s.toLowerCase())`
  email: z.string().trim().toLowerCase().email('Invalid email'),
  password: passwordSchema,
  repeatPassword: z.string(),
});

// 2) Client schema with cross-field check (now becomes ZodEffects)
export const signUpSchema = signUpBase.superRefine((data, ctx) => {
  if (data.password !== data.repeatPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['repeatPassword'],
      message: 'Passwords must match',
    });
  }
});
export type SignUpInput = z.infer<typeof signUpSchema>;

// 3) Server schema — omit repeatPassword from the *base*
export const serverSignUpSchema = signUpBase.omit({ repeatPassword: true });
export type ServerSignUpInput = z.infer<typeof serverSignUpSchema>;

// Optional: sign-in
export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});
export type SignInInput = z.infer<typeof signInSchema>;
