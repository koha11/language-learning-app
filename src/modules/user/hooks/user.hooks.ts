import { useQuery } from '@tanstack/react-query';
import { getUsersByEmail } from '../services/user.services';

export const useGetUsersByEmail = (email: string) => {
  return useQuery({
    queryKey: ['users', email],
    queryFn: () => getUsersByEmail(email),
    enabled: !!email,
  });
};
