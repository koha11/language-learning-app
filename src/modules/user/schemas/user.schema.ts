import z from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  dob: z.string(),
  email: z.email(),
  created_at: z.string(),
  updated_at: z.string(),
});
