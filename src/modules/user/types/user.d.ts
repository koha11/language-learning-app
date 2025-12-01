import type z from 'zod';
import type { changePasswordSchema, userInfoSchema, userSchema } from '../schemas/user.schema';

export type UserType = z.infer<typeof userSchema>;

export type UserInfoType = z.infer<typeof userInfoSchema>

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
