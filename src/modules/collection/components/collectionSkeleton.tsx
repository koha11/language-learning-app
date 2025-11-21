import { Card } from '@/components/ui/card';

const CollectionSkeleton = () => {
  return (
    <Card className="p-6 space-y-4 animate-pulse">
      {/* Title + Status */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="h-6 w-2/3 bg-muted rounded-md" />

          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-muted rounded-md" />
            <div className="h-4 w-16 bg-muted rounded-md" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <div className="h-4 w-full bg-muted rounded-md" />
          <div className="h-4 w-5/6 bg-muted rounded-md" />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 min-h-6">
        <div className="h-5 w-12 bg-muted rounded" />
        <div className="h-5 w-10 bg-muted rounded" />
        <div className="h-5 w-16 bg-muted rounded" />
      </div>

      {/* Flashcard count */}
      <div className="pt-2 border-t border-border">
        <div className="h-4 w-24 bg-muted rounded-md" />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-2">
        <div className="h-9 w-full bg-muted rounded-md" />
        <div className="h-9 w-9 bg-muted rounded-md" />
        <div className="h-9 w-9 bg-muted rounded-md" />
      </div>
    </Card>
  );
};

export default CollectionSkeleton;
