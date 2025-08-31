import { z } from 'zod';

// Regular expression for strong password (min 8 characters, at least one letter, one number, and one symbol)
const strongPasswordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export const passwordScheme = z.object({
  password: z
    .string()
    .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
    .regex(strongPasswordRegex, {
      message:
        'Le mot de passe doit contenir des lettres, des chiffres et un symbole',
    }),
});

const baseChangePasswordScheme = z.object({
  newPassword: passwordScheme.shape.password,
  confirmPassword: passwordScheme.shape.password,
});

// Schema for creating a new password with validation
export const changePasswordScheme = baseChangePasswordScheme.refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  },
);

// Schema for changing a known password with additional validation
export const changeKnownPasswordScheme = baseChangePasswordScheme
  .extend({
    currentPassword: passwordScheme.shape.password,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

// Exporting types
export type ChangePasswordScheme = z.infer<typeof changePasswordScheme>;
export type ChangeKnownPasswordScheme = z.infer<
  typeof changeKnownPasswordScheme
>;
export type PasswordScheme = z.infer<typeof passwordScheme>;
