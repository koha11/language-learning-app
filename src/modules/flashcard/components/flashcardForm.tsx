import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/shared/hooks/useToast';
import type { FlashcardType } from '../types/flashcard';
import { FlashcardSchema } from '../schemas/flashcard.schema';

type FlashcardFormProps = {
  onSubmit: (data: FlashcardType) => void;
  onCancel: () => void;
  initialData?: Partial<FlashcardType>;
  isEditing?: boolean;
};

const FlashcardForm = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: FlashcardFormProps) => {
  const { toast } = useToast();

  const form = useForm<FlashcardType>({
    resolver: zodResolver(FlashcardSchema),
    defaultValues: {
      term: initialData?.term || '',
      definition: initialData?.definition || '',
      // language: initialData?.language || '',
      // category: initialData?.category || '',
    },
  });

  const handleSubmit = (data: FlashcardType) => {
    onSubmit(data);
    toast('Flashcard updated!');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">
            {isEditing ? 'Edit Flashcard' : 'Create New Flashcard'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>term (Question)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the word or phrase" {...field} className="text-base" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="definition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Back (Answer)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the translation" {...field} className="text-base" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-popover">
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Greetings, Food, Travel"
                    {...field}
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{isEditing ? 'Update Flashcard' : 'Create Flashcard'}</Button>
        </div>
      </form>
    </Form>
  );
};

export default FlashcardForm;
