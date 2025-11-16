import z from 'zod';

export const FlashcardSchema = z.object({
  id: z.string(),
  term: z
    .string()
    .trim()
    .min(1, { message: 'term text is required' })
    .max(200, { message: 'term text must be less than 200 characters' }),
  definition: z
    .string()
    .trim()
    .min(1, { message: 'Back text is required' })
    .max(200, { message: 'Back text must be less than 200 characters' }),
});
