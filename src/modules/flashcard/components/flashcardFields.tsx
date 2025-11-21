import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import type { UseFormRegister } from 'react-hook-form';
import type { FlashcardType } from '@/modules/flashcard/types/flashcard';
import { XIcon } from 'lucide-react';

type Props = {
  index?: number;
  card?: FlashcardType;
  register?: UseFormRegister<any>;
  readOnly?: boolean;
  onRemove?: () => void;
};

const FlashcardFields = ({ index, card, register, readOnly, onRemove }: Props) => {
  return (
    <div className="flex items-center mt-2 w-full">
      <div className="flex items-center gap-8 w-full">
        {/* TERM */}
        <div className="space-y-2 w-full">
          <Label>Term</Label>
          <Input
            placeholder="Enter term"
            className="py-5"
            readOnly={readOnly}
            {...(register ? register(`flashcards.${index}.term`) : { value: card?.term })}
          />
        </div>

        {/* DEFINITION */}
        <div className="space-y-2 w-full">
          <Label>Definition</Label>
          <Input
            placeholder="Enter definition"
            className="py-5"
            readOnly={readOnly}
            {...(register
              ? register(`flashcards.${index}.definition`)
              : { value: card?.definition })}
          />
        </div>
      </div>

      {!readOnly && (
        <button
          aria-label="Remove card"
          className="p-4 pt-8 pb-4 hover:cursor-pointer"
          onClick={onRemove}
        >
          <XIcon className="size-5 text-red-600" />
        </button>
      )}
    </div>
  );
};
export default FlashcardFields;
