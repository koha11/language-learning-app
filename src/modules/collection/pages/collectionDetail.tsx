import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Play, ShareIcon } from 'lucide-react';
import FlashcardPractice from '@/modules/flashcard/components/flashcardPractice';
import FlashcardList from '@/modules/flashcard/components/flashcardList';
import { useGetCollectionById } from '../hooks/collection.hooks';
import AddFlashcardModal from '@/modules/flashcard/components/addFlashcardModal';
import FlashcardSkeleton from '@/modules/flashcard/components/flashcardSkeleton';
import CollectionHeaderSkeleton from '../components/collectionHeaderSkeleton';
import FlashcardPraciceSkeleton from '@/modules/flashcard/components/flashcardPracticeSkeleton';

const CollectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [addCard, setAddCard] = useState(false);

  const { data, isLoading, isError } = useGetCollectionById(Number(id!));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <Button variant="ghost" onClick={() => navigate('/collections')} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collections
            </Button>
            {isLoading ? (
              <>
                <CollectionHeaderSkeleton />
                <div className="my-6">
                  <FlashcardPraciceSkeleton />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <FlashcardSkeleton key={i} />
                  ))}
                </div>
              </>
            ) : (
              <>
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
                    <Button
                      size="lg"
                      onClick={() => {
                        localStorage.removeItem(`quiz-progress-${id}`);
                        navigate(`/collections/${id}/quiz`);
                      }}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Quiz
                    </Button>

                    <Button onClick={() => setAddCard(true)} size="lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Add Card
                    </Button>
                    <Button variant="outline" size="lg">
                      <ShareIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div className="my-6">
                  <FlashcardPractice flashcards={data?.flashcards ?? []} />
                </div>
                <FlashcardList flashcards={data?.flashcards ?? []} />
              </>
            )}
          </div>
        </div>
      </div>
      <AddFlashcardModal open={addCard} onChange={() => setAddCard(false)} />
    </div>
  );
};

export default CollectionDetail;
