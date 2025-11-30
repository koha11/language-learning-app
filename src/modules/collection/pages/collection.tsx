import { Button } from '@/components/ui/button';
import { Plus, FolderOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import CollectionList from '../components/collectionList';
import { Link } from 'react-router-dom';
import { useGetCollections } from '../hooks/collection.hooks';
import CollectionSkeleton from '../components/collectionSkeleton';

const Collections = () => {
  const { data, isLoading } = useGetCollections();

  const { data: recentlyCollections, isLoading: isLoadingRecently } = useGetCollections('recently');

  const { data: favoritedCollections, isLoading: isLoadingFavorited } =
    useGetCollections('favorited');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className=" mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <FolderOpen className="w-8 h-8 text-primary" />
                Collections
              </h1>
              <p className="text-muted-foreground mt-1">
                Organize your flashcards into collections
              </p>
            </div>
            <Link to={`/collections/create`}>
              <Button size="lg">
                <Plus className="w-5 h-5 mr-2" />
                New Collection
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total Collections</div>
              {data ? (
                <div className="text-3xl font-bold text-foreground">{data?.length ?? 0}</div>
              ) : (
                <div className="h-9 w-20 bg-muted rounded" />
              )}
            </Card>
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total Flashcards</div>
              {data ? (
                <div className="text-3xl font-bold text-foreground">
                  {data?.reduce((sum, c) => sum + c.flashcards_count, 0) ?? 0}
                </div>
              ) : (
                <div className="h-9 w-20 bg-muted rounded" />
              )}
            </Card>
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Public</div>
              {data ? (
                <div className="text-3xl font-bold text-primary">
                  {data?.filter((c) => c.access_level === 'public').length ?? 0}
                </div>
              ) : (
                <div className="h-9 w-20 bg-muted rounded" />
              )}
            </Card>
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Shared</div>
              {data ? (
                <div className="text-3xl font-bold ">
                  {data?.filter((c) => c.access_level === 'shared').length ?? 0}
                </div>
              ) : (
                <div className="h-9 w-20 bg-muted rounded" />
              )}
            </Card>
          </div>
          <h3 className="text-2xl font-bold">My Collections</h3>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <CollectionSkeleton key={i} />
              ))}
            </div>
          ) : (
            <CollectionList collections={data!} />
          )}

          <div className="space-y-2">
            <div className="font-bold text-xl">Recently Collections</div>
            {isLoadingRecently ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <CollectionSkeleton key={i} />
                ))}
              </div>
            ) : (
              <CollectionList collections={recentlyCollections!} />
            )}
          </div>

          <div className="space-y-2">
            <div className="font-bold text-xl">Favorited Collections</div>
            {isLoadingFavorited ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <CollectionSkeleton key={i} />
                ))}
              </div>
            ) : (
              <CollectionList collections={favoritedCollections!} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
