import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(1, 'Password is required.'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
