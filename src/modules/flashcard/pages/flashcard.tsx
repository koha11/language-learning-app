import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import FlashcardPractice from '../components/flashcardPractice';
import FlashcardForm from '../components/flashcardForm';
import FlashcardList from '../components/flashcardList';

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  language: string;
  category: string;
  createdAt: Date;
};

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: '1',
      front: 'Hello',
      back: 'Bonjour',
      language: 'French',
      category: 'Greetings',
      createdAt: new Date(),
    },
    {
      id: '2',
      front: 'Thank you',
      back: 'Merci',
      language: 'French',
      category: 'Greetings',
      createdAt: new Date(),
    },
    {
      id: '3',
      front: 'Good morning',
      back: 'Bonjour',
      language: 'French',
      category: 'Greetings',
      createdAt: new Date(),
    },
    {
      id: '4',
      front: 'Goodbye',
      back: 'Au revoir',
      language: 'French',
      category: 'Greetings',
      createdAt: new Date(),
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [isPracticeMode, setIsPracticeMode] = useState(false);

  const handleAddCard = (card: Omit<Flashcard, 'id' | 'createdAt'>) => {
    const newCard: Flashcard = {
      ...card,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setFlashcards([...flashcards, newCard]);
    setIsFormOpen(false);
  };

  const handleEditCard = (card: Omit<Flashcard, 'id' | 'createdAt'>) => {
    if (editingCard) {
      setFlashcards(flashcards.map((c) => (c.id === editingCard.id ? { ...c, ...card } : c)));
      setEditingCard(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteCard = (id: string) => {
    setFlashcards(flashcards.filter((c) => c.id !== id));
  };

  const handleEditClick = (card: Flashcard) => {
    setEditingCard(card);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCard(null);
  };

  if (isPracticeMode) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => setIsPracticeMode(false)} className="mb-6">
            ← Back to List
          </Button>
          <FlashcardPractice flashcards={flashcards} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-8 h-8 text-primary" />
                My Flashcards
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and practice your language flashcards
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsPracticeMode(true)}
                variant="outline"
                size="lg"
                disabled={flashcards.length === 0}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Practice Mode
              </Button>
              <Button onClick={() => setIsFormOpen(true)} size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Add Flashcard
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total Cards</div>
              <div className="text-3xl font-bold text-foreground">{flashcards.length}</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Languages</div>
              <div className="text-3xl font-bold text-primary">
                {new Set(flashcards.map((c) => c.language)).size}
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Categories</div>
              <div className="text-3xl font-bold text-accent">
                {new Set(flashcards.map((c) => c.category)).size}
              </div>
            </Card>
          </div>

          {/* Form */}
          {isFormOpen && (
            <Card className="p-6">
              <FlashcardForm
                onSubmit={editingCard ? handleEditCard : handleAddCard}
                onCancel={handleCloseForm}
                initialData={editingCard || undefined}
                isEditing={!!editingCard}
              />
            </Card>
          )}

          {/* List */}
          <FlashcardList
            flashcards={flashcards}
            onEdit={handleEditClick}
            onDelete={handleDeleteCard}
          />
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
