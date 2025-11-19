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
import type { FlashcardType } from '../types/flashcard';
import { FlashcardSchema } from '../schemas/flashcard.schema';
import React from 'react';

type FlashcardFormProps = {
  onSubmit: (data: FlashcardType) => void;
  onCancel: () => void;
  initialData?: Partial<FlashcardType>;
  isPending?: boolean;
  isEditing?: boolean;
};

const FlashcardForm = ({
  onSubmit,
  onCancel,
  initialData,
  isPending,
  isEditing = false,
}: FlashcardFormProps) => {
  const form = useForm<FlashcardType>({
    resolver: zodResolver(FlashcardSchema),
    defaultValues: {
      id: initialData?.id || null,
      term: initialData?.term || '',
      definition: initialData?.definition || '',
    },
  });
  const { reset } = form;

  React.useEffect(() => {
    if (initialData) {
      reset({
        id: initialData.id || null,
        term: initialData.term || '',
        definition: initialData.definition || '',
      });
    }
  }, [reset, initialData]);

  const handleSubmit = (data: FlashcardType) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {isEditing ? 'Edit Flashcard' : 'Create New Flashcard'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term</FormLabel>
                <FormControl>
                  <Input placeholder="Enter term" {...field} className="text-base py-5" />
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
                <FormLabel>Definition</FormLabel>
                <FormControl>
                  <Input placeholder="Enter definition" {...field} className="text-base py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button isPending={isPending} type="submit">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FlashcardForm;
