import { Card } from '@/components/ui/card';
import { Languages } from 'lucide-react';
import type { FlashcardType } from '../types/flashcard';
import Flashcard from './flashcard';

type FlashcardListProps = {
  flashcards: FlashcardType[];
};

const FlashcardList = ({ flashcards }: FlashcardListProps) => {
  if (flashcards.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Languages className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">No flashcards yet</h3>
        <p className="text-muted-foreground">Create your first flashcard to start learning!</p>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          All Flashcards ({flashcards.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.map((card) => (
            <div className="" key={card.id}>
              <Flashcard card={card} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FlashcardList;
