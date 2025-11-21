import type z from 'zod';
import type { loginSchema, signupSchema } from '../schemas/auth.schema';

export type LoginType = z.infer<typeof loginSchema>;
export type SignUpType = z.infer<typeof signupSchema>;
