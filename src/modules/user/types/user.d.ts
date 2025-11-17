import type z from 'zod';
import type { userSchema } from '../schemas/user.schema';

export type UserType = z.infer<typeof userSchema>;
