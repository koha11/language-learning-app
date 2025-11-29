import z from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const signupSchema = z.object({
  email: z.email(),
  name: z.string().min(1),
  password: z.string().min(6),
  dob: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: 'Invalid date',
  }),
});
