import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/shared/hooks/useToast';
import { Upload, XIcon } from 'lucide-react';
import React, { useCallback } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { CollectionType } from '../types/collection';
import type { FlashcardType } from '@/modules/flashcard/types/flashcard';

type Props = {
  open: boolean;
  onChange: () => void;
  value: FlashcardType[];
  setValue: UseFormSetValue<CollectionType>;
};

const data = [
  {
    id: 4,
    term: 'Deadline',
    definition: 'The latest time by which something must be completed',
  },
  {
    id: 5,
    term: 'Stakeholder',
    definition: 'A person with an interest in a business or project',
  },
];

const ExtractParagraphModal = ({ open, onChange, value, setValue }: Props) => {
  // const { toast } = useToast();
  const [paragraph, setParagraph] = React.useState('');
  const [flashcards, setFlashcards] = React.useState<FlashcardType[]>(data);

  const handleRemoveFlashcard = useCallback((id: number) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
  }, []);

  const handleImportFlashcards = useCallback(() => {
    setValue('flashcards', [...value, ...flashcards]);
    onChange();
  }, [flashcards, setValue, value]);

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="lg:min-w-[800px] md:min-w-[600px] w-[90%] pl-6 pr-2">
        <DialogHeader>
          <DialogTitle className="text-2xl">Import your paragraph</DialogTitle>
          <DialogDescription className="text-[16px]">
            Copy and Paste your paragraph from any languages
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto pr-4 ">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="paragraphInput">Paste your paragraph here</Label>
              <Textarea
                id="paragraphInput"
                className="text-[16px]"
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                rows={12}
              />
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-bold">Flashcards Preview</span>

              {flashcards.map((card) => {
                return (
                  <div key={card.id} className="flex items-center">
                    <div className="flex items-center gap-8 w-full">
                      <div className="space-y-2 w-full">
                        <Label htmlFor="term">Term</Label>
                        <Input
                          id="term"
                          placeholder="Enter term"
                          className="py-5"
                          value={card.term}
                        />
                      </div>
                      <div className="space-y-2 w-full">
                        <Label htmlFor="definition">Definition</Label>
                        <Input
                          id="definition"
                          placeholder="Enter definition"
                          className="py-5"
                          value={card.definition}
                        />
                      </div>
                    </div>
                    <button
                      tabIndex={-1}
                      onClick={() => handleRemoveFlashcard(card.id)}
                      aria-label="Remove card"
                      className="p-4 pt-8 pb-4 hover:cursor-pointer"
                    >
                      <XIcon className="size-5 text-red-600" />
                    </button>
                  </div>
                );
              })}
            </div>

            <Button
              type="button"
              onClick={handleImportFlashcards}
              variant="secondary"
              className="w-full py-6"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Flashcards
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExtractParagraphModal;
