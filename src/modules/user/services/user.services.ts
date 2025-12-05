import { httpClient } from '@/core/htpp/httpClient';
import type { UserResponse } from '../types/userResponse';
import type { UserInfoType, UserType } from '../types/user';

export const getMe = async () => {
  const { data } = await httpClient.get<UserResponse>('/auth/me');
  return data;
};

export const getUsersByEmail = async (email: string) => {
  const { data } = await httpClient.get<UserType[]>('/users', {
    params: {
      email,
    },
  });
  return data;
};

export const editUserInfo = async (payload: UserInfoType) => {
  const res = await httpClient.post<UserResponse>('/users/edit', payload);
  return res.data;
};
