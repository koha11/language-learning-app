import React from 'react';
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
import type { FlashcardType } from '@/modules/flashcard/types/flashcard';
import type { UseFormSetValue } from 'react-hook-form';
import type { FormCollectionType } from '../types/collection';
import { SparklesIcon, Upload, UploadIcon } from 'lucide-react';
import FlashcardFields from '@/modules/flashcard/components/flashcardFields';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { autoGenFlashcards } from '../services/collection.services';
import { useToast } from '@/shared/hooks/useToast';
import FlashcardFieldsSkeleton from '@/modules/flashcard/components/flashcardFieldSkeleton';

type Props = {
  open: boolean;
  onChange: () => void;
  value: FlashcardType[];
  setValue: UseFormSetValue<FormCollectionType>;
};

const AutoGenFlashcardsModal = ({ open, onChange, value, setValue }: Props) => {
  const [prompt, setPrompt] = React.useState('');
  const [flashcardsPreview, setFlashcardsPreview] = React.useState<FlashcardType[]>([]);
  const { toast } = useToast();
  const { mutate, isPending } = useMutationWithToast(autoGenFlashcards);

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newValue = target.value.substring(0, start) + '\t' + target.value.substring(end);
      setPrompt(newValue);

      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      });
    }
  };

  const handleAutoGen = () => {
    if (!prompt.trim()) return;
    const payload = {
      description: prompt,
    };
    mutate(payload, {
      onSuccess: (response) => {
        console.log(response);

        if (response && response.data) {
          setFlashcardsPreview(response.data);
        }
      },
    });
  };

  const handleImport = () => {
    if (flashcardsPreview.length > 0) {
      const updatedFlashcards = [...value, ...flashcardsPreview];
      setValue('flashcards', updatedFlashcards);
      toast('Import successful');
    } else {
      toast('Nothing to import');
      return;
    }
    onChange();
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="lg:min-w-[800px] md:min-w-[600px] w-[90%] pl-6 pr-2">
        <DialogHeader>
          <DialogTitle className="text-2xl">Auto Generate Flashcards</DialogTitle>
          <DialogDescription className="text-[16px]">
            Copy and Paste your data from (Word, Excel, Google Docs, etc)
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-4 pl-1 ">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bulkInput">Enter your description here</Label>
              <Textarea
                id="bulkInput"
                onKeyDown={handleTabKey}
                className="text-[16px] min-h-[90px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter description about flashcards you want"
                rows={12}
              />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <span className="font-bold">Flashcards Preview</span>

              {isPending
                ? Array.from({ length: 5 }).map((_, index) => {
                    return <FlashcardFieldsSkeleton key={index} />;
                  })
                : flashcardsPreview.map((card, index) => {
                    return (
                      <div key={index} className="flex items-center w-full">
                        <FlashcardFields card={card} readOnly={true} />
                      </div>
                    );
                  })}
            </div>

            <Button
              type="button"
              isPending={isPending}
              onClick={handleAutoGen}
              variant="default"
              className="w-full py-6"
            >
              {!isPending && <SparklesIcon className="w-4 h-4" />}
              Generate
            </Button>
            <Button
              type="button"
              isPending={isPending}
              onClick={handleImport}
              variant="secondary"
              disabled={flashcardsPreview.length === 0}
              className="w-full py-6"
            >
              <UploadIcon className="w-4 h-4" />
              Import
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutoGenFlashcardsModal;
