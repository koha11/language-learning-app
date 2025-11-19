import type { FlashcardSchema } from '../schemas/flashcard.schema';

export type FlashcardType = z.infer<typeof FlashcardSchema>;
