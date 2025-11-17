import { httpClient } from '@/core/htpp/httpClient';
import type { CollectionDetailType, CollectionType } from '../types/collection';

export const getCollections = async () => {
  const { data } = await httpClient.get<CollectionType[]>('/collections');
  return data;
};
export const getCollectionById = async (id: number) => {
  const { data } = await httpClient.get<CollectionDetailType>(`/collections/${id}`);
  return data;
};
