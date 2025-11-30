import { FlashcardSchema } from '@/modules/flashcard/schemas/flashcard.schema';
import { userSchema } from '@/modules/user/schemas/user.schema';
import z from 'zod';

export const collectionSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(200),
  tags: z.string(),
  is_favorited: z.boolean(),
  owner: userSchema,
  access_level: z.enum(['private', 'public', 'shared']),
  flashcards_count: z.number(),
  favorited_count: z.number(),
  viewed_count: z.number(),
  deleted_at: z.string(),
  created_at: z.string(),
});

export const formCollectionSchema = z.object({
  id: z.number().optional().nullable(),
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(200).nullable(),
  tags: z.string().optional().nullable(),
  owner_id: z.number().optional(),
  access_level: z.enum(['private', 'public', 'shared']),
  flashcards: z.array(FlashcardSchema),
  access_users: z.array(userSchema).optional().nullable(),
});

export const collectionDetailSchema = collectionSchema.extend({
  flashcards: z.array(FlashcardSchema),
});

export const formParagraphSchema = z.object({
  content: z.string().min(1, 'Content is required').max(5000),
});

export const autoGenFlashcardsSchema = z.object({
  description: z.string().max(250),
});
