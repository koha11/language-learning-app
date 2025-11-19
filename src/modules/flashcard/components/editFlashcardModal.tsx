import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React from 'react';
import FlashcardForm from './flashcardForm';
import type { FlashcardType } from '../types/flashcard';
import { useParams } from 'react-router-dom';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { updateFlashcard } from '../services/flashcard.services';

const EditFlashcardModal = ({
  open,
  onChange,
  card,
}: {
  open: boolean;
  onChange: () => void;
  card: FlashcardType;
}) => {
  const { id } = useParams();
  const { mutate, isPending } = useMutationWithToast(updateFlashcard, {
    invalidateKeys: ['collections', id!],
  });

  const handleUpdateFlashcard = (payload: FlashcardType) => {
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
          <DialogTitle className="text-2xl">Edit Flashcard</DialogTitle>
        </DialogHeader>

        <FlashcardForm
          initialData={card}
          onSubmit={handleUpdateFlashcard}
          isPending={isPending}
          isEditing={true}
          onCancel={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditFlashcardModal;
