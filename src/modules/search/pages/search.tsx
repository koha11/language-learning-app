import React from 'react';
import { useSearch } from '../search.hooks';
import { useSearchParams } from 'react-router-dom';
import CollectionSkeleton from '@/modules/collection/components/collectionSkeleton';
import CollectionList from '@/modules/collection/components/collectionList';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [numberOfTerms, setNumberOfTerms] = React.useState<string>('all');
  const [sortBy, setSortBy] = React.useState<string>('latest');
  const q = searchParams.get('q') ?? '';

  const { data, isLoading } = useSearch({
    q: q,
    page: currentPage,
    numberOfTerms: numberOfTerms,
    sort: sortBy,
  });

  const pages = data && Math.ceil(data.total / data.per_page);

  return (
    <div className="container mt-10 mx-auto px-4 py-8">
      <h3 className="text-2xl font-medium border-b pb-2 border-gray-200">Result for "{q}"</h3>
      <div className="mt-3 text-lg font-medium uppercase">Filters</div>
      <div className="flex items-center mb-10 gap-10">
        <div className="flex items-center gap-4">
          <Label className="text-md opacity-60">Number of terms: </Label>
          <Select value={numberOfTerms} onValueChange={setNumberOfTerms}>
            <SelectTrigger className=" py-3">
              <SelectValue defaultValue="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="lessThan20">{`< 20 terms`}</SelectItem>
              <SelectItem value="20To50">{`20 - 50 terms`}</SelectItem>
              <SelectItem value="greaterThan50">{`50+ terms`}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Label className="text-md opacity-60">Sort by: </Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className=" py-3">
              <SelectValue defaultValue="latest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="favorite">Favorite</SelectItem>
              <SelectItem value="view">View</SelectItem>
              <SelectItem value="terms">Terms</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <CollectionSkeleton key={i} />
            ))}
          </div>
        ) : data && data.data.length > 0 && pages ? (
          <>
            <h3 className="text-2xl font-bold mb-4">Collections</h3>
            <CollectionList collections={data.data ?? []} readOnly={true} />
            <div className="flex items-center justify-center gap-4 mt-10">
              {Array.from({ length: pages }).map((_, index) => {
                return (
                  <Button
                    onClick={() => setCurrentPage(index + 1)}
                    variant={currentPage === index + 1 ? 'default' : 'outline'}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="">No result match</div>
        )}
      </div>
    </div>
  );
};

export default Search;
