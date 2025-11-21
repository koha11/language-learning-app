import { Card } from '@/components/ui/card';

const FlashcardSkeleton = () => {
  return (
    <Card className="p-4">
      <div className="space-y-3 animate-pulse">
        {/* Term + definition */}
        <div className="space-y-2">
          <div className="h-5 w-2/3 rounded-md bg-muted" />
          <div className="h-4 w-1/2 rounded-md bg-muted" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2 border-t border-border">
          <div className="h-9 w-full rounded-md bg-muted" />
          <div className="h-9 w-full rounded-md bg-muted" />
        </div>
      </div>
    </Card>
  );
};

export default FlashcardSkeleton;
