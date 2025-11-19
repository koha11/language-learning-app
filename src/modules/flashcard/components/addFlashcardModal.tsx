import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React from 'react';
import FlashcardForm from './flashcardForm';
import type { FlashcardType } from '../types/flashcard';
import { useParams } from 'react-router-dom';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { addFlashcard } from '../services/flashcard.services';

const AddFlashcardModal = ({ open, onChange }: { open: boolean; onChange: () => void }) => {
  const { id } = useParams();
  const { mutate, isPending } = useMutationWithToast(addFlashcard, {
    invalidateKeys: ['collections', id!],
  });
  const handleAddFlashcard = (payload: FlashcardType) => {
    const data = {
      flashcard: payload,
      collectionId: Number(id),
    };
    mutate(data);
    onChange();
  };
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Flashcard</DialogTitle>
        </DialogHeader>

        <FlashcardForm
          initialData={undefined}
          onSubmit={handleAddFlashcard}
          isPending={isPending}
          onCancel={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddFlashcardModal;
