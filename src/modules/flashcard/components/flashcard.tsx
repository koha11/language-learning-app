import { Card } from '@/components/ui/card';
import React from 'react';
import type { FlashcardType } from '../types/flashcard';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Volume2Icon } from 'lucide-react';
import DeleteFlashcardModal from './deleteFlashcardModal';
import EditFlashcardModal from './editFlashcardModal';
import { textToSpeech } from '@/shared/utils/textToSpeech';
import { useAuth } from '@/shared/hooks/useAuth';
import { useGetCollectionById } from '@/modules/collection/hooks/collection.hooks';
import { canEditCollection } from '@/shared/utils/permission';
import { useParams } from 'react-router-dom';

const Flashcard = ({ card }: { card: FlashcardType }) => {
  const { id } = useParams();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState<number | null>(null);
  const { user } = useAuth();
  const { data } = useGetCollectionById(Number(id!));

  const isOwner = canEditCollection(user, data!);
  return (
    <>
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-lg text-foreground truncate">{card.term}</div>
              <div className="text-[16px] text-muted-foreground truncate">{card.definition}</div>
            </div>
            <div className="">
              <button className=" hover:cursor-pointer" onClick={() => textToSpeech(card.term)}>
                <Volume2Icon className="size-5 text-muted-foreground hover:text-black/80" />
              </button>
            </div>
          </div>
          {isOwner && (
            <div className="flex gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => setOpenEdit(true)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 text-destructive hover:text-destructive  hover:bg-destructive/10"
                onClick={() => setOpenDelete(card.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </Card>
      <EditFlashcardModal card={card} open={openEdit} onChange={() => setOpenEdit(false)} />
      <DeleteFlashcardModal id={openDelete} onChange={() => setOpenDelete(null)} />
    </>
  );
};

export default Flashcard;
