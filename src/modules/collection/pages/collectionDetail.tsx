import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Play, Ellipsis, Pencil, Trash2, Copy, HeartIcon } from 'lucide-react';
import FlashcardPractice from '@/modules/flashcard/components/flashcardPractice';
import FlashcardList from '@/modules/flashcard/components/flashcardList';
import { useGetCollectionById } from '../hooks/collection.hooks';
import AddFlashcardModal from '@/modules/flashcard/components/addFlashcardModal';
import FlashcardSkeleton from '@/modules/flashcard/components/flashcardSkeleton';
import CollectionHeaderSkeleton from '../components/collectionHeaderSkeleton';
import FlashcardPraciceSkeleton from '@/modules/flashcard/components/flashcardPracticeSkeleton';
import { useAuth } from '@/shared/hooks/useAuth';
import Loading from '@/components/ui/loading';
import { canEditCollection } from '@/shared/utils/permission';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { favoriteCollection } from '../services/collection.services';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import DeleteCollectionModal from '../components/deleteCollectionModal';
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard';
import Forbidden from '@/core/pages/forbidden';
import NotFound from '@/core/pages/notFound';

const CollectionDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [addCard, setAddCard] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { user, isLoading: ild } = useAuth();
  const { data, isLoading, isError, error } = useGetCollectionById(Number(id!), user?.id, ild);

  const { mutate } = useMutationWithToast(
    ({ favorite, id }: { id: number; favorite: boolean }) => favoriteCollection(id, favorite),
    {
      invalidateKeys: [
        ['collections'],
        ['collections', 'recently'],
        ['collections', 'favorited'],
        ['collections', 'public'],
      ],
      success: 'Collection favorited',
      error: 'Failed to favorite collection',
    },
  );

  const { copyToClipboard } = useCopyToClipboard();
  const isOwner = canEditCollection(user, data!);
  const nameSplit = user?.name?.split(' ');
  if (ild) {
    return <Loading />;
  }
  if (isError) {
    if (error.status === 403) {
      return <Forbidden />;
    }
    if (error.status === 404) {
      return <NotFound />;
    }
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
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
                    <div className="flex flex-wrap gap-2 mt-3">
                      {data?.tags &&
                        data.tags.split(',').map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
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
                    {isOwner && (
                      <Button onClick={() => setAddCard(true)} size="lg">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Card
                      </Button>
                    )}
                    {user && (
                      <Button
                        variant="outline"
                        size="lg"
                        type="button"
                        className={`flex-1 py-2 `}
                        onClick={() => {
                          if (!data) return;

                          mutate(
                            { id: data.id, favorite: !data.is_favorited },
                            {
                              onSuccess: () => {},
                            },
                          );
                        }}
                      >
                        <HeartIcon
                          className={`size-4 ${
                            data!.is_favorited ? 'fill-red-500 text-red-500' : ''
                          }`}
                        />
                      </Button>
                    )}

                    <Popover>
                      <PopoverTrigger asChild>
                        <button className=" hover:cursor-pointer">
                          <Ellipsis className="size-5" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className=" p-2 flex flex-col w-fit   gap-1">
                        {isOwner && (
                          <Button
                            variant="ghost"
                            size="default"
                            className="w-full flex items-center justify-start"
                            onClick={() => navigate(`/collections/${id}/edit`)}
                          >
                            <Pencil className="size-4" />
                            <Label>Edit</Label>
                          </Button>
                        )}
                        <Button
                          onClick={() => copyToClipboard(window.location.href)}
                          className="w-full flex items-center justify-start"
                          variant="ghost"
                          size="default"
                        >
                          <Copy className="w-5 h-5" />
                          <Label>Coppy link</Label>
                        </Button>
                        {isOwner && (
                          <Button
                            variant="ghost"
                            size="default"
                            className="w-full flex items-center justify-start text-red-500 hover:text-red-500"
                            onClick={() => setDeleteId(Number(id))}
                          >
                            <Trash2 className="size-4" /> <Label>Delete</Label>
                          </Button>
                        )}
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="my-6">
                  <FlashcardPractice flashcards={data?.flashcards ?? []} isOwner={isOwner} />
                </div>
                {data && (
                  <div className="mb-10 mt-4">
                    <div className="flex items-center gap-2 ">
                      <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center">
                        {nameSplit && nameSplit[nameSplit?.length - 1][0].toUpperCase()}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Created by</span>
                        <span className="font-medium">{data.owner.name}</span>
                      </div>
                    </div>
                    <p className="text-[15px] mt-4">{data?.description}</p>
                  </div>
                )}
                <FlashcardList flashcards={data?.flashcards ?? []} />
              </>
            )}
          </div>
        </div>
      </div>
      <AddFlashcardModal open={addCard} onChange={() => setAddCard(false)} />{' '}
      <DeleteCollectionModal deleteId={deleteId} setDeleteId={setDeleteId} />
    </div>
  );
};

export default CollectionDetail;
