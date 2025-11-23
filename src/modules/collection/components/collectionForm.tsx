import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Plus, UploadIcon, SparklesIcon } from 'lucide-react';
import React, { useState } from 'react';
import ImportFlashcardModal from './importFlashcardModal';
import { formCollectionSchema } from '../schemas/collection.schema';
import type { FormCollectionType } from '../types/collection';
import ExtractParagraphModal from './extractParagraphModal';
import AutoGenFlashcardsModal from './autoGenFlashcardsModal';
import FlashcardFields from '@/modules/flashcard/components/flashcardFields';
import type { FlashcardType } from '@/modules/flashcard/types/flashcard';
import { useNavigate } from 'react-router-dom';
import SearchSelect from './searchSelect';

type CollectionFormProps = {
  onSubmit: (data: FormCollectionType) => void;
  initialData?: FormCollectionType;
  isEditing?: boolean;
  isPending?: boolean;
};

const CollectionForm = ({ onSubmit, initialData, isEditing, isPending }: CollectionFormProps) => {
  const navigate = useNavigate();

  const [openImportModal, setOpenImportModal] = React.useState(false);
  const [openExtractModal, setOpenExtractModal] = React.useState(false);
  const [openAutoGenModal, setOpenAutoGenModal] = React.useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [sharedWith, setSharedWith] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');

  const form = useForm<FormCollectionType>({
    resolver: zodResolver(formCollectionSchema),
    defaultValues: {
      id: initialData?.id || null,
      name: initialData?.name || '',
      description: initialData?.description || '',
      tags: initialData?.tags || null,
      access_level: initialData?.access_level || 'private',
      access_users: initialData?.access_users || [],
      flashcards: initialData?.flashcards || [
        {
          term: '',
          definition: '',
        },
      ],
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'flashcards',
    keyName: '_internalId',
  });

  React.useEffect(() => {
    if (initialData) {
      reset({
        id: initialData?.id,
        name: initialData.name,
        description: initialData.description,
        tags: initialData.tags,
        access_level: initialData.access_level,
        access_users: initialData.access_users || [],
        flashcards: initialData.flashcards,
      });
      if (initialData.tags) {
        setTags(initialData.tags.split(','));
      }
    }
  }, [initialData, form, reset]);

  const access_level = watch('access_level');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue('tags', newTags.join(','));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    setValue('tags', newTags.join(','));
  };

  const onFormSubmit = (data: FormCollectionType) => {
    // Need to clear empty flaschcard fields default
    const finalFlashcards = data.flashcards.filter(
      (fc) => fc.term.trim() !== '' || fc.definition.trim() !== '',
    );

    const finalData: FormCollectionType = {
      ...data,
      flashcards: finalFlashcards,
    };
    onSubmit(finalData);
  };

  console.log('form errors', errors);
  console.log(watch('flashcards'));

  return (
    <div className="">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-foreground">
            {isEditing ? 'Edit Collection' : 'Create New Collection'}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Collection Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter collection name"
              className="py-5"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe your collection..."
              rows={12}
              className="min-h-[100px]"
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag..."
                className="py-5"
              />
              <Button type="button" onClick={handleAddTag} variant="secondary" className="py-5">
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-primary/80"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Controller
              name="access_level"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full py-5">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="shared">Shared with friends</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {access_level === 'shared' && (
            <div className="space-y-2">
              <Label htmlFor="sharedWith">Share by email</Label>
              <SearchSelect
                users={watch('access_users') ?? []}
                onChange={(value) => setValue('access_users', value)}
              />
            </div>
          )}

          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex items-center gap-4">
              <Label>Flashcards ({fields.length})</Label>
              <Button
                type="button"
                className=" rounded-full"
                onClick={() => setOpenImportModal(true)}
              >
                <UploadIcon />
                <span>Import</span>
              </Button>

              <Button
                type="button"
                className=" rounded-full"
                onClick={() => setOpenExtractModal(true)}
              >
                <UploadIcon />
                <span>Extract Paragraph</span>
              </Button>
              <Button
                type="button"
                className=" rounded-full"
                onClick={() => setOpenAutoGenModal(true)}
              >
                <SparklesIcon />
                <span>Auto gen</span>
              </Button>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              {fields.map((field, index) => {
                return (
                  <FlashcardFields
                    key={index}
                    index={index}
                    card={field}
                    onRemove={remove}
                    register={register}
                  />
                );
              })}
            </div>
          </div>

          <Button
            type="button"
            onClick={() =>
              append({
                term: '',
                definition: '',
              })
            }
            variant="secondary"
            className="w-full py-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Flashcard
          </Button>
        </div>

        <div className="flex gap-2">
          <Button isPending={isPending} type="submit" size="lg" className="flex-1 py-6">
            {isEditing ? 'Update Collection' : 'Create Collection'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="py-6"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>

      <ImportFlashcardModal
        open={openImportModal}
        onChange={() => setOpenImportModal(false)}
        value={fields}
        setValue={setValue}
      />

      <ExtractParagraphModal
        open={openExtractModal}
        onChange={() => setOpenExtractModal(false)}
        setValues={(newCards: FlashcardType[]) => {
          setValue('flashcards', [...watch('flashcards'), ...newCards]);
        }}
      />

      <AutoGenFlashcardsModal
        open={openAutoGenModal}
        onChange={() => setOpenAutoGenModal(false)}
        value={fields}
        setValue={setValue}
      />
    </div>
  );
};

export default CollectionForm;
