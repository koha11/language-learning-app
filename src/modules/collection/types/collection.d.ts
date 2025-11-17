import type z from 'zod';
import type { collectionDetailSchema, collectionSchema } from '../schemas/collection.schema';

export type CollectionType = z.infer<typeof collectionSchema>;
export type CollectionDetailType = z.infer<typeof collectionDetailSchema>;
