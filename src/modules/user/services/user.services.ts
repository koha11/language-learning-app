import { httpClient } from '@/core/htpp/httpClient';
import type { UserResponse } from '../types/userResponse';

export const getMe = async () => {
  const { data } = await httpClient.get<UserResponse>('/auth/me');
  return data;
};
