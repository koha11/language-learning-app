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
import type { CollectionDetailType } from '../types/collection';
import type { FlashcardType } from '@/modules/flashcard/types/flashcard';

type Props = {
  open: boolean;
  onChange: () => void;
  value: FlashcardType[];
  setValue: UseFormSetValue<CollectionDetailType>;
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

  const handleBulkImport = () => {
    if (!bulkInput.trim()) return;
    let cardsFormat = '\n';
    if (cardsDelimiter === 'semicolon') {
      cardsFormat = ';';
    } else if (cardsDelimiter === 'custom') {
      cardsFormat = customCardDelimiter;
    }
    const lines = bulkInput.split(cardsFormat).filter((line) => line.trim());
    const newFlashcards: FlashcardType[] = [];
    let delimiter = '\t';

    if (termDefDelimiter === 'comma') {
      delimiter = ',';
    } else if (termDefDelimiter === 'custom') {
      delimiter = customDelimiter;
    }

    lines.forEach((line) => {
      const parts = line.split(delimiter);
      if (parts.length >= 2) {
        const term = parts[0].trim();
        const definition = parts.slice(1).join(delimiter).trim();
        if (term && definition) {
          newFlashcards.push({
            id: `${Date.now()}-${Math.random()}`,
            term,
            definition,
          });
        }
      }
    });

    if (newFlashcards.length > 0) {
      const updatedFlashcards = [...value, ...newFlashcards];

      setValue('flashcards', updatedFlashcards);
      setBulkInput('');
      toast('Import successful');
    } else {
      toast('Import failed');
    }
    onChange();
  };
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="lg:min-w-[800px] md:min-w-[600px] w-[90%] pl-6 pr-2">
        <DialogHeader>
          <DialogTitle className="text-2xl">Import your data</DialogTitle>
          <DialogDescription className="text-[16px]">
            Copy and Paste your data from (Word, Excel, Google Docs, etc)
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-4 ">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bulkInput">Paste your data here</Label>
              <Textarea
                id="bulkInput"
                className="text-[16px]"
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

            <Button
              type="button"
              onClick={handleBulkImport}
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
