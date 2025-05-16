import { z } from 'zod';

export const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  .max(20, { message: 'Password must be shorter than 20 characters.' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter.',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter.',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password must contain at least one number.',
  })
  .refine((password) => /[!@#$%^&*_]/.test(password), {
    message: 'Password must contain at least one special character.',
  });
