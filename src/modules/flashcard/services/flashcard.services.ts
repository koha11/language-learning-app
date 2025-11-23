import { httpClient } from '@/core/htpp/httpClient';
import type { FlashcardType } from '../types/flashcard';

export const addFlashcard = async (payload: { flashcard: FlashcardType; collectionId: number }) => {
  console.log(payload);

  const { data } = await httpClient.post(
    `/collections/${payload.collectionId}/flashcards`,
    payload.flashcard,
  );
  return data;
};
export const updateFlashcard = async (payload: {
  flashcard: FlashcardType;
  collectionId: number;
}) => {
  const { data } = await httpClient.put(
    `/collections/${payload.collectionId}/flashcards`,
    payload.flashcard,
  );
  return data;
};
