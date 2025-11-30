import type { CollectionType } from '@/modules/collection/types/collection';

export type SearchResponse = {
  current_page: number;
  data: CollectionType[];
  from: number;
  total: number;
  per_page: number;
};
