import type z from 'zod';
import type { accountSchema } from '../schemas/account.schema';

export type AccountType = z.infer<typeof accountSchema>;
