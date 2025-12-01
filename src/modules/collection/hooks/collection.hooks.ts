import { useQuery } from '@tanstack/react-query';
import { getCollectionById, getCollections } from '../services/collection.services';

export const useGetCollections = (
  type?: 'public' | 'shared with me' | 'favorited' | 'recently',
) => {
  return useQuery({
    queryKey: ['collections', type],
    queryFn: () => getCollections(type),
  });
};

export const useGetCollectionById = (id: number, userId?: number) => {
  return useQuery({
    queryKey: ['collections', id],
    queryFn: () => getCollectionById(id, userId),
    enabled: !!id,
  });
};
