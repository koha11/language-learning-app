import { FlashcardSchema } from '@/modules/flashcard/schemas/flashcard.schema';
import { userSchema } from '@/modules/user/schemas/user.schema';
import z from 'zod';

export const collectionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500),
  tags: z.string(),
  owner: userSchema,
  access_level: z.enum(['private', 'public', 'restrict']),
  flashcards_count: z.number(),
  favorited_count: z.number(),
  played_count: z.number(),
  deleted_at: z.string(),
  created_at: z.string(),
});

export const collectionDetailSchema = collectionSchema.extend({
  flashcards: z.array(FlashcardSchema),
});
