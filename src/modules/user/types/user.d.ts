import type z from 'zod';
import type { userInfoSchema, userSchema } from '../schemas/user.schema';

export type UserType = z.infer<typeof userSchema>;

export type UserInfoType = z.infer<typeof userInfoSchema>
