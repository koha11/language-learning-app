import { Card } from '@/components/ui/card';
import React from 'react';
import type { FlashcardType } from '../types/flashcard';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import DeleteFlashcardModal from './deleteFlashcardModal';
import EditFlashcardModal from './editFlashcardModal';

const Flashcard = ({ card }: { card: FlashcardType }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState<number | null>(null);

  return (
    <>
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground truncate">{card.term}</div>
              <div className="text-sm text-muted-foreground truncate">{card.definition}</div>
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setOpenEdit(true)}
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => setOpenDelete(card.id)}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </Card>
      <EditFlashcardModal card={card} open={openEdit} onChange={() => setOpenEdit(false)} />
      <DeleteFlashcardModal id={openDelete} onChange={() => setOpenDelete(null)} />
    </>
  );
};

export default Flashcard;
