import { useQuery } from '@tanstack/react-query';
import { getCollectionById, getCollections } from '../services/collection.services';

export const useGetCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: getCollections,
  });
};
export const useGetCollectionById = (id: number) => {
  return useQuery({
    queryKey: ['collections', id],
    queryFn: () => getCollectionById(id),
    enabled: !!id,
  });
};
