import { useQuery } from '@tanstack/react-query';
import { searchCollections } from './search.services';

export const useSearch = (query?: {
  q?: string;
  numberOfTerms?: string;
  page?: number;
  sort?: string;
}) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchCollections(query),
    enabled: !!query,
  });
};
