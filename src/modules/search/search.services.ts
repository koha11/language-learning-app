import { httpClient } from '@/core/htpp/httpClient';
import type { SearchResponse } from './types/searchResponse';

export const searchCollections = async (query?: {
  q?: string;
  numberOfTerms?: string;
  page?: number;
  sort?: string;
}) => {
  const { data } = await httpClient.get<SearchResponse>('/collections/search', {
    params: query,
  });
  return data;
};
