import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Plus, BookOpen, Play, ShareIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Flashcard } from '@/modules/flashcard/types/flashcard';
import FlashcardPractice from '@/modules/flashcard/components/flashcardPractice';
import FlashcardForm from '@/modules/flashcard/components/flashcardForm';
import FlashcardList from '@/modules/flashcard/components/flashcardList';
import { useGetCollectionById } from '../hooks/collection.hooks';

const CollectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

  const { data, isLoading, isError } = useGetCollectionById(id!);
  const handleAddCard = (card: Omit<Flashcard, 'id' | 'createdAt'>) => {
    const newCard: Flashcard = {
      ...card,
      id: Date.now().toString(),
    };
    // setFlashcards([...flashcards, newCard]);
    setIsFormOpen(false);
  };

  const handleEditCard = (card: Omit<Flashcard, 'id' | 'createdAt'>) => {
    if (editingCard) {
      // setFlashcards(flashcards.map((c) => (c.id === editingCard.id ? { ...c, ...card } : c)));
      setEditingCard(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteCard = (id: string) => {
    // setFlashcards(flashcards.filter((c) => c.id !== id));
  };

  const handleEditClick = (card: Flashcard) => {
    setEditingCard(card);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCard(null);
  };
  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <Button variant="ghost" onClick={() => navigate('/collections')} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collections
            </Button>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{data?.name}</h1>
                <p className="text-muted-foreground mt-1">{data?.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {data?.tags ? (
                    data.tags.split(' ').map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs">No tags</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/collections/${id}/quiz`} state={{ flashcards: data?.flashcards }}>
                  <Button size="lg">
                    <Play className="w-5 h-5 mr-2" />
                    Start Quiz
                  </Button>
                </Link>
                <Button onClick={() => setIsFormOpen(true)} size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Card
                </Button>
                <Button variant="outline" size="lg">
                  <ShareIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <FlashcardPractice flashcards={data?.flashcards ?? []} />

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
          <FlashcardList
            flashcards={data?.flashcards ?? []}
            onEdit={handleEditClick}
            onDelete={handleDeleteCard}
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;
