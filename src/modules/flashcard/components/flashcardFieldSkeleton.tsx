const FlashcardFieldsSkeleton = () => {
  return (
    <div className="flex items-center mt-2 w-full">
      <div className="flex items-center gap-8 w-full">
        {/* TERM Skeleton */}
        <div className="space-y-2 w-full">
          {/* label */}
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />

          {/* input */}
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
        </div>

        {/* DEFINITION Skeleton */}
        <div className="space-y-2 w-full">
          {/* label */}
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-8S00 rounded animate-pulse" />

          {/* input */}
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default FlashcardFieldsSkeleton;
