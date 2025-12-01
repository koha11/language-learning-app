import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Pencil,
  Trash2,
  Eye,
  Users,
  Lock,
  Globe,
  HeartIcon,
  Ellipsis,
  EyeIcon,
  DotIcon,
  Copy,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CollectionType } from '../types/collection';
import DeleteCollectionModal from './deleteCollectionModal';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { favoriteCollection } from '../services/collection.services';

type CollectionListProps = {
  collections: CollectionType[];
  readOnly?: boolean;
};

const CollectionList = ({ collections, readOnly = false }: CollectionListProps) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { copyToClipboard } = useCopyToClipboard();
  const navigate = useNavigate();

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

  const getStatusIcon = (status: CollectionType['access_level']) => {
    switch (status) {
      case 'public':
        return <Globe className="w-4 h-4 text-primary" />;
      case 'shared':
        return <Users className="w-4 h-4 text-primary" />;
      case 'private':
        return <Lock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: CollectionType['access_level']) => {
    switch (status) {
      case 'public':
        return 'Public';
      case 'shared':
        return 'Shared';
      case 'private':
        return 'Private';
    }
  };

  if (collections.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">
          No collections yet. Create your first collection to get started!
        </p>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {collections.map((collection) => (
          <Card key={collection.id} className="p-4 gap-0  hover:shadow-lg transition-shadow">
            {!readOnly && (
              <div className="flex items-center justify-end">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className=" hover:cursor-pointer">
                      <Ellipsis className="size-5" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className=" p-2 flex flex-col w-fit   gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full flex items-center justify-start"
                      onClick={() => navigate(`/collections/${collection.id}/edit`)}
                    >
                      <Pencil className="size-4" />
                      <Label>Edit</Label>
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(window.location.href)}
                      className="w-full flex items-center justify-start"
                      variant="ghost"
                      size="default"
                    >
                      <Copy className="w-5 h-5" />
                      <Label>Coppy link</Label>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full flex items-center justify-start"
                      onClick={() => setDeleteId(collection.id)}
                    >
                      <Trash2 className="size-4" /> <Label>Delete</Label>
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            )}
            <div className="mt-2">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-foreground ">{collection.name}</h3>
                <div className="flex items-center gap-1 text-sm">
                  {getStatusIcon(collection.access_level)}
                  <span className="text-muted-foreground">
                    {getStatusText(collection.access_level)}
                  </span>
                </div>
              </div>
            </div>
            {collection?.tags && collection.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {collection.tags.split(',').map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-primary/10 text-primary rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center my-4">
              <div className="text-xs font-medium text-primary bg-primary/20 rounded-full px-2.5 py-1 w-fit">
                {collection.flashcards_count} terms
              </div>
              <DotIcon className="size-8 opacity-60" />
              <HeartIcon className="fill-red-500 text-red-500 size-4.5 mr-1" />
              <span className="text-sm font-medium text-muted-foreground">
                ({collection.favorited_count})
              </span>
              <DotIcon className="size-8 opacity-60" />
              <EyeIcon className="size-4.5 opacity-60 mr-1" />
              <span className="text-sm font-medium text-muted-foreground">
                ({collection.viewed_count})
              </span>
            </div>

            <div className="mt-auto">
              <div className="flex gap-2 mt-4 items-center">
                <p className="font-medium text-[15px] truncate max-w-[60%] min-w-[60%] ">
                  {collection.owner.name}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 py-2"
                  onClick={() => navigate(`/collections/${collection.id}`)}
                >
                  <Eye className="w-4 h-4 " />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  className={`flex-1 py-2 ${collection.is_favorited ? 'bg-red-500/10 text-red-500' : ''
                    }`}
                  onClick={() => {
                    mutate(
                      { id: collection.id, favorite: !collection.is_favorited },
                      {
                        onSuccess: () => {

                        },
                      },
                    );
                  }}
                >
                  <HeartIcon className="w-4 h-4 " />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <DeleteCollectionModal deleteId={deleteId} setDeleteId={setDeleteId} />
    </>
  );
};

export default CollectionList;
