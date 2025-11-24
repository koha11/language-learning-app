import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye, Users, Lock, Globe } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CollectionType } from '../types/collection';
import DeleteCollectionModal from './deleteCollectionModal';

type CollectionListProps = {
  collections: CollectionType[];
  readOnly?: boolean;
};

const CollectionList = ({ collections, readOnly = false }: CollectionListProps) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const navigate = useNavigate();

  const getStatusIcon = (status: CollectionType['access_level']) => {
    switch (status) {
      case 'public':
        return <Globe className="w-4 h-4 text-primary" />;
      case 'shared':
        return <Users className="w-4 h-4 text-accent" />;
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
          <Card key={collection.id} className="p-6  space-y-2 hover:shadow-lg transition-shadow">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-foreground min-h-14">{collection.name}</h3>
                <div className="flex items-center gap-1 text-sm">
                  {getStatusIcon(collection.access_level)}
                  <span className="text-muted-foreground">
                    {getStatusText(collection.access_level)}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-2 break-all min-h-10">
                {collection.description ? collection.description : 'No description'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 min-h-6">
              {collection?.tags ? (
                collection.tags.split(',').map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-xs">No tags</span>
              )}
            </div>

            <div className="pt-2 border-t border-border">
              <div className="text-sm text-muted-foreground">
                {collection.flashcards_count} flashcards
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 py-4.5"
                onClick={() => navigate(`/collections/${collection.id}`)}
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              {!readOnly && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/collections/${collection.id}/edit`)}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setDeleteId(collection.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
      <DeleteCollectionModal deleteId={deleteId} setDeleteId={setDeleteId} />
    </>
  );
};

export default CollectionList;
