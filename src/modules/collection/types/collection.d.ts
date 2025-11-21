import type z from 'zod';
import type {
  autoGenFlashcardsSchema,
  collectionDetailSchema,
  collectionSchema,
  formCollectionSchema,
} from '../schemas/collection.schema';

export type CollectionType = z.infer<typeof collectionSchema>;
export type CollectionDetailType = z.infer<typeof collectionDetailSchema>;
export type FormCollectionType = z.infer<typeof formCollectionSchema>;
export type FormParagraphType = z.infer<typeof formParagraphSchema>;
export type AutoGenFlashcardsType = z.infer<typeof autoGenFlashcardsSchema>;
