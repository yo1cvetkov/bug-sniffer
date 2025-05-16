import { z } from 'zod';
import { passwordSchema } from './password-schema';

export const signupSchema = z.object({
  email: z.string().trim().email(),
  password: passwordSchema,
});

export type SignupSchema = z.infer<typeof signupSchema>;
