import { z } from 'zod';

export const emailScheme = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

export type EmailScheme = z.infer<typeof emailScheme>;
