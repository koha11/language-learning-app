import z from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required').max(100),
  db: z.string(),
  email: z.email(),
  created_at: z.string(),
  updated_at: z.string(),
});
