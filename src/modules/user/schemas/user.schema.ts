import z from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  dob: z.string(),
  email: z.email(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const userInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dob: z.string(),
})

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, 'Old password must be at least 6 characters'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

