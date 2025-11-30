import { httpClient } from '@/core/htpp/httpClient';
import type { LoginType, SignUpType } from '../types/auth';
import type { LoginResponse } from '../types/loginResponse';

export const Login = async (payload: LoginType) => {
  const { data } = await httpClient.post<LoginResponse>('/auth/login', payload);
  return data;
};
export const Signup = async (payload: SignUpType) => {
  const { data } = await httpClient.post('/auth/signup', payload);
  return data;
};
export const CheckEmail = async (payload: { email: string }) => {
  const { data } = await httpClient.post('/auth/email/check', payload);
  return data;
};
export const VerifyEmail = async (payload: { token: string }) => {
  const { data } = await httpClient.post<LoginResponse>('/auth/email/verify', payload);

export const Logout = async () => {
  const { data } = await httpClient.post('/auth/logout');
  return data;
};
