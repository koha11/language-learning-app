import { httpClient } from '@/core/htpp/httpClient';
import type {
  AutoGenFlashcardsType,
  CollectionDetailType,
  CollectionType,
  FormCollectionType, FormParagraphType,
} from '../types/collection';

export const getCollections = async () => {
  const { data } = await httpClient.get<CollectionType[]>('/collections');

  return data;
};

export const getCollectionById = async (id: number) => {
  const { data } = await httpClient.get<CollectionDetailType>(`/collections/${id}`);
  return data;
};

export const createCollection = async (payload: FormCollectionType) => {
  const { data } = await httpClient.post(`/collections`, payload);
  return data;
};

export const extractParagraph = async (payload: FormParagraphType) => {
  const { data } = await httpClient.post(`/collections/extract-paragraph`, payload);
  return data;
};

export const updateCollection = async (payload: FormCollectionType) => {
  const { data } = await httpClient.put(`/collections/${payload.id}/edit`, payload);
  return data;
};

export const autoGenFlashcards = async (payload: AutoGenFlashcardsType) => {
  const { data } = await httpClient.post(`/collections/auto-gen`, payload);
  return data;
};
