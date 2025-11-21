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
import { Upload } from 'lucide-react';
import React from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { FlashcardType } from '@/modules/flashcard/types/flashcard';
import type { FormCollectionType } from '../types/collection';
import { useDebounce } from '@/shared/hooks/useDebounce';

type Props = {
  open: boolean;
  onChange: () => void;
  value: FlashcardType[];
  setValue: UseFormSetValue<FormCollectionType>;
};

const ImportFlashcardModal = ({ open, onChange, value, setValue }: Props) => {
  const { toast } = useToast();
  const [bulkInput, setBulkInput] = React.useState('');
  const [termDefDelimiter, setTermDefDelimiter] = React.useState<'tab' | 'comma' | 'custom'>('tab');
  const [customDelimiter, setCustomDelimiter] = React.useState(':');
  const [cardsDelimiter, setCardsDelimiter] = React.useState<'line' | 'semicolon' | 'custom'>(
    'line',
  );
  const [customCardDelimiter, setCustomCardDelimiter] = React.useState('');
  const [flashcardsPreview, setFlashcardsPreview] = React.useState<FlashcardType[]>([]);
  const debounceInput = useDebounce(bulkInput, 1000);

  const parseFlashcards = (
    text: string,
    termDelimiter: string,
    cardDelimiter: string,
  ): FlashcardType[] => {
    if (!text.trim()) return [];

    const lines = text.split(cardDelimiter).filter((l) => l.trim());

    return lines
      .map((line) => {
        const parts = line.split(termDelimiter);
        if (parts.length < 2) return null;

        return {
          term: parts[0].trim(),
          definition: parts.slice(1).join(termDelimiter).trim(),
        };
      })
      .filter(Boolean) as FlashcardType[];
  };

  const handleImport = () => {
    if (flashcardsPreview.length > 0) {
      const updatedFlashcards = [...value, ...flashcardsPreview];
      setValue('flashcards', updatedFlashcards);
      setBulkInput('');
      toast('Import successful');
    } else {
      toast('Import failed');
      return;
    }
    onChange();
  };

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newValue = target.value.substring(0, start) + '\t' + target.value.substring(end);
      setBulkInput(newValue);

      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      });
    }
  };

  React.useEffect(() => {
    if (!debounceInput.trim()) {
      setFlashcardsPreview([]);
      return;
    }

    let cardDelimiter = '\n';
    if (cardsDelimiter === 'semicolon') cardDelimiter = ';';
    if (cardsDelimiter === 'custom') cardDelimiter = customCardDelimiter;

    let termDelimiter = '\t';
    if (termDefDelimiter === 'comma') termDelimiter = ',';
    if (termDefDelimiter === 'custom') termDelimiter = customDelimiter;

    const parsed = parseFlashcards(debounceInput, termDelimiter, cardDelimiter);

    setFlashcardsPreview(parsed);
    console.log('Call Preview:', parsed);
  }, [debounceInput, cardsDelimiter, customCardDelimiter, termDefDelimiter, customDelimiter]);

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="lg:min-w-[800px] md:min-w-[600px] w-[90%] pl-6 pr-2">
        <DialogHeader>
          <DialogTitle className="text-2xl">Import your data</DialogTitle>
          <DialogDescription className="text-[16px]">
            Copy and Paste your data from (Word, Excel, Google Docs, etc)
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-4 pl-1 ">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bulkInput">Paste your data here</Label>
              <Textarea
                id="bulkInput"
                onKeyDown={handleTabKey}
                className="text-[16px] min-h-[90px]"
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                placeholder="Term 1: Definition 1&#10;Term 2: Definition 2&#10;Term 3: Definition 3"
                rows={12}
              />
            </div>
            <div className="flex items-start gap-20 ">
              <div className="space-y-2 ">
                <Label>Between term and definition</Label>
                <div className="flex flex-col gap-3 mt-4 pl-1">
                  <Label className="flex items-center gap-3 cursor-pointer">
                    <Input
                      type="radio"
                      name="delimiter"
                      value="tab"
                      checked={termDefDelimiter === 'tab'}
                      onChange={() => setTermDefDelimiter('tab')}
                      className="h-4 w-4"
                    />
                    <span>Tab</span>
                  </Label>

                  <Label className="flex items-center gap-3 cursor-pointer">
                    <Input
                      type="radio"
                      name="delimiter"
                      value="comma"
                      checked={termDefDelimiter === 'comma'}
                      onChange={() => setTermDefDelimiter('comma')}
                      className="h-4 w-4"
                    />
                    <span>Comma (,)</span>
                  </Label>

                  <Label className="flex items-center gap-3 cursor-pointer">
                    <Input
                      type="radio"
                      tabIndex={-1}
                      name="delimiter"
                      value="custom"
                      checked={termDefDelimiter === 'custom'}
                      onChange={() => setTermDefDelimiter('custom')}
                      className="h-4 w-4"
                    />
                    <span>Custom</span>
                    {termDefDelimiter === 'custom' && (
                      <Input
                        value={customDelimiter}
                        onChange={(e) => setCustomDelimiter(e.target.value)}
                        placeholder="Enter custom"
                        maxLength={5}
                        className=" w-[150px]"
                      />
                    )}
                  </Label>
                </div>
              </div>
              <div className="space-y-2 ">
                <Label>Between cards</Label>
                <div className="flex flex-col gap-3 mt-4 pl-1">
                  <Label className="flex items-center gap-3 cursor-pointer">
                    <Input
                      type="radio"
                      name="card-delimiter"
                      value="line"
                      checked={cardsDelimiter === 'line'}
                      onChange={() => setCardsDelimiter('line')}
                      className="h-4 w-4"
                    />
                    <span>New line</span>
                  </Label>

                  <Label className="flex items-center gap-3 cursor-pointer">
                    <Input
                      type="radio"
                      name="card-delimiter"
                      value="semicolon"
                      checked={cardsDelimiter === 'semicolon'}
                      onChange={() => setCardsDelimiter('semicolon')}
                      className="h-4 w-4"
                    />
                    <span>Semicolon (;)</span>
                  </Label>

                  <Label className="flex items-center gap-3 cursor-pointer">
                    <Input
                      type="radio"
                      name="card-delimiter"
                      value="custom"
                      checked={cardsDelimiter === 'custom'}
                      onChange={() => setCardsDelimiter('custom')}
                      className="h-4 w-4"
                    />
                    <span>Custom</span>
                    {cardsDelimiter === 'custom' && (
                      <Input
                        value={customCardDelimiter}
                        onChange={(e) => setCustomCardDelimiter(e.target.value)}
                        placeholder="Enter custom"
                        maxLength={5}
                        className=" w-[150px]"
                      />
                    )}
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-bold">Flashcards Preview</span>

              {flashcardsPreview.map((card) => {
                return (
                  <div key={card.id} className="flex items-center">
                    <div className="flex items-center gap-8 w-full">
                      <div className="space-y-2 w-full">
                        <Label htmlFor="term">Term</Label>
                        <Input
                          id="term"
                          readOnly
                          placeholder="Enter term"
                          className="py-5"
                          value={card.term}
                        />
                      </div>
                      <div className="space-y-2 w-full">
                        <Label htmlFor="definition">Definition</Label>
                        <Input
                          id="definition"
                          readOnly
                          placeholder="Enter definition"
                          className="py-5"
                          value={card.definition}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              type="button"
              onClick={handleImport}
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

export default ImportFlashcardModal;
