import z from 'zod';

export const accountSchema = z.object({
  id: z.number(),
  email: z.email(),
  email_verified_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
